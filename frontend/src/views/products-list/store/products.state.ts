import { IProductsList } from '@/views/products-list/store/products.interface';

export const mzProducts: IProductsList = {
  defaultProductsSortOption: 'name_ASC',
  productsSortOption: [ 'name_ASC', 'name_DESC', 'price_ASC', 'price_DESC' ],
  productList: [],
  filters: {
    category: [
      {
        title: 'weapon',
        items: [ 'daggers', 'oneHandSwords', 'twoHandSwords', 'axesHammers', 'bows', 'shields', 'weaponsThrow', 'other' ],
      },
      {
        title: 'armor',
        items: [ 'quivers', 'gambesons', 'chainMail', 'breastplates', 'shoulders', 'helmets', 'bevors', 'greaves', 'bracers', 'gloves', 'setArmor', 'other' ],
      },
      {
        title: 'costume',
        items: [ 'shirts', 'zhupans', 'trousers', 'skirts', 'headCovering', 'shoes', 'pouch', 'accessories', 'other' ],
      },
      {
        title: 'other',
        items: [ 'plates', 'tents', 'masks' ],
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
    tags: [ 'drewno', 'BQ', 'Fort' ],
    gender: {
      male: false,
      female: false,
      unisex: false,
      noMatter: true,
    },
    condition: {
      isNew: true,
      used: true,
    },
    price: { minValue: '', maxValue: '' },
  },
};
