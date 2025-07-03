import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input<Permission>();
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        console.log('SHOW ELEMENT');
      } else {
        this.viewContainer.clear();
        console.log('DO NOT SHOW ELEMENT');
      }
      console.log('Active permission:', this.authService.activePermission(), this.userType());
    });

  }

}
