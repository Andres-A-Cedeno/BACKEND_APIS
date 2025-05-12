/**
 * Aqui se encuentran los tipos de datos que se utilizan en el cliente
 */
//#region
type Billing = {
  address: string;
  city: string;
  country: string;
};

type Shipping = {
  city: string;
  address: string;
  country: string;
};

type Address = {
  street: string;
  city: string;
  country: string;
};

type Owner = {
  name: string;
  dni: string;
};

type Phone = {
  mobile: string;
  landline: string;
};

type Contacts = {
  id: string;
  fullname: string;
  position: string;
  phone: Phone;
  email: string;
  isProspect: string;
  status: true | false;
  address: Address;
};

type customer = {
  publicId: string;
  RUC: number;
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  sector: string;
  billing: Billing;
  shipping: Shipping;
  contacts: Contacts;
};

//#endregion

type customers = {
  owner: Owner;
  customer: customer;
};

export interface IClientModel {
  customers: customers;
}
