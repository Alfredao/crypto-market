import {Suspense, useEffect, useState} from "react";
import {useMutation, useQuery} from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createOrder from "../../app/orders/mutations/createOrder";
import {useCurrentTickerPrice} from "../../app/core/hooks/useCurrentTickerPrice";
import {OrderType} from "../../db";
import {numberFormat} from "../../app/core/common";
import {Table} from "react-bootstrap";
import getOrders from "../../app/orders/queries/getOrders";


const TradesPage = () => {

  const [ordersQuery] = useQuery(getOrders, {})
  const [createOrderMutation] = useMutation(createOrder)
  const currentPriceMutation = useCurrentTickerPrice()
  const [currentPrice, setCurrentPrice] = useState(0.0)
  const [quantity, setQuantity] = useState(0.0)

  const buyBTC = async function () {

    if (!quantity) {
      alert('You must inform a quantity to buy')
    }

    await createOrderMutation({
      quantity: quantity,
      type: OrderType.BUY,
    })
      .then((result: any) => {
        console.log(result)
      })
      .catch((e) => alert(e))
  }

  const sellBTC = async function () {

    if (!quantity) {
      alert('You must inform a quantity to buy')
    }

    await createOrderMutation({
      quantity: quantity,
      type: OrderType.SELL,
    })
      .then((result: any) => {
        console.log(result)
      })
      .catch((e) => alert(e))
  }

  useEffect(() => {
    currentPriceMutation().then((price) => {
      setCurrentPrice(price);
    }).catch(console.log)
  }, [])

  function Orders() {
    return (
      <>
        <h3>Orders</h3>
        <Table>
          <thead>
          <tr>
            <th>id</th>
            <th>type</th>
          </tr>
          </thead>
          <tbody>
          {ordersQuery.orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.type}</td>
            </tr>
          ))}
          </tbody>
        </Table>
      </>
    )
  }


  return (
    <Layout title={"Market"}>
      <main>
        <div className="container">
          <div className="row">
            <h3>BTC/USDT</h3>
            <ul>
              <li>Binance: <small>{numberFormat(currentPrice)}</small></li>
            </ul>
          </div>
          <h3>Place order</h3>
          <div className={"row"}>
            <div className="col-lg-3">
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input type="number" className="form-control" id="quantity" placeholder="..." onChange={e => setQuantity(parseFloat(e.target.value))}/>
              </div>
            </div>

          </div>
          <div className={"row"}>
            <div className="col-lg-1">
              <button type="button" onClick={buyBTC} className={"btn btn-success"}>
                Buy
              </button>
            </div>

            <div className="col-lg-1">
              <button type="button" onClick={sellBTC} className={"btn btn-danger"}>
                Sell
              </button>
            </div>

          </div>
          <div className="row mt-3">
            <Suspense fallback="Loading...">
              <Orders/>
            </Suspense>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TradesPage;
