<template>
  <div class="box-border w-1/2">
    <form class="flex flex-col items-center h-52 relative"
    >
      <label for="uname"><b>Username</b></label>
      <input class="border-4 border-indigo-400 rounded-full w-1/2 mb-4 p-0 pl-4 focus:border-indigo-500/90"
             v-model="regForm.username"
             type="text"
             id="uname"
      >
      <p v-if="v$.username.$error" class="text-xs text-red-500 absolute top-14">Введите логин</p>
      <label for="psw"><b>Password</b></label>
      <input class="border-4 border-indigo-400 rounded-full w-1/2 mb-3 p-0 pl-4 focus:border-indigo-500/90"
             v-model="regForm.password"
             type='password'
             id="psw"
      >
      <p v-if="v$.password.$error" class="text-xs text-red-500 absolute top-32">Ввелите пароль</p>
      <div class="flex flex-row">
        <router-link to="/"
                     class="bg-indigo-400 w-20 h-10 m-1 text-white rounded-full hover:bg-indigo-500/90 items-center justify-center flex"
        >
          Log In
        </router-link>
        <button
            class="bg-indigo-400 w-20 h-10 m-1 text-white rounded-full hover:bg-indigo-500/90"
            @click.prevent="handleReg"
        >
          Register
        </button>
      </div>

    </form>
  </div>
</template>

<script>
import {computed, reactive} from "vue";
import {minLength, required} from "@vuelidate/validators";
import {registration} from "@/api";
import useVuelidate from "@vuelidate/core";
import router from "@/router";

export default {
  name: "AppRegister",
  setup() {
    const regForm = reactive({
      username: '',
      password: ''
    })
    const rules = computed(() => ({
      username: {
        required,
        minLength: minLength(1)
      },
      password: {
        required,
        minLength: minLength(5)
      }
    }))


    const handleReg = async () => {
      const valid = await v$.value.$validate()
      console.log(valid)
      if (valid) {
        await registration(regForm.username, regForm.password)
        await router.replace({path: '/'})
      }

    }

    const v$ = useVuelidate(rules, regForm)
    return {
      regForm,
      handleReg,
      v$
    }
  }
}
</script>

<style scoped>

</style>
