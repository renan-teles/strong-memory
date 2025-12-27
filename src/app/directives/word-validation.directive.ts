import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appWordValidation]',
  standalone: true,
})
export class WordValidationDirective {
  @Input() compare = false;
  @Input() isEqual = false;
  @Input() touched = false;
  @Input() invalidControl = false;

  @HostBinding('class.is-valid')
  get valid() {
    return this.compare && this.isEqual;
  }

  @HostBinding('class.is-invalid')
  get invalid() {
    return (
      (this.invalidControl && this.touched) 
      || 
      (this.compare && !this.isEqual)
    );
  }
}
