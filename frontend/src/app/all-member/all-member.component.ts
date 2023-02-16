import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { User } from '../models/user/user';
import { TeamService } from '../services/team.service';

type NewType = Subscription;

@Component({
  selector: 'app-all-member',
  templateUrl: './all-member.component.html',
  styleUrls: ['./all-member.component.css'],
})
export class AllMemberComponent implements OnInit {
  memberList: User[] = [];
  iconDelete = faTrash;
  iconEdit = faEdit;
  subscriptionMember: Subscription | undefined;

  constructor(
    private teamService: TeamService,
    private activeRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptionMember = this.getAllMember();
  }

  getAllMember(): Subscription {
    return this.teamService.getAllMember().subscribe((data) => {
      this.memberList = data;
    });
  }

  deleteTeam(memberId: string) {
    this.teamService.deleteMember(memberId).subscribe((data) => {
      if (this.subscriptionMember) {
        this.subscriptionMember.unsubscribe();
      }
      this.subscriptionMember = this.getAllMember();
    });
  }
}
