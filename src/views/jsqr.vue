<script lang="ts" setup>
import QRCode from "qrcode";
import { ref } from "vue";
const href = ref("");
const str =
  "https://ramp.alchemypay.org/cashier-desk.html?token=eyJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjoie1wib3JkZXJOb1wiOlwiMTMxNjcwNTYxMzcyNjYxMzUwNFwiLFwiYXBwSWRcIjpcIjJyUXc5NTBUcTc4MmNVMDNcIixcInVzZXJJZFwiOjE4MTI5NzIsXCJjdXJyZW5jeVwiOlwiVVNEXCIsXCJwYXlXYXlDb2RlXCI6XCI1MDFcIn0iLCJpc3MiOiJhbGNoZW15LXBheS1vbi9vZmYtcmFtcCIsImV4cCI6MTczMzk5NzY2MiwiaWF0IjoxNzMzOTk3NDgyfQ.KqappKgMytn1O7-yCqw_ehqLQoD5PSXxjPi5cy9GgDg&payWayCode=501&channelCode=AP10001";

// With promises
QRCode.toDataURL(str, {
  // errorCorrectionLevel: "H",
  // version: 1000,
  // width: 144,
})
  .then((url) => {
    href.value = url;
  })
  .catch((err) => {
    console.error(err);
  });
</script>

<template>
  <div>
    <div id="canvas"></div>
    <img :src="href" alt="" />
  </div>
</template>
<style>
button {
  padding: 10px;
  margin: 10px;
}
img,
canvas {
  width: 144px;
  height: 144px;
  border: 1px solid #ddd;
}
</style>
