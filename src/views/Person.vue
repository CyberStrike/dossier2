<template>
    <div id="person">
      {{ id }}
      <h2 class="text-xs-center">{{fullName}}</h2>

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

<style scoped>

</style>
