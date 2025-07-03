import { Directive, ElementRef, inject, input } from '@angular/core';
@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLivePage($event)',
  }
})
export class SafeLinkDirective {

  queryParam = input();
  private hostElement = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  onConfirmLivePage(event: MouseEvent): void {
    const userConfirmed = confirm('You are about to leave the app. Do you want to continue?');
    if (userConfirmed) {
      const url = this.hostElement.nativeElement.href;
      this.hostElement.nativeElement.href = url + `?from=${this.queryParam()}`;
      return;
    }
    event.preventDefault();
  }
}
