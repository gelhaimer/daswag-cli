
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {AuthService} from "../../core/auth";

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the authorities passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *appHasAnyRole="'ROLE_ADMIN'">...</some-element>
 *
 *     <some-element *appHasAnyRole="['ROLE_ADMIN', 'ROLE_USER']">...</some-element>
 * ```
 */
@Directive({
  selector: '[appHasAnyRole]'
})
export class HasAnyRoleDirective {
  private roles: string[];

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input()
  set jhiHasAnyAuthority(value: string | string[]) {
    this.roles = typeof value === 'string' ? [value] : value;
    this.updateView();
    // Get notified each time authentication state changes.
    this.authService.getCurrentProfile().subscribe(profile => this.updateView());
  }

  private updateView(): void {
    this.authService.hasAnyRoles(this.roles).then(result => {
      this.viewContainerRef.clear();
      if (result) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
