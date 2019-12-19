<template>
  <nav>
    <ul class="pagination justify-content-center font-weight-bold my-2">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="First" @click.prevent="$emit('page', 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="prev">
          <span aria-hidden="true">&lsaquo;</span>
        </a>
      </li>
      <li class="page-item">
          <span class="page-link" style="padding: 0.4rem 0.75rem;">
            <input v-model.number="magic" type="number" class="current-page-input"> / {{ length }}
          </span>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="next">
          <span aria-hidden="true">&rsaquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Last" @click.prevent="$emit('page', length)">
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
        default: 3
      }
    },
    computed: {
      pages () {
        return Array(this.length)
      },
      magic: {
        get () {
          return this.current
        },
        set (value) {
          this.selectPage(value)
        }
      }
    },
    methods: {
      isCurrent (page) {
        return Object.is(this.current, page)
      },
      prev () {
        this.selectPage(this.magic - 1)
      },
      next () {
        this.selectPage(this.magic + 1)
      },
      selectPage (page) {
        const atStartBounds = page <= 0
        const atEndEBounds = page > this.length
        if (atStartBounds || atEndEBounds) return
        this.$emit('page', page)
      }
    }
  }
</script>
<style scoped lang="scss">
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
