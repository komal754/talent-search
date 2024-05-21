import React, { useState, useRef,useEffect } from "react";
import "./RegistrationPage.css";
import { useForm, Controller } from "react-hook-form";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WifiCalling3OutlinedIcon from "@mui/icons-material/WifiCalling3Outlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { mutate } from "swr";
import { postData, updateData } from "../api/ClientFunction";
import Swal from "sweetalert2";
import axios from "axios";
import { baseURL } from "../api/ClientFunction";



function RegistrationPage() {
  let [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState();
  function closeModal() {
    setIsOpen(false);
  }

  const { register, handleSubmit, control } = useForm();
  async function onSubmit(data) {
    const url = "/api/v1/form/create";
    try {
      const formData = new FormData();
      formData.append("image1", data.image1[0]);
      formData.append("image2", data.image2[0]);
      formData.append("image3", data.image3[0]);
      formData.append("image4", data.image4[0]);

      formData.append("fullName", data.fullName);
      formData.append("reference", data.reference);
      formData.append("fhName", data.fhName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("city", data.city);
      formData.append("address", data.address);
      formData.append("height", data.height);
      formData.append("width", data.width);
      formData.append("state", data.state);
      formData.append("pastAchievement", data.pastAchievement);
      formData.append("pastExperience", data.pastExp);
      formData.append("complexion", data.complexion);
      formData.append("sex", data.sex);
      formData.append("country", data.country);
      formData.append("pinCode", data.pincode);
      formData.append("auditionCategory", data.auditionCategory);
      const videoData = new FormData();
      videoData.append("videoFile", data.videoFile[0]);
      // Perform the POST request using postData function
      const res = await postData(url, formData);
      if (!res.success) {
        Swal.fire("Oops!..", "Something Went Wrong!...", "error");
        return;
      }
      const id = res.data._id;
      setId(id);
      const vres = await postData(`/api/v1/form/upload/${id}`, videoData);
      if (!vres.success) {
        Swal.fire("Oops!..", "Something Went Wrong!...", "error");
        return;
      }
      // After successful POST, manually update the data in the cache
      mutate(url, res, false);
      setIsOpen(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Oops!..", "Something Went Wrong!...", "error");
    }
  }

  return (
    <div>
      {isOpen && (
        <Transection isOpen={isOpen} closeModal={closeModal} id={id} />
      )}
      {!isOpen && (
        <div className="contact">
          <div style={{ maxWidth: "400px" }}></div>
          <div className="container">
            {/* Form */}
            <form
              id="contactForm"
              name="contactForm"
              onSubmit={handleSubmit(onSubmit)}
              method="post"
              encType="multipart/form-data"
            >
              <div className="row">
                <div className="col-lg-8" id="mainContent">
                  {/* Personal Details */}
                  <div className="row box first">
                    <div className="box-header">
                      <h3>
                        <strong>1</strong>Personal Details
                      </h3>
                      <p>Subtitle or short description can be set here.</p>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="fullname"
                          className="form-control"
                          name=""
                          placeholder=" Full Name"
                          type="text"
                          {...register("fullName")}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="fathername"
                          className="form-control"
                          name="email"
                          placeholder=" Father's /Husband's Name"
                          type="text"
                          {...register("fhName")}
                          style={{
                            "::placeholder": { color: "red" },
                            color: "black",
                          }} // Adjust color values as needed
                        />{" "}
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <Controller
                          name="sex"
                          control={control}
                          defaultValue="Not Define"
                          render={({ field }) => (
                            <select {...field} className="form-control">
                              <option value="Not Define">Sex</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="email"
                          className="form-control"
                          name="email"
                          {...register("email")}
                          placeholder=" Email"
                          type="text"
                          data-parsley-pattern="^\+{1}[0-9]+$"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="phone"
                          className="form-control"
                          name="phone"
                          {...register("phone")}
                          placeholder=" Phone No. +91363012345"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="height"
                          className="form-control"
                          name=""
                          {...register("height")}
                          placeholder="Height"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="reference"
                          className="form-control"
                          name="reference"
                          {...register("reference")}
                          placeholder="Reference"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="fullname"
                          className="form-control"
                          name=""
                          {...register("width")}
                          placeholder="width"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <Controller
                          name="complexion"
                          control={control}
                          defaultValue="Not Define"
                          render={({ field }) => (
                            <select {...field} className="form-control">
                              <option value="">Complexion</option>
                              <option value="Fair">Fair</option>
                              <option value="Medium">Medium</option>
                              <option value="Dark">Dark</option>
                            </select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Personal Details End */}
                  {/* Message */}
                  <div className="row box">
                    <div className="box-header">
                      <h3>
                        <strong>2</strong>Address
                      </h3>
                      <p>Subtitle or short description can be set here.</p>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="adderess"
                          className="form-control"
                          name="city"
                          placeholder="City"
                          type="text"
                          {...register("city")}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="adderess"
                          className="form-control"
                          name="state"
                          placeholder="State"
                          type="text"
                          {...register("state")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="adderess"
                          className="form-control"
                          name="country"
                          placeholder="Country"
                          type="text"
                          {...register("country")}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <input
                          required
                          id="adderess"
                          className="form-control"
                          name="pinCode"
                          placeholder="Pin Code"
                          type="text"
                          {...register("pincode")}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="inputMessage"
                          className="form-control"
                          name="message"
                          placeholder="Address"
                          data-parsley-pattern="^[a-zA-Z0-9\s.:,!?']+$"
                          defaultValue={""}
                          {...register("address")}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row box">
                    <div className="box-header">
                      <h3>
                        <strong>3</strong>Audition Details
                      </h3>
                      <p>Subtitle or short description can be set here.</p>
                    </div>

                    <div className="col-lg-6 col-md-12">
                      <div className="form-group">
                        <Controller
                          name="auditionCategory"
                          control={control}
                          defaultValue="Not Define"
                          render={({ field }) => (
                            <select {...field} className="form-control">
                              <option value="">Audition Categories</option>
                              <option value="Dance Event">Dance Event</option>
                              <option value="Car Stunt">Car Stunt</option>
                              <option value="MoterBike Stunt">
                                MoterBike Stunt
                              </option>
                              <option value="Music Audition">
                                Music Audition
                              </option>
                              <option value="Audition Registration & Event">
                                Audition Registration &amp; Event
                              </option>
                              <option value="Choreography Event">
                                choreography Event
                              </option>
                              <option value="Fashion Audition">
                                Fashion Audition
                              </option>
                              <option value="Active Audition">
                                Acting Audition
                              </option>
                              <option value="Live Music Performace">
                                Live Music Performance
                              </option>
                              <option value="Art and Visual Arts Audition">
                                Art and Visual Arts Audition
                              </option>
                              <option value="Comedy">
                                comedy
                              </option>
                              <option value="Photography Talent">
                                Photography Talent
                              </option>
                              <option value="Digital Art Performance">Digital Art Performance</option>
                              <option value="Solo Vocal Audition">
                                solo vocal audition
                              </option>
                              <option value="SongWriting Showcase">
                                Songwriting Showcase
                              </option>
                              <option value="Cycle Event Audition">
                                Cycle Event Audition
                              </option>
                              <option value="Stylist Talent">
                                Stylist Talent
                              </option>
                              <option value="Digital Art Performance">
                                Others
                              </option>
                            </select>
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="inputMessage"
                          className="form-control"
                          name="message"
                          placeholder="Past Experience"
                          data-parsley-pattern="^[a-zA-Z0-9\s.:,!?']+$"
                          defaultValue={""}
                          {...register("pastExp")}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="inputMessage"
                          className="form-control"
                          name="message"
                          placeholder="Past Achievement"
                          data-parsley-pattern="^[a-zA-Z0-9\s.:,!?']+$"
                          defaultValue={""}
                          {...register("pastAchievement")}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Message End */}
                  {/* File Uploader */}
                  <div className="row box">
                    <div className="box-header">
                      <h3>
                        <strong>3</strong>Upload Photos
                      </h3>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="col-md-12">
                        <div className="py-2 border-1 bg-gray-200">
                          <input
                            className=" "
                            required
                            type="file"
                            name="image1"
                            id="fileInput1"
                            accept="image/*" // Add this if you want to restrict to image files
                            {...register("image1")}
                            placeholder="choose image"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="col-md-12">
                        <div className="py-2 border-1 bg-gray-200">
                          <input
                            className=" "
                            required
                            type="file"
                            name="image2"
                            id="fileInput2"
                            accept="image/*" // Add this if you want to restrict to image files
                            {...register("image2")}
                            placeholder="choose image"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="col-md-12">
                        <div className="py-2 border-1 bg-gray-200">
                          <input
                            className=" "
                            required
                            type="file"
                            name="image3"
                            id="fileInput3"
                            accept="image/*" // Add this if you want to restrict to image files
                            {...register("image3")}
                            placeholder="choose image"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <div className="col-md-12">
                        <div className="py-2 border-1 bg-gray-200">
                          <input
                            className=" "
                            required
                            type="file"
                            name="image4"
                            id="fileInput4"
                            accept="image/*" // Add this if you want to restrict to image files
                            {...register("image4")}
                            placeholder="choose image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row box">
                    <div className="box-header">
                      <h3>
                        <strong>5</strong>Upload Video
                      </h3>
                      <p>Only Video 30Mb.</p>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group border-1 pt-3 bg-gray-200">
                        <input
                          required
                          type="file"
                          name="videoFile"
                          id="videoInput"
                          accept="video/*" // Add this if you want to restrict to video files
                          {...register("videoFile")}
                        />
                      </div>
                    </div>
                  </div>
                  {/* File Uploader End */}
                  {/* Terms */}
                  <div className="row box">
                    <div className="box-header">
                      <h3>
                        <strong>6</strong>Submission
                      </h3>
                      <p>Please accept the terms and conditions below.</p>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          required
                          type="checkbox"
                          id="cbx"
                          className="inp-cbx"
                          name="terms"
                          defaultValue="yes"
                        />
                        <label className="cbx terms" htmlFor="cbx">
                          <span>
                            <svg width="12px" height="10px" viewBox="0 0 12 10">
                              <polyline points="1.5 6 4.5 9 10.5 1" />
                            </svg>
                          </span>
                          <span>
                            Accept
                            <a
                              href="pdf/terms.pdf"
                              className="terms-link"
                              target="_blank"
                            >
                              Terms and Conditions
                            </a>
                            .
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* Terms End */}
                  {/* Submit*/}
                  <div className="row box">
                    <div className="col-12">
                      <div className="form-group">
                        <button
                          type="submit"
                          name="submit"
                          className="btn-form-func"
                        >
                          <span className="btn-form-func-content">Submit</span>

                          <span className="icon">
                            <SendOutlinedIcon className="fa fa-paper-plane" />
                            {/* <button><QrCode/></button> */}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Submit */}
                </div>
                <div className="col-lg-4" id="sidebar">
                  {/* Contact Info Container */}
                  <div id="contactInfoContainer" className="theiaStickySidebar">
                    <div className="contact-box">
                      <LocationOnOutlinedIcon sx={{ color: "#53C4DA" }} />
                      <h2>Address</h2>
                      <a
                        href="https://www.google.com/maps/place/Kerala+Folklore+Museum/@9.9297055,76.2241185,12.75z/data=!4m15!1m8!3m7!1s0x3b080d514abec6bf:0xbd582caa5844192!2sKochi,+Kerala,+India!3b1!8m2!3d9.9312328!4d76.2673041!16zL20vMGZsMnM!3m5!1s0x3b0872f5cd194485:0x61c5c550e1779c71!8m2!3d9.9330107!4d76.2989787!16s%2Fg%2F11ffg4w6zg?hl=en-US&entry=ttu"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Kochi, Kerala , India
                      </a>
                    </div>
                    <div className="contact-box">
                      <EmailOutlinedIcon sx={{ color: "#53C4DA" }} />
                      <h2>Email</h2>
                      <a href="mailto:AuditionHub@gmail.com">
                        AuditionHub@gmail.com
                      </a>
                    </div>
                  </div>
                  {/* Contact Info Container End */}
                </div>
              </div>
            </form>
            {/* Form End */}
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationPage;

function Transection({ closeModal, id }) {
  const rrn = useRef();
  window.scrollTo(0,200)
  const [qrimage, setqrimage] = useState('')
  useEffect(()=>
  { async function getqr(){
      let res=await axios.get(`${baseURL}/api/v1/form/qr`)
      console.log(res.data)
      setqrimage(res.data.qrcode)
    }
    getqr()
   },[])

  async function saveRRN() {
    const url = `/api/v1/form/rrn/${id}`;

   
    try {
      const formData = {};
      formData.rrn = rrn.current.value;
      // Perform the POST request using postData function
      const res = await updateData(url, formData);
      if (!res.success) {
        Swal.fire("Oops!..", "Something Went Wrong!...", "error");
        return;
      }
      // After successful POST, manually update the data in the cache
      mutate(url, res, false);
      Swal.fire("Thanks for your Registration","we will check your details and update you soon","success");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Please deposit the payment","error");
    }
  }

  return (
    <div className=" min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h1 className="font-bold text-xl my-3">
          Register now! and Book your seat <br />
          <span style={{color:'blue'}}>Please Scan QR and pay ₹599</span>
        </h1>
        <div className="flex sm:items-center  justify-center">
          <div className=" z-[100] gap-6 ps-5">
            <img
              src={`${baseURL}${qrimage}`}
              alt="imageNotFound"
              className=" qrcode max-h-64 ms-3"
            />
            <div className="border border-2 border-black rounded-md px-2 py-2 mb-12 mt-3">
              <input
                required
                type="text"
                id="rrn"
                placeholder="Enter Transaction Number"
                ref={rrn}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:mx-64 gap-4">
        <button
          className="hover:bg-gray-50 bg-red-500 ml-2 mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:w-auto w-full"
          style={{
            backgroundColor: "#E24A4F",
          }}
          onClick={() => {
            saveRRN();
            closeModal();
          }}
        >
          Submit
        </button>
        <button
          className="text-gray-900 ring-gray-300 hover:bg-gray-50 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
