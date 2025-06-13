import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListsComponent } from './user-lists.component';
import { FormsModule } from '@angular/forms';

describe('UserListsComponent', () => {
  let component: UserListsComponent;
  let fixture: ComponentFixture<UserListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListsComponent],
      imports: [FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
