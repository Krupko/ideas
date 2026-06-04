import { type FormikHelpers, useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { type z } from 'zod';
import { type AlertProps } from '../components/Alert/Alert';
import { type ButtonProps } from '../components/Button/Button';
import { toFormikValidationSchema } from 'zod-formik-adapter';

/* eslint-disable no-unused-vars */
type UseFormParams<T extends z.ZodRawShape> = {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues: z.infer<z.ZodObject<T>>;
  validationSchema?: z.ZodObject<T>;
  onSubmit: (
    arg0: z.infer<z.ZodObject<T>>,
    arg1: FormikHelpers<z.infer<z.ZodObject<T>>>
  ) => Promise<unknown>;
};
/* eslint-enable no-unused-vars */

export const useForm = <T extends z.ZodRawShape>({
  successMessage = false,
  resetOnSuccess = true,
  showValidationAlert = false,
  initialValues,
  validationSchema,
  onSubmit,
}: UseFormParams<T>) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik<z.infer<z.ZodObject<T>>>({
    initialValues,
    validationSchema: validationSchema && toFormikValidationSchema(validationSchema),
    onSubmit: async (_values, _formikHelpers) => {
      try {
        setSubmittingError(null);
        await onSubmit(_values, _formikHelpers);
        if (resetOnSuccess) {
          formik.resetForm();
        }

        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 300);
      } catch (error) {
        setSubmittingError(error instanceof Error ? error : new Error('Произошла ошибка'));
      }
    },
  });

  const alertProps = useMemo<AlertProps>(() => {
    if (submittingError) {
      return {
        hidden: false,
        children: submittingError.message,
        color: 'red',
      };
    }

    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return {
        hidden: false,
        children: 'Не валидно???',
        color: 'red',
      };
    }

    if (successMessageVisible && successMessage) {
      return {
        hidden: false,
        children: successMessage,
        color: 'green',
      };
    }

    return {
      color: 'red',
      hidden: true,
      children: null,
    };
  }, [
    submittingError,
    formik.isValid,
    formik.submitCount,
    successMessageVisible,
    showValidationAlert,
  ]);

  const buttonProps = useMemo<Omit<ButtonProps, 'children'>>(() => {
    return {
      loading: formik.isSubmitting,
    };
  }, [formik.isSubmitting]);

  return {
    formik,
    alertProps,
    buttonProps,
  };
};
