<template>
  <span>
    <slot :paged="paginatedSource" />
  </span>
</template>

<script>
  export default {
    name: 'Paginator',
    data: () => ({}),
    props: {
      page: Number,
      source: Array,
      perPage: Number,
    },
    computed: {
      paginatedSource () {
        return this.paginate(this.page, this.perPage, this.source)
      },
    },
    methods: {
      paginate (per, total, arr) {
        if (arr.length === total.length) return arr
        return arr.slice((per * total) - total , total * per )
      },
    },
    beforeUpdate: function () {
      // Check if any records in paginated results
      const invalidPageNumber = this.paginatedSource.length <= 0
      // If the page is out of range of the page size set to 1
      // if (invalidPageNumber) this.current_page(1);  // Send PageSize?
    }
  }
</script>

<style scoped>

</style>
