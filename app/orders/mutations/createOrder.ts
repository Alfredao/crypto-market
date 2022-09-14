import {resolver} from "@blitzjs/rpc";
import db, {OrderType} from "db";
import {z} from "zod";
import {Spot} from '@binance/connector'
import {Ctx} from "blitz";

const CreateOrder = z.object({
  quantity: z.number(),
  type: z.string()
});

export default resolver.pipe(
  resolver.zod(CreateOrder),
  resolver.authorize(),
  async (input, ctx: Ctx) => {
    if (ctx.session.userId == null) return false

    const user = await db.user.findUnique({
      where: {
        id: ctx.session.userId,
      },
    })

    if (user === null) throw new Error("User not found")

    let order;

    const apiKey = 'eWA0UQ2XagmGoO7jBVnXtRg48bWlESEAun5hs6B76SuwMNiB5oGjvchTAGRU9kAW'
    const apiSecret = 'kSrucJ1c4usGaWihKJbRHbVBYHV5jcyWIeIr0GS3Y3vvvvguSNCvsQHgK7Jypxdj'
    // const client = new Spot(apiKey, apiSecret)
    const client = new Spot(apiKey, apiSecret, {baseURL: 'https://testnet.binance.vision'})

    if (input.type !== OrderType.SELL && input.type !== OrderType.BUY) {
      throw Error('Invalid order type')
    }

    if (input.type === OrderType.SELL) {
      // Place a new order
      await client.newOrder('BTCUSDT', OrderType.SELL, 'MARKET', {
        quantity: input.quantity,
      }).then(async (response) => {
        client.logger.log(response.data)

        order = await db.order.create({
          data: {
            type: OrderType.SELL,
            orderId: response.data.orderId.toString()
          }
        })

        await db.spot.updateMany({
          where: {
            userId: user.id,
            coinId: 1, // BTC
          },
          data: {
            balance: {
              decrement: parseFloat(response.data.executedQty),
            },
          },
        })

        await db.spot.updateMany({
          where: {
            userId: user.id,
            coinId: 2, // USDT
          },
          data: {
            balance: {
              increment: parseFloat(response.data.cummulativeQuoteQty),
            },
          },
        })

      }).catch(error => {
        client.logger.error(error)
      })
    } else if (input.type === OrderType.BUY) {
      // Place a new order
      await client.newOrder('BTCUSDT', OrderType.BUY, 'MARKET', {
        quantity: input.quantity,
      }).then(async (response) => {
        client.logger.log(response.data)

        order = await db.order.create({
          data: {
            type: OrderType.BUY,
            orderId: response.data.orderId.toString()
          }
        })

        await db.spot.updateMany({
          where: {
            userId: user.id,
            coinId: 1, // BTC
          },
          data: {
            balance: {
              increment: parseFloat(response.data.executedQty),
            },
          },
        })

        await db.spot.updateMany({
          where: {
            userId: user.id,
            coinId: 2, // USDT
          },
          data: {
            balance: {
              decrement: parseFloat(response.data.cummulativeQuoteQty),
            },
          },
        })
      }).catch(error => {
        client.logger.error(error)
      })
    }


    return order;
  }
);
