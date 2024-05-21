import { ErrorMessage, Field } from 'formik';
interface TextFieldType {
  name: string;
  label?: string;
  style?: string;
  placeholder?: string;
  type?: string;
  height?: string;
  flexDirection?: 'vertical' | 'horizontal' | undefined;
  labelClassName?: string | undefined;
  disabled?: boolean;
}
function TextAreaField(props: TextFieldType) {
  const {
    label,
    name = '',
    flexDirection,
    labelClassName = '',
    placeholder,
    height = 100,
    disabled = false,
  } = props;
  return (
    <div className={flexDirection === 'horizontal' ? `grid grid-cols-3` : ''}>
      {label && (
        <div
          className={`my-2 block font-medium text-black dark:text-white ${labelClassName}`}
        >
          <label>{label}</label>
        </div>
      )}
      <div className="col-span-2 w-full">
        <Field
          as="textarea"
          {...props}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            height: height,
            border: '0',

            // zIndex: 1,
          }}
          className="w-full min-w-[400px] rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none  dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
        <div className="mt-1 text-left text-sm font-semibold text-meta-1">
          {name && <ErrorMessage name={name} />}
        </div>
      </div>
    </div>
  );
}

export default TextAreaField;
