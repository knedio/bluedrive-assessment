import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeComponent } from './badge.component';
import { By } from '@angular/platform-browser';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the value', () => {
    component.value = 'Test Badge';
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.query(
      By.css('span')
    ).nativeElement;
    expect(element.textContent?.trim()).toBe('Test Badge');
  });

  it('should apply green classes when color is green', () => {
    component.value = 'Active';
    component.color = 'green';
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.query(
      By.css('span')
    ).nativeElement;
    expect(element.className).toContain('bg-green-100');
    expect(element.className).toContain('text-green-800');
  });

  it('should apply red classes when color is red', () => {
    component.value = 'Error';
    component.color = 'red';
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.query(
      By.css('span')
    ).nativeElement;
    expect(element.className).toContain('bg-red-100');
    expect(element.className).toContain('text-red-800');
  });

  it('should use gray as default color if not provided', () => {
    component.value = 'Default';
    fixture.detectChanges();

    const element: HTMLElement = fixture.debugElement.query(
      By.css('span')
    ).nativeElement;
    expect(element.className).toContain('bg-gray-100');
    expect(element.className).toContain('text-gray-800');
  });
});
