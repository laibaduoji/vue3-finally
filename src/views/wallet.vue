<script lang="ts" setup>
import { ref } from "vue";
import { connectWallet, getAddress, disconnect } from "@/utils/web3/wallet.ts";
</script>

<template>
  <div>
    <button @click="connectWallet">链接钱包</button>
    <button>切换网络</button>
    <button @click="disconnect">断开钱包</button>
    <button>获取余额</button>
    <button @click="getAddress">获取钱包信息</button>

    <pre>
      <div>address: {{address}}</div>
      <div>network: {{network}}</div>
      <div>isConnected: {{isConnected}}</div>
    </pre>
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
