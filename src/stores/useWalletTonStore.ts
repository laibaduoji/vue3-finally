import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useWalletTonStore = defineStore("wallet", () => {
  const WalletInfo = ref(null);
  function setWalletInfo(data: any) {
    WalletInfo.value = data;
  }
  const Address = computed(() => {
    return WalletInfo.value?.account?.address;
  });
  const IsConnected = computed(() => {
    return !!WalletInfo.value;
  });

  const ChainId = computed(() => {
    return WalletInfo.value?.account?.chain;
  });
  const Balance = ref(BigInt(0));
  function setBalacne(data: any) {
    Balance.value = data;
  }
  return {
    WalletInfo,
    setWalletInfo,
    Address,
    ChainId,
    IsConnected,
    Balance,
    setBalacne,
  };
});
