import { useEffect, useRef, useState } from 'react';
import { AiOutlineLogout, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const navigate = useNavigate();

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
    
    document.addEventListener('click', clickHandler);
    
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event) => {
      if (!dropdownOpen || event.key !== 'Escape') return;
      setDropdownOpen(false);
    };

    document.addEventListener('keydown', keyHandler);
    
    return () => {
      document.removeEventListener('keydown', keyHandler);
    };
  }, [dropdownOpen]);

const handleLogout = () => {
  navigate("config.demologin")
}

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
  

        <span className="h-12 w-12 rounded-full profileimg">
          <img src={require("../../dist/webImages/user-01.png")} alt="User" />
        </span>

      </Link>
      <div
        ref={dropdown}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex dorpdownwidth flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col">
          <li>
            <Link
              to="/${config.demo}profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
             <AiOutlineUser  />
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="/pages/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
             <AiOutlineSetting />
              Account Settings
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
        <AiOutlineLogout />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
