import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IClient, Client } from '../modele/client';
import { max } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private clients: Array<Client> = [
    { id: 1, nom: 'Eastern Mango pickle', adresse: 'mp500', codepostal: 84563, ville: 'montpellier', telephone: 100, mobile: 110 },
    { id: 2, nom: 'swad Mango pickle', adresse: 'mp500', codepostal: 41325, ville: 'dijon', telephone: 100, mobile: 110 },
    { id: 3, nom: 'Taste Buds Mango pickle', adresse: 'mp500', codepostal: 62310, ville: 'metz', telephone: 100, mobile: 110 },
    { id: 4, nom: 'Eastern Garlic pickle', adresse: 'mp500', codepostal: 65231, ville: 'strasbourg', telephone: 100, mobile: 110 },
    { id: 5, nom: 'Eastern Lemon pickle', adresse: 'mp500', codepostal: 35695, ville: 'nancy', telephone: 100, mobile: 110 },
    { id: 6, nom: 'Eastern Tuna pickle', adresse: 'mp500', codepostal: 95684, ville: 'angers', telephone: 100, mobile: 110 },
    { id: 7, nom: 'Eastern Serdine pickle', adresse: 'mp500', codepostal: 45662, ville: 'marseille', telephone: 100, mobile: 110 },
    { id: 8, nom: 'Eastern squids pickle', adresse: 'mp500', codepostal: 95632, ville: 'paris', telephone: 100, mobile: 110 },
    { id: 9, nom: 'Eastern tomoto pickle', adresse: 'mp500', codepostal: 44000, ville: 'toulouse', telephone: 100, mobile: 110 },
    { id: 10, nom: 'Melam Mango pickle', adresse: 'mp500', codepostal: 100, ville: 'bordeaux', telephone: 100, mobile: 110 },
    { id: 11, nom: 'Kroger Mango pickle', adresse: 'mp500', codepostal: 100, ville: 'nantes', telephone: 100, mobile: 110 },
  ];

  constructor() { }

  getAllClients(): Observable<IClient[]> {
    return of(this.clients)
  }

  getClientById(id: number): Observable<IClient> {
    var client = this.clients.find(item => item.id === id);
    return of(client);
  }

  addNewClient(client: IClient): void {
    this.clients.sort(item => item.id)
    client.id = this.clients.length + 1
    this.clients.push(client);
  }

  supprimerClient(client: IClient): IClient[] {
    const index = this.clients.findIndex(item => item.id === client.id);
    const deletedItem = this.clients.splice(index, 1);

    return deletedItem;
  }

  modifierClient(client: IClient): void {

    const index = this.clients.findIndex(item => item.id === client.id);
    this.clients[index] = client;
  }

}
