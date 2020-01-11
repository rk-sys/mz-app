import { ICraftsmenList } from '@/views/craftsmen/store/craftsmen.interface';

export const mzCraftsmen: ICraftsmenList = {
  craftsmenSortOption: [ 'name_ASC', 'name_DESC', 'rate_ASC', 'rate_DESC' ],
  defaultCraftsmenSortOption: 'name_ASC',
  craftsmenList: [],
  filters: {
    category: [
      {
        value: 'leather',
        icon: 'icon-leather--black',
      },
      {
        value: 'metal',
        icon: 'icon-anvil--black',
      },
      {
        value: 'wooden',
        icon: 'icon-wooden--black',
      },
      {
        value: 'wool',
        icon: 'icon-wool--black',
      },
      {
        value: 'eva',
        icon: 'icon-puzzle--black',
      },
      {
        value: 'latex',
        icon: 'icon-spray--black',
      },
      {
        value: 'all',
        icon: '',
      },
    ],
    targetGroup: [
      {
        value: 'reko',
        isSelected: true,
      },
      {
        value: 'larp',
        isSelected: true,
      },
      {
        value: 'cosplay',
        isSelected: true,
      },
    ],
    tags: [ 'miecze', 'topory', 'pianka', 'league of legends' ],
  },
};
