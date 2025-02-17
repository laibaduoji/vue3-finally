import { ref, computed, watchEffect } from "vue";
import { defineStore } from "pinia";
import { getBalance } from "@/utils/web3/wallet";

export const useWalletStore = defineStore("wallet", () => {
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

  watchEffect(async () => {
    const isConnected = IsConnected.value;
    const address = Address.value;
    const _chainId = ChainId.value;
    if (isConnected) {
      const balance = await getBalance(address);
      Balance.value = balance;
    } else {
      Balance.value = BigInt(0);
    }
  });

  return {
    AccountInfo,
    setAccountInfo,
    ChainInfo,
    setChainInfo,
    Address,
    ChainId,
    IsConnected,
    Balance,
  };
});

/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWalletStore, import.meta.hot));
} */
