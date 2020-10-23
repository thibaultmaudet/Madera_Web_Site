import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {
  devis: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.devis = this.fb.group({
      nom: '',
      adresse: '',
      codepostal: '',
      ville: '',
      telephone: '',
      mobile: '',
    });
  }
  
  Enregistrer() {
    alert('Enregistrer');
  }
}
