import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Client, IClient } from '../modele/client';
import { GestionService } from '../service/gestion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent implements OnInit {

  public clients: Observable<IClient[]> = null;
  constructor(
    private router: Router,
    private gestionService: GestionService) { }

  ngOnInit() {
    this.clients = this.gestionService.getAllClients()
  }

  supprimerClient(client): void {
    const result = this.gestionService.supprimerClient(client);
    console.log(result);
  }

  voirClient(client: IClient): void {
    this.router.navigate(['voir-client/voir/' + client.id]);
  }

}
