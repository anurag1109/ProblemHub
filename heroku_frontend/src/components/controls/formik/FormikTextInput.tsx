import { FieldProps} from 'formik';
import * as React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { getError } from '../../../utils/formik';

export interface FormikTextInputProps {
    readonly label?: string;
  }
  

const FormikTextInput: React.FC<FormikTextInputProps & TextFieldProps & FieldProps> = ({
    field,
    form,
    disabled,
    required,
    fullWidth,
    rows,
    placeholder,
    helperText,
    type,
    onChange,
    variant,
    ...remainingProps
  }) => {
    const { name, value } = field;
  
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: targetValue } = event.target;
      if (onChange) {
        onChange(event);
      }
      form.setFieldValue(name, targetValue);
    };
    const errorText = getError(form, name);
    const hasError = !!errorText;
    return (
      <TextField
        onBlur={() => form.setFieldTouched(name, true)}
        onFocus={() => form.setFieldError(name, '')}
        error={hasError}
        helperText={helperText||errorText}
        disabled={disabled}
        fullWidth={fullWidth}
        onChange={handleOnChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        type={type}
        value={value||""}
        variant={variant}
        {...remainingProps}
      />
    );
  };
  
  FormikTextInput.defaultProps = {
    disabled: false,
    fullWidth: false,
    placeholder: undefined,
    variant:'outlined'
  };
  
  export default FormikTextInput;
  