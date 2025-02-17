<script lang="ts" setup>
import { ref } from "vue";
import {
  connectWallet,
  disconnect,
  getIsConnectedState,
  switchNetwork,
  getWalletProvider,
  getBalance,
} from "@/utils/web3/wallet.ts";
import { useWalletStore } from "@/stores/useWalletStore";
import { mainnet, bsc, bscTestnet } from "@reown/appkit/networks";

const Wallet = useWalletStore();
console.log(Wallet);
</script>

<template>
  <div>
    <button @click="connectWallet" v-if="!Wallet.IsConnected">链接钱包</button>
    <template v-else>
      <button @click="disconnect">断开钱包</button>
      <button @click="switchNetwork(mainnet)">切换网络mainnet</button>
      <button @click="switchNetwork(bsc)">切换网络bsc</button>
      <button @click="switchNetwork(bscTestnet)">切换网络bscTestnet</button>
      <button @click="getBalance(Wallet.Address)">获取余额</button>
      <button @click="getWalletProvider">getWalletProvider</button>
      <button @click="getIsConnectedState">获取链接状态</button>

      <div>address: {{ Wallet.Address }}</div>
      <div>isConnected: {{ Wallet.IsConnected }}</div>
      <div>chainId: {{ Wallet.ChainId }}</div>
      <div>Balance: {{ Wallet.Balance }}</div>
    </template>
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
