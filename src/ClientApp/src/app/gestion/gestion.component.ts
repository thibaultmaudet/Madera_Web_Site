import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
//import { Lookup } from '../modele/lookup';
//import { LookupService } from 'src/app/shared/lookup.service';
import { Client, IClient } from '../modele/client';
import { GestionService } from '../service/gestion.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit, OnDestroy {

  private observableSubscription: Array<Subscription> = [];
  formSubmitted = false;
  clientForm = this.fb.group({});
 /* units: Observable<Lookup[]>;
  categories: Observable<Lookup[]>;*/

  constructor(private fb: FormBuilder,
   // private lookupService: LookupService,
    private gestionService: GestionService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.clientForm.addControl('id', new FormControl(''));
    this.clientForm.addControl('nom', new FormControl('', [Validators.required]));
    this.clientForm.addControl('adresse', new FormControl('', [Validators.required]));
    this.clientForm.addControl('codepostal', new FormControl('', [Validators.required]));
    this.clientForm.addControl('ville', new FormControl('', [Validators.required]));
    this.clientForm.addControl('telephone', new FormControl('', [Validators.required]));
    this.clientForm.addControl('mobile', new FormControl('', [Validators.required]));
   /* this.units = this.lookupService.getUnits();
    this.categories = this.lookupService.getProductCategories();*/

    const client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.gestionService.getClientById(Number.parseInt(params.get('id')))
      ));

    client$.subscribe(client=> {
      if (!isNullOrUndefined(client)) {
        console.log(client);
        this.clientForm.get('id').setValue(client.id);
        this.clientForm.get('nom').setValue(client.nom);
        this.clientForm.get('adresse').setValue(client.adresse);
        this.clientForm.get('codepostal').setValue(client.codepostal);
        this.clientForm.get('ville').setValue(client.ville);
        this.clientForm.get('telephone').setValue(client.telephone);
        this.clientForm.get('mobile').setValue(client.mobile);
      }
    })
  }

  ngOnDestroy() {
    this.observableSubscription.forEach(item => {
      item.unsubscribe();
      console.log(item, 'unsubscribed');
    });
  }

  Enregistrer($event: any): void {

    this.formSubmitted = true;
    if (!this.clientForm.valid) {
      return;
    }

    this.enregistrerClient();

    // navigate back to clients list
    this.router.navigate(['/clients']);
  }

  enregistrerClient(): void {
    const client = new Client();
    // map data from form to client
    client.id = this.clientForm.get('id').value;
    client.nom = this.clientForm.get('nom').value;
    client.adresse = this.clientForm.get('adresse').value;
    client.codepostal = this.clientForm.get('codepostal').value;
    client.ville = this.clientForm.get('telephone').value;
    client.telephone = this.clientForm.get('mobile').value;

    // save to database
   /* if (product.id == 0) {
      this.productService.addNewProduct(product);
    }
    else {
      this.productService.updateProduct(product);
    }*/
  }


  /*getLookupObjFromCode(code: string): Lookup {
    var lookup: Lookup = null;
    const subscription = this.units.subscribe(lookups => {
      lookup = lookups.find(item => item.code == code)
    })
    subscription.unsubscribe();
    return lookup;
  }*/

}
