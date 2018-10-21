export class Address {
    id: number;
    typeAddressCode: number;
    street: string;
    housetNr: string;
    apartmentNr: string;
    postalCode: string;
    city: string;
    country: string;

constructor(type: number) {
    this.typeAddressCode = type;
}

}