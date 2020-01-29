import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SingupComponent } from './singup/singup.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { ErrorComponent } from './error/error.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EducationComponent } from './education/education.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path : '', redirectTo : '/home', pathMatch : 'full' },
  {path : 'home', component : HomeComponent },
  {path : 'home/login', component : LoginComponent},
  {path : 'home/signup', component : SingupComponent},
  {path : 'mainHome', component : MainHomeComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
    children : [
      // {path :'', redirectTo :'profile',pathMatch : 'full' },
      {path : 'profile', component : ProfileComponent},
      {path : 'education', component : EducationComponent }
    ]
  },
  {path : 'error', component : ErrorComponent},
  {path : '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
