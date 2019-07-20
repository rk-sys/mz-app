<template>
  <div class="mz-social-media">

    <div class="mz-social-media__icon icon-facebook"
         :class="{'icon--light': isLight,
             'icon--dark': !isLight,
             'icon-facebook--color': facebookWhite && !isLight,}"
         @mouseover="changeColor($event.target)"
         @mouseleave="removeColor($event.target)"></div>

    <div class="mz-social-media__icon icon-youtube"
         :class="{'icon--light': isLight,
             'icon--dark': !isLight,
             'icon-youtube--color': youtubeWhite && !isLight}"
         @mouseover="changeColor($event.target)"
         @mouseleave="removeColor($event.target)"></div>

    <div class="mz-social-media__icon icon-twitter"
         :class="{'icon--light': isLight,
             'icon--dark': !isLight,
             'icon-twitter--color': twitterWhite && !isLight,}"
         @mouseover="changeColor($event.target)"
         @mouseleave="removeColor($event.target)"></div>

  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class mzSocialMedia extends Vue {
  @Prop(Boolean) public readonly isLight!: boolean;
  public facebookWhite: boolean = false;
  public youtubeWhite: boolean = false;
  public twitterWhite: boolean = false;

  @Emit()
  public changeColor(e: any) {
    const classes = e.className;
    if (classes.includes('facebook')) {
      this.facebookWhite = true;
    } else if (classes.includes('youtube')) {
      this.youtubeWhite = true;
    } else if (classes.includes('twitter')) {
      this.twitterWhite = true;
    }
  }

  @Emit()
  public removeColor(e: any) {
    const classes = e.className;
    if (classes.includes('facebook')) {
      this.facebookWhite = false;
    } else if (classes.includes('youtube')) {
      this.youtubeWhite = false;
    } else if (classes.includes('twitter')) {
      this.twitterWhite = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.mz-social-media {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .mz-social-media__icon {
    width: 3rem;
    height: 3rem;
    margin-right: 2.5rem;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }

  .icon {
    &--dark {
      opacity: (.5);
      filter: brightness(.2);

      &:hover {
        opacity: (1);
        filter: brightness(1);
      }
    }

    &--light {
      opacity: (.5);

      &:hover {
        opacity: (1);
      }
    }
  }
}
</style>
