<template>
  <div class="mz-offer-detail-chat">
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { namespace }             from 'vuex-class';

const LOCAL_STORE: string = 'offerDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
  },
})
export default class mzOfferDetail extends Vue {

}
</script>

<style lang="scss"
       scoped>

.mz-offer-detail-chat {
  margin-top: 1rem;
  background: var(--white);
  border-radius: 2px;
  width: 100%;
  height: 60rem;
}

@include respond-to(desktop) {
  .mz-offer-detail-chat {
    margin-bottom: 5rem;
  }
}

@include respond-to(tablet) {
  .mz-offer-detail-chat {
    margin-bottom: 3rem;
  }
}

@include respond-to(mobile) {
  .mz-offer-detail-chat {
    margin-bottom: 1rem;
  }
}
</style>
