import { ActivatedRoute } from '@angular/router';
import { TeamService } from './../services/team.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user/user';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-team',
  templateUrl: './detail-team.component.html',
  styleUrls: ['./detail-team.component.css'],
})
export class DetailTeamComponent implements OnInit {
  memberList: User[] = [];
  teamId: string | null = '';
  iconDelete = faTrash;
  iconEdit = faEdit;
  subscriptionMember: Subscription | undefined;

  constructor(
    private teamService: TeamService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.teamId = this.activeRouter.snapshot.paramMap.get('id');
    this.subscriptionMember = this.getAllMember();
  }

  getAllMember(): Subscription {
    return this.teamService
      .getAllMemberByTeamId(this.teamId!)
      .subscribe((data: any) => {
        this.memberList = data;
      });
  }

  removeMember(memberId: string) {
    this.teamService.removeMember(this.teamId!, memberId).subscribe((data) => {
      if (this.subscriptionMember) {
        this.subscriptionMember.unsubscribe();
      }
      this.subscriptionMember = this.getAllMember();
    });
  }
}
