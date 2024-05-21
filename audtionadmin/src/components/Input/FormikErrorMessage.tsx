import { ErrorMessage } from 'formik';

export const FormikErrorMessage = ({ name }: any) => {
  return (
    <div className="mt-1 text-left text-sm font-semibold text-meta-1">
      {name && <ErrorMessage name={name} />}
    </div>
  );
};
