import { ErrorMessage, Field } from "formik";
import PropTypes from "prop-types";
function TextField({
  label,
  name = "",
  flexDirection,
  labelClassName = "",
  placeholder,
  disabled = false,
  type,
  as,
  ...props // Add this line to capture additional props
}) {
  return (
    <div className={flexDirection === "horizontal" ? `grid grid-cols-3` : ""}>
      {label && (
        <div
          className={`my-2 block font-medium text-black dark:text-white  ${labelClassName}`}
        >
          <label>{label}</label>
        </div>
      )}
      <div className="col-span-2 w-full">
        <Field
          disabled={disabled}
          name={name} // Add this line to include the name prop
          type={type}
          as={as}
          placeholder={placeholder}
          {...props} // Spread the rest of the props here
          className="w-full min-w-[400px] rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none  dark:bg-meta-4 dark:text-white dark:focus:border-primary"
        />
        <div className="mt-1 text-left text-sm font-semibold text-meta-1 ">
          {name && <ErrorMessage name={name} />}
        </div>
      </div>
    </div>
  );
}
// Define PropTypes
TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  flexDirection: PropTypes.string,
  labelClassName: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  as: PropTypes.elementType,
};
export default TextField;
