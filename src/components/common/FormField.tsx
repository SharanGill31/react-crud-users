import React from 'react';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import type { FieldConfig } from '../../forms/formUtils';

interface FormFieldProps {
  field: FieldConfig;
  control: Control<any>;
  errors: FieldErrors;
}

const FormField: React.FC<FormFieldProps> = ({ field, control, errors }) => {
  return (
    <Controller
      name={field.name}
      control={control}
      defaultValue=""
      render={({ field: controllerField }) => (
        <TextField
          {...controllerField}
          label={field.label}
          type={field.type === 'phone' ? 'tel' : field.type}
          fullWidth
          margin="normal"
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message?.toString()}
        />
      )}
    />
  );
};

export default FormField;
