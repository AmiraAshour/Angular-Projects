import { Component, contentChild, ContentChild, ElementRef, HostBinding, HostListener, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  // host: {
  // '(click)': 'onclick()'
  // }
})
export class ControlComponent {
  label = input.required<string>();
  // @HostBinding('class') class = 'control';
  // @ContentChild('input') control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;
  private control = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');
  @HostListener('click') onclick() {
    // alert(`Control clicked: ${this.label}`);
    console.log(this.control()?.nativeElement);
  }
}
