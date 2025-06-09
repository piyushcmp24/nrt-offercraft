import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  contactForm!: FormGroup;
  logoUrl: string | ArrayBuffer | null = null;
  preloaderImagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      accountId: [{ value: '12345', disabled: true }],
      contactEmail: [''],
      clientName: [''],
      smsOverride: [''],
      contactName: [''],
      contactPhone: [''],
      language: ['en'],
      countryCode: ['+91'],
      timeZone: ['est'],
      datetimeFormat: ['MM/dd/yy'],
      employeePostfix: [''],
      maxSavings: [''],
      passwordExpiration: [30],
      idleLogoutTime: [15],
      userTokenExpiration: [60],
      tenantKey: [''],
      group: [''],
      csvSeparator: [','],
      showCountryDropdown: [false],
      allowChangeLiveCampaigns: [false],
      applyTokenExpirationBasedOnUserActivity: [false],
      twoFactorAuthentication: [false],
      useAccountTimeZoneForExternalApi: [false],
      backgroundColor: ['#ffffff'],
      preloaderText: ['Loading...'],
      collectIp: [false],
      enableExpiredRewards: [false],
      allowPrint: [false],
      backToPin: [false],
      allowReprint: [false]
    });
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.logoUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onPreloaderImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.preloaderImagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.contactForm.valid) {
      const formValue = {
        ...this.contactForm.getRawValue(),
        logoUrl: this.logoUrl,
        preloaderImage: this.preloaderImagePreview
      };

      console.log('Saving client profile:', formValue);

      // TODO: Call your backend service to save `formValue`
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
