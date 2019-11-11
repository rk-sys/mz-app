<template>
  <mz-box-with-title :title="$t(`boxTitle.contact`)">
    <mz-form class="user-account-info__form user-account-info__form--contact">

      <div class="form__container">
        <div class="form__container__icon icon-locked--green"></div>

        <mz-form-item class="form__container__item">
          <mz-input :holder="$t(`form.phone`)"></mz-input>
        </mz-form-item>
      </div>

      <div class="form__container">
        <div class="form__container__icon icon-mail--green"></div>

        <mz-form-item class="form__container__item">
          <mz-input :holder="$t(`form.email`)"></mz-input>
        </mz-form-item>
      </div>

      <div class="form__container">
        <div class="form__container__icon icon-facebook--color"></div>

        <mz-form-item class="form__container__item">
          <mz-input :holder="$t(`form.facebook`)"></mz-input>
        </mz-form-item>
      </div>

      <div class="form__container">
        <div class="form__container__icon icon-locked--green"></div>

        <mz-form-item class="form__container__item">
          <mz-input :holder="$t(`form.website`)"></mz-input>
        </mz-form-item>
      </div>

      <div class="form__container">
        <div class="form__container__icon icon-locked--green"></div>

        <mz-form-item class="form__container__item">
          <mz-input :holder="$t(`form.address`)"></mz-input>
        </mz-form-item>
      </div>

      <div class="user-account-info__form__button">
        <mz-button buttonStyle="primary"
                   native-type="submit">{{$t(`form.save`)}}
        </mz-button>
      </div>
    </mz-form>
  </mz-box-with-title>
</template>

<script>
export default {
  name: 'contact.component',
};
</script>

<style scoped>

</style>
