<template>
  <Header />
  <Search />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './components/Header/Header.vue';
import Search from './components/Search/Search.vue';

export default defineComponent ({
  name: 'App',
  components: {
    Header,
    Search
  }
})
</script>

<style>
  body {
  margin: 0;
  padding: 0;
  background-color: rgb(250, 248, 248)
}
</style>

