import { Link, useNavigate,Navigate } from "react-router-dom";

import { Form, Formik } from "formik";
import TextField from "../../components/Input/TextField";
import * as Yup from "yup";
import SignInPerson from "../../assets/SignInPerson";
import { postData } from "../../api/ClientFunction";
import Swal from "sweetalert2";


const SignIn = () => {
  const navigate = useNavigate();
  const url = `/api/v1/auth/login`;
  const isAuthenticated = localStorage.getItem("login");
  console.log(isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  async function handleLogin(values) {
    console.log(values);
    const data = {};
    data.userName = values.username;
    data.password = values.password;
    console.log("🚀 ~ file: SignIn.jsx:15 ~ handleLogin ~ data:", data);
    const res = await postData(url, data);
    console.log("🚀 ~ file: SignIn.jsx:19 ~ handleLogin ~ res:", res);

    if (!res.success) {
      Swal.fire(
        "Oops!..",
        `${res.message ? res.message : "something went wrong..."}`,
        "error"
      );
      localStorage.setItem("login", "");
      navigate("/auth/login", { replace: true });
      
    } else {
      Swal.fire("Wow!..", "login Successfull!..", "success");
      localStorage.setItem("login", true);
      navigate("/");
    }
  }
  return (
    <>
      <div className=" rounded-sm border border-stroke bg-white shadow-default">
        <div className="flex h-screen flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-3 inline-block" to="/">
                <h2 className="text-3xl font-bold">Audition Admin</h2>
              </Link>

              <p className="2xl:px-20">
                Audition Admin - supporting your caregiving
              </p>

              <span className="mt-15 inline-block">
                <SignInPerson />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke  xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login In to Audition Admin
              </h2>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  username: Yup.string().required("Username is required"),
                  password: Yup.string().required("Password is required"),
                })}
                onSubmit={async (values) => {
                  await handleLogin(values);
                }}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <TextField
                      name="username"
                      label="Username"
                      placeholder="Enter your Username"
                    />
                    <TextField
                      name="password"
                      label="Password"
                      placeholder="Enter password"
                      type="password"
                    />
                    <div className="my-5">
                      <button
                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                        type="submit"
                      >
                        Submit Login
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

export default SignIn;
