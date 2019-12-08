import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'people',
      props: ({ query: { page, per_page, s } }) => ({
        page: Number(page) || 1,
        per_page: Number(per_page) || 10,
        query: s
      }),
      component: () => import(/* webpackChunkName: "People" */ './views/People.vue'),
      children: [
        {
          path: '/person/:id',
          name: 'person',
          props: ({ params: { id } }) => ({ id }),

          component: () => import(/* webpackChunkName: "Person" */ './views/Person.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
