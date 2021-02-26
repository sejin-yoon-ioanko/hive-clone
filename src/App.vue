<template>
  <nav id="or_nav" class="s_f-s-18">
    <router-link to="/">Home</router-link>
    <router-link to="/lib_test">Aggrid 예제</router-link>
  </nav>
  <main>
    <router-view/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
#or_nav {
  display: flex;
  gap: 1em;
  justify-content: center;
  padding: 1em 0;

  a.router-link-exact-active {
    color: #cf1df2;
  }
}
</style>