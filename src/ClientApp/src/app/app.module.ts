import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DevisComponent } from './devis/devis.component';
import { GestionComponent } from './gestion/gestion.component';
import { ListeComponent } from './liste/liste.component';
import { VoirClientComponent } from './voir-client/voir-client.component';
import { LoginComponent } from './login/login.component';
import { DevisValideComponent } from './devis-valide/devis-valide.component';
import { Services } from './services';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DevisComponent,
    GestionComponent,
    ListeComponent,
    VoirClientComponent,
    LoginComponent,
    DevisValideComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'devis', component: DevisComponent },
      { path: 'gestion', component: GestionComponent },
      { path: 'liste', component: ListeComponent },
      { path: 'voir-client', component: VoirClientComponent },
      { path: 'login', component: LoginComponent },
      { path: 'devis-valide', component: DevisValideComponent },
    ])
  ],
  providers: [
    Services
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
