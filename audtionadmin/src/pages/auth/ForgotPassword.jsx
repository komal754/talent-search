
import { Form, Formik } from "formik";
import TextField from "../../components/Input/TextField";
import * as Yup from "yup";
import { updateData } from "../../api/ClientFunction";
import Swal from "sweetalert2";
const ForgotPassword = () => {
  const url = `/api/v1/auth/changePassword`;
  async function handleLogin(values) {
    console.log(values);
    const data = {};
    data.oldPassword = values.oldPassword;
    data.newPassword = values.newPassword;
    const res = await updateData(url, data);

    if (!res.success) {
      Swal.fire(
        "Oops!..",
        `${res.message ? res.message : "something went wrong..."}`,
        "error"
      );
    } else {
      Swal.fire("Wow!..", "Password Changed Successfully!..", "success");
    }
  }
  return (
    <>
      <div className=" rounded-sm border border-stroke bg-white shadow-default">
        <div className="flex h-screen justify-center flex-wrap items-center">
          <div className="w-full border-stroke  xl:w-1/2 ">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
                Change Password
              </h2>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                }}
                validationSchema={Yup.object().shape({
                  oldPassword: Yup.string().required(
                    "Old Password is required"
                  ),
                  newPassword: Yup.string().required(
                    "New Password is required"
                  ),
                })}
                onSubmit={async (values) => {
                  await handleLogin(values);
                }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <TextField
                      name="oldPassword"
                      label="Old Password"
                      placeholder="Enter your Old Password"
                      type="text"
                    />
                    <TextField
                      name="newPassword"
                      label="New Password"
                      placeholder="Enter your New password"
                      type="text"
                    />
                    <div className="my-5">
                      <button
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        type="submit"
                      >
                        Change Password
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
