import { FormikProps } from 'formik';
import _ from 'lodash';

export function getFormFieldError<T = any>(form: FormikProps<T>, name: string): string | undefined {
      const fieldError = _.get(form.errors, name);
      // the name could be the object itself
      const touched = _.get(form.touched, name) as unknown;
      const hasBeenTouched = typeof touched === 'boolean' ? touched : !!touched;
  
      if (!hasBeenTouched || _.isEmpty(fieldError)) {
        return undefined;
      } else if (hasBeenTouched) {
        return fieldError;
      }
  }
export function getError<T = any>(form: FormikProps<T>, name: string): string | undefined{
    return _.get(form.errors, name);
}  