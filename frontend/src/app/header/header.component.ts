import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default';
  userName: string = '';
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('user') && val.url.includes('user')) {
          this.menuType = 'admin';
          let user = localStorage.getItem('user');
          let userData = user && JSON.parse(user);
          this.userName = userData[0].userName;
          console.log(this.userName);
        }
      }
    });
  }
}
