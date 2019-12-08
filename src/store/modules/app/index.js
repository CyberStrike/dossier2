import { mutation } from './types'
import people     from '@/store/data/people'

// initial state
const state = {
  currentPage: 'home',
  search: '',
  people: people
}

// getters
const getters = {
  currentPage: state => state.currentPage,
  people: state => state.people,
  search: state => state.search
}

// actions
const actions = {
  setCurrentPage ({ commit }, name) {
    commit(mutation.SET_CURRENT_PAGE, name)
  },
  setSearch ({ commit }, value) {
    commit(mutation.SET_SEARCH, value)
  }
}

// mutations
const mutations = {
  [mutation.SET_CURRENT_PAGE] (state, name) {
    state.currentPage = name
  },
  [mutation.SET_SEARCH] (state, value) {
    state.search = value
  }
}

export default { namespaced: true, state, getters, actions, mutations }
