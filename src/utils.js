
export const rpc = "https://rpc-mumbai.maticvigil.com/"
export const isMobile = () => /Mobi/i.test(window.navigator.userAgent)
    || /iPhone|iPod|iPad/i.test(navigator.userAgent);

export const objectMap = (object, mapFn) => {
    return Object.keys(object).reduce((result, key) => {
        result[key] = mapFn(object[key]);
        return result
    }, {})
}
export const walletShortFormer = (wallet) => {
    let shrtValu = isMobile() ? 4: 7
    return `${wallet?.slice(0, shrtValu)}...${wallet?.slice(wallet?.length - shrtValu, wallet?.length)}`
}