type User = {
  name: string;
  dni: string;
};

type Billing = {
  address: string;
  city: string;
  country: string;
};

type Shipping = {
  address: string;
  city: string;
  country: string;
};

type customer = {
  RUC: number;
  sector: string;
  name: string;
  type: string;
  billing: Billing;
  shipping: Shipping;
};

type customers = {
  user: User;
  customer: customer;
};

export interface IClientModel {
  customers: customers;
}
