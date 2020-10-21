import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DevisComponent } from './devis/devis.component';
import { GestionComponent } from './gestion/gestion.component';
import { ListeComponent } from './liste/liste.component';
import { VoirClientComponent } from './voir-client/voir-client.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DevisComponent,
    GestionComponent,
    ListeComponent,
    VoirClientComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'devis', component: DevisComponent },
      { path: 'gestion', component: GestionComponent },
      { path: 'liste', component: ListeComponent },
      { path: 'voir-client', component: VoirClientComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
