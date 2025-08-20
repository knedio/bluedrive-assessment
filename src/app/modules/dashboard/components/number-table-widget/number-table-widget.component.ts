import {
  Component,
  effect,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
  untracked,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../../../shared/components/table/models/table.model';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { RandomIntegerHttp } from '../../../../shared/services/random-integer-http.service';
import { DashboardStateService } from '../../services/dashboard-state.service';

Chart.register(...registerables);

@Component({
  selector: 'app-number-table-widget',
  standalone: true,
  imports: [CommonModule, TableComponent, BadgeComponent],
  templateUrl: './number-table-widget.component.html',
  styleUrl: './number-table-widget.component.scss',
})
export class NumberTableWidgetComponent implements OnInit, OnDestroy {
  @ViewChild('valueTemplate', { static: true })
  valueTemplate!: TemplateRef<any>;

  tableColumns$ = signal<TableColumn[]>([]);
  loading$ = signal<boolean>(true);

  generatedNumber$ = this.dashboardState.generatedNumber$;
  randomIntegers$ = this.dashboardState.randomIntegers$;
  pagination$ = this.dashboardState.pagination$;

  constructor(
    private dashboardState: DashboardStateService,
    private randomIntegerHttp: RandomIntegerHttp
  ) {
    effect(
      () => {
        const generated = this.generatedNumber$();
        if (generated !== null) {
          untracked(() => {
            this.onRefreshData();
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  async onGetNumbers(): Promise<void> {
    try {
      this.loading$.set(true);
      const res = await this.randomIntegerHttp.getRandomIntegers({
        limit: this.pagination$().size,
        offset: (this.pagination$().page - 1) * this.pagination$().size,
      });

      this.randomIntegers$.set(res.results);
      this.pagination$.update((prev) => ({
        ...prev,
        total: res.count,
      }));
    } catch (error) {
    } finally {
      this.loading$.set(false);
    }
  }

  async ngOnInit(): Promise<void> {
    this.onSetTableColumns();

    await this.onGetNumbers();
  }

  ngOnDestroy(): void {}

  async onPageChange(page: number): Promise<void> {
    this.loading$.set(true);

    this.pagination$.update((prev) => ({ ...prev, page }));
    await this.onGetNumbers();
  }

  private async onRefreshData(): Promise<void> {
    await this.onGetNumbers();
  }

  private onSetTableColumns(): void {
    this.tableColumns$.set([
      { key: 'generator_user', label: 'User' },
      { key: 'value', label: 'Value', template: this.valueTemplate },
      {
        key: 'created',
        label: 'Timestamp',
        formatter: (value: string) => new Date(value).toLocaleString(),
      },
    ]);
  }
}
