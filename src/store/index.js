import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
// import app from './modules/people'

Vue.use(Vuex)

const debug = 'production' !== process.env.NODE_ENV

export default new Vuex.Store({ modules: { app }, strict: debug })
