import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';


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

  selectedStepIndex: number = 0;
  isLinear = false;
  stepperOrientation: 'horizontal' | 'vertical' = 'horizontal';

  org_name: string | null = null;
  org_email: string | null = null;

  application_count: number | null = 0;
  applications: string[] = [];

  payload_count: number | null = 0;
  payloads: string[] = [];

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
}
