<template>
  <div class="about">
    <button v-if="!walletInfo" @click="connectWalletTon">
      connectWalletTon
    </button>
    <template v-else>
      <button @click="disconnectTon">disconnectTon</button> <br />
      <div>钱包地址: {{ walletInfo.account.address }}</div>
      <div>接收地址: {{ RecipientAddress }}</div>
      <button @click="sendTransactionTon(RecipientAddress, '0.0012')">
        sendTransactionTon</button
      ><br />
      <button @click="getBalanceByTonWeb()">getBalanceByTonWeb()</button><br />
      <button @click="getBalanceByTonWeb(RecipientAddress)">
        getBalanceByTonWeb(RecipientAddress )</button
      ><br />
      <button @click="getTokenBalanceByTonWeb(USDT_CONTRACT_ADDRESS, 6)">
        getTokenBalanceByTonWeb</button
      ><br />

      <button
        @click="
          sendJettonTransaction(
            USDT_CONTRACT_ADDRESS,
            RecipientAddress,
            '1.48',
            6,
          )
        "
      >
        sendJettonTransaction</button
      ><br />
      <!-- <button @click="getBalanceByTon(walletInfo.account.address)">getBalanceByTon({{ walletInfo.account.address }})</button>
      <button @click="getTokenBalanceByTon()">getTokenBalanceByTon</button><br /> -->
    </template>
  </div>
</template>
<script lang="ts" setup>
import {
  walletInfo,
  connectWalletTon,
  disconnectTon,
  sendTransactionTon,
  getBalanceByTonWeb,
  getTokenBalanceByTonWeb,
  sendJettonTransaction,
} from "@/web3/ton/utils/wallet_tonweb.ts";

const RecipientAddress = "UQDfUbWb3LWUKPTjJIYjZPwzEUmvbJp8DFhSwSolUh2Y0Iq4";
const USDT_CONTRACT_ADDRESS =
  "EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs";
</script>

<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
<script lang="ts"></script>
