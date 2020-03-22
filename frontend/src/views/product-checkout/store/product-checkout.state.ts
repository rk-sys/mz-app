import { IInformationCheckout, IProductCheckout } from './product-checkout.interface';

export const productCheckout: IProductCheckout = {
  productSummary: {
    title: '',
    description: '',
    price: null,
    currency: '',
    city: '',
    craftsman: {
      picture: '',
      name: '',
    },
  },
  productDeliveryOptions: [],
};

export const checkoutInformation: IInformationCheckout = {
  label: '',
  deliveryOption: '',
  address: {
    selected: false,
    data: null,
  },
};
