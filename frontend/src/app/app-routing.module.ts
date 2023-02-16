import { AuthGuard } from './shared/auth.guard';
import { MemberComponent } from './member/member.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { Role } from './models/enum/role';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Leader] },
  },
  {
    path: 'member',
    component: MemberComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Member] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
