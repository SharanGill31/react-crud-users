import * as Yup from 'yup';

export type FieldConfig = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'password' | 'date'| 'phone';
  required: boolean;
  validation?: Record<string, any>;
};

export function buildYupSchema(fields: FieldConfig[]) {
  const shape: Record<string, any> = {};
  fields.forEach(field => {
    let validator = Yup.string();
    if (field.type === 'email') {
      validator = Yup.string().email('Invalid email');
    }
    if (field.validation) {
      if (field.validation.min) validator = validator.min(field.validation.min);
      if (field.validation.max) validator = validator.max(field.validation.max);
      if (field.validation.matches) validator = validator.matches(field.validation.matches, 'Invalid format');
      if (field.validation.email) validator = validator.email('Invalid email');
    }
    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }
    shape[field.name] = validator;
  });
  return Yup.object().shape(shape);
}
