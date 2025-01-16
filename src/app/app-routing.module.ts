import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { LoginComponent } from '../pages/login/login.component';
import { AddUserComponent } from '../pages/add-user/add-user.component';

const routes: Routes =
  [
    { path: 'user-list', component: UserListComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'edit-user/:id', component: AddUserComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
    { path: '', redirectTo: 'login', pathMatch: 'full' }


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
