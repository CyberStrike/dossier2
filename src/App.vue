<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row h-100">
        <nav id="nav" class="col-1 bg-primary">
          <ul>
            <router-link tag='li' :to="{name: 'people'}">People</router-link>
            <router-link tag='li' to="/about">About</router-link>
          </ul>
        </nav>
        <div class="col">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
html, body, #app, .container-fluid {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
