import Web3 from "web3";
import { rpc } from "./utils";

export const fromWei = (number) => {
    return Web3.utils.fromWei(`${(number)}`)
}
export const toWei = (number) => {
    return Web3.utils.toWei(`${(number)}`)
    // return (`${(number * 10 ** 18)}`)
}

export const isAddress = (address) => {
    return Web3.utils.isAddress(address);
}
export const isContract = async (address) => {
    try {
        const web3 = new Web3(rpc)
        let getCode = await web3.eth.getCode(address)
        return getCode === "0x"
    } catch (error) {
        return false
    }
}