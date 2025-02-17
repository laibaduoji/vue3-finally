import { ZeroAddress } from "ethers";
console.log("ethers", ZeroAddress);

export const tokensList = {
  "97": [
    {
      contractAddress: "0xfE84331e3193076C6a369d2B515A4de015A0A580",
      symbol: "A21",
    },
    {
      contractAddress: "0xe3A67406D32b8742D9a1C0A39E6620e76c0F5bA9",
      symbol: "ADA",
    },
    {
      contractAddress: "0x80035c424d02A598D2e8aE44DAa3CAd0E5015bEe",
      symbol: "Airdrop",
    },
    {
      contractAddress: "0x1e12F7FD1675449b5f8d0bEd5d6dbca87ee50718",
      symbol: "BSCToken1",
    },
  ],
  "56": [
    {
      contractAddress: "0x55d398326f99059ff775485246999027b3197955",
      symbol: " BSC-USD",
    },
    {
      contractAddress: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
      symbol: "USDC",
    },
    {
      contractAddress: "0x3b4DEB27A46e746776a661eCf523c42ED0400d54",
      symbol: "YTS",
    },
    {
      contractAddress: "0x3b4DEB27A46e746776a661eCf523c42ED0400d53",
      symbol: "YTS 假地址",
    },
  ],
  "1": [],
};

export const ToAddress = [
  "0x11fD826Bd11cc51f82b8F5a53dbe8787d50d89df",
  "0x38007a479c405E66968E293fc902cFbce971B526",
];

export const ErrorMessage = {
  BalanceNotEnough: "transfer amount exceeds balance",
  unknownError: "unknown error",
};
