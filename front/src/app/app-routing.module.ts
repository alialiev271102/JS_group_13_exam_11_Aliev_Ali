import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {ItemComponent} from "./pages/item/item.component";
import {OneItemComponent} from "./pages/one-item/one-item.component";

const routes: Routes = [
  {path: '', component: ItemComponent},
  {path: 'items/:id',component: OneItemComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
