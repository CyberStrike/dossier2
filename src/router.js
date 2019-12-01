import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'people',
      props: (route) => ({
        page: Number(route.query.page) || 1,
        per_page: Number(route.query.per_page) || 10,
      }),
      component: () => import(/* webpackChunkName: "about" */ './views/People.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
