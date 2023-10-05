<template>
  <div></div>
</template>

<script>
import { inject } from "@vercel/analytics";

export default {
  created() {
    inject();
  },
};
</script>

<style lang="scss" scoped></style>
