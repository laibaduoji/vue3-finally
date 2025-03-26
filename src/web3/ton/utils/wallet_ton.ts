import { TonConnectUI } from "@tonconnect/ui";
import { ref } from "vue";
import TonWeb from "tonweb";
const tonweb = new TonWeb();

import {
  Address,
  toNano,
  fromNano,
  TonClient4,
  JettonMaster,
  JettonWallet,
} from "ton";

console.log(tonweb);

const isConnectedTon = ref(false);
const walletInfo = ref({});

const RecipientAddress = "UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4";

console.table({
  tonweb_address_Non_bounceable: new tonweb.Address(
    RecipientAddress,
  ).toString(),
  ton_address_Bounceable: Address.parse(RecipientAddress).toString(),
});

const client = new TonClient4({
  endpoint: "https://mainnet-v4.tonhubapi.com",
  timeout: 30000,
});
console.log(client);
const getBalanceByTon = async (address) => {
  const lastBlock = await client.getLastBlock();
  const seqno = lastBlock.last.seqno; // 最新区块的 s
  const accountInfo = await client.getAccount(seqno, Address.parse(address));
  console.log(accountInfo);
  console.log(
    "balance: by ton:",
    fromNano(accountInfo.account.balance.coins) + "TON",
  );
};
const USDT_CONTRACT_ADDRESS =
  "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs";

const getTokenBalanceByTon = async (
  contractAddress = USDT_CONTRACT_ADDRESS,
  address = walletInfo.value.account.address,
) => {
  const JettonMinter = await client.open(
    JettonMaster.create(Address.parse(contractAddress)),
  );
  const JettonWalletAddress = await JettonMinter.getWalletAddress(
    Address.parse(address),
  );
  const jettonWallet = client.open(JettonWallet.create(JettonWalletAddress));
  const balance = await jettonWallet.getBalance();
  console.log(
    "Jetton Balance:",
    (Number(balance) / 10 ** 6).toFixed(6) + "USDT",
  );
};

setTimeout(() => {
  // sendJettonTransaction(RecipientAddress, 0.02134 * Math.pow(10, 6));
}, 1500);

// 示例：调用转账方法

//
/*

能够快速响应需求并高效进行快速迭代开发。工作中踏实肯干，注重细节，能够在保证质量的同时确保项目进度。

技术能力全面, 工作中踏实能干;能够快速迭代开发;



 */
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
