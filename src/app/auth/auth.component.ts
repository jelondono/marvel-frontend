import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

  loginUser = {
    email: '',
    password: '',
  };

  registerUser = {
    name: '',
    email: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  login() {
    this.authService.login(this.loginUser).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('username', response.username);
        this.router.navigate(['/comics']);
      },
      (error) => {
        console.error('Login failed', error);
        this.router.navigate(['/register']);
      }
    );
  }

  register() {
    this.authService.register(this.registerUser).subscribe(() => {
      this.tabset.tabs[0].active = true;
      this.toastr.success(
        'Registro completado. Ahora puede iniciar sesión.',
        'Registro Exitoso'
      );
    });
  }
}
