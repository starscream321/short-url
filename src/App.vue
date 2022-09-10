<template>
  <div class="container mx-auto flex flex-col justify-center items-center  inset-0">
    <h1 class="text-3xl font-bold m-5">SHORT-URL</h1>
    <transition name="fade" mode="out-in">
      <router-view class="m-5"></router-view>
    </transition>
  </div>
  <div></div>
</template>

<script>
import router from "@/router";

export default {
  setup(){
    if(localStorage.getItem('token')){
      router.replace({path: '/home'})
    }else{
      router.replace({path: '/register'})
    }
  }
}
</script>
<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
