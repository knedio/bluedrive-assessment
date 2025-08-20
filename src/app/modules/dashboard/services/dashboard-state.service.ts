import { Injectable, signal } from '@angular/core';
import { Pagination } from '../../../shared/components/table/models/table.model';
import { globals } from '../../../shared/constants/globals.constant';
import { RandomInteger } from '../../../shared/models/random-integer.model';

@Injectable()
export class DashboardStateService {
  // main
  generatedNumber$ = signal<number | null>(null);

  // line chart
  latestRandomIntegers$ = signal<RandomInteger[]>([]);

  // table
  randomIntegers$ = signal<RandomInteger[]>([]);
  pagination$ = signal<Pagination>({ ...globals.pagination });

  constructor() {}
}
