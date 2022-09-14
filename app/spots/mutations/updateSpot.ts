import {resolver} from "@blitzjs/rpc";
import db from "db";
import {z} from "zod";

const UpdateSpot = z.object({
  id: z.number(),
});

export default resolver.pipe(
  resolver.zod(UpdateSpot),
  resolver.authorize(),
  async ({id, ...data}) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const spot = await db.spot.update({where: {id}, data});

    return spot;
  }
);
