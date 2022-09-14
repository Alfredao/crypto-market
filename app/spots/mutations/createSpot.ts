import {resolver} from "@blitzjs/rpc";
import db from "db";
import {z} from "zod";

const CreateSpot = z.object({
  user: z.number(),
  coin: z.number(),
  balance: z.number(),
});

export default resolver.pipe(
  resolver.zod(CreateSpot),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const spot = await db.spot.create({data: input});

    return spot;
  }
);
