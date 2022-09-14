import {Ctx} from "blitz"
import {Spot} from '@binance/connector'

export default async function getTickerPrice(_ = null, {session}: Ctx) {
  const apiKey = 'eWA0UQ2XagmGoO7jBVnXtRg48bWlESEAun5hs6B76SuwMNiB5oGjvchTAGRU9kAW'
  const apiSecret = 'kSrucJ1c4usGaWihKJbRHbVBYHV5jcyWIeIr0GS3Y3vvvvguSNCvsQHgK7Jypxdj'
  const client = new Spot(apiKey, apiSecret, {baseURL: 'https://testnet.binance.vision'})

  let currentPrice

  await client.tickerPrice('BTCUSDT').then(response => {
    client.logger.log(response.data)

    currentPrice = response.data.price
  })

  return currentPrice
}
