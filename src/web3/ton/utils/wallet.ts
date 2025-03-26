import { TonConnectUI } from "@tonconnect/ui";
import TonWeb from "tonweb";
import { useWalletTonStore } from "@/stores/useWalletTonStore";
import {
  Address,
  TonClient,
  JettonMaster,
  JettonWallet,
  beginCell,
  TonClient4,
  toNano,
} from "ton";
const WalletTon = useWalletTonStore();
const tonConnectUI = new TonConnectUI({
  // manifestUrl: "/public/tonconnect-manifest.json",
  manifestUrl:
    "https://laibaduoji.github.io/vue3-finally/dist/tonconnect-manifest.json",
});

const client = new TonClient({
  endpoint: "https://toncenter.com/api/v2/jsonRPC",
});
const tonweb = new TonWeb();

export const connectWalletTon = async () => {
  try {
    await tonConnectUI.connectWallet();
    // await tonConnectUI.openSingleWalletModal("bitgetTonWallet");
    // await tonConnectUI.openSingleWalletModal("telegram-wallet");
    // await tonConnectUI.openSingleWalletModal("tonkeeper");
  } catch (e) {
    console.error("connectWalletTon", e);
  }
};

export const disconnectTon = async () => {
  try {
    await tonConnectUI.disconnect();
  } catch (e) {
    console.error("disconnectTon", e);
  }
};

export const unsubscribeTon = tonConnectUI.onStatusChange((status) => {
  WalletTon.setWalletInfo(status);
});

export const sendTransactionTon = async (address, amount) => {
  const transaction = {
    validUntil: (Math.floor(Date.now() / 1000) + 2 * 60) * 1000, // 2* 60 sec
    messages: [
      {
        address: address,
        amount: amount,
      },
    ],
  };
  try {
    const result = await tonConnectUI.sendTransaction(transaction);
    return result.boc;
  } catch (e) {
    console.error("sendTransactionTon Error", e);
  }
};

export const getBalanceTon = async (address) => {
  try {
    const result = await tonweb.getBalance(address);
    console.log({ balance: result });
    return result;
  } catch (e) {
    console.error("getBalanceError", e);
  }
};

// USDT Jetton 合约地址
const USDT_CONTRACT_ADDRESS =
  "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs";
export const sendTransactionUSDT = async (
  recipientAddress,
  amount,
  contractAddress = USDT_CONTRACT_ADDRESS,
) => {
  const senderJettonWallet = await getJettonWallet(
    contractAddress,
    WalletTon.Address,
  );
  const recipientJettonWallet = await getJettonWallet(
    contractAddress,
    recipientAddress,
  );
  console.log("发送方 USDT Wallet:", senderJettonWallet.toString());
  console.log("接收方 USDT Wallet:", recipientJettonWallet.toString());
  console.log(recipientJettonWallet);

  // 转账金额（转换为 nano）
  const amountNano = TonWeb.utils.toNano(amount.toString()); // USDT 6位小数
  console.log({ amountNano: amountNano.toString() });
  const jettonWallet = new TonWeb.token.jetton.JettonWallet(tonweb.provider, {
    address: senderJettonWallet,
  });

  // 构建转账交易
  const transfer = {
    validUntil: (Math.floor(Date.now() / 1000) + 2 * 60) * 1000, // 2* 60 sec
    messages: [
      {
        address: senderJettonWallet.toString(),
        amount: "1000000",
        payload: await jettonWallet.createTransferBody({
          jettonAmount: TonWeb.utils.toNano("500"),
          toAddress: recipientJettonWallet,
          // forwardAmount: TonWeb.utils.toNano("0.01"),
          // forwardPayload: comment,
          responseAddress: senderJettonWallet,
        }),
      },
    ],
  };

  try {
    // 发送交易
    const result = await tonConnectUI.sendTransaction(transfer);
    return result.boc;
  } catch (e) {
    console.error("sendTransactionTon Error", e);
  }
};

// console.log(`%c${"userAddress"}`, "font-size:30px;color:#aa5ff0");
// console.log(new tonweb.Address(userAddress));
// console.log(new tonweb.Address(userAddress1));

const getJettonWallet = async (contractAddress, userAddress) => {
  const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
    address: contractAddress,
  });
  console.log(`%c${"jettonMinter"}`, "font-size:30px;color:#aa5ff0");
  console.log(jettonMinter);
  // 获取用户的 USDT 钱包地址
  const userJettonWalletAddress = await jettonMinter.getJettonWalletAddress(
    new tonweb.Address(userAddress),
  );
  // console.log("用户的 Jetton Wallet 地址:", userJettonWalletAddress.toString());
  return userJettonWalletAddress;
};

async function getJettonWallet1(contractAddress, ownerAddress) {
  console.log(`%c${"99999"}`, "font-size:30px;color:#aa5ff0");
  const jettonMaster = await client.open(
    JettonMaster.create(Address.parse(contractAddress)),
  );
  console.log(`%c${"jettonmaster"}`, "font-size:30px;color:#aa5ff0");
  console.log(jettonMaster);
  const jettonWallet = await jettonMaster.getWalletAddress(
    Address.parse(ownerAddress),
  );
  console.log("Jetton Wallet Address:", jettonWallet.toString());
  return jettonWallet;
}

