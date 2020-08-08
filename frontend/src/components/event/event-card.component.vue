<template>
  <div class="mz-event-card">

    <img :alt="event.title"
         :src="event.image"
         class="mz-event-card__image" />

    <h3 class="mz-event-card__title">{{event.title}}</h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router                   from '../../router';

@Component({
  components: {},
})
export default class mzProductsHeaderInfo extends Vue {
  @Prop(Object) public readonly event!: any;

  public isHover: boolean = false;

  public showLayout(arg: boolean): void {
    this.isHover = arg;
  }

  public goToProductDetail(uuid: string): void {
    router.push({ name: 'Product detail', params: { uuid } });
  }
}
</script>

<style lang="scss"
       scoped>
.mz-event-card {
  border: 1px solid var(--gray-400);
  width: 70rem;
  height: 35rem;
  background: var(--white);
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  transition: var(--transition-event-card);

  &__image {
    object-fit: cover;
    width: 70rem;
    height: 35rem;
    filter: grayscale(.2) brightness(.4);
    transition: var(--transition-event-card);
  }

  &__title {
    position: absolute;
    top: 2rem;
    color: var(--white);
    font-family: var(--secondary-font-family);
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    transition: var(--transition-event-card);
  }

  &:hover {
    cursor: pointer;

    .mz-event-card__image {
      transition: var(--transition-event-card);
      transform: scale(1.2)
    }
  }
}

@media screen and (max-width: 429px) {
  .mz-event-card {
    &__image {
      width: 100%;
    }

    &__title {
      font-size: 4rem;
    }
  }
}
</style>
