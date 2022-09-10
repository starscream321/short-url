<template>
  <div class="container mx-auto w-full">
    <div class="flex flex-row border-2 rounded-t-lg divide-x w-full">
      <template v-if="!url.isLoading">
        <div class="flex flex-col divide-y w-1/3">
          <h2 class="p-2">Ссылка</h2>
          <a v-for="one in url.data" :key="one.id" class="p-2 h-full overflow-hidden ">{{ one.target }}</a>
        </div>
        <div class="flex flex-col divide-y w-1/3">
          <h2 class="p-2">Короткая ссылка</h2>
          <a v-for="one in url.data" :key="one.id" :href="baseUrl+ one.short"
             class="p-5">http://79.143.31.216/s/{{ one.short }}</a>
        </div>
        <div class="flex flex-col divide-y w-1/3">
          <h2 class="p-2">Переходы</h2>
          <a v-for="one in url.data" :key="one.id" class="p-5">{{ one.counter }}</a>
        </div>
      </template>
      <div v-else class="loader box-border">Loading...</div>
    </div>
    <div class="flex flex-row items-center mt-4">
      <button
          :disabled="isDisabled"
          :class="{'bg-indigo-50/90': isDisabled}"
          class="bg-indigo-400 w-20 h-10 m-1 text-white rounded-full font-bold hover:bg-indigo-500/90"
          @click="prevPage"
      >Prev
      </button>
      <h3 class="bg-indigo-500/90 p-2 pl-4 pr-4 rounded-full text-white font-bold">
        {{ Math.floor((url.page / 15) + 1) }}</h3>
      <button
          class="bg-indigo-400 w-20 h-10 m-1 text-white rounded-full font-bold hover:bg-indigo-500/90"
          @click="nextPage"
      >Next
      </button>
    </div>
  </div>
</template>

<script>
import {computed, reactive, watchEffect} from "vue";
import {req} from "@/api";

export default {
  name: "ShortList",
  setup() {
    const url = reactive({
      data: [],
      page: 1,
      isLoading: false
    })

    const fetchUrl = async (page) => {
      url.isLoading = true
      await req(page).then(res => url.data = res.data)
      url.isLoading = false
    }

    watchEffect(async () => {
      await fetchUrl(url.page)
    })

    const isDisabled = computed(() => {
      return url.page === 1
    })

    const nextPage = () => {
      url.page = url.page + 15
      console.log(url.page)
    }

    const prevPage = () => {
      url.page = url.page - 15
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
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
}

.loader {
  color: #000000;
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

.loader:before,
.loader:after {
  position: absolute;
  content: '';
}

.loader:before {
  width: 5.2em;
  height: 10.2em;
  background: #ffffff;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  -webkit-transform-origin: 5.1em 5.1em;
  transform-origin: 5.1em 5.1em;
  -webkit-animation: load2 2s infinite ease 1.5s;
  animation: load2 2s infinite ease 1.5s;
}

.loader:after {
  width: 5.2em;
  height: 10.2em;
  background: #ffffff;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 4.9em;
  -webkit-transform-origin: 0.1em 5.1em;
  transform-origin: 0.1em 5.1em;
  -webkit-animation: load2 2s infinite ease;
  animation: load2 2s infinite ease;
}

@-webkit-keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


</style>
