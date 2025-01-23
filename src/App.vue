<script setup lang="ts">
import { createAppKit, useAppKit } from "@reown/appkit/vue";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { mainnet, arbitrum, wemix } from "@reown/appkit/networks";
import { useDisconnect } from "@reown/appkit/vue";
import { ethers } from "ethers";

const { disconnect } = useDisconnect();

// 1. Get projectId at https://cloud.reown.com
const projectId = "47f705dda8295fb99bd80b8a1fb93647";

function getBlockchainApiRpcUrl(chainId) {
  return `https://rpc.walletconnect.org/v1/?chainId=eip155:${chainId}&projectId=${projectId}`;
}

// 2. Create your application's metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // url must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create a AppKit instance
const modal = createAppKit({
  adapters: [new Ethers5Adapter()],
  networks: [mainnet, arbitrum, wemix],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

// 4. Use modal composable
// const modal = useAppKit();

const switchNetwork = (arg) => {
  const networks = [mainnet, wemix];
  modal.switchNetwork(networks[arg]);
};

const disConnect = async () => {
  await disconnect();
};
const sendTransaction = async () => {
  const walletProvider = modal.getWalletProvider();
  const chainId = modal.getChainId();
  console.log({ chainId });
  console.log(walletProvider);

  walletProvider.enable().then((res) => {
    const provider = new ethers.providers.Web3Provider(walletProvider, chainId);
    console.log(res[0]);
    const signer = provider.getSigner(res[0]);
    console.log(signer);
    signer.sendTransaction({
      to: "0xd0ff1B2BB47650083205e0b60A7c5548bf59A04A",
      value: "1",
    });
  });
};
</script>

<template>
  <div>
    <appkit-button />
    <button @click="switchNetwork(0)">切换到主网</button>
    <button @click="switchNetwork(1)">切换到WEMIX</button>
    <button @click="disConnect">断开链接</button>
    <button @click="sendTransaction">发起交易</button>
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
