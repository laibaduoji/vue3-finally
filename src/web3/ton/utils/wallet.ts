import { TonConnectUI } from "@tonconnect/ui";
import TonWeb from "tonweb";
import { useWalletTonStore } from "@/stores/useWalletTonStore";

const WalletTon = useWalletTonStore();
const tonConnectUI = new TonConnectUI({
	// manifestUrl: "/public/tonconnect-manifest.json",
	manifestUrl: "http://localhost:5173/tonconnect-manifest.json",
});

console.log(tonConnectUI);
// const tonweb = new TonWeb();
// const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {apiKey: 'YOUR_MAINNET_TONCENTER_API_KEY'}));
//

const JsonRpc = [
	"https://toncenter.com/api/v2/jsonRPC",
	"https://testnet.toncenter.com/api/v2/jsonRPC",
];

const tonweb = new TonWeb(new TonWeb.HttpProvider(JsonRpc[0]));

export const connectWalletTon = async () => {
	try {
		await tonConnectUI.openSingleWalletModal("bitgetTonWallet");
		// await tonConnectUI.openSingleWalletModal("tonkeeper");
	} catch (e) {
		console.error("connectWalletTon", e);
	}
};

export const disconnectTon = async () => {
	try {
		await tonConnectUI.disconnect();
	} catch (e) {
		console.error("disconnectTon", e);
	}
};

export const unsubscribeTon = tonConnectUI.onStatusChange((status) => {
	WalletTon.setWalletInfo(status);
});

export const sendTransactionTon = async (address, amount) => {
	const transaction = {
		validUntil: Math.floor(Date.now() / 1000) + 2 * 60, // 2* 60 sec
		messages: [
			{
				address: address,
				amount: amount,
			},
		],
	};
	try {
		const result = await tonConnectUI.sendTransaction(transaction);
		return result.boc;
	} catch (e) {
		console.error("sendTransactionTon Error", e);
	}
};

export const getBalanceTon = async (address) => {
	try {
		const result = await tonweb.getBalance(address);
		console.log({ balance: result });
		return result;
	} catch (e) {
		console.error("getBalanceError", e);
	}
};
