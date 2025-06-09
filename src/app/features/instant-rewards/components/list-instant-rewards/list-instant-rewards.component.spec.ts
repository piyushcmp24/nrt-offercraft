import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstantRewardsComponent } from './list-instant-rewards.component';

describe('ListInstantRewardsComponent', () => {
  let component: ListInstantRewardsComponent;
  let fixture: ComponentFixture<ListInstantRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListInstantRewardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListInstantRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
