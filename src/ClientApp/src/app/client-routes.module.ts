import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { GestionComponent } from './gestion/gestion.component';
import { VoirClientComponent } from './voir-client/voir-client.component';

const routes: Routes = [
  {
    path:'',
    component:ListeComponent
  },{
    path:'ajouter',
    component:GestionComponent
  },
  {
    path:'supprimer/:id',
    component:GestionComponent
  },
  {
    path: 'voir/:id',
    component:VoirClientComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutesModule { }
