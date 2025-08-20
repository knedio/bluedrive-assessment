import { Component, EventEmitter, Input, Output } from '@angular/core';
import { globals } from '../../../../constants/globals.constant';
import { Pagination } from '../../models/table.model';
import { ButtonComponent } from '../../../button/button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalPages = 0;
  @Input() pagination: Pagination = { ...globals.pagination };

  @Output() pageChange = new EventEmitter<number>();
}
