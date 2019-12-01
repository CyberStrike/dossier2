<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col-1 bg-primary">Logo</div>
        <div class="col-3 bg-warning">People</div>
        <div class="col bg-info">Info</div>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
