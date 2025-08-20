import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination, TableColumn, TableRow } from './models/table.model';
import { globals } from '../../constants/globals.constant';
import { PaginationComponent } from './components/pagination/pagination.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];

  @Input() pagination: Pagination = { ...globals.pagination };
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.pagination.total / this.pagination.size);
  }

  onChangePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
