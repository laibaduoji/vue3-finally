<script lang="ts" setup>
import Child from "./Child.vue";
import { ref } from "vue";
const message = ref("123");
function add() {
  message.value = Math.random();
}
</script>

<template>
  <div>
    <div>slot_view</div>
    <Child>
      <div @click="add">
        {{ message }}
      </div>
    </Child>
  </div>
</template>
<style></style>
