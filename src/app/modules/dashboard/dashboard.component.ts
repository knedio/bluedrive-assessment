import { Component, signal } from '@angular/core';
import { DashboardStateService } from './services/dashboard-state.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { NumberChartWidgetComponent } from './components/number-chart-widget/number-chart-widget.component';
import { NumberTableWidgetComponent } from './components/number-table-widget/number-table-widget.component';
import { RandomIntegerHttp } from '../../shared/services/random-integer-http.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    NumberTableWidgetComponent,
    NumberChartWidgetComponent,
    ButtonComponent,
  ],
  providers: [DashboardStateService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showModal$ = signal<boolean>(false);
  isGenerating$ = signal<boolean>(false);

  generatedNumber$ = this.dashboardState.generatedNumber$;

  constructor(
    private dashboardState: DashboardStateService,
    private randomIntegerHttp: RandomIntegerHttp
  ) {}

  ngOnInit(): void {}

  async onGenerateNumber(): Promise<void> {
    console.log('onGenerateNumber');
    try {
      this.isGenerating$.set(true);
      const res = await this.randomIntegerHttp.generateNewRandomInteger();

      this.generatedNumber$.set(res.value);
      this.showModal$.set(true);
    } catch (error) {
    } finally {
      this.isGenerating$.set(false);
    }
  }

  onCloseModal(): void {
    this.generatedNumber$.set(null);
    this.showModal$.set(false);
  }

  formatDate(timestamp: string): string {
    return !timestamp ? new Date(timestamp).toLocaleString() : '';
  }
}
