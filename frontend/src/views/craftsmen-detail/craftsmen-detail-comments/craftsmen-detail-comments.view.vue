<template>
  <div class="mz-craftsmen-detail-comments">
    <mz-box-with-title :title="$t(`comments.title`)"
                       class="mz-craftsmen-detail-comments__wrapper" />

    <mz-box-with-title class="mz-craftsmen-detail-comments__wrapper"
                       v-for="(comment, index) in commentsAndRates"
                       :key="index">

      <div class="mz-craftsmen-detail-comments__wrapper__customer">

        <img v-if="comment.pictureUrl === (null || '')"
             src="@/assets/img/user.png"
             :alt="comment.customer"
             class="picture" />

        <img v-else
             :src="comment.pictureUrl"
             :alt="comment.customer"
             class="picture" />

        <span class="name"> {{comment.customer}} </span>
        <span class="date"> {{ comment.date }}r.</span>
      </div>

      <div class="mz-craftsmen-detail-comments__wrapper__rating">
        <div class="rating-content">
          <span class="label">{{ $t(`comments.contact`) }}</span>
          <span class="rate">{{ comment.rate.contact }}</span>
        </div>

        <div class="rating-content">
          <span class="label">{{ $t(`comments.punctuality`) }}</span>
          <span class="rate">{{ comment.rate.punctuality }}</span>
        </div>

        <div class="rating-content">
          <span class="label">{{ $t(`comments.quality`) }}</span>
          <span class="rate"> {{ comment.rate.quality }}</span>
        </div>

        <div class="rating-content">
          <span class="label">{{ $t(`comments.price`) }}</span>
          <span class="rate"> {{ comment.rate.price }}</span>
        </div>
      </div>

      <blockquote class="mz-craftsmen-detail-comments__wrapper__quote">
        "{{ comment.description }}"
      </blockquote>

      <div v-if="comment.reply"
           class="mz-craftsmen-detail-comments__wrapper__reply">

        <div class="craftsmen-content">
          <img :src="picture"
               alt="craftsmen-img"
               class="picture" />

          <span class="author">
            {{ comment.reply.author}}
          </span>
          {{ $t(`comments.reply`) }}
          <span class="date">{{ comment.reply.date}}</span>

        </div>
        <span class="description">{{ comment.reply.description}}</span>

      </div>
    </mz-box-with-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue }      from 'vue-property-decorator';
import { namespace }           from 'vuex-class';
import mzCraftsmenDetailModule from '../store/craftsmen-detail.module';
import mzBoxWithTitle          from '@/components/box-with-title/box-with-title.component.vue';
import mzRate                  from '@/components/rate/rate.component.vue';
import { IComment }            from '@/views/craftsmen-detail/store/craftsmen-detail.interface';

const LOCAL_STORE: string  = 'mzCraftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzBoxWithTitle,
    mzRate,
  },
})
export default class mzCraftsmenDetailComments extends Vue {
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState.craftsmenComments) public commentsAndRates!: IComment;
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState.craftsmenBaseInfo.name) public craftsmenName!: string;
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState.craftsmenBaseInfo.picture) public picture!: string;
}
</script>

<style lang="scss" scoped>
.mz-craftsmen-detail-comments {
  width: 80rem;
  margin-left: 10rem;

  &__wrapper {
    margin-bottom: 2rem;

    &__customer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 1rem 3rem 1rem;
      position: relative;

      .picture {
        width: 5rem;
        height: 5rem;
        margin-right: 1rem;
        border-radius: 50%;
      }

      .name {
        font-size: 1.6rem;
        color: var(--black);
        font-weight: var(--font-bold);
      }

      .date {
        position: absolute;
        right: 0;
        top: 1.5rem;
        font-size: 1.5rem;
        color: var(--gray-700);
        font-weight: var(--font-medium);
      }
    }

    &__quote {
      margin: 0 3rem;
      font-size: 1.6rem;
    }

    &__rating {
      margin: .5rem 3rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: .5rem;
      border-bottom: 1px solid var(--gray-400);

      .rating-content {
        .label {
          margin-right: .5rem;
        }

        .rate {
          font-weight: var(--font-medium);
          color: var(--warning);
          font-size: 1.7rem;
        }

        .max-rate {
          font-size: 1.3rem;
        }
      }
    }

    &__reply {
      margin-top: 4rem;
      margin-left: 8rem;
      position: relative;
      display: flex;
      flex-direction: column;

      .craftsmen-content {
        display: flex;
        align-items: center;
        position: relative;
        padding-bottom: .5rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--gray-400);

        .picture {
          width: 5rem;
          height: 5rem;
          margin-right: 1rem;
          border-radius: 50%;
        }

        .author {
          font-weight: var(--font-medium);
          margin-right: .5rem;
        }

        .date {
          position: absolute;
          right: 0;
          top: 1.5rem;
          font-size: 1.5rem;
          color: var(--gray-700);
          font-weight: var(--font-medium);
        }
      }

      .description {
        display: block;
        font-size: 1.6rem;
      }
    }
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .mz-craftsmen-detail-comments {
    margin-left: 0;
    width: 85rem;

    &__wrapper {
      &__customer {
        .name {
          font-size: 2.2rem;
        }

        .date {
          font-size: 2rem;
        }
      }

      &__quote {
        font-size: 2rem;
      }

      &__rating {
        .rating-content {
          .rate {
            font-size: 2.2rem;
          }

          .max-rate {
            font-size: 1.8rem;
          }
        }
      }

      &__reply {
        font-size: 1.8rem;

        .author {
          font-size: 2rem;
        }

        .date {
          font-size: 1.8rem;
        }

        .description {
          margin-top: 1rem;
          font-size: 1.8rem;
        }
      }
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-craftsmen-detail-comments {
    margin-left: 0;
    width: 46rem;

    &__wrapper {

      &__customer,
      &__rating,
      &__quote {
        margin: 1rem 1.5rem;
      }

      &__reply {
        margin-top: 2rem;
        margin-left: 3rem;
      }
    }
  }
}
</style>