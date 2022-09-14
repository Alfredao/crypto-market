import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }

  await db.coin.create({
    data: {
      name: "Bitcoin",
      ticker: "BTC",
    },
  })

  await db.coin.create({
    data: {
      name: "USD Theter",
      ticker: "USDT",
    },
  })
}

export default seed
