<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import search from './components/search.vue'
import sellers from './components/sellers.vue'
export default {
  name: 'App',
  components: {
    search,
    sellers
  },
}
</script>

<style></style>
