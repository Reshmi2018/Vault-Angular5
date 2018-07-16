import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { VaultComponent } from './vault/vault.component';
import { SecurityService } from './security.service';
import { OptionComponent } from './option/option.component';

@NgModule({
  declarations: [
    AppComponent,
    VaultComponent,
    OptionComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FontAwesomeModule
  ],
  providers: [SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
