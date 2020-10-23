import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IClient } from '../modele/client';
import { GestionService } from '../service/gestion.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-voir-client',
  templateUrl: './voir-client.component.html',
  styleUrls: ['./voir-client.component.css']
})
export class VoirClientComponent implements OnInit {

  client$: Observable<IClient>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gestionService: GestionService) { }

  ngOnInit() {

    this.client$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.gestionService.getClientById(Number.parseInt(params.get('id')))
      ));
  }

  modifierClient(client: IClient): void {

    this.client$.subscribe(client => {
      console.log('edit clicked');
      this.router.navigate(['clients/modifier/' + client.id]);
    });
  }

}
