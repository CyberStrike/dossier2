<template>
  <div id="people" class="row h-100">
    <div class="col-3 p-0">
      <paginator  v-slot="{ paged }" :source="searchPeople" :page="page" :per-page="per_page">
        <people-list v-model="person" :people="paged" :selected="person"/>
      </paginator>
    </div>
    <div class="col bg-info">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from 'vuex'
import { toTitleCase }             from '@/utilities'
import PeopleList                  from '@/components/PeopleList'
import Paginator                   from '@/components/Paginator'
const { mapGetters, mapActions } = createNamespacedHelpers('app')

export default {
  name: 'People',
  components: { Paginator, PeopleList },
  props: {
    page: Number,
    per_page: Number,
    query: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      show: false,
      id: null
    }
  },
  computed: {
    person: {
      get () {
        return this.id
      },
      set (id) {
        this.id = id
        this.$router.push({name: 'person', params: { id } })
      }
    },
    searchPeople () {
      return this.people.filter(person => this.getName(person, false).toUpperCase().indexOf(this.query.toUpperCase()) >= 0)
    },
    pageCount () {
      return Math.ceil(this.searchPeople.length / this.per_page)
    },
    hidePagination () {
      return !(this.searchPeople.length <= this.per_page)
    },
    noResults () {
      return this.searchPeople.length === 0
    },
    ...mapGetters(['people'])
  },
  methods: {
    current_page (v) {
      this.$router.replace({query: { page: Number(v), per_page: this.per_page, q: this.query }})
    },
    paginate (per, total, arr) {
      if (arr.length === total.length) return arr
      return arr.slice((per * total) - total , total * per )
    },
    getName (person, showHonorific) {
      let honorific = showHonorific ? `${toTitleCase(person.name.title)}. ` : ''
      return `${honorific}${toTitleCase(person.name.first)} ${toTitleCase(person.name.last)}`
    }
  },
  mounted: function () {
    this.show = true
  },
}
</script>

<style lang="scss">
  @import '../assets/base';

  #people {
    background: $ddark5;
    color: #eee;
  }
  .list-group-item {
    cursor: pointer;
    background: $ddark5;
    &:hover {
      background: $ddark6;
    }
  }
</style>
