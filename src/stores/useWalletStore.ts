import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useWalletStore = defineStore("walletEVM", () => {
  const AccountInfo = ref({});
  function setAccountInfo(data: any) {
    AccountInfo.value = data;
  }
  const Address = computed(() => {
    return AccountInfo.value.address;
  });
  const IsConnected = computed(() => {
    return AccountInfo.value.isConnected;
  });

  const ChainInfo = ref({});
  function setChainInfo(data: any) {
    ChainInfo.value = data;
  }
  const ChainId = computed(() => {
    return ChainInfo.value.chainId;
  });
  const Balance = ref(BigInt(0));
  function setBalacne(data: any) {
    Balance.value = data;
  }
  return {
    AccountInfo,
    setAccountInfo,
    ChainInfo,
    setChainInfo,
    Address,
    ChainId,
    IsConnected,
    Balance,
    setBalacne,
  };
});
