import { TeamService } from './../services/team.service';
import { User } from './../models/user/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-member',
  templateUrl: './create-member.component.html',
  styleUrls: ['./create-member.component.css'],
})
export class CreateMemberComponent implements OnInit {
  genderList: string[] = ['male', 'female'];
  roleList: string[] = ['admin', 'leader', 'member'];
  statusList: string[] = ['available', 'unavailable'];
  myForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private teamService: TeamService
  ) {
    this.myForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.teamService.createMember(this.myForm.value).subscribe((data) => {
      if (data) {
        alert('Created Member successfully');
      }
    });
  }
}
