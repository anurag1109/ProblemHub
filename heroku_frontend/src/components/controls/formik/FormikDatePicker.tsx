import * as React from "react";
import { FieldProps } from "formik";
import { DatePicker , DatePickerProps,MuiPickersUtilsProvider  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { getError } from "../../../utils/formik";

const FormikDatePicker: React.FC<
DatePickerProps  & FieldProps 
> = ({
  field,
  form,
  disabled,
  required,
  fullWidth,
  placeholder,
  helperText,
  type,
  variant,
  inputVariant,
  onChange,
  ...remainingProps
}) => {
  const { name, value } = field;

  const handleOnChange = (date: any) => {
      if (onChange) {
        onChange(date);
      }
      form.setFieldValue(name, date);
  };
  const errorText =getError(form, name) 
  const hasError = !!errorText;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
        onBlur={() => form.setFieldTouched(name, true)}
        onFocus={() => form.setFieldError(name, '')}
        disableFuture
        openTo="year"
        format="dd/MM/yyyy"
        label="Date of birth"
        views={["year", "month", "date"]}
        value={value||null}
        onChange={handleOnChange}
        inputVariant={inputVariant}
        error={hasError}
        helperText={helperText||errorText}
        fullWidth={fullWidth}
        required={required}
      />
    </MuiPickersUtilsProvider>
  );
};

FormikDatePicker.defaultProps = {
  disabled: false,
  fullWidth: false,
  placeholder: undefined,
  inputVariant:'outlined'
};

export default (FormikDatePicker);
