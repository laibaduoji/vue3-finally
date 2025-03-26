import { ref } from "vue";
import { TonConnectUI } from "@tonconnect/ui";
import TonWeb from "tonweb";
const tonweb = new TonWeb();

console.log(tonweb);

const { toNano, fromNano, Address } = tonweb.utils;

const tonConnectUI = new TonConnectUI({
  manifestUrl:
    "https://laibaduoji.github.io/vue3-finally/dist/tonconnect-manifest.json",
});

export const connectWalletTon = async () => {
  try {
    await tonConnectUI.connectWallet();
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

export const sendTransactionTon = async (toAddress, amount) => {
  const transaction = {
    validUntil: (Math.floor(Date.now() / 1000) + 2 * 60) * 1000, // 2* 60 sec
    messages: [
      {
        address: toAddress,
        amount: toNano(amount).toString(),
      },
    ],
  };
  try {
    const result = await tonConnectUI.sendTransaction(transaction);
    return result.boc;
  } catch (e) {
    console.error("sendTransactionTon Error");
    console.dir(e);
  }
};

export const getBalanceByTonWeb = async (
  address = walletInfo.value.account.address,
) => {
  const balance = await tonweb.getBalance(address);
  console.log("balance: by tonweb:", fromNano(balance) + "TON");
};

const getJettonWalletAddress = async (
  contractAddress,
  address = walletInfo.value.account.address,
) => {
  const jettonMinter = new TonWeb.token.jetton.JettonMinter(tonweb.provider, {
    address: contractAddress,
  });
  const JettonWalletAddress = await jettonMinter.getJettonWalletAddress(
    new Address(address),
  );
  return JettonWalletAddress.toString();
};

export const getTokenBalanceByTonWeb = async (
  contractAddress,
  decimals,
  address = walletInfo.value.account.address,
) => {
  try {
    const JettonWalletAddress = await getJettonWalletAddress(
      contractAddress,
      address,
    );
    const rawResponse = await tonweb.provider.call2(
      JettonWalletAddress,
      "get_wallet_data",
    );
    const balanceBn = rawResponse[0];
    const balance = balanceBn.toNumber() / Math.pow(10, decimals); // 格式化为 decimals 位小数
    console.log(`USDT 余额: ${balance} USDT`);
  } catch (e) {
    console.log(e);
  }
};

export const getJettonTx = async (
  recipientAddress,
  amount,
  responseAddress = walletInfo.value.account.address,
) => {
  const transferBody = new TonWeb.boc.Cell();
  transferBody.bits.writeUint(0xf8a7ea5, 32); // transfer() 方法的操作码
  transferBody.bits.writeUint(0, 64); // query_id
  transferBody.bits.writeCoins(amount); // 转账金额
  transferBody.bits.writeAddress(new Address(recipientAddress)); // 接收者地址
  transferBody.bits.writeAddress(new Address(responseAddress)); // 这个地址会收到 Jetton Transfer 的回执（通常设置为 sender）。
  transferBody.bits.writeBit(false); // null custom_payload
  transferBody.bits.writeCoins(0); //forwardAmount 是 Jetton 交易转发到 toAddress 的 TON 费用（通常为 0）。
  transferBody.bits.writeBit(false); // false Either for empty payload
  return {
    payload: TonWeb.utils.bytesToBase64(await transferBody.toBoc(false)), // 交易数据
  };
};

export const sendJettonTransaction = async (
  contractAddress,
  recipientAddress,
  amount,
  decimals,
) => {
  const JettonWalletAddress = await getJettonWalletAddress(contractAddress);
  // 构造 Jetton 转账交易
  const _amount = (Number(amount) * Math.pow(10, decimals)).toString();
  const jettonTx = await getJettonTx(recipientAddress, _amount);

  // 发送交易
  try {
    await tonConnectUI.sendTransaction({
      validUntil: (Math.floor(Date.now() / 1000) + 2 * 60) * 1000, // 2* 60 sec
      messages: [
        {
          address: JettonWalletAddress, // 发送者地址;
          amount: toNano("0.01").toString(), // 手续费
          payload: jettonTx.payload,
        },
      ],
    });
    console.log("Jetton 交易已发送");
  } catch (error) {
    console.error("交易失败:", error);
  }
};
export const walletInfo = ref(null);

const unsubscribeTon = tonConnectUI.onStatusChange((status) => {
  walletInfo.value = status;
});
