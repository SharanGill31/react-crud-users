import React from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import FormField from '../common/FormField';
import { userFormFields } from '../../forms/userSchema';
import { buildYupSchema } from '../../forms/formUtils';
import type { User } from '../../types/user'; 


const schema = buildYupSchema(userFormFields);
type FormData = yup.InferType<typeof schema>;

interface UserFormProps {
  initialValues?: Partial<User>;
  onSubmit: (data: User) => void | Promise<void>;     
}

const UserForm: React.FC<UserFormProps> = ({ initialValues = {}, onSubmit }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: initialValues as FormData,
    resolver: yupResolver(schema),
  });

  const submitHandler: SubmitHandler<FormData> = (data) => {
    
    
    onSubmit(data as User);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submitHandler)}
      noValidate
    >
      {userFormFields.map((field) => (
        <FormField
          key={field.name}
          field={field}
          control={control}
          errors={errors}
        />
      ))}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default UserForm;