import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { globals } from '../../../../constants/globals.constant';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    component.pagination = {
      ...globals.pagination,
      page: 1,
      size: 10,
      total: 50,
    };
    component.totalPages = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render current page and total pages', () => {
    const span = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(span.textContent).toContain('Page 1 of 5');
  });

  it('should emit pageChange when clicking Next', () => {
    spyOn(component.pageChange, 'emit');

    const nextBtn = fixture.debugElement.queryAll(By.css('app-button'))[1];
    nextBtn.triggerEventHandler('buttonClick', null);

    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should disable Prev button on first page', () => {
    component.pagination.page = 1;
    fixture.detectChanges();

    const prevBtn = fixture.debugElement.queryAll(By.css('app-button'))[0]
      .componentInstance;
    expect(prevBtn.disabled).toBeTrue();
  });
});
