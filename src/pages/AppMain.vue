<template>
  <div class="container">
    <div class="flex justify-between mb-5">
      <CreateUrl />
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
import CreateUrl from "@/components/CreateUrl";
export default {
  name: "AppMain",
  components: {CreateUrl, ShortList},
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
