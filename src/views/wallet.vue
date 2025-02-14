<script lang="ts" setup>
import { ref } from "vue";
import { createAppKit, useAppKit, useAppKitProvider } from "@reown/appkit/vue";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { BrowserProvider, Contract, formatUnits } from "ethers";

// 1. Get projectId from https://cloud.reown.com
const projectId = "a4def443738791ced991a65b128aca9a";

// 2. Create your application's metadata object
const metadata = {
  name: "AEON_QR_PAY",
  description: "AppKit Example",
  url: "https://reown.com/appkit", // origin must match your domain & subdomain
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// 3. Create a AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, arbitrum],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

// 4. Use modal composable
const modal = useAppKit();
console.log(modal);
</script>

<template>
  <div>
    <appkit-button />
    <appkit-connect-button />
    <appkit-network-button />
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
