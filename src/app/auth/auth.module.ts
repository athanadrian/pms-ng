import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
