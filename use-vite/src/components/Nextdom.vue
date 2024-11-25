<template>
  <div
    style="width: 200px; height: 200px; overflow: auto; border: 1px solid #ccc"
    ref="box"
  >
    <template v-for="item of list">
      <div style="height: 30px; background-color: gray; margin: 5px">
        {{ item }}
      </div>
    </template>
  </div>
  <input type="text" v-model="ipt" />
  <button @click="handleAdd">add</button>
</template>
<script setup>
import { ref,nextTick } from "vue";
const box = ref(null);
const list = ref([]);
const ipt = ref("");

const handleAdd = () => {
  list.value.push(ipt.value);
  nextTick(() => box.value.scrollTop = 999999);
};
</script>
<style scoped></style>
