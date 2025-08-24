import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { OrganizationService } from '../../service/organization/organization.service';
import { MatDialog } from '@angular/material/dialog';
import { ResponseType, TrueFalse } from '../../common-constants/enum-constants';
import { CustomAlertComponent } from '../../common-components/custom-alert/custom-alert.component';


@Component({
  selector: 'app-register-org',
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  standalone: true,
  templateUrl: './register-org.component.html',
  styleUrl: './register-org.component.css'
})
export class RegisterOrgComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  readonly dialog = inject(MatDialog);

  selectedStepIndex: number = 0;
  isLinear = false;
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';

  org_name: string | null = null;
  org_email: string | null = null;

  application_count: number | null = 0;
  applications: string[] = [];

  payload_count: number | null = 0;
  payloads: string[] = [];

  constructor(private organizationService: OrganizationService) { }

  ngOnInit() {
    this.setStepperOrientation();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setStepperOrientation();
  }

  setStepperOrientation() {
    this.stepperOrientation = window.innerWidth < 1200 ? 'vertical' : 'horizontal';
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  forthFormGroup = this._formBuilder.group({
    forthCtrl: ['', Validators.required],
  });

  onStepChange(event: StepperSelectionEvent): void {
    this.selectedStepIndex = event.selectedIndex;
  }

  TrackByIndex(index: number, item: any): any {
    return index;
  }

  UpdateApplications() {
    const count = this.application_count || 0;

    if (count > this.applications.length) {
      this.applications.push(...Array(count - this.applications.length).fill(''));
    } else if (count < this.applications.length) {
      this.applications.splice(count);
    }
  }

  UpdatePayloads() {
    const count = this.payload_count || 0;

    if (count > this.payloads.length) {
      this.payloads.push(...Array(count - this.payloads.length).fill(''));
    } else if (count < this.payloads.length) {
      this.payloads.splice(count);
    }
  }

  RegisterOrganization() {
    const obj = {
      org_name: this.org_name,
      org_email: this.org_email,
      application_count: this.application_count,
      application_urls: this.applications,
      payload_instance_count: this.payload_count,
      payload_variables: this.payloads,
    };


    this.organizationService.DoRegisterOrganization(obj).subscribe({
      next: async (response) => {
        console.log("Org Registration", response);
        if (response && response.success === TrueFalse.TRUE) {
          this.OpenDialog(response.message, ResponseType.SUCCESS, false);
        } else {
          this.OpenDialog(response.message, ResponseType.ERROR, false);
        }
      },
      error: (err) => {
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
