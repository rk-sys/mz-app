<template>
  <mz-dialog-upload-portfolio :visible.sync="dialogVisible"
                              class="mz-dialog">

    <div @click="$refs.pictureUpload.click()"
         class="mz-dialog__picture-content">

      <input @change="onFileChange"
             class="mz-dialog__picture-content__input-upload"
             ref="pictureUpload"
             type="file" />

      <template v-if="!newItem.pictureUrl">
        <div class="icon icon-upload"></div>
        <span class="label">{{ $t(`addPicture`) }}</span>
      </template>

      <template v-else>
        <img :alt="newItem.title"
             :src="newItem.pictureUrl"
             class="mz-dialog__picture-content__picture" />
      </template>
    </div>

    <div class="mz-dialog__content">
      <mzForm :form-ref.sync="formDisplayedPortfolio"
              :model="newItem"
              :rules="portfolioRules">

        <mz-form-item :label="$t(`label.title`)"
                      class="mz-dialog__content__form-item"
                      prop="title">

          <mz-input :holder="$t(`form.title`)"
                    id="title"
                    v-model="newItem.title" />
        </mz-form-item>

        <mz-form-item :label="$t(`label.description`)"
                      class="mz-dialog__content__form-item"
                      prop="description">

          <mz-input-textarea id="description"
                             v-model="newItem.description" />
        </mz-form-item>

        <mz-form-item :label="$t(`label.title`)"
                      class="mz-dialog__content__form-item">

          <mz-input :disabled="newItem.tags.length >= 10"
                    :holder="$t(`form.tag`)"
                    @keyup.enter.native="addTag(userTag)"
                    v-model="userTag" />

          <div @click="addTag(userTag)"
               class="mz-dialog__content__form-item__add-btn"
               v-if="!newItem.tags.length < 10">

            +
          </div>
        </mz-form-item>

        <div class="mz-dialog__content__tag-list">
          <mz-tag :index="index"
                  :key="index"
                  :removeTag="removeTag"
                  :tag="tag"
                  v-for="(tag, index) in newItem.tags" />
        </div>
      </mzForm>

      <mz-button @click="onSubmit"
                 buttonStyle="primary"
                 class="mz-dialog__content__button"
                 form="newItemPortfolio">

        {{ $t(`form.save`) }}
      </mz-button>
    </div>
  </mz-dialog-upload-portfolio>
</template>

<script lang="ts">
import { Component, Vue }      from 'vue-property-decorator';
import { namespace }           from 'vuex-class';
import { i18n }                from '@/i18n/i18n';
import mzUserAccountModule     from '../../store/user-account.module';
import mzButton                from '@/components/buttons/button.component.vue';
import mzDialogUploadPortfolio from '@/components/dialog/dialog-upload-portfolio.component.vue';
import mzInput                 from '@/components/input/mz-input.component.vue';
import mzTag                   from '@/components/tag/tag.component.vue';
import mzInputTextarea         from '@/components/input-textarea/mz-input-textarea.component.vue';
import mzFormItem              from '@/components/form/form-item/form-item.component.vue';
import mzForm                  from '@/components/form/form/form.component.vue';
import { IItemPortfolio }      from '@/views/user-account/store/user-account.interface';


const LOCAL_STORE: string = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzDialogUploadPortfolio,
    mzForm,
    mzFormItem,
    mzInput,
    mzInputTextarea,
    mzButton,
    mzTag,
  },
})
export default class mzPortfolioModal extends Vue {
  @local.State((state: mzUserAccountModule) => state.dialogVisible) public isDialogVisible!: boolean;
  @local.State((state: mzUserAccountModule) => state.mzNewItemPortfolio) public newItem!: IItemPortfolio;
  @local.Mutation public setNewItemPortfolioPicture!: (arg: any) => void;
  @local.Mutation public setTagToNewItemPortfolio!: (arg: string) => void;
  @local.Mutation public removeTagFromNewItemPortfolio!: (arg: number) => void;
  @local.Mutation public setDialogVisible!: (arg: boolean) => void;
  @local.Action public saveNewItemPortfolio!: () => void;

  public formDisplayedPortfolio: HTMLElement | null = null;
  public userTag: string = '';
  public disabledTagInput: boolean = false;

  set dialogVisible(status: boolean) {
    if (status) {
      this.setDialogVisible(status);
    } else {
      this.saveNewItemPortfolio();
    }
  }

  get dialogVisible(): boolean {
    return this.isDialogVisible;
  }

  public portfolioRules: any = {
    title: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
    description: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
  };

  public onFileChange(file: any): void {
    const blobFile = new Blob([ file.target.files[ 0 ] ], { type: file.target.files [ 0 ].type });
    this.setNewItemPortfolioPicture(blobFile);
  }

  public removeTag(index: number): void {
    this.removeTagFromNewItemPortfolio(index);
  }

  public addTag(userTag: string): void {
    if (userTag) {
      this.setTagToNewItemPortfolio(userTag);
      this.userTag = '';
    }
  }

  public async onSubmit(): Promise<void> {
    (this.formDisplayedPortfolio as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.saveNewItemPortfolio();
        } catch (e) {
          throw new Error(e);
        }
      }
    });
  }
}
</script>

<style lang="scss">
.el-form-item__error {
  bottom: -1rem;
  font-size: 1.6rem;
  top: auto;
  font-weight: bold;
  left: auto;
  right: 0;
}

.el-form-item {
  margin: 0;

  &__label {
    line-height: 10rem;
  }
}
</style>
<style lang="scss"
       scoped>

.mz-dialog {
  &__picture-content {
    border-radius: 2px;
    margin-right: 1rem;
    border: 2px dashed var(--gray-500);
    width: 50%;
    height: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--gray-900);
    cursor: pointer;

    &:hover {
      background: var(--primary-color);
      color: var(--primary-color);
      border: 2px solid var(--primary-color);

      .label {
        color: var(--white);
      }
    }

    &__input-upload {
      display: none;
    }

    &__picture {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .icon {
      width: 12rem;
      height: 12rem;
      margin-bottom: 2rem;
    }

    .label {
      font-size: 3.2rem;
      font-weight: var(--font-medium);
    }
  }

  &__content {
    margin-left: 1rem;
    padding-left: 2rem;
    width: 50%;

    &__form-item {
      margin-bottom: 2rem;
      width: 100%;

      &__add-btn {
        color: var(--primary-color);
        border: .2rem solid var(--primary-color);
        background-color: var(--white);
        border-radius: 50%;
        height: 2.5rem;
        width: 2.5rem;
        font-size: 3.5rem;
        font-weight: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 3.5rem;
        right: 0;
        cursor: pointer;
        transition: .4s;
        z-index: 1;

        &:hover {
          color: var(--white);
          background-color: var(--primary-color);
          border: .2rem solid var(--primary-color);
        }
      }
    }

    &__tag-list {
      padding: 0 0 2.5rem 5rem;
      min-height: 5rem;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }

    &__button {
      max-width: 14rem;
      position: absolute;
      bottom: 2rem;
      right: 2rem;
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-dialog {
    &__picture-content {
      margin-right: 0;
      width: 100%;
      height: 25rem;

      &:hover {
        border: .4rem dashed var(--primary-color);
        color: var(--primary-color);
      }
    }

    &__content {
      width: 100%;
      margin-left: 0;
      padding-left: 0;
    }
  }
}

</style>
