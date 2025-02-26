<script lang="ts" setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from "vue-qrcode-reader";
</script>

<template>
  <div>
    <qrcode-stream></qrcode-stream>
    <!-- <qrcode-drop-zone></qrcode-drop-zone> -->
    <!-- <qrcode-capture></qrcode-capture> -->
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
