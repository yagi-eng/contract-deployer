require("dotenv").config()
const ALCHEMY_API_URL = String(process.env.ALCHEMY_API_URL)
const SENDER_PUBLIC_KEY = process.env.SENDER_PUBLIC_KEY
const SENDER_PRIVATE_KEY = String(process.env.SENDER_PRIVATE_KEY)
const CONTRACT_ADDRESS = process.env.MY_NFT_CONTRACT_ADDRESS

import { createAlchemyWeb3 } from "@alch/alchemy-web3"
const web3 = createAlchemyWeb3(ALCHEMY_API_URL)

import { AbiItem } from "web3-utils";
import myNFTJSON from "../artifacts/contracts/myNFT.sol/myNFT.json";
const myNFTAbi = (myNFTJSON.abi as any) as AbiItem;
const myNFTContract = new web3.eth.Contract(myNFTAbi, CONTRACT_ADDRESS)

const mintNFT = async () => {

  const account = String(SENDER_PUBLIC_KEY);
  const nonce = await web3.eth.getTransactionCount(account, "latest");

  const tx = {
    from: account,
    to: CONTRACT_ADDRESS,
    nonce: nonce,
    gas: 500000,
    data: myNFTContract.methods.mintNFT(account).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, SENDER_PRIVATE_KEY);
  const signedTx = await signPromise;
  await web3.eth.sendSignedTransaction(
    String(signedTx.rawTransaction),
    function (err, hash) {
      if (!err) {
        console.log(
          "The hash of your transaction is: ",
          hash
        )
      } else {
        console.log(
          "Something went wrong when submitting your transaction:",
          err
        )
      }
    }
  )
}
mintNFT();
