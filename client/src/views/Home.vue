<template>
  <div class="home">

    <br>
      <a href="/auth/facebook">Faceook Login</a>
      <a href="/auth/google">Google Login</a>
    <br>


    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
