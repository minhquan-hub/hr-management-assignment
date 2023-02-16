import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user/user';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css'],
})
export class CreateTeamComponent implements OnInit {
  leaderList: User[] = [];
  myForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private teamService: TeamService
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      teamLeaderId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.teamService.getAllLeader().subscribe((data) => {
      this.leaderList = data;
    });
  }

  onSubmit() {
    this.teamService.createTeam(this.myForm.value).subscribe((data) => {
      if (data) {
        this.router.navigate(['/management']);
      }
    });
  }
}
