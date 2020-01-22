<template>
  <div class="mz-craftsmen-detail-menu">
    <div class="mz-craftsmen-detail-menu__info">
      <img :src="baseInfo.picture"
           alt="craftsmen-image"
           class="picture">

      <h1 class="name">{{ baseInfo.name }}</h1>
      <div class="rating">
        <div v-for="item in baseInfo.ratings"
             class="rating__item">

          <span class="label">
            {{ $t(`craftsmenDetailMenu.rating.${item.label}`) }}
          </span>
          <mz-rate v-model="item.value"
                   disabled />
        </div>
      </div>
    </div>

    <div class="mz-craftsmen-detail-menu__links">
      <div v-for="item in menuLinks"
           class="mz-craftsmen-detail-menu__links__wrapper">

        <router-link :to="{name: item.nameUrl, params: {uuid: '1'}}"
                     class="link">
          {{ $t(`menuLinks.${item.label}`) }}
        </router-link>
      </div>
    </div>

    <div class="mz-craftsmen-detail-menu__social-media">
      <mz-social-media :facebook-url="baseInfo.socialMedia.facebook"
                       :twitter-url="baseInfo.socialMedia.twitter"
                       :youtube-url="baseInfo.socialMedia.youtube"
                       :instagram-url="baseInfo.socialMedia.instagram" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }                    from 'vue-property-decorator';
import { namespace }                               from 'vuex-class';
import { ICraftsmenBaseInfo, ICraftsmenMenuLinks } from '@/views/craftsmen-detail/store/craftsmen-detail.interface';
import mzCraftsmenDetailModule                     from '../store/craftsmen-detail.module';
import mzSocialMedia                               from '@/components/social-media/social-media.component.vue';
import mzRate                                      from '@/components/rate/rate.component.vue';

const LOCAL_STORE = 'craftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzRate,
    mzSocialMedia,
  },
})
export default class mzCraftsmenDetailMenu extends Vue {
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsMenMenuLinks) public menuLinks!: ICraftsmenMenuLinks;
  @Prop(Object) public readonly baseInfo!: ICraftsmenBaseInfo;

}
</script>

<style lang="scss"
       scoped>
.mz-craftsmen-detail-menu {
  width: 25rem;

  &__info {
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;

    .picture {
      width: 17.5rem;
      height: 17.5rem;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto;
    }

    .name {
      margin-top: 1rem;
      font-size: 2.6rem;
      font-weight: var(--font-medium);
      text-align: center;
    }

    .rating {
      display: flex;
      flex-direction: column;

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: .5rem;

        .label {
          font-size: 1.6rem;
          display: block;
        }
      }
    }
  }

  &__links {
    margin-bottom: 5rem;

    .router-link-active {
      color: var(--primary-color);
      font-weight: var(--font-bold);
      border-bottom: 2px solid var(--primary-color);
    }

    .link {
      font-size: 1.8rem;
      color: var(--gray-950);
      text-decoration: none;
      margin-bottom: 2rem;
      font-weight: var(--font-medium);
      display: inline-block;
      padding: .5rem 0;
      border-bottom: 2px solid var(--transparent);
      position: relative;

      &::before {
        content: "";
        left: 0;
        bottom: -.2rem;
        width: 100%;
        position: absolute;
        transform: scaleX(0);
        transition: transform .3s ease-in-out;
        transform-origin: left;
        border-bottom: 2px solid var(--primary-color);
      }

      &:hover {
        color: var(--primary-color);

        &::before {
          transition: transform .3s ease-in-out;
          transform: scaleX(1);
        }
      }
    }
  }

  &__social-media {
    display: flex;
    justify-content: center;

    .icon {
      width: 5rem;
      height: 5rem;
      display: block;
      border-radius: 50%;

      &:hover {
        background: var(--gray-100);
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .mz-craftsmen-detail-menu {
    margin-bottom: 4rem;
    width: 45rem;
    padding: 1rem;

    &__info {
      margin-bottom: 3.5rem;
    }

    .picture {
      width: 25rem;
      height: 25rem;
    }

    .name {
      font-size: 3.5rem;
    }

    .rating__item {
      .label {
        font-size: 2.8rem;
      }
    }

    &__links {
      margin-bottom: 3.5rem;

      &__wrapper {
        text-align: center;

        .link {
          font-size: 2.8rem;
        }
      }
    }
  }
}
</style>