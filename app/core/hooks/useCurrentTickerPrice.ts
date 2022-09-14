import {useMutation} from "@blitzjs/rpc"
import getTickerPrice from "../../users/mutations/getTickerPrice";

export const useCurrentTickerPrice = () => {
    const [ticketPrice] = useMutation(getTickerPrice)

    return ticketPrice
}
