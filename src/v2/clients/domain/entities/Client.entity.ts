import { IClientModel } from "../interfaces/client.interface";

export class ClientModel {
  constructor(private IclientModel: IClientModel) {}

  get customerName() {
    return this.IclientModel.customers.customer.name;
  }

  set customerName(name: string) {
    this.IclientModel.customers.customer.name = name;
  }

  get customerType() {
    return this.IclientModel.customers.customer.type;
  }

  set customerType(type: string) {
    this.IclientModel.customers.customer.type = type;
  }

  get customerRUC() {
    return this.IclientModel.customers.customer.RUC;
  }

  set customerRUC(RUC: number) {
    this.IclientModel.customers.customer.RUC = RUC;
  }

  get customerBillingAddress() {
    return this.IclientModel.customers.customer.billing.address;
  }

  set customerBillingAddress(address: string) {
    this.IclientModel.customers.customer.billing.address = address;
  }

  get customerBillingCity() {
    return this.IclientModel.customers.customer.billing.city;
  }

  set customerBillingPhone(city: string) {
    this.IclientModel.customers.customer.billing.city = city;
  }

  get customerBillingCountry() {
    return this.IclientModel.customers.customer.billing.country;
  }

  set customerBillingCountry(country: string) {
    this.IclientModel.customers.customer.billing.country = country;
  }

  get customerShippingAddress() {
    return this.IclientModel.customers.customer.shipping.address;
  }

  set customerShippingAddress(address: string) {
    this.IclientModel.customers.customer.shipping.address = address;
  }

  get customerShippingCity() {
    return this.IclientModel.customers.customer.shipping.city;
  }

  set customerShippingCity(city: string) {
    this.IclientModel.customers.customer.shipping.city = city;
  }

  get customerShippingCountry() {
    return this.IclientModel.customers.customer.shipping.country;
  }

  set customerShippingCountry(country: string) {
    this.IclientModel.customers.customer.shipping.country = country;
  }

  get userCustomerName() {
    return this.IclientModel.customers.user.name;
  }

  set userCustomerName(name: string) {
    this.IclientModel.customers.user.name = name;
  }

  get userCustomerDni() {
    return this.IclientModel.customers.user.dni;
  }

  set userCustomerDni(dni: string) {
    this.IclientModel.customers.user.dni = dni;
  }

  get customerSector() {
    return this.IclientModel.customers.customer.sector;
  }

  set customerSector(sector: string) {
    this.IclientModel.customers.customer.sector = sector;
  }
}
