import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { globals } from '../../constants/globals.constant';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pageChange when onChangePage called with valid page', () => {
    spyOn(component.pageChange, 'emit');
    component.pagination = {
      ...globals.pagination,
      page: 1,
      size: 10,
      total: 20,
    };

    component.onChangePage(2);

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });
});
