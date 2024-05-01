import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../context/MyContext';
import SearchSelect from './form/SearchSelect';

const DashboardMessage = ({data}) => {
  const { rolesData } = useContext(MyContext);
  return (
          <div className="dashboard__Body-top mb-4">
      <div className="h6 font-medium m-0">Hi {rolesData?.name ?? "no name"},</div>
      <div className="dashboard__Body-top- flex justify-between items-center">
        <div className="dashboard__Body-top-l font-medium m-0">
          Good Morning
        </div>
        <div className="dashboard__Body-top-r">
          <div className="flex gap-4 items-center dashboard__Body-top-rres">
            {data?.button &&  <Link to={data?.button.link} className="btn btn-primary flex gap-2 items-center">
                <img
                  src={require("../dist/webImages/plus-circle.png")}
                  alt=""
                />{" "}
                <span>{data?.button.label}</span>
              </Link>}

            <div className="relative dashboard__Body-top-rr ">
              <img
                src={require("../dist/webImages/SearchIcon.png")}
                alt=""
              />
              {
                // rolesData.role_id !== 2 && 
                <SearchSelect />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
       )
    }

export default DashboardMessage