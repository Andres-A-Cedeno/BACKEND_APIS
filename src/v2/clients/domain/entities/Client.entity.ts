import { IClientModel } from "../interfaces/client.interface";

export class ClientModel {
  constructor(private IclientModel: IClientModel) {}

  get customerId() {
    return this.IclientModel.customers.customer.publicId;
  }

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
    return this.IclientModel.customers.owner.name;
  }

  set userCustomerName(name: string) {
    this.IclientModel.customers.owner.name = name;
  }

  get userCustomerDni() {
    return this.IclientModel.customers.owner.dni;
  }

  set userCustomerDni(dni: string) {
    this.IclientModel.customers.owner.dni = dni;
  }

  get customerSector() {
    return this.IclientModel.customers.customer.sector;
  }

  set customerSector(sector: string) {
    this.IclientModel.customers.customer.sector = sector;
  }

  get customerContacts() {
    return this.IclientModel.customers.customer.contacts;
  }

  set customerContacts(
    contacts: IClientModel["customers"]["customer"]["contacts"]
  ) {
    this.IclientModel.customers.customer.contacts = contacts;
  }

  get customerContactsId() {
    return this.IclientModel.customers.customer.contacts.id;
  }

  set customerContactsId(id: string) {
    this.IclientModel.customers.customer.contacts.id = id;
  }

  get customerContactsFullname() {
    return this.IclientModel.customers.customer.contacts.fullname;
  }

  set customerContactsFullname(fullname: string) {
    this.IclientModel.customers.customer.contacts.fullname = fullname;
  }

  get customerContactsPosition() {
    return this.IclientModel.customers.customer.contacts.position;
  }

  set customerContactsPosition(position: string) {
    this.IclientModel.customers.customer.contacts.position = position;
  }

  get customerContactsPhone() {
    return this.IclientModel.customers.customer.contacts.phone;
  }

  set customerContactsPhone(
    phone: IClientModel["customers"]["customer"]["contacts"]["phone"]
  ) {
    this.IclientModel.customers.customer.contacts.phone = phone;
  }

  get customerContactsEmail() {
    return this.IclientModel.customers.customer.contacts.email;
  }

  set customerContactsEmail(email: string) {
    this.IclientModel.customers.customer.contacts.email = email;
  }

  get customerContactsIsProspect() {
    return this.IclientModel.customers.customer.contacts.isProspect;
  }

  set customerContactsIsProspect(isProspect: string) {
    this.IclientModel.customers.customer.contacts.isProspect = isProspect;
  }

  get customerContactsStatus() {
    return this.IclientModel.customers.customer.contacts.status;
  }

  set customerContactsStatus(status: boolean) {
    this.IclientModel.customers.customer.contacts.status = status;
  }
}
