import {useEffect, useState} from "react";
import Head from "next/head";
import {useMutation} from "@blitzjs/rpc";
import Layout from "app/core/layouts/Layout";
import createOrder from "../../app/orders/mutations/createOrder";
import {Form} from "react-final-form"
import {useCurrentTickerPrice} from "../../app/core/hooks/useCurrentTickerPrice";

const TradesPage = () => {

    const [createOrderMutation] = useMutation(createOrder)
    const currentPriceMutation = useCurrentTickerPrice()
    const [currentPrice, setCurrentPrice] = useState(0.0)

    const buyBTC = async function (data) {
        await createOrderMutation({
            quantity: 0.1,
            ...data,
        })
            .then((result: any) => {
                console.log(result)
            })
            .catch((e) => alert(e))
    }

    const sellBTC = async function (data) {
        await createOrderMutation({
            quantity: 0.1,
            ...data,
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

    return (
        <Layout>
            <Head>
                <title>Trades</title>
            </Head>

            <p>BTC/USDT price on Binance: </p>{currentPrice}

            <p>&nbsp;</p>
            <div>
                <Form
                    onSubmit={buyBTC}
                    render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <button type="submit">
                                Buy
                            </button>
                        </form>
                    )}
                />

                <Form
                    onSubmit={sellBTC}
                    render={({handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <button type="submit">
                                Sell
                            </button>
                        </form>
                    )}
                />

            </div>
        </Layout>
    );
};

export default TradesPage;
