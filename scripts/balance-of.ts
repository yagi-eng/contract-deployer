import "dotenv/config";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";
import myNFTJSON from "../artifacts/contracts/myNFT.sol/myNFT.json";

const ALCHEMY_API_URL = String(process.env.ALCHEMY_API_URL);
const CONTRACT_ADDRESS = process.env.MY_NFT_CONTRACT_ADDRESS;
const SENDER_PUBLIC_KEY = process.env.SENDER_PUBLIC_KEY;

const web3 = createAlchemyWeb3(ALCHEMY_API_URL)

const myNFTAbi = (myNFTJSON.abi as any) as AbiItem;
const myNFTContract = new web3.eth.Contract(myNFTAbi, CONTRACT_ADDRESS)

const balanceOf = async (
  ownerAddress: string
) => {
  try {
    const res = await myNFTContract.methods.balanceOf(ownerAddress).call();
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

balanceOf(String(SENDER_PUBLIC_KEY));
