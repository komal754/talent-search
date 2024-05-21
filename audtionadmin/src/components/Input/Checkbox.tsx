import { Field, useField } from 'formik';
import { BsCheck } from 'react-icons/bs';
function Checkbox({ label, value, checked, name }: any) {
  const [field, , { setValue }] = useField(name);

  const handleChange = (event: any) => {
    const { checked } = event.target;
    let updatedValues = [...field.value];

    if (checked) {
      updatedValues.push(value);
    } else {
      updatedValues = updatedValues.filter((v) => v !== value);
    }

    setValue(updatedValues);
  };

  return (
    <div>
      <label className="flex cursor-pointer select-none items-center">
        <Field className="relative" name={name} type="checkbox">
          {({ field }: any) => (
            <>
              <input
                type="checkbox"
                className="sr-only"
                {...field}
                checked={field.value.includes(value)}
                onChange={handleChange}
              />
              <div
                className={`mr-4 flex h-5 w-5 items-center justify-center rounded border  ${
                  field.value.includes(value)
                    ? 'border-primary bg-gray dark:bg-transparent'
                    : ''
                }`}
              >
                {field.value.includes(value) && (
                  <span className="opacity-100">
                    <BsCheck className="text-primary" />
                  </span>
                )}
              </div>
            </>
          )}
        </Field>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
