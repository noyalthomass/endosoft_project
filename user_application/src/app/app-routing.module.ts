import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('../auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'user-dashboard',
    loadComponent: () =>
      import('../components/user-dashboard/user-dashboard.component').then(
        (m) => m.UserDashboardComponent
      ),
  },
  {
    path: 'add-edit',
    loadComponent: () =>
      import(
        '../components/user-add-and-edit/user-add-and-edit.component'
      ).then((m) => m.UserAddAndEditComponent),
  },
  {
    path: 'add-edit/:id',
    loadComponent: () =>
      import(
        '../components/user-add-and-edit/user-add-and-edit.component'
      ).then((m) => m.UserAddAndEditComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../components/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
