import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberChartWidgetComponent } from './number-chart-widget.component';
import { DashboardStateService } from '../../services/dashboard-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NumberChartWidgetComponent', () => {
  let component: NumberChartWidgetComponent;
  let fixture: ComponentFixture<NumberChartWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberChartWidgetComponent, HttpClientTestingModule],
      providers: [DashboardStateService],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
