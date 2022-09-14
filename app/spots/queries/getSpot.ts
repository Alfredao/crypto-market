import {NotFoundError} from "blitz";
import {resolver} from "@blitzjs/rpc";
import db from "db";
import {z} from "zod";

const GetSpot = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
});

export default resolver.pipe(
  resolver.zod(GetSpot),
  resolver.authorize(),
  async ({id}) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const spot = await db.spot.findFirst({where: {id}});

    if (!spot) throw new NotFoundError();

    return spot;
  }
);
