<script lang="ts" setup>
import {
  connectWalletTon,
  disconnectTon,
  getBalanceTon,
  sendTransactionTon,
  sendTransactionUSDT,
} from "@/web3/ton/utils/wallet.ts";
import { useWalletTonStore } from "@/stores/useWalletTonStore";

import { useWalletTon } from "@/composables/useWalletTon";

const WalletTon = useWalletTonStore();

/*useWalletTon(async ({ IsConnected, Address, ChainId }) => {
  console.log(`%c${"useWalleTon"}`, "font-size:30px;color:#aa5ff0");
  console.log(Address);
  console.log(ChainId);
  if (IsConnected) {
    const result = await getBalanceTon(Address);
    WalletTon.setBalacne(result);
  } else {
    // 处理断开链接的逻辑
  }
});*/
// console.log(WalletTon);
async function sendTransactionTonFun() {
  const boc = await sendTransactionTon(
    "0:df51b59bdcb59428f4e324862364fc331149af6c9a7c0c5852c12a25521d98d0",
    "1000000",
  );
  console.log(boc);
}
async function sendTransactionUSDTFun() {
  const boc = await sendTransactionUSDT(
    "0:df51b59bdcb59428f4e324862364fc331149af6c9a7c0c5852c12a25521d98d0",
    "0.0003",
  );
  console.log(boc);
}
</script>

<template>
  <div>
    <button
      v-if="!WalletTon.IsConnected"
      @click="connectWalletTon"
      id="ton-connect"
    >
      链接Ton Connect
    </button>
    <template v-else>
      <button @click="disconnectTon" id="ton-connect">断开链接</button>
    </template>

    <button @click="sendTransactionTonFun">Transfer</button>
    <button @click="sendTransactionUSDTFun">Transfer USDT</button>
    <div></div>
    <button>{{ WalletTon.Address }}</button>
    <div></div>
    <button>{{ WalletTon.ChainId }}</button>
    <div></div>
    <button>{{ WalletTon.IsConnected }}</button>
    <button>{{ WalletTon.Balance }}</button>
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
