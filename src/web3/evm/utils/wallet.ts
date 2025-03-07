import { createAppKit, useAppKit, useDisconnect } from "@reown/appkit/vue";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { mainnet, bsc, bscTestnet, arbitrum } from "@reown/appkit/networks";
// 42161
import * as aa from "@reown/appkit/networks";
console.log(aa);
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

const Wallets = {
  metamask: "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  trustwallet:
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
  bitgetwallet:
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
  okx: "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
};

// 3. Create a AppKit instance
const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, bsc, bscTestnet, arbitrum],
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
  featuredWalletIds: [],
  includeWalletIds: [],

  enableWalletConnect: false,
  // enableWallets: false,
  // enableAuthLogger: true,
  // enableEIP6963: false,
});

export const connectWallet = () => {
  const { open } = useAppKit();
  open({
    view: "Connect",
  }).finally(() => {
    (() => {
      function queryShadowElement(root, selector) {
        if (!root) return null;

        // 先尝试在当前 root 里查找
        let element = root.querySelector(selector);
        if (element) return element;

        // 递归遍历所有 shadow DOM
        const shadowHosts = root.querySelectorAll("*");
        for (let host of shadowHosts) {
          if (host.shadowRoot) {
            element = queryShadowElement(host.shadowRoot, selector);
            if (element) return element;
          }
        }

        return null;
      }

      function findAndHideInjectedWidget(retries = 5, delay = 10) {
        const injectedWidget = queryShadowElement(
          document,
          "w3m-connect-injected-widget",
        );

        if (injectedWidget) {
          console.log("找到 injected widget:", injectedWidget);
          injectedWidget.style.display = "none";
        } else if (retries > 1) {
          setTimeout(() => {
            findAndHideInjectedWidget(retries - 1, delay);
          }, delay);
        } else {
          console.log("未找到 injected widget，重试次数已用完");
        }
      }

      // 立即执行
      findAndHideInjectedWidget();
    })();
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
