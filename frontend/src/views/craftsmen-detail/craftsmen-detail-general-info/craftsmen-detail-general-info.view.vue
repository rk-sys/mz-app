<template>
  <div class="mz-craftsmen-detail-general-info">
    <mz-box-with-title :title="$t(`generalInfo.craftsmenInfoTitle`)"
                       icon-name="icon-user">

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

    <mz-box-with-title :title="$t(`generalInfo.itemsInfoTitle`)"
                       icon-name="icon-shop">

      <p class="description">
        {{craftsmenDetail.craftsmenBaseInfo.itemDescription}}
      </p>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`generalInfo.contactInfoTitle`)"
                       icon-name="icon-chat">

      <div class="contact">

        <div v-for="item in craftsmenDetail.craftsmenBaseInfo.contact"
             class="contact__wrapper">

          <div class="icon"
               :class="[ `icon-${ item.label }--primary` ]"></div>

          <span class="label">{{item.value}}</span>
        </div>
      </div>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`generalInfo.message`)"
                       icon-name="icon-chat">
      <div class="message-content">

        <mz-input v-model="message.title"
                  :holder="$t(`generalInfo.messageTitle`)"
                  class="message-content__title" />

        <mz-input-textarea class="message-content__input"
                           v-model="message.description" />

        <mz-button class="message-content__btn"
                   @click="sendMessage">{{ $t(`generalInfo.sendMessage`) }}
        </mz-button>
      </div>
    </mz-box-with-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue }      from 'vue-property-decorator';
import { namespace }           from 'vuex-class';
import mzCraftsmenDetailModule from '../store/craftsmen-detail.module';
import { ICraftsmenDetail }    from '@/views/craftsmen-detail/store/craftsmen-detail.interface';
import mzBoxWithTitle          from '@/components/box-with-title/box-with-title.component.vue';
import mzTag                   from '@/components/tag/tag.component.vue';
import mzInputTextarea         from '@/components/input-textarea/mz-input-textarea.component.vue';
import mzButton                from '@/components/buttons/button.component.vue';
import mzInput                 from '@/components/input/mz-input.component.vue';

const LOCAL_STORE: string = 'mzCraftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzTag,
    mzInput,
    mzButton,
    mzBoxWithTitle,
    mzInputTextarea,
  },
})
export default class mzCraftsmenDetailGeneralInfo extends Vue {
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState) public craftsmenDetail!: ICraftsmenDetail;

  public message = {
    title: '',
    description: '',
  };

  public sendMessage(message: string): void {
    this.message = {
      title: '',
      description: '',
    };
  }
}
</script>

<style lang="scss" scoped>
.mz-craftsmen-detail-general-info {
  width: 80rem;
  margin-left: 10rem;

  .description,
  .message-content {
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

  .message-content {

    &__input {
      margin: 2rem 0;
    }

    &__btn {
      width: 100%;
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