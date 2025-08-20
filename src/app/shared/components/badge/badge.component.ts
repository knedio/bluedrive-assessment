import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss',
})
export class BadgeComponent {
  @Input() value!: string | number;
  @Input() color: 'red' | 'green' | 'blue' | 'gray' | 'yellow' = 'gray';

  get badgeClass(): string {
    const colors: Record<string, string> = {
      red: 'bg-red-100 text-red-800',
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      gray: 'bg-gray-100 text-gray-800',
      yellow: 'bg-yellow-100 text-yellow-800',
    };
    return colors[this.color];
  }
}
