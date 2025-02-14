<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
const data = ref({});

axios
  .get(
    "https://deep-index.moralis.io/api/v2.2/wallets/0x5783a1759E3D995845adEf5b6D1F48379ED64C94/tokens",
    {
      headers: {
        accept: "application/json",
        "X-API-Key":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImJhMGEyOTIzLTRlNTUtNDZhNS1hN2U2LTU1NWE2OGU0MjExNyIsIm9yZ0lkIjoiNDMwNTExIiwidXNlcklkIjoiNDQyODQ0IiwidHlwZUlkIjoiZjNlYzlkYjQtNWYxNy00M2Y4LWJjZDItMzZiZGFkM2E2MWJiIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MzkxODMxNTksImV4cCI6NDg5NDk0MzE1OX0.3XrrE2GQe4GqMjQqLHyjVQquh61ot-ZqWqNQMctOvPY",
      },
      params: {
        chain: "0x61",
        "token_addresses[0]": "0x7db9E9bA247fd88f721A35016AF32cFAC86256Dd",
      },
    }
  )
  .then((response) => {
    console.log(response.data);
    data.value = response.data.result;
  })
  .catch((error) => {
    console.error(error);
  });
</script>

<template>
  <div>
    <div>Moralisweb3.vue</div>
    <pre>
      <div>{{ JSON.stringify(data, null, 4) }}</div>
    </pre>
  </div>
</template>
<style></style>
