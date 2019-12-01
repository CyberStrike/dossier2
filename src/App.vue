<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <nav id="nav" class="col-3 bg-primary">
          <ul>
            <router-link tag='li' to="/">Home</router-link>
            <router-link tag='li' to="/about">About</router-link>
          </ul>
        </nav>
        <div class="col-3 bg-warning">People</div>
        <div class="col bg-info">Info</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

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
