<script lang="ts" setup>
const tronLink = window.bitkeep?.tronLink || window.tronLink;
const tronWeb = window.bitkeep?.tronWeb || window.tronWeb;
console.clear();

console.log(tronWeb);

const connectWalletTron = async () => {
  try {
    const { code, message } = await tronLink.request({
      method: "tron_requestAccounts",
    });
    console.log({ code });
    console.log({ message });
  } catch (error) {
    console.error(error);
  }
};
// enact smile flag mosquito piano guitar draw gauge decrease wealth defense property

const getBalanceTron = async (address = tronWeb.defaultAddress.base58) => {
  try {
    const balance = await tronWeb.trx.getBalance(address);
    console.log({ balance: tronWeb.fromSun(balance) });
    return balance;
  } catch (error) {
    console.error("getBalanceTron", error);
    return 0;
  }
};
const isConnectedTron = () => {
  return tronLink.isConnected();
};
// console.log({ isConnectedTron: isConnectedTron() });

const _sendTransaction = async (_toAddress, _amount) => {
  try {
    var tx = await tronWeb.transactionBuilder.sendTrx(
      _toAddress,
      tronWeb.toHex(_amount * Math.pow(10, 6)),
      tronWeb.defaultAddress.base58,
    );
    var signedTx = await tronWeb.trx.sign(tx);
    var broastTx = await tronWeb.trx.sendRawTransaction(signedTx);
    console.log(broastTx.txid);
    return broastTx.txid;
  } catch (error) {
    console.error("_sendTransaction", error);
  }
};

const _transfer = async (_tokenAddress, _toAddress, _amount) => {
  try {
    //Token
    let decimal = 18;
    let Contract = await tronWeb.contract().at(_tokenAddress); //WIN
    const decimalCall = Contract.decimals || Contract.DECIMALS;
    if (decimalCall) {
      decimal = await decimalCall().call();
      console.log({ decimal });
    }
    let broastTx = await Contract.transfer(
      _toAddress,
      tronWeb.toHex(_amount * Math.pow(10, decimal)),
    ).send(); // { feeLimit: 10000000 }

    return broastTx;
  } catch (error) {
    console.error("_transfer", error);
  }
};

const tokenTransferTron = async (_toAddress, _amount, _tokenAddress) => {
  let result;
  if (!_tokenAddress) {
    // 原生代币 TRX
    result = await _sendTransaction(_toAddress, _amount);
  } else {
    // Trc20 代币
    result = await _transfer(_tokenAddress, _toAddress, _amount);
  }
  return result;
};

//
window.addEventListener("message", function (e) {
  // 账户变更消息
  if (e.data.message && e.data.message.action === "accountsChanged") {
    // handler logic
    console.log("got accountsChanged event", e.data);
  }
  // 网络变更消息
  if (e.data.message && e.data.message.action == "setNode") {
    // handler logic
    console.log("got setNode event", e.data);
  }

  // 链接成功
  if (e.data.message && e.data.message.action == "connect") {
    // handler logic
    console.log("got connect event", e.data);
  }
});
</script>

<template>
  <div>
    <div>TronWeb</div>
    <button @click="connectWalletTron">connectWalletTron</button>
    <button @click="getBalanceTron()">getBalanceTron</button>
    <button
      @click="tokenTransferTron('TUuai82bQXjPmhZ1iFbKNReo4nAgfwLEbK', '6')"
    >
      sendTransaction
    </button>
    <button
      @click="
        tokenTransferTron(
          'TUuai82bQXjPmhZ1iFbKNReo4nAgfwLEbK',
          '7',
          'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf',
        )
      "
    >
      tokenTransfer
    </button>
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
</style>
