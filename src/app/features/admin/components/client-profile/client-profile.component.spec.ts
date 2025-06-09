import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientProfileComponent } from './client-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientProfileComponent', () => {
  let component: ClientProfileComponent;
  let fixture: ComponentFixture<ClientProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientProfileComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
