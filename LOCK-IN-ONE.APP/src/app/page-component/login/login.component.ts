import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../common-components/custom-alert/custom-alert.component';
import { ResponseType, TrueFalse } from '../../common-constants/enum-constants';
import { OrganizationService } from '../../service/organization/organization.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  matProgressBarVisible = false;
  readonly dialog = inject(MatDialog);

  constructor(
    private organizationService: OrganizationService,
    private authService: AuthService,
    private router: Router
  ) { }

  email: string | null = null;
  password: string | null = null;

  ValidateForm() {
    return this.email !== null && this.email.trim() !== '' && this.password !== null && this.password.trim() !== '';
  }

  Login() {
    const obj = {
      email: this.email,
      password: this.password,
    };

    this.matProgressBarVisible = true;

    this.organizationService.DoLogin(obj).subscribe({
      next: async (response) => {
        this.matProgressBarVisible = false;

        if (response && response.success === TrueFalse.TRUE) {
          this.authService.SaveToken(response.data);
          
          this.OpenDialog(response.message, ResponseType.SUCCESS, "home");
        } else {
          this.OpenDialog(response.message, ResponseType.ERROR, null);
        }
      },
      error: (err) => {
        this.matProgressBarVisible = false;
        this.OpenDialog(err.error.message ?? "Failed to process the request!", ResponseType.ERROR, null);
      }
    });
  }

  OpenDialog(dialogText: string, dialogType: string, redirect: string | null): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '30rem',
      height: 'max-content',
      disableClose: true,
      data: { text: dialogText, type: dialogType }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (redirect !== null) {
        this.router.navigate([redirect]);
        window.location.reload();
      }
    });
  }
}
