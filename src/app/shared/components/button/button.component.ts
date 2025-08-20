import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() label = '';

  @Output() buttonClick = new EventEmitter<Event>();

  get classes() {
    const base =
      'rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center';
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
      secondary:
        'bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-500',
    };
    const sizes = {
      xs: 'px-3 py-1 text-xs',
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-8 py-3 text-lg',
    };
    return `${base} ${variants[this.variant]} ${sizes[this.size]}`;
  }
}
