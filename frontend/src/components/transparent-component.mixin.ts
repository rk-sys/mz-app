import { Component, Vue } from 'vue-property-decorator';

@Component
export default class mzTransparentWrapper extends Vue {
  get listeners() {
    const { ...listeners } = (this as any).$listeners;
    return listeners;
  }

  get attributes() {
    const { ...attrs } = (this as any).$attrs;
    return attrs;
  }
}
