import { TokenStorageService } from './../services/token-storage.service';
import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import {
  faTrash,
  faEdit,
  faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Team } from '../models/teams/team';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  teamList: Team[] = [];
  memberCount: number = 0;
  isDisabled: string | null = '';
  iconPlus = faSquarePlus;
  iconDelete = faTrash;
  iconEdit = faEdit;
  subscriptionTeam: Subscription | undefined;

  constructor(
    private teamService: TeamService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.subscriptionTeam = this.getAllTeam();
    this.onDisabled();
  }

  getAllTeam(): Subscription {
    return this.teamService.getAllTeam().subscribe((data) => {
      this.teamList = data;
    });
  }

  deleteTeam(teamId: string) {
    this.teamService.deleteTeam(teamId).subscribe(() => {
      if (this.subscriptionTeam) {
        this.subscriptionTeam.unsubscribe();
      }
      this.subscriptionTeam = this.getAllTeam();
    });
  }

  onDisabled() {
    if (this.tokenStorageService.getRole() === 'leader') {
      this.isDisabled = 'disabled';
    }
  }
}
