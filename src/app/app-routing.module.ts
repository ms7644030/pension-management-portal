import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPensionerComponent } from './components/add-pensioner/add-pensioner.component';
import { LoginComponent } from './components/login/login.component';
import { PensionPortalComponent } from './components/pension-portal/pension-portal.component';

const routes: Routes = [
  { path: '', redirectTo: 'pensioner/login', pathMatch: 'full' },
  { path: 'pensioner/admin', component: PensionPortalComponent },
  { path: 'pensioner/add', component: AddPensionerComponent },
  { path: 'pensioner/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
