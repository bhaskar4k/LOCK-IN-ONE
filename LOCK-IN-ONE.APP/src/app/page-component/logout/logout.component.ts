import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private authService: AuthService) {
    this.authService.DeleteToken();
    window.location.href = '/home';
  }
}
