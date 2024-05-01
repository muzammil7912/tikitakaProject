import React, { useContext, useEffect, useState } from "react";
import DashboardMessage from "../components/DashboardMessage";
import { FaArrowDownLong, FaArrowUpLong, FaEllipsisVertical } from "react-icons/fa6";
import Chartss from "./Chartss";
import { Dropdown, Space } from "antd";
import useFetch from "../customHooks/useFetch";
import Loader from "../components/Loader";
import SuperAdminChart from "../SuperAdminChart";
import { MyContext } from "../context/MyContext";
import { AllTarget } from "../data/alldata";
import { Link } from "react-router-dom";
import { MenuActive } from "../context/MenuActiveContext";

const Analytics = () => {
  const { rolesData } = useContext(MyContext);
  const { setMunuActiv } = useContext(MenuActive);

  useEffect(() => {
    setMunuActiv([true,"Reports"])
 
  }, [setMunuActiv]);
  const {loading,data} = useFetch(`dashboard/superAdminDashboardData/${rolesData.id}`);
    const [superAdminDashboard, setsuperAdminDashboard] = useState("");
    const [vendorData, setVendorData] = useState("");
    const [revenueDataold, setRevenueDataold] = useState("");
    const [revenueData, setRevenueData] = useState("");
    const [month, setMonth] = useState("");
    let colorss = {"income": "#ed2656","expense": "#05CD99","profit": "#C0CCE2"};
    const [color, setColor] = useState(["#ed2656","#05CD99","#C0CCE2"]);
    const [tabActive, setTabActive] = useState("all");
    const [AllTargetSelected, setAllTargetSelected] = useState("target")
    useEffect(() => {
        if(data) {
        setsuperAdminDashboard(data.data)
        setVendorData(data.data.vendor_list)
        let namess = [];
        let monthss = [];
        for (let item in data.data.revenue_chart_data) {
          namess.push(item) 
        }
        let valuessincome = [];
        let valuessprofit = [];
        let valuessexpense = [];
        for (let item in data.data.revenue_chart_data) {
          for (let item2 in data.data.revenue_chart_data[item]) {
            if(item === "income") {
              valuessincome.push(data.data.revenue_chart_data[item][item2])
          }
            if(item === "expense") {
              valuessprofit.push(data.data.revenue_chart_data[item][item2])
          }
            if(item === "profit") {
            valuessexpense.push(data.data.revenue_chart_data[item][item2])
          }
          }
        }
        for (let item in data.data.revenue_chart_data["all"]) {
          monthss.push(item)
        }
        setMonth(monthss)
        let aa = [];
        namess.forEach((item) => {
            switch (item) {
                case "income":
                    aa.push({ "name": item, "data": valuessincome });
                    break;
                case "expense":
                    aa.push({ "name": item, "data": valuessexpense });
                    break;
                case "profit":
                    aa.push({ "name": item, "data": valuessprofit });
                    break;
                default:
                    // Agar item koi bhi specific case mein nahi aata, toh kuch nahi karein
                    break;
            }
        });
        setRevenueData(aa)
        setRevenueDataold(aa)
        }
      }, [data])

    if(loading && !superAdminDashboard) return <Loader />;

      const  RevenueTab = [
        {
            label:"all",
        },
        {
            label:"income",
        },
        {
            label:"expense",
        },
        {
            label:"profit",
        },
      ]
      const handleTab = (item) => {
        if(item === "all") {
          setTabActive(item)
          setColor(["#ed2656","#05CD99","#C0CCE2"]);
          setRevenueData(revenueDataold)
        }
        else {
          setTabActive(item)
          setColor([colorss[item]])
          setRevenueData(revenueDataold.filter((ite) =>  ite.name === item))
        }
      }
  return (
    <>
      <DashboardMessage />
      <section className="AnalyticsPage">
        <div className="AnalyticsPage_top grid gap-3">
          <div className="card">
            <div className="card_top flex justify-between">
              <div className="card_topl ">
                <div className="h3">{AllTargetSelected}</div>
                {/* <div className="h4">Revenue Target</div> */}
              </div>
              <div className="card_topr">
              <Dropdown trigger={["click"]} overlay={
    <ul className="dropdownTar">
        {AllTarget.map((item) => (
            <li
                key={item.value}
                onClick={() => setAllTargetSelected(item.value)}
                className={AllTargetSelected === item.value ? "active" : ""}
            >
                {item.label}
            </li>
        ))}
    </ul>
}>
    <Link className="cursor-pointer" onClick={(e) => e.preventDefault()}>
        <Space>
            <FaEllipsisVertical />
        </Space>
    </Link>
</Dropdown>
         </div>
            </div>
            <div className="card_body">
              <div className="chartt">
              {data?.data?.chart[AllTargetSelected] && <Chartss typee={AllTargetSelected ?? "target"} datass={data?.data?.chart[AllTargetSelected]} />}
              </div>
              
            </div>
            <div className="card_footer grid grid-cols-3 gap-2">
                <div className="card_footerBox">
                    <div className="h4 text-center">Target</div>
                    <div className="h6 flex gap-1 mt-2">
                        {data?.data?.chart[AllTargetSelected]?.target} <span><FaArrowDownLong /> </span>
                    </div>
                </div>
                <div className="card_footerBox">
                    <div className="h4 text-center">Revenue</div>
                    <div className="h6 flex gap-1 mt-2">
                    {data?.data?.chart[AllTargetSelected]?.revenue} <span><FaArrowUpLong /> </span>
                    </div>
                </div>
                <div className="card_footerBox">
                    <div className="h4 text-center">Today</div>
                    <div className="h6 flex gap-1 mt-2">
                    {data?.data?.chart[AllTargetSelected]?.target} <span><FaArrowUpLong /> </span>
                    </div>
                </div>
            </div>
          </div>
          <div className="card cardRevenue">
            <div className="cardRevenue_top flex justify-between ">
                <div className="cardRevenue_topl">
                    <div className="h2">Revenue</div>
                    <div className="h4">Your Revenue This Year</div>
                </div>
                <div className="cardRevenue_topr">
                    <ul className='list flex items-center gap-2'>
                        {
                            RevenueTab.map((item) => {
                                return (
                                    <li onClick={()=> handleTab(item.label)} className={tabActive === item.label ? "active" : ""}>{item.label}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="cardRevenue_bottom">
              {revenueData &&
              <SuperAdminChart dataa={revenueData} monthh={month} colorr={color} />
              }
                
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Analytics;
