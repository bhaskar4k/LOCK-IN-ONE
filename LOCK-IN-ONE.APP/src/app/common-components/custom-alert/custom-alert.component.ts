import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ResponseType, ResponseTypeDescriptions } from '../../common-constants/enum-constants';

@Component({
  selector: 'app-custom-alert',
  imports: [],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.css'
})
export class CustomAlertComponent implements OnInit {
  ResponseType = ResponseType;
  ResponseTypeDescriptions = ResponseTypeDescriptions;

  // Make the enum available in template
  alertHeader: string = ResponseTypeDescriptions[ResponseType.SUCCESS];
  textColorClass: string = 'text-success';
  formattedText: string = '';
  buttonClass: string = 'alert-button success'; // Default class

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { text: string; type: ResponseType },
    private dialogRef: MatDialogRef<CustomAlertComponent>,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.formattedText = this.data.text.replace(/\n/g, '<br>');

    // Set classes based on alert type
    switch (this.data.type) {
      case ResponseType.WARNING:
        this.alertHeader = ResponseTypeDescriptions[ResponseType.WARNING];
        this.textColorClass = 'text-warning';
        this.buttonClass = 'btn btn-sm btn-warning';
        break;
      case ResponseType.INFO:
        this.alertHeader = ResponseTypeDescriptions[ResponseType.INFO];
        this.textColorClass = 'text-primary';
        this.buttonClass = 'btn btn-sm btn-primary';
        break;
      case ResponseType.ERROR:
        this.alertHeader = ResponseTypeDescriptions[ResponseType.ERROR];
        this.textColorClass = 'text-danger';
        this.buttonClass = 'btn btn-sm btn-danger';
        break;
      default:
        this.alertHeader = ResponseTypeDescriptions[ResponseType.SUCCESS];
        this.textColorClass = 'text-success';
        this.buttonClass = 'btn btn-sm btn-success';
    }

    // Trigger change detection
    this.cdr.markForCheck();
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
