import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  username: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.authService.getUsername().toUpperCase();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToComics() {
    this.router.navigate(['/comics']);
  }
}
