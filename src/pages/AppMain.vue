<template>
  <div class="container">
    <div class="flex justify-end mb-5">
      <button
          class="bg-indigo-400 w-20 h-10 m-1 text-white rounded-full hover:bg-indigo-500/90 items-center justify-center flex justify-end"
          @click="logOut"
      >
        Log out
      </button>
    </div>
    <ShortList />
  </div>
</template>

<script>
import ShortList from "@/components/ShortList";
import router from "@/router";
export default {
  name: "AppMain",
  components: {ShortList},
  setup(){
    const logOut = () => {
      localStorage.removeItem('token')
      router.replace({path: '/'})
    }

    return {
      logOut
    }
  }
}
</script>

<style scoped>

</style>
