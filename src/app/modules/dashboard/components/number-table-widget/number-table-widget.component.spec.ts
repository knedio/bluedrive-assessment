import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberTableWidgetComponent } from './number-table-widget.component';
import { DashboardStateService } from '../../services/dashboard-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NumberTableWidgetComponent', () => {
  let component: NumberTableWidgetComponent;
  let fixture: ComponentFixture<NumberTableWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberTableWidgetComponent, HttpClientTestingModule],
      providers: [DashboardStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberTableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
