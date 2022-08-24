import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUrl: string;
  isitloginpage: boolean = false;

  constructor(private router: Router, private jwtToken: SharedService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;

        console.log(this.currentUrl);

        if (this.currentUrl === '/pensioner/login' || this.currentUrl === '/') {
          this.isitloginpage = true;
        } else {
          this.isitloginpage = false;
        }
      }
    });
  }

  clickMethod() {
    if (confirm('Are you sure to logout ')) {
      //window.sessionStorage.clear();
      let jwt: string = '';
      this.jwtToken.setJwtToken(jwt);
      this.router.navigate(['/pensioner/login']).then();
    } else {
      alert('Action canceled');
    }
  }
}
