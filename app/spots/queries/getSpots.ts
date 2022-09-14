import {paginate} from "blitz";
import {resolver} from "@blitzjs/rpc";
import db, {Prisma} from "db";

interface GetSpotsInput
  extends Pick<Prisma.SpotFindManyArgs,
    "where" | "orderBy" | "skip" | "take"> {
}

export default resolver.pipe(
  resolver.authorize(),
  async ({where, orderBy, skip = 0, take = 100}: GetSpotsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: spots,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.spot.count({where}),
      query: (paginateArgs) =>
        db.spot.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: {
            coin: true,
          },
        }),
    });

    return {
      spots,
      nextPage,
      hasMore,
      count,
    };
  }
);
