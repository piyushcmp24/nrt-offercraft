import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      login: [{ value: 'sakshi.kulkarni@compunneldigital.com', disabled: true }],
      firstName: ['Sakshi'],
      lastName: ['Kulkarni'],
      pinCode: ['73153'],
      twoFactorAuth: ['None'],
      allowUserSearch: [true],
      allowUserPrint: [true],
      allowUserReprint: [true],
      allowHelpMode: [false],
      account: ['OfferCraft'],
      useSimulatedData: [false]
    });
  }

  onSave(): void {
    console.log('Form Data:', this.profileForm.getRawValue());
  }

  onEditPassword(): void {
    alert('Edit Password logic here...');
  }

  onCreateAccount(): void {
    alert('Create New Account logic here...');
  }
}
