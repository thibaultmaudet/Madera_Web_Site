import { Lookup } from './lookup';

export interface IClient {
  id: number;
  nom: string;
  adresse: string;
  codepostal: number;
  ville: string;
  telephone: number;
  mobile: number
}
export class Client {
  id: number;
  nom: string;
  adresse: string;
  codepostal: number;
  ville: string;
  telephone: number;
  mobile: number
  constructor(nom?: string, adresse?: string, codepostal?: number, ville?: string, telephone?: number, mobile?: number) {
    this.nom = nom;
    this.adresse = adresse;
    this.codepostal = codepostal;
    this.ville = ville;
    this.telephone = telephone;
    this.mobile = mobile;
  }
}
