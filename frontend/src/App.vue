<template>
  <div id="mzApp">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class mzApp extends Vue {

  }
</script>
<style lang="scss">
  @import '~@/styles/main';
</style>

<style lang="scss"
       scoped>

</style>
