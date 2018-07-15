import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VaultComponent } from './vault/vault.component';
import { SecurityService } from './security.service';

@NgModule({
  declarations: [
    AppComponent,
    VaultComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
