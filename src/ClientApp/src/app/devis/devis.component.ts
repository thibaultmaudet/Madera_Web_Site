import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from '../models/clients';
import { Services } from '../services';


@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {
  devis: FormGroup;

  public clients: Client[];
  public selectedClient: Client;

  constructor(private services: Services, private fb: FormBuilder) { }

  ngOnInit() {
    this.devis = this.fb.group({
      nom: '',
      adresse: '',
      codepostal: '',
      ville: '',
      telephone: '',
      mobile: '',
    });

    this.services.getClientsInformations().subscribe(result => {
        this.clients = result;
    }, error => console.error(error));
  }
  
  Enregistrer() {
    alert('Enregistrer');
  }
}
