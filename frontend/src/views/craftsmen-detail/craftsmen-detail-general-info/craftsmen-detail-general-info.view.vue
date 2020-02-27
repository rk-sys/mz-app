<template>
  <div class="mz-craftsmen-detail-general-info">
    <mz-box-with-title :title="$t(`generalInfo.craftsmenInfoTitle`)">
      <p class="description">
        {{craftsmenDetail.craftsmenBaseInfo.craftsmenDescription}}
      </p>


      <p class="tag-title">{{$t(`generalInfo.tagListTitle`)}}</p>
      <div class="tag-list">
        <mz-tag v-for="(tag, index) in craftsmenDetail.craftsmenBaseInfo.tags"
                :tag="tag"
                :index="index"
                :key="index"
                :is-presentation="true" />
      </div>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`generalInfo.itemsInfoTitle`)">
      <p class="description">
        {{craftsmenDetail.craftsmenBaseInfo.itemDescription}}
      </p>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`generalInfo.contactInfoTitle`)">
      <div class="contact">

        <div v-for="item in craftsmenDetail.craftsmenBaseInfo.contact"
             class="contact__wrapper">

          <div class="icon"
               :class="[ `icon-${ item.label }--green` ]"></div>

          <span class="label">{{item.value}}</span>
        </div>
      </div>
    </mz-box-with-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue }      from 'vue-property-decorator';
import { namespace }           from 'vuex-class';
import mzCraftsmenDetailModule from '../store/craftsmen-detail.module';
import mzBoxWithTitle          from '@/components/box-with-title/box-with-title.component.vue';
import { ICraftsmenDetail }    from '@/views/craftsmen-detail/store/craftsmen-detail.interface';
import mzTag                   from '@/components/tag/tag.component.vue';

const LOCAL_STORE: string  = 'mzCraftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzBoxWithTitle,
    mzTag,
  },
})
export default class mzCraftsmenDetailGeneralInfo extends Vue {
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState) public craftsmenDetail!: ICraftsmenDetail;

}
</script>

<style lang="scss" scoped>
.mz-craftsmen-detail-general-info {
  width: 80rem;
  margin-left: 10rem;

  .description {
    padding: 1rem 3rem;
    font-size: 1.8rem;
  }

  .tag-title {
    padding: 1rem 3rem 0 3rem;
    font-weight: var(--font-medium);
    font-size: 2.4rem;
    display: block;
  }

  .tag-list {
    padding: 0 3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 1rem;

    .tag {
      margin: .5rem;
      padding: .5rem;
      border: 1px solid var(--primary-color);
      border-radius: 2px;
      color: var(--primary-color);
      background: var(--white);
      font-size: 1.8rem;

      &:hover {
        background: var(--primary-color);
        color: vaR(--white);
        cursor: pointer;
      }
    }
  }

  .contact {
    margin-top: 2rem;
    padding: 1rem 3rem;

    &__wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 2rem;

      .icon {
        min-width: 4rem;
        height: 3.5rem;
        margin-right: 2rem;
      }

      .label {
        font-size: 2rem;
      }
    }
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .mz-craftsmen-detail-general-info {
    margin-left: 0;
    width: 85rem;
  }
}

@media only screen and (max-width: 425px) {
  .mz-craftsmen-detail-general-info {
    margin-left: 0;
    width: 46rem;

    .description {
      padding: 1rem 0;
    }

    .tag-title, .tag-list, .contact {
      padding: 1rem 0;
    }
  }
}
</style>