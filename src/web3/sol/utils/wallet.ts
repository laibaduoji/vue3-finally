import {
  useDisconnect,
  useAppKit,
  createAppKit,
  useAppKitProvider,
} from "@reown/appkit/vue";
import {
  solana,
  solanaTestnet,
  solanaDevnet,
  type AppKitNetwork,
} from "@reown/appkit/networks";
import { SolanaAdapter } from "@reown/appkit-adapter-solana";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/vue";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BitgetWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  solana,
  solanaTestnet,
  solanaDevnet,
];

const solanaWeb3JsAdapter = new SolanaAdapter({
  wallets: [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new BitgetWalletAdapter(),
  ],
});

const projectId = "a4def443738791ced991a65b128aca9a";

// 2. Create your application's metadata object
const metadata = {
  name: "AEON QR PAY",
  description: "AppKit Example",
  url: "https://qr.cryptogo.com/", // origin must match your domain & subdomain
  icons: ["https://qr.cryptogo.com/favicon1.ico"],
};

// Initialize AppKit
const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks,
  projectId,
  features: {
    analytics: false, // Optional - defaults to your Cloud configuration
    email: false,
    socials: false,
    emailShowWallets: false,
    swap: false,
  },
  metadata,
  includeWalletIds: [
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // bitget
    // "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // metamask
  ],
  excludeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  ],
  enableWalletConnect: false,
});
export const connectWalletSol = () => {
  const { open } = useAppKit();
  open({
    view: "Connect",
  });
};

export const disconnectSol = () => {
  const { disconnect } = useDisconnect();
  disconnect();
  // todo 清空钱包信息;
};

console.log({ modal });

export function switchNetworkSol(network: any) {
  modal.switchNetwork(network);
}

export const getBalanceSol = async () => {
  console.log(123);
  const { walletProvider } = useAppKitProvider("solana");
  const { connection } = useAppKitConnection();
  const balance = await connection.getBalance(walletProvider.publicKey);

  console.log({ balance });
  return balance;
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
