<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row h-100 w-100 m-0">
        <nav id="nav" class="col-1">
          <ul class="nav flex-column">
            <router-link tag='li' class="nav-item" :to="{name: 'people'}">
              People
            </router-link>
            <router-link tag='li' class="nav-item" to="/about">
              About
            </router-link>
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
  @import '/assets/base';

  html, body, #app, .container-fluid {
    height: 100%;
    margin: 0;
    padding: 0;
    background: $ddark6;
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
    background: $ddark6;
    li, a {
      font-weight: bold;
      color: #eee;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .virtual-input {
    cursor: pointer;
    input {
      position: absolute;
      clip: rect(0,0,0,0);
      pointer-events: none;
    }
  }
</style>
