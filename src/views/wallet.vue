<script lang="ts" setup>
import { ref } from "vue";
import {
  connectWallet,
  disconnect,
  switchNetwork,
} from "@/web3/evm/utils/wallet.ts";
import {
  getBalance,
  getBalanceOf,
  getBalancesOf,
  tokenTransfer,
} from "@/web3/evm/utils/token.ts";

import { tokensList, ToAddress } from "@/web3/evm/common/web3Config.ts";

// import { useWalletStore } from "@/store/index";
import { useWalletStore } from "@/stores/useWalletStore";
import { mainnet, bsc, bscTestnet } from "@reown/appkit/networks";

import { useWallet } from "@/composables/useWallet";
const Wallet = useWalletStore();
console.log(Wallet);

useWallet(async ({ IsConnected, Address, ChainId }) => {
  console.log(`%c${"useWallet"}`, "font-size:30px;color:#aa5ff0");
  // console.log(IsConnected);
  // console.log(Address);
  // console.log(ChainId);
  if (IsConnected) {
    const balance = await getBalance();
    Wallet.setBalacne(balance);
    getBalancesOfFun();
  } else {
    // 处理断开链接的逻辑
  }
});

const tokensBalances = ref([]);
async function getBalancesOfFun() {
  const tokensAddress = tokensList[Wallet.ChainId].map((_item) => {
    return _item.contractAddress;
  });
  console.log({ tokensAddress });
  tokensBalances.value = await getBalancesOf(tokensAddress);
}
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
      <button
        @click="getBalanceOf(tokensList[Wallet.ChainId][0].contractAddress)"
      >
        getBalanceOf
      </button>
      <button @click="getBalancesOfFun">getBalancesOf</button>

      <button
        @click="
          tokenTransfer(
            tokensList[Wallet.ChainId][0].contractAddress,
            ToAddress[0],
            1000000000000000000n,
          )
        "
      >
        tokenTransfer
      </button>

      <button
        @click="
          tokenTransfer(
            tokensList[Wallet.ChainId][0].contractAddress,
            ToAddress[0],
            100000000000000000000000000000000n,
          )
        "
      >
        tokenTransfer(more than balance)
      </button>

      <button
        @click="
          tokenTransfer(
            '0x0000000000000000000000000000000000000000',
            ToAddress[0],
            100000000n,
          )
        "
      >
        tokenTransfer平台币
      </button>
      <button
        @click="
          tokenTransfer(
            '0x0000000000000000000000000000000000000000',
            ToAddress[0],
            100000000000000000000000000n,
          )
        "
      >
        tokenTransfer平台币(more than balance)
      </button>

      <div>address: {{ Wallet.Address }}</div>
      <div>isConnected: {{ Wallet.IsConnected }}</div>
      <div>chainId: {{ Wallet.ChainId }}</div>
      <div>Balance: {{ Wallet.Balance }}</div>
      <div>
        <pre>
          {{ JSON.stringify(tokensBalances, null, 4) }}
        </pre>
      </div>
    </template>
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
