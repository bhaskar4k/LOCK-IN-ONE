import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, EMPTY, throwError } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';
import { CustomAlertComponent } from '../common-components/custom-alert/custom-alert.component';
import { ResponseType } from '../common-constants/enum-constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const Token = authService.GetToken();
  const dialog = inject(MatDialog);

  const clonedRequest = Token
    ? req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + Token) })
    : req;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 400 && error.error.status === 69) {
        const message = error?.error?.message || 'Unauthorized source of request.<br>Or<br>you do not have permission to access this resource.';
        openDialog(message, ResponseType.ERROR, 'login');
        return EMPTY;
      }

      return throwError(() => error);
    })
  );

  function openDialog(dialogText: string, dialogType: string, navigateRoute: string | null): void {
    const dialogRef = dialog.open(CustomAlertComponent, {
      data: { text: dialogText, type: dialogType }
    });

    dialogRef.afterClosed().subscribe(() => {
      if (navigateRoute) {
        window.location.href = navigateRoute;
      }
    });
  }
};