import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models/user/user';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
  memberList: User[] = [];
  teamId: string | null = '';
  myForm: FormGroup;
  subscriptionMember: Subscription | undefined;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private formBuilder: FormBuilder,
    private teamService: TeamService
  ) {
    this.myForm = this.formBuilder.group({
      memberId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.teamId = this.activeRouter.snapshot.paramMap.get('id');
    this.subscriptionMember = this.getAllMember();
  }

  getAllMember(): Subscription {
    return this.teamService.getAllMember().subscribe((data) => {
      this.memberList = data;
    });
  }

  onSubmit() {
    this.teamService
      .addMember(this.teamId!, this.myForm.value)
      .subscribe((data) => {
        this.router.navigate([`/management-detail/${this.teamId}`]);
      });
  }
}
