import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCampaignComponent } from './list-campaign.component';
import { FormsModule } from '@angular/forms';

describe('ListCampaignComponent', () => {
  let component: ListCampaignComponent;
  let fixture: ComponentFixture<ListCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListCampaignComponent],
      imports: [FormsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
