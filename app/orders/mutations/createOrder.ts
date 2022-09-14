import {resolver} from "@blitzjs/rpc";
import db, {OrderType} from "db";
import {z} from "zod";
import {Spot} from '@binance/connector'

const CreateOrder = z.object({
    quantity: z.number(),
    type: z.string()
});

export default resolver.pipe(
    resolver.zod(CreateOrder),
    resolver.authorize(),
    async (input) => {
        let order;

        const apiKey = 'eWA0UQ2XagmGoO7jBVnXtRg48bWlESEAun5hs6B76SuwMNiB5oGjvchTAGRU9kAW'
        const apiSecret = 'kSrucJ1c4usGaWihKJbRHbVBYHV5jcyWIeIr0GS3Y3vvvvguSNCvsQHgK7Jypxdj'
        // const client = new Spot(apiKey, apiSecret)
        const client = new Spot(apiKey, apiSecret, {baseURL: 'https://testnet.binance.vision'})

        if (input.type !== OrderType.SELL && input.type !== OrderType.BUY) {
            throw Error('Invalid order type')
        }

        let type;
        if (input.type === OrderType.SELL) {
            type = OrderType.SELL
        } else if (input.type === OrderType.BUY) {
            type = OrderType.BUY
        }

        // Place a new order
        await client.newOrder('BTCUSDT', type, 'MARKET', {
            quantity: input.quantity,
        }).then(async (response) => {
            client.logger.log(response.data)

            order = await db.order.create({
                data: {
                    type: type,
                    orderId: response.data.orderId.toString()
                }
            })
        }).catch(error => {
            client.logger.error(error)
        })

        return order;
    }
);
