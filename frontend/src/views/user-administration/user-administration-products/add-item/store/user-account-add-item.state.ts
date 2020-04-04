import { IAddItemGeneralInfo, IAddItemNewItem, IDeliveryOption, IPersonalPickupDeliveryOption } from './user-account-add-item.interface';

export const addItemGeneralInfo: IAddItemGeneralInfo = {
  listOfMainRange: [
    {
      label: 'larp',
    },
    {
      label: 'cosplay',
    },
    {
      label: 'reconstruction',
    },
  ],
  currency: [
    {
      label: 'zl',
    },
  ],
  gender: [
    {
      label: 'male',
    },
    {
      label: 'female',
    },
    {
      label: 'unisex',
    },
    {
      label: 'noMatter',
    },
  ],
  listOfCategory: [
    {
      mainCategory: 'weapon',
      selected: false,
      listOfSubCategory: [
        {
          label: 'daggers',
        },
        {
          label: 'oneHandSwords',
        },
        {
          label: 'twoHandSwords',
        },
        {
          label: 'axesHammers',
        },
        {
          label: 'bows',
        },
        {
          label: 'shields',
        },
        {
          label: 'weaponsThrow',
        },
        {
          label: 'other',
        },
      ],
    },
    {
      mainCategory: 'armor',
      selected: false,
      listOfSubCategory: [
        {
          label: 'quivers',
        }, {
          label: 'gambesons',
        },
        {
          label: 'chainMail',
        },
        {
          label: 'breastplates',
        },
        {
          label: 'shoulders',
        },
        {
          label: 'helmets',
        },
        {
          label: 'bevors',
        },
        {
          label: 'bracers',
        },
        {
          label: 'gloves',
        },
        {
          label: 'greaves',
        },
        {
          label: 'setArmor',
        },
        {
          label: 'other',
        },
      ],
    },
    {
      mainCategory: 'costume',
      selected: false,
      listOfSubCategory: [
        {
          label: 'shirts',
        },
        {
          label: 'zhupans',
        },
        {
          label: 'trousers',
        },
        {
          label: 'skirts',
        },
        {
          label: 'headCovering',
        },
        {
          label: 'pouch',
        },
        {
          label: 'shoes',
        },
        {
          label: 'accessories',
        },
        {
          label: 'other',
        },
      ],
    },
    {
      mainCategory: 'other',
      selected: false,
      listOfSubCategory: [
        {
          label: 'plates',
        },
        {
          label: 'tents',
        },
        {
          label: 'masks',
        },
        {
          label: 'other',
        },
      ],
    },
  ],
};

export const parcelLockerDelivery: IDeliveryOption = {
  isSelected: false,
  title: 'parcelLocker',
  options: [],
};

export const courierDelivery: IDeliveryOption = {
  isSelected: false,
  title: 'courier',
  options: [],
};

export const letterDelivery: IDeliveryOption = {
  isSelected: false,
  title: 'letter',
  options: [],
};

export const personalPickupDelivery: IPersonalPickupDeliveryOption = {
  title: 'personalPickup',
  isSelected: false,
  address: '',
  name: '',
  city: '',
  phone: '',
  mail: '',
};

export const newItem: IAddItemNewItem = {
  mainRange: '',
  mainCategory: '',
  subCategory: '',
  title: '',
  price: '',
  description: '',
  gender: 'noMatter',
  tags: [],
  pictures: [],
  isNew: true,
  mainPicture: {
    url: '',
    file: null,
  },
  currency: 'zl',
  parcelLockerDelivery: [],
  courierDelivery: [],
  letterDelivery: [],
  personalPickupDelivery: null,
};
