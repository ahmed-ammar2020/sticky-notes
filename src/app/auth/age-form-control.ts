import { FormControl } from '@angular/forms';

export class AgeFormControl extends FormControl {
  setValue(value: string | null, options: any) {
    if (value.match(/[^0-9]/gi) || value.length >= 3) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}
