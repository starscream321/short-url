<template>
<div class="flex justify-center">
  <input v-model="state.inputUrl" class="border-2 border-black rounded-full m-1 pl-4 h-fit" type="url">
  <button @click="addUrl" class="bg-indigo-400 w-20 h-7 m-1 text-white rounded-full hover:bg-indigo-500/90 items-center justify-center flex justify-end">OK</button>
</div>
</template>

<script>
import {reactive} from "vue";
import {makeShortUrl} from "@/api";

export default {
  name: "CreateUrl",
  setup(){
    const state = reactive({
      inputUrl: ''
    })

    const addUrl = async () => {
     await makeShortUrl(state.inputUrl)
    }

    return {
      state,
      addUrl
    }
  }
}
</script>

<style scoped>

</style>