import { Component, inject } from '@angular/core';
import { CustomAlertComponent } from '../../common-components/custom-alert/custom-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { ResponseType } from '../../common-constants/enum-constants';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  
  constructor() {
    this.OpenDialog("Organization has been registered successfully.<br>Please login.", ResponseType.INFO, false);
  }

  OpenDialog(dialogText: string, dialogType: string, pageReloadNeeded: boolean): void {
    const dialogRef = this.dialog.open(CustomAlertComponent, { 
      width: '30rem',
      height: 'max-content',
      disableClose: true,
      data: { text: dialogText, type: dialogType } });

    dialogRef.afterClosed().subscribe(() => {
      if (pageReloadNeeded) {
        window.location.reload();
      }
    });
  }
}
