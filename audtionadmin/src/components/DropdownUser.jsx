import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BiLogOut } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [dropdownOpen, dropdown]);
  function handleLogout() {
    localStorage.setItem("login", "");
    navigate("/auth/login");
  }
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {/* {userData?.user?.firstName} {userData?.user?.lastName} */}
            Admin
          </span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <div className=" relative inline-flex h-10 w-10  items-center justify-center overflow-hidden rounded-full bg-danger p-1 ">
            <span className="font-medium text-white">A</span>
          </div>
        </span>

        <span className={`${dropdownOpen ? "rotate-180" : ""}`}>
          <RiArrowDropDownLine size={32} />
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default  dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <BiLogOut size={22} />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
