<template>
  <div class="craftsman-card-simple"
       @mouseenter="isHover = !isHover"
       @mouseleave="isHover = !isHover"
       @click="goToDetail(craftsman.uuid)">

    <div class="craftsman-card-simple__picture">

      <img :src="craftsman.picture"
           :alt="craftsman.name"
           class="craftsman-card-simple__picture__img" />

      <div class="craftsman-card-simple__picture__img--cover-bg"
           :class="{'show-overlay' : isHover}"
           @click="openModal(indexItem)">

        {{ $t(`profileDetail`) }}
      </div>
    </div>

    <div class="craftsman-card-simple__info">

        <span class="craftsman-card-simple__info__name"
              :class="{'isHover' : isHover}">
          {{craftsman.name}}
        </span>

      <mz-rate disabled
               v-model="craftsman.rating"
               score-template="{value} points"
               class="craftsman-card-simple__info__rating" />

      <span class="craftsman-card-simple__info__city">
          {{craftsman.city}}
        </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzRate                   from '../rate/rate.component.vue';
import { ICraftsman }           from '@/views/product-detail/store/product-detail.interface';
import router                   from '@/router';

@Component({
  components: {
    mzRate,
  },
})
export default class mzCraftsmenCard extends Vue {
  @Prop(Object) public readonly craftsman!: ICraftsman;

  public isHover: boolean = false;

  public goToDetail(uuid: string) {
    router.push({ name: 'Craftsmen detail', params: { uuid } });
  }
}
</script>

<style lang="scss"
       scoped>

.craftsman-card-simple {
  display: flex;
  align-items: center;

  &__picture {
    position: relative;

    &__img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      object-fit: cover;

      &--cover-bg {
        position: absolute;
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        background: var(--black-60);
        top: 0;
        display: none;
        justify-content: center;
        align-items: center;
        color: var(--white);
        font-size: 1.8rem;
        font-weight: var(--font-regular);
        text-align: center;
      }
    }
  }

  &__info {
    margin-left: 2rem;
    font-size: 2.4rem;
    padding: 1rem 0;
    cursor: pointer;

    &__name {
      margin-right: .5rem;
    }

    &__rating {
      display: inline-flex;
    }

    &__city {
      font-size: 2rem;
      color: var(--gray-500);
    }
  }

  .isHover {
    color: var(--primary-color);
    cursor: pointer;
  }

  &:hover {
    cursor: pointer;
  }
}

.show-overlay {
  display: flex;
}
</style>
