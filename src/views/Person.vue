<template>
    <div id="person">
      <div class="container">
        {{ id }}
        <div class="col">
          <div class="row">
            <img :src="person.picture.large" :alt="fullName">
          </div>
          <div class="row">
            <h2 class="text-xs-center">{{fullName}}</h2>
          </div>
          <div class="row">
            <div class="card" style="width: 18rem;">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Vestibulum at eros</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
<!--      <v-slide-x-transition>-->
<!--        <v-container app fluid v-show="show">-->
<!--          <v-layout column>-->
<!--            <v-layout align-center justify-center>-->
<!--              <v-flex xs12 sm8 md6 lg5>-->
<!--                <v-card>-->
<!--                  <v-list two-line>-->
<!--                    &lt;!&ndash; Nationality &ndash;&gt;-->
<!--                    <v-list-tile>-->
<!--                      <v-list-tile-action>-->
<!--                        <v-icon class="indigo&#45;&#45;text">language</v-icon>-->
<!--                      </v-list-tile-action>-->
<!--                      <v-list-tile-content>-->
<!--                        <v-list-tile-title>{{nationality}}</v-list-tile-title>-->
<!--                        <v-list-tile-sub-title>Nationality</v-list-tile-sub-title>-->
<!--                      </v-list-tile-content>-->
<!--                    </v-list-tile>-->

<!--                    &lt;!&ndash; Gender &ndash;&gt;-->
<!--                    <v-list-tile>-->
<!--                      <v-list-tile-action>-->
<!--                        <v-icon class="indigo&#45;&#45;text">accessibility</v-icon>-->
<!--                      </v-list-tile-action>-->
<!--                      <v-list-tile-content>-->
<!--                        <v-list-tile-title>{{person.gender | toTitleCase}}</v-list-tile-title>-->
<!--                        <v-list-tile-sub-title>Gender</v-list-tile-sub-title>-->
<!--                      </v-list-tile-content>-->
<!--                    </v-list-tile>-->

<!--                    <v-subheader inset>Contact</v-subheader>-->

<!--                    &lt;!&ndash; Smartphone &ndash;&gt;-->
<!--                    <v-list-tile>-->
<!--                      <v-list-tile-action>-->
<!--                        <v-icon class="indigo&#45;&#45;text">smartphone</v-icon>-->
<!--                      </v-list-tile-action>-->
<!--                      <v-list-tile-content>-->
<!--                        <v-list-tile-title>{{person.cell}}</v-list-tile-title>-->
<!--                        <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>-->
<!--                      </v-list-tile-content>-->
<!--                    </v-list-tile>-->

<!--                    &lt;!&ndash; Home &ndash;&gt;-->
<!--                    <v-list-tile>-->
<!--                      <v-list-tile-action>-->
<!--                        <v-icon class="indigo&#45;&#45;text">home</v-icon>-->
<!--                      </v-list-tile-action>-->
<!--                      <v-list-tile-content>-->
<!--                        <v-list-tile-title>{{person.phone}}</v-list-tile-title>-->
<!--                        <v-list-tile-sub-title>Home</v-list-tile-sub-title>-->
<!--                      </v-list-tile-content>-->
<!--                    </v-list-tile>-->

<!--                    &lt;!&ndash; E-Mail &ndash;&gt;-->
<!--                    <v-list-tile>-->
<!--                      <v-list-tile-action>-->
<!--                        <v-icon class="indigo&#45;&#45;text">mail</v-icon>-->
<!--                      </v-list-tile-action>-->
<!--                      <v-list-tile-content>-->
<!--                        <v-list-tile-title>{{person.email}}</v-list-tile-title>-->
<!--                        <v-list-tile-sub-title>Personal</v-list-tile-sub-title>-->
<!--                      </v-list-tile-content>-->
<!--                    </v-list-tile>-->


<!--                    <v-subheader inset>Addresses</v-subheader>-->

<!--                    &lt;!&ndash; Address &ndash;&gt;-->
<!--                    <v-list-tile>-->
<!--                      <v-list-tile-action>-->
<!--                        <v-icon class="indigo&#45;&#45;text">location_on</v-icon>-->
<!--                      </v-list-tile-action>-->
<!--                      <v-list-tile-content>-->
<!--                        <v-list-tile-title>{{person.location.street | toTitleCase}},</v-list-tile-title>-->
<!--                        <v-list-tile-sub-title>-->
<!--                          {{person.location.city | toTitleCase}},-->
<!--                          {{person.location.state | toTitleCase}}-->
<!--                          {{person.location.postcode}}-->
<!--                        </v-list-tile-sub-title>-->
<!--                      </v-list-tile-content>-->
<!--                    </v-list-tile>-->

<!--                  </v-list>-->
<!--                </v-card>-->
<!--              </v-flex>-->
<!--            </v-layout>-->
<!--          </v-layout>-->
<!--        </v-container>-->
<!--      </v-slide-x-transition>-->
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { toTitleCase } from '@/utilities'

  const { mapGetters, mapActions } = createNamespacedHelpers('app')

  export default {
    name: 'person',
    props: {
      id: String
    },
    data: function () {
      return {
        nationality: 'Unknown',
        show: false
      }
    },
    filters: { toTitleCase },
    methods: {
      // getNationality: function () {
      //   let that = this
      //   let url = `https://restcountries.eu/rest/v2/alpha/${this.person.nat}`
      //   this.$http.get(url)
      //       .then( res => res.data.name )
      //       .then( name => that.nationality = name)
      // }
    },
    computed: {
      person: function () {
        return this.people.filter(person => 0 <= person.login.md5.indexOf(this.id))[0]
      },
      fullName: function () {
        return `${toTitleCase(this.person.name.title)}.  ${toTitleCase(this.person.name.first)} ${toTitleCase(this.person.name.last)}`
      },
      ...mapGetters({ people: 'people' })
    },
    mounted: function () {
      // this.getNationality()
      this.show = true
    },
    watch: {
      '$route' (to, from) {
        // this.getNationality()
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../assets/variables'

  #person
    background: $uno-4
    height: 100%
</style>
