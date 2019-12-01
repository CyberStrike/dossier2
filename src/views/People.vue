<template>
  <div id="people" class="row h-100">
    <div class="col-3 bg-warning">

      <div v-for="(person, index) in paginatedSearch" :key="index"
           @click="$router.push({name: 'person', params: {id: person.login.md5}})">
        <div>
          <img :src="person.picture.thumbnail"/>
        </div>

        <div>
         <div> {{ getName(person, true) }}</div>
        </div>

        <div>Info</div>
      </div>
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

<!--      <v-slide-x-transition>-->
<!--        <v-container app fluid>-->
<!--          <v-layout row align-center justify-center>-->
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
<!--              <div class="text-xs-center mt-4">-->
<!--                <v-slide-x-transition>-->
<!--                  <v-pagination v-show="hidePagination" :length="pageCount" :value="page" @input="current_page"></v-pagination>-->
<!--                </v-slide-x-transition>-->
<!--              </div>-->
<!--            </v-flex>-->
<!--            <v-flex v-show="noResults" xs12 sm6>-->
<!--              <v-layout column text-xs-center empty-state-container align-center justify-center>-->
<!--                <v-icon class="indigo&#45;&#45;text xx-large" >-->
<!--                  sentiment_very_dissatisfied-->
<!--                </v-icon>-->
<!--                <h3>No one here.</h3>-->
<!--              </v-layout>-->
<!--            </v-flex>-->
<!--          </v-layout>-->
<!--        </v-container>-->
<!--      </v-slide-x-transition>-->

    </div>
    <div class="col bg-info">Info</div>
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
      show: false
    }
  },
  computed: {
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
