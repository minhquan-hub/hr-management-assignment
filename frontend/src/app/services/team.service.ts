import { TeamCreate } from './../models/teams/team-create';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user/user';
import { HttpService } from './http.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(
    private http: HttpService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  createMember(data: User): Observable<any> {
    return this.http.Post('/user', data, this.tokenStorageService.getToken());
  }

  createTeam(data: TeamCreate): Observable<any> {
    return this.http.Post('/team', data, this.tokenStorageService.getToken());
  }

  getAllTeam(): Observable<any> {
    return this.http.Get('/team', this.tokenStorageService.getToken());
  }

  getAllLeader(): Observable<any> {
    return this.http.Get(
      '/team/get-all-leader',
      this.tokenStorageService.getToken()
    );
  }

  getAllMemberByTeamId(teamId: string) {
    return this.http.Get(
      `/team/get-all-member/${teamId}`,
      this.tokenStorageService.getToken()
    );
  }

  removeMember(teamId: string, memberId: string) {
    return this.http.Put(
      `/team/remove-member/${teamId}`,
      memberId,
      this.tokenStorageService.getToken()
    );
  }

  deleteTeam(teamId: string) {
    return this.http.Delete(
      `/team/${teamId}`,
      this.tokenStorageService.getToken()
    );
  }
}
