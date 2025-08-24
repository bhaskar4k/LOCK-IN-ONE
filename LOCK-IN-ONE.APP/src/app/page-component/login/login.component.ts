import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from '../../common-components/custom-alert/custom-alert.component';
import { ResponseType, TrueFalse } from '../../common-constants/enum-constants';
import { OrganizationService } from '../../service/organization/organization.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  matProgressBarVisible = false;
  readonly dialog = inject(MatDialog);

  constructor(private organizationService: OrganizationService) { }

  email: string | null = null;
  password: string | null = null;

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
            this.OpenDialog(response.message, ResponseType.SUCCESS, false);
          } else {
            this.OpenDialog(response.message, ResponseType.ERROR, false);
          }
        },
        error: (err) => {
          this.matProgressBarVisible = false;
          this.OpenDialog(err.error.message ?? "Failed to process the request!", ResponseType.ERROR, false);
        }
      });
    }
  
    OpenDialog(dialogText: string, dialogType: string, pageReloadNeeded: boolean): void {
      const dialogRef = this.dialog.open(CustomAlertComponent, {
        width: '30rem',
        height: 'max-content',
        disableClose: true,
        data: { text: dialogText, type: dialogType }
      });
  
      dialogRef.afterClosed().subscribe(() => {
        if (pageReloadNeeded) {
          window.location.reload();
        }
      });
    }
}
