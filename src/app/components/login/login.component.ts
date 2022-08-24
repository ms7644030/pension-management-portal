import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { TokenstorageService } from 'src/app/services/tokenstorage.service';
import { Router } from '@angular/router';
import { JwtToken } from 'src/app/models/JwtToken';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  public errorMessage: string | null = null;
  //roles: string[] = [];
  loading: boolean = false;

  constructor(
    private authService: AuthServiceService,
    private tokenStorage: TokenstorageService,
    private router: Router,
    private jwtToken: SharedService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.loading = true;

    this.authService.login(username, password).subscribe({
      next: (data: JwtToken) => {
        this.jwtToken.setJwtToken(data.jwt);
        // this.tokenStorage.saveToken(data.jwt);
        // this.tokenStorage.saveUser(data);
        console.log(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //  this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
        this.loading = false;
        alert('Logged in as admin!');
        this.router.navigate(['/pensioner/admin']).then();
      },
      error: (error) => {
        // this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        this.loading = false;
        //  this.router.navigate(['/pensioner/admin']).then();
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
