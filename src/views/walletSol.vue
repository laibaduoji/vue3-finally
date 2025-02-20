<script lang="ts" setup>
import { ref } from "vue";
import {
  connectWalletSol,
  disconnectSol,
  switchNetworkSol,
  getBalanceSol,
} from "@/web3/sol/utils/wallet.ts";

import {
  solana,
  solanaTestnet,
  solanaDevnet,
  type AppKitNetwork,
} from "@reown/appkit/networks";

import {
  useAppKitState,
  useAppKitEvents,
  useAppKitAccount,
} from "@reown/appkit/vue";

const state = useAppKitState();
const accountInfo = useAppKitAccount();
const events = useAppKitEvents();

const balance = ref("");
async function getBalance() {
  balance.value = await getBalanceSol();
}
</script>

<template>
  <div>
    <appkit-button />

    <button @click="connectWalletSol">链接钱包</button>
    <button @click="disconnectSol">断开钱包</button>
    <button @click="switchNetworkSol(solana)">切换网络solana</button>
    <button @click="switchNetworkSol(solanaTestnet)">
      切换网络solanaTestnet
    </button>
    <button @click="switchNetworkSol(solanaDevnet)">
      切换网络solanaDevnet
    </button>
    <button @click="getBalance">getBalanceSol</button>
    <button>
      balance:
      {{ balance }}
    </button>

    <div>
      <section>
        <h2>useAppKit</h2>
        <pre>
Address: {{ accountInfo.address }}
caip Address: {{ accountInfo.caipAddress }}
Connected: {{ accountInfo.isConnected }}
Status: {{ accountInfo.status }}
      </pre
        >
      </section>

      <section>
        <h2>State</h2>
        <pre>
open: {{ state.open }}
selectedNetworkId: {{ state.selectedNetworkId }}
      </pre
        >
      </section>
    </div>
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
