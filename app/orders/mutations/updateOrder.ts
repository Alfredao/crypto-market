import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateOrder = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateOrder),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const order = await db.order.update({ where: { id }, data });

    return order;
  }
);
