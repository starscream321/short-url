<template>
  <div class="container mx-auto w-full">
    <div class="flex flex-row border-2 rounded-t-lg divide-x w-full">
      <div class="flex flex-col divide-y w-1/3">
        <h2 class="p-2">Ссылка</h2>
        <a v-for="one in url.data" :key="one.id" class="p-2 h-full overflow-hidden ">{{one.target}}</a>
      </div>
      <div class="flex flex-col divide-y w-1/3">
        <h2 class="p-2">Короткая ссылка</h2>
        <a v-for="one in url.data" :key="one.id" :href="baseUrl+ one.short" class="p-5">http://79.143.31.216/s/{{one.short}}</a>
      </div>
      <div class="flex flex-col divide-y w-1/3">
        <h2 class="p-2">Переходы</h2>
        <a v-for="one in url.data" :key="one.id" class="p-5">{{one.counter}}</a>
      </div>
    </div>
    <div class="flex flex-row items-center mt-4">
      <button
          :disabled="isDisabled"
          :class="{'bg-indigo-50/90': isDisabled}"
          class="bg-indigo-400 w-20 h-10 m-1 text-white rounded-full font-bold hover:bg-indigo-500/90"
          @click="prevPage"
      >Prev
      </button>
      <h3 class="bg-indigo-500/90 p-2 pl-4 pr-4 rounded-full text-white font-bold">{{url.page}}</h3>
      <button
          class="bg-indigo-400 w-20 h-10 m-1 text-white rounded-full font-bold hover:bg-indigo-500/90"
          @click="nextPage"
      >Next</button>
    </div>
  </div>
</template>

<script>
import {computed, onBeforeMount, reactive, watchEffect} from "vue";
import {req} from "@/api";
export default {
  name: "ShortList",
  setup(){
    const url = reactive({
      data: [],
      page: 1
    })
    onBeforeMount(() => {
      req(url.page).then(res => url.data = [...res.data])
    })

    watchEffect(() => {
      req(url.page).then(res => url.data = [...res.data])
    })

    const isDisabled = computed(() => {
      return url.page === 1
    })

    const nextPage = () => {
      url.page = url.page + 1
      console.log(url.page)
    }

    const prevPage = () => {
      url.page = url.page - 1
    }

    console.log(url.page)



    const baseUrl = 'http://79.143.31.216/s/'

  return {
      url,
    baseUrl,
    nextPage,
    prevPage,
    isDisabled
  }
  }
}
</script>

<style scoped>

</style>
