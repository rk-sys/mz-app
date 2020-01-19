<template>
  <div class="mz-social-media">
    <a v-if="facebookUrl"
       :href="facebookUrl"
       :class="{'icon--light': isLight,
             'icon--dark': !isLight,
             'icon-facebook--green': facebookWhite && !isLight,}"
       @mouseleave="removeColor($event.target)"
       @mouseover="changeColor($event.target)"
       class="mz-social-media__icon icon-facebook"></a>

    <a v-if="youtubeUrl"
       :href="youtubeUrl"
       :class="{'icon--light': isLight,
             'icon--dark': !isLight,
             'icon-youtube--color': youtubeWhite && !isLight}"
       @mouseleave="removeColor($event.target)"
       @mouseover="changeColor($event.target)"
       class="mz-social-media__icon icon-youtube"></a>

    <a v-if="twitterUrl"
       :href="twitterUrl"
       :class="{'icon--light': isLight,
             'icon--dark': !isLight,
             'icon-twitter--color': twitterWhite && !isLight,}"
       @mouseleave="removeColor($event.target)"
       @mouseover="changeColor($event.target)"
       class="mz-social-media__icon icon-twitter"></a>

    <a v-if="instagramUrl"
       :href="instagramUrl"
       :class="{'icon--light': isLight,
             'icon--dark': !isLight,
             'icon-instagram--green': instagramWhite && !isLight,}"
       @mouseleave="removeColor($event.target)"
       @mouseover="changeColor($event.target)"
       class="mz-social-media__icon icon-instagram"></a>

  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';

@Component
export default class mzSocialMedia extends Vue {
  @Prop(String) public facebookUrl!: string;
  @Prop(String) public youtubeUrl!: string;
  @Prop(String) public twitterUrl!: string;
  @Prop(String) public instagramUrl!: string;
  @Prop(Boolean) public readonly isLight!: boolean;
  public facebookWhite: boolean = false;
  public youtubeWhite: boolean = false;
  public twitterWhite: boolean = false;
  public instagramWhite: boolean = false;

  @Emit()
  public changeColor(e: any) {
    const classes = e.className;
    if (classes.includes('facebook')) {
      this.facebookWhite = true;
    } else if (classes.includes('youtube')) {
      this.youtubeWhite = true;
    } else if (classes.includes('twitter')) {
      this.twitterWhite = true;
    } else if (classes.includes('instagram')) {
      this.instagramWhite = true;
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
    } else if (classes.includes('instagram')) {
      this.instagramWhite = false;
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
