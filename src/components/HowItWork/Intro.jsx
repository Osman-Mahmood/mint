import React from 'react'
import intro from '../../assets/intro.jpg'
import '../style.css'
const Intro = () => {
  return (
    <div className='container-fluid p-5  text-white pb-3'>
      {/* <img className='w-100 img-fluid intro_img' src={intro} alt="" /> */}
      {/* <h1 className='text-white intro_text'>Distributed systems <br />
        & <br />
        Human Coordination
      </h1> */}
      <h6 className='mt-5'>Steps to earn Crypto:</h6>
      <p>1. The u369.eth smart contract is designed with the objective of protecting your digital assets from being stolen.</p>
      <p>2. When you connect your wallet for the first time >>you must sign an on-chain transaction to link your wallet with a randomly-generated-and-encrypted 32 characters string (i.e., a Master Key) for you. YOU MUST SAVE THAT MASTER KEY IN A SAFE PLACE AND DO NOT LOSE IT.</p>
      <p>3. Once you have saved your Master Key, proceed to protect your digital assets >> (A) create a password, (B) confirm the password and (C) supply any amount of ETH, ERC20 or NFTs from this list. <br /> Note: If you forget or lose the password you created >> the Master Key provided in the beginning is the unique authentication code to reset or bypass the password you created. PLEASE DO NOT LOSE THE MASTER KEY, OTHERWISE YOUR FUNDS WILL BE STUCK FOREVER IN THE SMART CONTRACT. </p>
       <p>4. Upon depositing/protecting your digital asset >> the smart contract will issue a 1:1 wrapped representation of the deposited/locked token or NFT (i.e., if you supplied/locked 1.369 ETH --> the contract will collect the 0.369% ETH as fee and will issue to your wallet 1 uETH (it can be read as is "1 uETH" or as "1 unstealable ETH" or "1 uNFT" (unstealable NFT) if the wrapped asset is an NFT).</p>
       <p>5. The 0.369% collected by the smart contract is a benefaction-fee, used to fund public goods and to reward participants.</p>
       <p>6. When wrapping ETH or ERC20, the smart contract will collect the 0.369% benefaction-fee from the supplied/locked token(s).</p>
       <p>7. When wrapping NFTs, the smart contract will derive and collect the 0.369% benefaction-fee from the NFT's floor price. <br /> The collected fee is distributed as follows: <br /> 30% to fund public goods <br />30% to reward 1 user every 369 hours<br />30% to u369.eth and
10% to any organization promoting/helping moral and civic values
</p>
<p>8. After wrapped, the uToken(s) (for example uETH) becomes more difficult to hack or to be stolen by any bad actor(s). If by any chance a bad actor access your wallet/your private keys >> to move/send out your uToken(s), the bad actor would also need to have your password or unique authentication code (Master Key) without the password or the Master Key, it is impossible to move your funds.</p>
<p>9. Only the legit owners of uTokens can send their uTokens to any 0x address. To do so: (a) the owner comes to the u369.eth smart-contract interface, (b) clicks on "Transfer", (c) inputs the amount to transfer and inputs their password, (d) signs the Tx to send the uTokens out.</p>
<p>10. Any new owner/recipient of the uTokens can also transfer/send out their uToken(s). They just come to the u369.eth smart-contract interface and use the "Transfer" function to send uTokens out of their wallet. To do so the new owner of the uToken(s) when coming to the u369.eth interface will receive a Master Key and must create and confirm a password.</p>
<p>11. Only the legit owner(s) of the uTokens can redeem the protected native tokens. The minter or any new owner of uToken(s) can interact with the "Claim" button/function to claim/redeem the protected native tokens.</p>
<p>12. To redeem or claim the protected native tokens >> the owner of the uTokens sends the amount of uTokens they want to unlock to the smart contract >> the smart contract burns the uTokens and automatically releases the native protected tokens to the correspondent 0x address.</p>
<p>Example: 1ETH locked >> owner of the 1uETH clicks on "Claim" button >> the owner must input the amount to redeem, input their password >> and sign the Tx to send the 1uETH to the contract (sender pays validators/network fee to process the Tx) >> smart-contract burns the 1 uETH and releaes the 1ETH to the designated 0x address.</p>
    
    </div>
  )
}

export default Intro

