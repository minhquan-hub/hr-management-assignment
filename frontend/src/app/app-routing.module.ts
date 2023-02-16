import { DetailTeamComponent } from './detail-team/detail-team.component';
import { AuthGuard } from './shared/auth.guard';
import { MemberComponent } from './member/member.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { Role } from './models/enum/role';
import { CreateMemberComponent } from './create-member/create-member.component';
import { CreateTeamComponent } from './create-team/create-team.component';

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
    path: 'management-detail/:id',
    component: DetailTeamComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Leader] },
  },
  {
    path: 'member',
    component: MemberComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Member] },
  },
  {
    path: 'management/create-team',
    component: CreateTeamComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'management/create-member',
    component: CreateMemberComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Leader] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
