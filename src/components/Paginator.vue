<template>
  <span>
    <slot :paged="paginatedSource" />
<!--    <pagination-controls :current="page" :length="pageCount" @page="setPage"/>-->
    <pagination-controls-deux :current="page" :length="pageCount" @page="setPage"/>
  </span>
</template>

<script>
  import PaginationControls from '@/components/PaginationControls'
  import PaginationControlsDeux from '@/components/PaginationControls2'

  export default {
    name: 'Paginator',
    components: { PaginationControls, PaginationControlsDeux },
    data: () => ({
      perPage: 10
    }),
    props: {
      source: Array
    },
    computed: {
      page: {
        get: function () {
          return Number(this.$route.query.page) || 1
        },
        set (value) {
          if (value > this.pageCount) return this.$router.push({ query: { page: 10 } })
          this.$router.push({ query: { page: value } })
        }
      },
      paginatedSource () {
        return this.paginate(this.page, this.perPage, this.source)
      },
      pageCount () {
        return Math.ceil(this.source.length / this.perPage)
      }
    },
    methods: {
      paginate (per, total, arr) {
        if (arr.length === total.length) return arr
        return arr.slice((per * total) - total, total * per)
      },
      setPage (page) {
        this.page = page
      }
    },
    beforeUpdate: function () {
      // Check if any records in paginated results
      const invalidPageNumber = 0 >= this.paginatedSource.length
      // If the page is out of range of the page size set to 1
      // if (invalidPageNumber) this.current_page(1);  // Send PageSize?
    }
  }
</script>
