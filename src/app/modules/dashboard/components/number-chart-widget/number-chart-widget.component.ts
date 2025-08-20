import {
  Component,
  effect,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { RandomIntegerHttp } from '../../../../shared/services/random-integer-http.service';
import { DashboardStateService } from '../../services/dashboard-state.service';
import { RandomInteger } from '../../../../shared/models/random-integer.model';

@Component({
  selector: 'app-number-chart-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './number-chart-widget.component.html',
  styleUrl: './number-chart-widget.component.scss',
})
export class NumberChartWidgetComponent implements OnInit, OnDestroy {
  @ViewChild('chartCanvas', { static: true })
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  loading$ = signal<boolean>(false);

  latestRandomIntegers$ = this.dashboardState.latestRandomIntegers$;

  constructor(
    private dashboardState: DashboardStateService,
    private randomIntegerHttp: RandomIntegerHttp
  ) {
    effect(() => {
      const currentNumbers = this.latestRandomIntegers$();
      if (currentNumbers.length > 0 && this.chart) {
        this.onUpdateChart(currentNumbers);
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.onInitializeChart();
    await this.onGetNumbers();

    setInterval(() => {
      this.onGetNumbers();
    }, 30000);
  }

  ngOnDestroy(): void {}

  async onGetNumbers(): Promise<void> {
    try {
      this.loading$.set(true);
      const res = await this.randomIntegerHttp.getRandomIntegers({
        limit: 20,
        offset: 0,
      });

      this.latestRandomIntegers$.set(res.results);
    } catch (error) {
    } finally {
      this.loading$.set(false);
    }
  }

  private onInitializeChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Generated Numbers',
            data: [],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: 'rgb(255, 255, 255)',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              color: '#6b7280',
            },
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.05)',
            },
            ticks: {
              color: '#6b7280',
              maxTicksLimit: 10,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#374151',
              padding: 20,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      },
    });
  }

  private onUpdateChart(numbers: RandomInteger[]): void {
    if (!this.chart) return;

    const labels = numbers.map((_, index) => `#${index + 1}`);
    const data = numbers.map((number) => number.value);

    this.chart.data.labels = labels;
    this.chart.data.datasets[0].data = data;
    this.chart.update('none');
  }
}
