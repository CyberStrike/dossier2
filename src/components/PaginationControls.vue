<template>
  <nav>
    {{ Math.floor((this.visible - 1) / 2 ) }}

    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('page', 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <template v-for="(page) in visiblePages">
        <li :class="['page-item', { active: isCurrent(page) }]">
          <span v-if="isCurrent(page)" class="page-link">
              {{ page }} <span class="sr-only">(current)</span>
          </span>
          <a href="#" v-else class="page-link" @click.prevent="$emit('page', page)">
            {{ page }}
          </a>
        </li>
      </template>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="$emit('page', length)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'pagination-controls',
    props: {
      length: Number,
      current: Number,
      visible: {
        type: Number,
        default: 5
      }
    },
    computed: {
      pages () {
        return Array(this.length)
      },
      visiblePages () {
        const range = this.range(this.length, 1)
        const show = Math.floor((this.visible - 1) / 2)
        const start = (() => {
          const resolve = this.current - (show + 1)
          const startOfRange = this.current <= show
          const endOfRange = Object.is(this.current, this.length)
          if (this.current <= show) return 0
          // End Of Range
          if (endOfRange || resolve >= this.length) return this.visible
          return resolve
        })()

        const end = (() => {
          const resolve = this.current + show
          if (Object.is(this.current, 1)) return this.visible
          if (Object.is(this.current, this.length) || resolve >= this.length) return this.length
          return resolve
        })()

        console.log({ start, end, range })
        // segment of pages
        return range.slice(start, end)
      }
    },
    methods: {
      range (size, startAt = 0) {
        return [...Array(size).keys()].map(i => i + startAt)
      },
      isCurrent (page) {
        return Object.is(this.current, page)
      },
      paginate (per, total, arr) {
        if (arr.length === total.length) return arr
        return arr.slice((per * total) - total, total * per)
      },
      selectPage (page) {
        if (page === this.length) return
        this.$emit('page', page)
      }
    }
  }
</script>
<style>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .current-page-input {
    color: var(--primary);
    box-sizing: content-box;
    width: 26px;
    height: 20px;
    background: none;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 1px;
    border-style: solid;
    text-align: center;
  }
</style>
