<template>
  <div class="home">
    <HelloWorld msg="Vue.js, Bulma and TS"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/app/HelloWorld.component.vue'; // @ is an alias to /src

@Component({
  components: {
  HelloWorld,
  },
  })
export default class Home extends Vue {}
</script>
