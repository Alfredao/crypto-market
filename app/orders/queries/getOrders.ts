import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetOrdersInput
  extends Pick<
    Prisma.OrderFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetOrdersInput) => {
    const {
      items: orders,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.order.count({ where }),
      query: (paginateArgs) =>
        db.order.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      orders,
      nextPage,
      hasMore,
      count,
    };
  }
);
