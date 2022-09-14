import {SecurePassword} from "@blitzjs/auth"
import {resolver} from "@blitzjs/rpc"
import db from "db"
import {Role} from "types"
import {Signup} from "../validations"

export default resolver.pipe(resolver.zod(Signup), async ({email, password}, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      role: "USER"
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    },
  })

  await db.spot.create({
    data: {
      userId: user.id,
      coinId: 1,
      balance: 0.0,
    },
  })

  await db.spot.create({
    data: {
      userId: user.id,
      coinId: 2,
      balance: 10000,
    },
  })

  await ctx.session.$create({userId: user.id, role: user.role as Role})
  return user
})
