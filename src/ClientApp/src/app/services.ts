import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Client } from './models/clients';

@Injectable()
export class Services { 
    constructor(private httpClient: HttpClient) { }
    private baseUrl = window.location.origin + '/api/';

    getClientsInformations(): Observable<Client[]> {
        return this.httpClient.get<Client[]>(this.baseUrl + 'clients/getClientsInformations');
    }

    addClient(client: Client) {
        return this.httpClient.get(this.baseUrl + 'clients/getClientsInformations/${idClient}');
    }
    
    getAllClientInformations(idClient: number) : Observable<Client> {
        return this.httpClient.get<Client>(this.baseUrl + 'clients/getClientsInformations/${idClient}');
    }

    handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
           console.error('Client Side Error :', errorResponse.error.message);
        } else {
          console.error('Server Side Error :', errorResponse);
        }
   
       return throwError('There is a problem with the service. We are notified & working on it.Please try again later.');
      }
}