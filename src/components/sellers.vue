<template>
    <div >
        <div>
            <b-table striped hover :items="arraySellers"></b-table>
        </div>
    </div>
  
</template>

<script>
import search from './search.vue'
  export default {
  components: { search },
  data() {
      return {
        sellersS:[]
      }
    },
    props:{
        arraySellers:[],
    },
  }
</script>
