// 获取token 列表; 余额;
import ABI from "../abis/IERC20.json";
import { Contract, ethers } from "ethers";
import { getWalletProvider } from "./wallet.ts";
import { useWalletStore } from "@/stores/useWalletStore";
import type { Address } from "@reown/appkit-adapter-ethers";
const Wallet = useWalletStore();

function getTokenContract(_tokenAddress: Address) {
  const ethersProvider = getWalletProvider();
  return new Contract(_tokenAddress, ABI, ethersProvider);
}

async function getTokenContractWithSigner(_tokenAddress: Address) {
  const ethersProvider = getWalletProvider();
  const signer = await ethersProvider.getSigner();
  return new Contract(_tokenAddress, ABI, signer);
}

/**
 * 查询单个token的余额
 * @param _tokenAddress string 合约地址;
 * @param _UserAddress  string 用户地址
 * @returns BigNumber
 */
export async function getBalanceOf(
  _tokenAddress: Address,
  _UserAddress = Wallet.Address
) {
  const TokenContract = getTokenContract(_tokenAddress);
  try {
    const result = await TokenContract.balanceOf(_UserAddress);
    console.log("getBalanceOf", result, ethers.formatEther(result));
    return result;
  } catch (e) {
    console.error("getBalanceOf Error", e);
    return BigInt(0);
  }
}
/**
 * 查询多个token的余额
 * @param _tokensAddress [_tokenAddress] ; Array<string> 合约地址数组;
 * @param _UserAddress  string 用户地址
 * @returns Array<{tokenAddress:string,balance:BigNumber}>
 */

export async function getBalancesOf(
  _tokensAddress: Address[],
  _UserAddress = Wallet.Address
) {
  const balancePromises = _tokensAddress.map(async (tokenAddress) => {
    const TokenContract = getTokenContract(tokenAddress);
    try {
      const result = await TokenContract.balanceOf(_UserAddress);
      console.log("getBalanceOf", result, ethers.formatEther(result));
      return {
        tokenAddress: tokenAddress,
        balance: result,
      };
    } catch (e) {
      console.error("getBalanceOf Error", e);
      return {
        tokenAddress: tokenAddress,
        balance: BigInt(0),
      };
    }
  });

  const balances = await Promise.all(balancePromises);
  console.log(JSON.stringify(balances, null, 4));
  return balances;
}

export async function tokenTransfer(
  _tokenAddress: Address,
  _toAddress: Address,
  _amount: BigInt
) {
  const TokenContract = await getTokenContractWithSigner(_tokenAddress);
  try {
    const result = await TokenContract.transfer(_toAddress, _amount);
    console.log("tokenTransfer", result);
    return result;
  } catch (e) {
    console.error("tokenTransfer Error", e);
    // console.dir(e);
    alert(e.shortMessage);
    return false;
  }
}

export const tokensList = {
  "97": [
    {
      contractAddress: "0xfE84331e3193076C6a369d2B515A4de015A0A580",
      symbol: "A21",
    },
    {
      contractAddress: "0xe3A67406D32b8742D9a1C0A39E6620e76c0F5bA9",
      symbol: "ADA",
    },
    {
      contractAddress: "0x80035c424d02A598D2e8aE44DAa3CAd0E5015bEe",
      symbol: "Airdrop",
    },
    {
      contractAddress: "0x1e12F7FD1675449b5f8d0bEd5d6dbca87ee50718",
      symbol: "BSCToken1",
    },
  ],
  "56": [
    {
      contractAddress: "0x55d398326f99059ff775485246999027b3197955",
      symbol: " BSC-USD",
    },
    {
      contractAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      symbol: "USDC",
    },
    {
      contractAddress: "0x3b4DEB27A46e746776a661eCf523c42ED0400d54",
      symbol: "YTS",
    },
    {
      contractAddress: "0x3b4DEB27A46e746776a661eCf523c42ED0400d53",
      symbol: "YTS 假地址",
    },
  ],
  "1": [],
};

export const ToAddress = [
  "0x11fD826Bd11cc51f82b8F5a53dbe8787d50d89df",
  "0x38007a479c405E66968E293fc902cFbce971B526",
];
