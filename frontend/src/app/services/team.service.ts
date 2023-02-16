import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  getAllTeam(): Observable<any> {
    return this.http.Get('/team', this.tokenStorageService.getToken());
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
