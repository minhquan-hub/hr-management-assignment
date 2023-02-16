import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { Team } from '../models/teams/team';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent implements OnInit {
  teamList: Team[] = [];
  memberCount: number = 0;
  iconDelete = faTrash;
  iconEdit = faEdit;
  subscriptionTeam: Subscription | undefined;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.subscriptionTeam = this.getAllTeam();
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
}
