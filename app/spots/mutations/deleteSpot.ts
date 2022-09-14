import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const DeleteSpot = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(DeleteSpot),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const spot = await db.spot.deleteMany({ where: { id } });

    return spot;
  }
);
