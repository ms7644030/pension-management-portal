import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PensionPortalComponent } from './components/pension-portal/pension-portal.component';
import { AddPensionerComponent } from './components/add-pensioner/add-pensioner.component';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PensionService } from './services/pension.service';
import { LoginComponent } from './components/login/login.component';
import { AuthServiceService } from './services/auth-service.service';
import { TokenstorageService } from './services/tokenstorage.service';
import { SharedService } from './services/shared.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PensionPortalComponent,
    AddPensionerComponent,
    SpinnerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PensionService,
    AuthServiceService,
    TokenstorageService,
    SharedService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
