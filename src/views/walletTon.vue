<script lang="ts" setup>
import {
  connectWalletTon,
  disconnectTon,
  getBalanceTon,
  sendTransactionTon,
} from "@/web3/ton/utils/wallet.ts";
import { useWalletTonStore } from "@/stores/useWalletTonStore";

import { useWalletTon } from "@/composables/useWalletTon";

const WalletTon = useWalletTonStore();

useWalletTon(async ({ IsConnected, Address, ChainId }) => {
  console.log(`%c${"useWalleTon"}`, "font-size:30px;color:#aa5ff0");
  console.log(Address);
  console.log(ChainId);
  if (IsConnected) {
    const result = await getBalanceTon(Address);
    WalletTon.setBalacne(result);
  } else {
    // 处理断开链接的逻辑
  }
});
// console.log(WalletTon);
async function sendTransactionTonFun() {
  const boc = await sendTransactionTon(
    "UQDv7LgRfmy6n78vbjvyjJmeBC1Nd0HZEaTKgUQ_-kViWuKT",
    "1000000"
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
