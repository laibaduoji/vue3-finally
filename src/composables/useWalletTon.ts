// import { useWalletTonStore } from "@/store/index";
import { useWalletTonStore } from "@/stores/useWalletTonStore.ts";
import { watchEffect } from "vue";
export function useWalletTon(callback) {
  const store = useWalletTonStore();

  // 使用 watchEffect 监听 store 中的变化
  watchEffect(() => {
    const { IsConnected, Address, ChainId } = store;
    if (IsConnected) {
      callback({ IsConnected, Address, ChainId });
    }
  });

  return {
    IsConnected: store.IsConnected,
    Address: store.Address,
    ChainId: store.ChainId,
  };
}
