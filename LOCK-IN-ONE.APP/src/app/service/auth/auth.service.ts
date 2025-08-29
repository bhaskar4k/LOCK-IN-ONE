import { inject, Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetBaseURL } from '../../endpoints/endpoints';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomAlertComponent } from '../../common-components/custom-alert/custom-alert.component';
import { JWT_KEY } from '../../common-constants/enum-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private TokenKey = JWT_KEY;
  private dialog = inject(MatDialog);

  constructor(private http: HttpClient, private router: Router) {
    
  }

  GetToken(): string | null {
    return localStorage.getItem(this.TokenKey);
  }

  SaveToken(Token: string) {
    localStorage.removeItem(this.TokenKey);
    localStorage.setItem(this.TokenKey, Token);
  }

  OpenDialog(dialogText: string, dialogType: number, doLogout: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      data: { text: dialogText, type: dialogType }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (doLogout === true) {
        window.location.href = '/login';
      }
    });
  }
}