// 查询 USDT 余额
const getUSDTBalance = async () => {
  try {
    const jettonWalletAddress = await getJettonWallet(
      "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
      WalletTon.Address,
    );
    console.log({ jettonWalletAddress });
    // 直接请求 RPC，看看返回什么
    const rawResponse = await tonweb.provider.call2(
      jettonWalletAddress.toString(),
      "get_wallet_data",
    );
    const balanceNano = rawResponse[0].toString(); // 余额单位是 nano

    const balance = (Number(balanceNano) / 10 ** 6).toFixed(6); // 格式化为 6 位小数

    console.log(`USDT 余额: ${balance} USDT`);
  } catch (error) {
    console.error("获取 USDT 余额失败:", error);
  }
};

async function getJettonBalance(ownerAddress) {
  const walletAddress = await getJettonWallet1(
    "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
    WalletTon.Address,
  );
  const jettonWallet = client.open(JettonWallet.create(walletAddress));
  console.log(`%c${"jettonWallet"}`, "font-size:30px;color:#aa5ff0");
  console.log(jettonWallet);
  const balance = await jettonWallet.getBalance();
  console.log("Jetton Balance:", balance.toString());
  return balance;
}

async function sendJetton(walletAddress, recipient, amount) {
  const jettonWalletAddress = await getJettonWallet1(
    "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs",
    WalletTon.Address,
  );
  // 计算发送金额（Jetton 精度 9，即 1 USDT = 10^9）
  const amountNano = BigInt(1) * 10n ** 6n;
  console.log(
    Address.parse("UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4"),
  );
  console.log(jettonWalletAddress);
  console.log("ooaooo");

  // 构造 Jetton 转账 payload
  /*  const payload = beginCell()
    .storeUint(0xf8a7ea5, 32) // op (transfer)
    .storeUint(0, 64) // query_id
    .storeCoins(amountNano) // 发送金额
    .storeAddress(Address.parse("UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4")) // 接收者
    .storeAddress(null) // response_address (可选)
    .storeUint(0, 1) // forward_payload
    .endCell();*/

  const payload = beginCell()
    .storeUint(0xf8a7ea5, 32)
    .storeUint(0, 64)
    .storeCoins(amountNano) // amount
    .storeAddress(
      Address.parse("UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4"),
    ) // to address
    .storeAddress(
      Address.parse("UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4"),
    ) // response address
    .storeMaybeRef(null)
    .storeCoins(amountNano)
    .storeMaybeRef(null)
    .endCell();

  console.log(`%c${"jieshouzhe"}`, "font-size:30px;color:#aa5ff0");
  console.log(
    Address.parse(
      "UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4",
    ).toString(),
  );

  return {
    to: jettonWalletAddress,
    value: "0.05", // 交易燃料费（必须）
    payload: payload.toBoc().toString("base64"), // 转成 Base64 格式
  };
}

async function sendJettonTransaction(walletAddress, recipient, amount) {
  const transfer = await sendJetton();

  const tx = {
    validUntil: (Math.floor(Date.now() / 1000) + 2 * 60) * 1000, // 2* 60 sec
    messages: [
      {
        address: transfer.to.toString(),
        amount: transfer.value,
        payload: transfer.payload,
      },
    ],
  };

  try {
    const result = await tonConnectUI.sendTransaction(tx);
    console.log("Transaction sent:", result);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}

const eventTokenTransfer = async (
  toAddress,
  contractAddress,
  amount,
  decimals,
) => {
  console.table({
    接收地址: toAddress,
    合约地址: contractAddress,
    转账金额: amount,
    精度: decimals,
  });
  const TON_CLIENT = new TonClient4({
    endpoint: "https://mainnet-v4.tonhubapi.com",
    timeout: 30000,
  });
  const jettonMasterAddress = Address.parse(contractAddress); // tpx 合约的代币地址
  const destinationAddress = Address.parse(toAddress); // 接收地址
  const userAddress = Address.parse(WalletTon.Address);
  const jettonMaster = TON_CLIENT.open(
    JettonMaster.create(jettonMasterAddress),
  );
  const jettonWallet = await jettonMaster.getWalletAddress(userAddress);

  const amountInNano = BigInt(parseFloat(amount) * Math.pow(10, decimals));

  const body = beginCell()
    .storeUint(0xf8a7ea5, 32)
    .storeUint(0, 64)
    .storeCoins(toNano("0.00123")) // amount
    .storeAddress(destinationAddress) // to address
    .storeAddress(destinationAddress) // response address
    .storeMaybeRef(null)
    .storeCoins(toNano("0.000001"))
    .storeMaybeRef(null)
    .endCell();

  const myTransaction = {
    validUntil: Math.floor(Date.now() / 1000) + 360,
    messages: [
      {
        address: jettonWallet.toString(), // sender jetton wallet
        amount: toNano("0.2").toString(), // for gas fees, excess will be returned
        payload: body.toBoc().toString("base64"), // payload with jetton transfer and comment body
      },
    ],
  };

  await tonConnectUI.sendTransaction(myTransaction);
};

setTimeout(async () => {
  // eventTokenTransfer("UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4", USDT_CONTRACT_ADDRESS, "0.02", 6);
}, 1000);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
