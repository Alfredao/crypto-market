import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteOrder = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteOrder),
  resolver.authorize(),
  async ({ id }) => {
    const order = await db.order.deleteMany({ where: { id } });

    return order;
  }
);
