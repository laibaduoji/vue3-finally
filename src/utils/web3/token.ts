// 获取token 列表; 余额;
import ABI from "../abis/IERC20.json";
import { Contract, ethers, ZeroAddress } from "ethers";
import {
  getWalletProvider,
  getWalletProviderWithSigner,
  getBalance,
} from "./wallet.ts";
import { useWalletStore } from "@/stores/useWalletStore";
import type { Address } from "@reown/appkit-adapter-ethers";
import { ErrorMessage } from "@/utils/common/common.ts";
const Wallet = useWalletStore();

function getTokenContract(_tokenAddress: Address) {
  const ethersProvider = getWalletProvider();
  return new Contract(_tokenAddress, ABI, ethersProvider);
}

async function getTokenContractWithSigner(_tokenAddress: Address) {
  const signer = await getWalletProviderWithSigner();
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

async function _sendTransaction(_toAddress: Address, _amount: bigint) {
  const signer = await getWalletProviderWithSigner();
  try {
    const result = await signer.sendTransaction({
      to: _toAddress,
      value: _amount.toString(),
    });
    console.log("12312312");
    console.log(result);
    return {
      success: true,
      transactionHash: result.hash,
    };
  } catch (e) {
    console.dir(e);
    const Balance = await getBalance();
    if (BigInt(Balance) <= BigInt(_amount)) {
      return {
        success: false,
        transactionHash: "0x",
        shortMessage: ErrorMessage.BalanceNotEnough,
      };
    } else {
      return {
        success: false,
        transactionHash: "0x",
        shortMessage: e.shortMessage || ErrorMessage.unknownError,
      };
    }
  }
}
async function _transfer(
  _tokenAddress: Address,
  _toAddress: Address,
  _amount: BigInt
) {
  const TokenContract = await getTokenContractWithSigner(_tokenAddress);
  try {
    const result = await TokenContract.transfer(_toAddress, _amount);
    return {
      success: true,
      transactionHash: result.hash,
    };
  } catch (e) {
    console.dir(e);
    const TokenBalance = await getBalanceOf(_tokenAddress);
    if (TokenBalance < _amount) {
      return {
        success: false,
        transactionHash: "0x",
        shortMessage: ErrorMessage.BalanceNotEnough,
      };
    } else {
      return {
        success: false,
        transactionHash: "0x",
        shortMessage: e.shortMessage || ErrorMessage.unknownError,
      };
    }
  }
}

export async function tokenTransfer(
  _tokenAddress: Address,
  _toAddress: Address,
  _amount: BigInt
) {
  let result = {};
  if (_tokenAddress === ZeroAddress) {
    result = await _sendTransaction(_toAddress, _amount);
  } else {
    result = await _transfer(_tokenAddress, _toAddress, _amount);
  }
  // return result;

  if (result.success) {
    console.log(result.transactionHash);
    alert(result.transactionHash);
  } else {
    console.log(result.shortMessage);
    alert(result.shortMessage);
  }
}
