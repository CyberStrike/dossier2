<template>
  <ul class="list-group list-group-flush text-left">
    <li class="list-group-item"
        v-for="(person, index) in people" :key="index"
        @click="selectedPerson = person.login.md5">
        <div class="media">
          <img :src="person.picture.thumbnail" class="ml-3 rounded-circle"/>
          <div class="media-body align-self-center">
            <p class="ml-3 m-0">{{ getName(person, true) }}</p>
          </div>
        </div>
    </li>
  </ul>
</template>

<script>
  import { toTitleCase } from '@/utilities'

  export default {
    name: 'PeopleList',
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      people: Array,
      selected: String
    },
    computed: {
      selectedPerson: {
        get () { return this.selected },
        set (value) { this.$emit('change', value) }
      }
    },
    methods: {
      getName (person, showHonorific) {
        let honorific = showHonorific ? `${toTitleCase(person.name.title)}. ` : ''
        return `${honorific}${toTitleCase(person.name.first)} ${toTitleCase(person.name.last)}`
      }
    }
  }
</script>

<style scoped>

</style>
