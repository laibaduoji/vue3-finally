import { createAppKit, useAppKit, useDisconnect } from "@reown/appkit/vue";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, bsc, bscTestnet } from "@reown/appkit/networks";
import { BrowserProvider, ethers } from "ethers";

// import { useWalletStore } from "@/store/index";
import { useWalletStore } from "@/stores/useWalletStore.ts";

const Wallet = useWalletStore();
// 1. Get projectId from https://cloud.reown.com
const projectId = "a4def443738791ced991a65b128aca9a";

// 2. Create your application's metadata object
const metadata = {
  name: "AEON QR PAY",
  description: "AppKit Example",
  url: "https://qr.cryptogo.com/", // origin must match your domain & subdomain
  icons: ["https://qr.cryptogo.com/favicon1.ico"],
};

// 3. Create a AppKit instance
const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, bsc, bscTestnet],
  defaultNetwork: mainnet,
  metadata,
  projectId,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    email: false,
    socials: false,
    emailShowWallets: false,
    swap: false,
  },
  allWallets: "HIDE",

  includeWalletIds: [
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // bitget
    // "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // metamask
  ],
  excludeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  ],
  enableWalletConnect: false,
});

export const connectWallet = () => {
  const { open } = useAppKit();
  open({
    view: "Connect",
  });
};
export const disconnect = () => {
  const { disconnect } = useDisconnect();
  disconnect();
  // todo 清空钱包信息;
};

console.log({ modal });
/*export function getAddress() {
  const result = modal.getAddress();
  console.log("getAddress", result);
  return result;
}
export function getChainId() {
  const result = modal.getChainId();
  console.log("getChainId", result);
  return result;
}*/
export function getIsConnectedState() {
  const result = modal.getIsConnectedState();
  console.log("getIsConnectedState", result);
  return result;
}

export function getWalletProvider() {
  const _walletProvider = modal.getWalletProvider();
  const ethersProvider = new BrowserProvider(_walletProvider);
  // console.log("getWalletProvider", ethersProvider);
  return ethersProvider;
}

export async function getWalletProviderWithSigner() {
  const ethersProvider = getWalletProvider();
  const signer = await ethersProvider.getSigner();
  return signer;
}

export function switchNetwork(network: any) {
  modal.switchNetwork(network);
}

modal.subscribeAccount((account) => {
  Wallet.setAccountInfo(account);
});
modal.subscribeNetwork((chain) => {
  Wallet.setChainInfo(chain);
});
