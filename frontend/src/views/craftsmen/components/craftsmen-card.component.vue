<template>
  <div class="mz-craftsmen-card">
    <div class="mz-craftsmen-card__header">

      <div class="city">
        <div class="icon icon-pin--green"></div>
        {{city}}
      </div>

      <div class="rating">
        <mz-rate v-model="rating"
                 disabled
                 score-template="{value} points" />
      </div>
    </div>

    <div class="mz-craftsmen-card__info"
         @mouseenter="isHover = !isHover"
         @mouseleave="isHover = !isHover">

      <router-link :to="{name: 'Craftsmen detail', params: {uuid: craftsmenId}}"
                   class="mz-craftsmen-card__info__link">

        <div class="mz-craftsmen-card__info__img">

          <template v-if="image && image !== ''">
            <img :src="image"
                 :alt="name"
                 class="picture">
          </template>

          <template v-else>
            <img src="@/assets/img/user.png"
                 :alt="name"
                 class="picture">
          </template>

          <div v-if="isHover"
               class="picture--hover">
            {{$t(`pictureHover`)}}
          </div>
        </div>

        <span class="display-name"
              :class="{'hover': isHover}">

        {{name}}
      </span>
      </router-link>
    </div>

    <div class="mz-craftsmen-card__tags">

      <template v-if="tags !== undefined && tags.length > 0">
        <span v-for="tag in tags"
              class="tag">
          {{tag}}
        </span>
      </template>

      <template v-else>
        <span class="empty">{{$t(`craftsman.emptyTags`)}}</span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzRate                   from '@/components/rate/rate.component.vue';

@Component({
  components: {
    mzRate,
  },
})
export default class mzCraftsmenCard extends Vue {
  @Prop(String) public readonly city!: string;
  @Prop(Number) public readonly rating!: number;
  @Prop(Number) public readonly craftsmenId!: number;
  @Prop(String) public readonly image!: string;
  @Prop(String) public readonly name!: string;
  @Prop(Array) public readonly tags!: string[];

  public isHover: boolean = false;
}
</script>

<style lang="scss"
       scoped>

.mz-craftsmen-card {
  background: var(--white);
  width: 35rem;
  border: 1px solid var(--gray-400);
  border-radius: 2px;
  padding: 1rem;

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 1rem 0 var(--gray-450);
  }

  &__header {
    display: flex;
    justify-content: space-between;

    .city,
    .rating {
      display: flex;
      align-items: center;
      font-size: 1.8rem;
      color: var(--gray-950);

      .icon {
        height: 2.4rem;
        width: 2.4rem;
        margin-right: .5rem;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem auto;
    cursor: pointer;
    text-decoration: none;
    color: var(--black);

    &__link {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: var(--black);
    }

    &__img {
      position: relative;

      .picture {
        object-fit: cover;
        height: 18rem;
        width: 18rem;
        border-radius: 50%;

        &--hover {
          position: absolute;
          height: 18rem;
          width: 18rem;
          border-radius: 50%;
          background: var(--black-60);
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--white);
          font-size: 1.8rem;
          font-weight: var(--font-medium);
        }
      }
    }

    .display-name {
      margin-top: 2rem;
      font-size: 2.8rem;

      &.hover {
        color: var(--primary-color);
      }
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1rem 0;

    .empty {
      font-size: 3rem;
      color: var(--gray-450);
      display: flex;
      justify-content: center;
      margin: 2rem 0;
    }

    .tag {
      margin: .5rem;
      padding: .5rem;
      border: 1px solid var(--primary-color);
      border-radius: 2px;
      color: var(--primary-color);
      background: var(--white);

      &:hover {
        background: var(--primary-color);
        color: vaR(--white);
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .mz-craftsmen-card {
    width: 31rem;
  }
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-craftsmen-card {
    width: 42rem;

    &__tags {
      .tag {
        font-size: 2.1rem;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-craftsmen-card {
    width: 46rem;

    &__tags {
      .tag {
        font-size: 2.2rem;
      }
    }
  }
}
</style>
