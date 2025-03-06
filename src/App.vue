<script lang="ts" setup></script>

<template>
  <div>
    <div>
      <button @click="$router.push('/wallet')">wallet</button>

      <!--  <button @click="$router.push('/walletTon')">walletTon</button>

      <button @click="$router.push('/walletSol')">walletSol</button> -->
    </div>
    <router-view />
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
