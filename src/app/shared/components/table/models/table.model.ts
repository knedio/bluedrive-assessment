import { TemplateRef } from '@angular/core';

export interface TableColumn {
  key: string; // field name
  label: string; // column header
  class?: string; // CSS classes td
  formatter?: (value: any, row: TableRow) => string | number; // string/number formatters
  template?: TemplateRef<any>; // template rendering
}

export type TableRow = Record<string, any>;

export interface Pagination {
  page: number;
  start: number;
  end: number;
  total: number;
  size: number;
  orderBy?: string;
  direction?: string;
}
