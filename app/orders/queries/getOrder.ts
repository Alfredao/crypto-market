import { NotFoundError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const GetOrder = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetOrder),
  resolver.authorize(),
  async ({ id }) => {
    const order = await db.order.findFirst({ where: { id } });

    if (!order) throw new NotFoundError();

    return order;
  }
);
