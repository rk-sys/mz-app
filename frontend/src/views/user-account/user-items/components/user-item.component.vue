<template>
  <div class="user-item">
    <div class="user-item__avatar"></div>
    <div class="user-item__content">
      <span class="user-item__title"></span>
      <div class="user-item__button-wrapper">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzUserItems extends Vue {

}
</script>


<style lang="scss"
       scoped>

.user-item {

  &__avatar {
    height: 15rem;
    background-color: #0CCE92;
  }

  &__content {
    height: 7rem;
    border: 1px solid red;
  }
}
</style>
