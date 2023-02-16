import { TokenStorageService } from './../services/token-storage.service';
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
  constructor(
    private route: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        const role = this.tokenStorageService.getRole();
        const userName = this.tokenStorageService.getUserName();
        if (role && userName && val.url.includes('management')) {
          this.userName = userName;
          this.menuType = role;
          console.log(this.userName);
        } else if (role && userName && val.url.includes('member')) {
          this.userName = userName;
          this.menuType = role;
        } else {
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
  }
}
