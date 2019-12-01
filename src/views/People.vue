<template>
  <div id="people" class="row h-100">
    <div class="col-3 p-0">
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-transparent"  v-for="(person, index) in paginatedSearch" :key="index">
          <label>
            <div class="media">
              <img class="ml-3" :src="person.picture.thumbnail"/>
              <div class="media-body">
                <h5 class="mt-0 mb-1">{{ getName(person, true) }}</h5>
              </div>
            </div>

            <input type="radio" :value="person.login.md5" v-model="personId">
          </label>
        </li>
      </ul>
      <!--            <v-flex  v-show="!noResults" flex xs12 sm8 md5>-->
      <!--              <v-card>-->
      <!--                <v-list>-->
      <!--                  <v-list-tile avatar v-for="(person, index) in paginatedSearch" :key="index"-->
      <!--                               @click="$router.push({name: 'person', params: {id: person.login.md5}})">-->
      <!--                    <v-list-tile-avatar>-->
      <!--                      <img v-bind:src="person.picture.thumbnail"/>-->
      <!--                    </v-list-tile-avatar>-->

      <!--                    <v-list-tile-content>-->
      <!--                      <v-list-tile-title v-text="getName(person, true)"></v-list-tile-title>-->
      <!--                    </v-list-tile-content>-->

      <!--                    <v-list-tile-action>-->
      <!--                      <v-icon class="indigo&#45;&#45;text">info</v-icon>-->
      <!--                    </v-list-tile-action>-->

      <!--                  </v-list-tile>-->
      <!--                </v-list>-->
      <!--              </v-card>-->

    </div>
    <div class="col bg-info">
      <router-view/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { createNamespacedHelpers } from 'vuex'
import { toTitleCase } from '@/utilities'
const { mapGetters, mapActions } = createNamespacedHelpers('app')

export default {
  name: 'People',
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
    personId: {
      get () {
        return this.id
      },
      set (id) {
        this.id = id
        this.$router.push({name: 'person', params: { id } })
      }
    },
    searchPeople () {
      return this.people
                 .filter(
                   person =>  this.getName(person, false)
                                  .toUpperCase().indexOf(this.query.toUpperCase()) >= 0
                 )
    },
    paginatedSearch () {
      return this.paginate(this.page, this.per_page, this.searchPeople)
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
  beforeUpdate: function () {
    // Check if any records in paginated results
    const invalidPageNumber = this.paginatedSearch.length <= 0
    // If the page is out of range of the page size set to 1
    if (invalidPageNumber) this.current_page(1);
  }
}
</script>

<style lang="scss">
  @import '../assets/base';

  #people {
    background: $ddark5;
    color: #eee;
  }
</style>
