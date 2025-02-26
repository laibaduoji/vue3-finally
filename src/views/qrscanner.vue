<script lang="ts" setup>
import QrScanner from "qr-scanner";
import { onMounted } from "vue";

onMounted(() => {
  const qrScanner = new QrScanner(
    document.querySelector("#videoElem"),
    (result) => {
      console.log("decoded qr code:", result);
      qrScanner.stop();
    },
    {
      /* your options or returnDetailedScanResult: true if you're not specifying any other options */
    },
  );
  console.log(qrScanner);
  qrScanner.start();
});
</script>

<template>
  <div>
    <video id="videoElem"></video>
  </div>
</template>
<style>
video {
  width: 300px;
  height: 300px;
}
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
