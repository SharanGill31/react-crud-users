import type { FieldConfig } from './formUtils';

export const userFormFields: FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    validation: { min: 2, max: 50 },
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    validation: { min: 2, max: 50 },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    validation: { email: true },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    required: false,
    validation: { matches: /^\+?[0-9]{7,15}$/ },
  },
];
