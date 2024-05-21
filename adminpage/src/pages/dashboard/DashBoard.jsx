import { FcPortraitMode, FcConferenceCall, FcButtingIn } from "react-icons/fc";
import Spinner from "../../components/Spinner.jsx";
import ViewCard from "../../components/Card/ViewCard";
import { fetchData, postData } from "../../api/ClientFunction";
import { useEffect, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import classes from "./dashboard.module.css";

// import Loading from "../../components/Loading";
import useSWR, { mutate } from "swr";
import { LuEye } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { updateData } from "./../../api/ClientFunction.jsx";
import Swal from "sweetalert2";
const Dashboard = () => {
  const [filterText, setFilterText] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("");
  const [mail, setMail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dashboardurl = `/api/v1/form/dashboard`;
  const [all, setAll] = useState({});
  const { data, error, isLoading } = useSWR(dashboardurl, fetchData);
  useEffect(() => {
    if (data && data?.data) {
      setAll(data.data);
    }
  }, [data]);
  console.log(data, all);
  const [pageIndex, setPageIndex] = useState(1);
  const [userData, setUserData] = useState([]);
  const [video, setVideo] = useState("");
  const [approve, setApprove] = useState("");
  const [id, setId] = useState();
  const pageSize = 10;
  const url = `/api/v1/form/getAll?page=${pageIndex}&limit=${pageSize}`;
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: ndata,
    error: nerror,
    isLoading: nisLoading,
  } = useSWR(url, fetchData);
  useEffect(() => {
    const handleApprove = async () => {
      // console.log(id, approve);
      const approveUrl = `/api/v1/form/approve/${id}`;
      if (approve === "approved" || approve === "reject") {
        try {
          const data = { status: approve };
          const res = await updateData(approveUrl, data);
          if (!res.success) {
            Swal.fire(
              "Oops!..",
              `${res.message ? res.message : "something went wrong..."}`,
              "error"
            );
          } else {
            Swal.fire("Wow!..", `Status ${approve}`, "success");
            mutate(`/api/v1/form/getAll?page=${pageIndex}&limit=${pageSize}`);
          }
        } catch (error) {
          console.error("Error handling approval:", error);
        }
      }
    };

    // Call the handleApprove function here or leave it as is, depending on your logic
    handleApprove();
  }, [id, approve, pageIndex, pageSize]);
  //===== logics =====
  useEffect(() => {
    if (ndata && ndata.users) {
      setUserData(ndata.users);
    }
    // console.log(ndata,ndata?.users)
  }, [ndata]);
  // console.log(userData);
  if (error || nerror || isLoading || nisLoading) {
    return <Spinner />;
  }
  // console.log(userData);
  const filterData = userData.filter((item) => item.rrn);
  const selectFilterItems = filterData.filter((item) => {
    const selectedFilterText = selectedFilter.toLowerCase().trim();
    const isKycVerified = item.status.toLowerCase().trim();
    // Check if the isKycVerified value matches the selected filter
    return isKycVerified.includes(selectedFilterText);
  });

  const searchData = filterData.filter((item) => {
    const filterText2 = filterText.toLowerCase().trim();
    return (
      item?.status?.toLowerCase().trim().includes(filterText2) ||
      item?.fullName?.toLowerCase().trim().includes(filterText2) ||
      item?.email?.toLowerCase().trim().includes(filterText2) ||
      item?.phone?.toLowerCase().trim().includes(filterText2) ||
      item?.rrn?.toLowerCase().trim().includes(filterText2) ||
      item?.sex?.toLowerCase().trim().includes(filterText2) ||
      item?.height?.toLowerCase().trim().includes(filterText2) ||
      item?.width?.toLowerCase().trim().includes(filterText2) ||
      item?.complexion?.toLowerCase().trim().includes(filterText2) ||
      item?.city?.toLowerCase().trim().includes(filterText2) ||
      item?.reference?.toLowerCase().trim().includes(filterText2) ||
      item?.state?.toLowerCase().trim().includes(filterText2) ||
      item?.country?.toLowerCase().trim().includes(filterText2) ||
      item?.address?.toLowerCase().trim().includes(filterText2) ||
      item?.auditionCategory?.toLowerCase().trim().includes(filterText2) ||
      item?.pastExperience?.toLowerCase().trim().includes(filterText2) ||
      item?.pastAchievement?.toLowerCase().trim().includes(filterText2)
    );
  });

  const Adata = selectedFilter==='' ? selectFilterItems : searchData;
  console.log(`filter=`,filterData)

  return (
    <>
      <div className="flex justify-center">{/* <Loading /> */}</div>
      <div>
        <div className="align-center grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mb-6">
          <ViewCard
            icon={<FcConferenceCall size={36} className="text-primary" />}
            value={all.approvedUsers ?? 0}
            title="Total Approved Users"
          />
          <ViewCard
            icon={<FcButtingIn size={36} className="text-primary" />}
            value={all.pendingUsers ?? 0}
            title="Total Pending Users"
          />
          <ViewCard
            icon={<FcPortraitMode size={36} className="text-primary" />}
            value={all.rejectedUsers ?? 0}
            title="Total Rejected Users"
          />
        </div>
        <div>
          {!isOpen && !mail && (
            <>
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex">
                  <span className="text-gray-400 dark:text-white ">
                    Current Page
                    <span className="font-medium dark:text-white">
                      {pageIndex}&nbsp;/&nbsp;
                    </span>
                    Total Limit&nbsp;
                    <span className="font-medium dark:text-white">10</span>
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="mr-2  rounded-md ">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="py-1 border-2 rounded px-2 outline-none"
                    >
                      <option value="" className="text-gray-500">
                        FilterByStatus
                      </option>
                      <option value="approved">Approved</option>
                      <option value="reject">Reject</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div className="flex gap-0 justify-center items-center">
                    <div className="border-2 rounded-md rounded-r-none">
                      <input
                        id="search"
                        type="text"
                        placeholder={`Filter By Search`}
                        aria-label="Search Input"
                        className={`${classes.search_bar} border outline-none`}
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className={`${classes.search_bar_button} border-2 border-primary bg-primary`}
                      onClick={() => setFilterText("")}
                    >
                      X
                    </button>
                  </div>
                  <div className=" inline-flex">
                    <div className=" mx-2 flex justify-end gap-2">
                      <div className="inline-flex">
                        <div
                          onClick={() => {
                            if (pageIndex > 1) {
                              setPageIndex(pageIndex - 1);
                            }
                          }}
                          className="flex h-10 items-center justify-center rounded-l bg-primary px-6 text-base font-medium text-white hover:bg-black"
                        >
                          Prev
                        </div>

                        <div
                          onClick={() => {
                            if (userData.length > 0) {
                              setPageIndex(pageIndex + 1);
                            }
                          }}
                          className="flex h-10 items-center justify-center rounded-r border-l bg-primary px-6 text-base font-medium text-white hover:bg-black"
                        >
                          Next
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="rounded-t-md">
                    <tr className=" bg-white text-left">
                      <th className="py-5 px-6 font-medium text-black">S.No</th>
                      <th className="py-5 px-6 font-medium text-black">
                        Profile
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        UserName
                      </th>
                      <th className="max-w-md py-5 px-6 font-medium text-black">
                        Father/Husband
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        Status
                      </th>
                      <th className="py-5 px-6 font-medium text-black">RRN</th>
                      <th className="py-5 px-6 font-medium text-black">Sex</th>
                      <th className="py-5 px-6 font-medium text-black">
                        Email
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        Phone
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        Height
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        Width
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        Complexion
                      </th>
                      <th className="py-5 px-6 font-medium text-black">City</th>
                      <th className="py-5 px-6 font-medium text-black">
                        Reference
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        State
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        Country
                      </th>

                      <th className="py-5 px-6 font-medium text-black">
                        Address
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        AuditionCategory
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        PastExp.
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        PastAcheivement
                      </th>
                      <th className="py-5 px-6 font-medium text-black">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Adata?.map((users, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-6">
                          <h5 className="text-ellipsis font-medium text-black ">
                            {index + 1 + (pageIndex - 1) * 10}.
                          </h5>
                        </td>
                        <td className="max-w-md border-b border-[#eee] py-5 px-6 ">
                          <img
                            src={`${import.meta.env.VITE_API_URL}${
                              users?.image || users?.image1
                            }`}
                            width={80}
                            height={80}
                          />
                        </td>

                        <td className="max-w-md border-b border-[#eee] py-5 px-6 ">
                          <div className="flex-col items-center gap-2">
                            <p className="text-base text-black">
                              {users?.fullName}
                            </p>
                          </div>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p
                            className={`inline-flex rounded-full bg-meta-5 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-5`}
                          >
                            {users?.fhName}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-6 ">
                          <p
                            className={`inline-flex rounded-full bg-meta-4 bg-opacity-10 py-1 px-3 text-sm font-medium text-meta-4`}
                          >
                            {users?.status}
                          </p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.rrn}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.sex}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.email}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.phone}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.height}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.width}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.complexion}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.city}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.reference}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.state}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.country}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.address}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">
                            {users?.auditionCategory}
                          </p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">{users?.pastExperience}</p>
                        </td>
                        <td className="text-gray-700 border-b border-[#eee] py-5 px-6 italic tracking-tight antialiased ">
                          <p className="text-black ">
                            {users?.pastAchievement}
                          </p>
                        </td>

                        <td className="border-b border-[#eee] py-5 px-6 ">
                          <div className="flex items-center space-x-3.5">
                            <button>
                              <div className="flex gap-3 items-center justify-center">
                                <div
                                  onClick={() => {
                                    setIsOpen(true);
                                    setVideo(users?.videoFile);
                                  }}
                                  className="hover:text-primary"
                                  title="See Video"
                                >
                                  <LuEye size={20} />
                                </div>
                                {users?.status.trim() === "pending" && (
                                  <>
                                    <div
                                      className="hover:text-[green]"
                                      title="Approve Transection"
                                      onClick={() => {
                                        setApprove("approved");
                                        setId(users?._id);
                                        handleApprove();
                                      }}
                                    >
                                      <FaCheck />
                                    </div>
                                    <div
                                      onClick={() => {
                                        setApprove("reject");
                                        setId(users?._id);
                                        handleApprove();
                                      }}
                                      className="hover:text-[#f03e3e]"
                                      title="Reject Transection"
                                    >
                                      <ImCross />
                                    </div>
                                  </>
                                )}

                                <div
                                  onClick={() => {
                                    setId(users?._id);
                                    setName(users?.fullName);
                                    setEmail(users?.email);
                                    setMail(true);
                                  }}
                                  className="hover:text-[green]"
                                  title="Send Email"
                                >
                                  <MdOutlineMail />
                                </div>
                              </div>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {isOpen && !mail && (
            <div className="flex flex-col items-center h-64">
              <div
                className="absolute w-12 right-10 text-[red] cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <IoExitOutline size={36} />
              </div>
              <h2 className="font-semibold text-center text-3xl mb-12">
                Audition Video
              </h2>
              <video controls style={{ width: "600px", height: "500px" }}>
                <source src={`${import.meta.env.VITE_API_URL}${video}`} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {mail && <SendEmail name={name} email={email} />}
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;

const SendEmail = ({ name, email }) => {
  console.log(name, email);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSendEmail = async () => {
    // Implement your logic to send the email
    // For simplicity, we'll log the email details for now
    console.log("Subject:", subject);
    console.log("Body:", body);
    const approveUrl = `/api/v1/form/sendEmail?email=${email}`;
    try {
      const data = { message: body, subject: subject };
      const res = await postData(approveUrl, data);
      if (!res.success) {
        Swal.fire(
          "Oops!..",
          `${res.message ? res.message : "something went wrong..."}`,
          "error"
        );
      } else {
        Swal.fire("Wow!..", "Email Sent SuccessFully!....", "success");
      }
    } catch (error) {
      console.error("Error handling approval:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Send Email to {name}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Subject:
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter subject"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Email Body:
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          rows="8"
          placeholder="Enter email body"
          value={body}
          onChange={handleBodyChange}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          className="px-6 py-3 bg-[#228be6] text-white text-xl font-medium border-[red] rounded-md "
          onClick={handleSendEmail}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};
