"use client";
import { Breadcrumb } from "antd";
import React from "react";
import { CiMoneyBill } from "react-icons/ci";
import { HiOutlineTicket } from "react-icons/hi";
import { TbFileInvoice, TbPlaneDeparture } from "react-icons/tb";
const DashboardPage = () => {
  return (
    <>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          {
            title: "Dashboard",
          },
        ]}
      />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "white",
          borderRadius: "8px",
          margin: "16px 0",
        }}
      >
        <div className="flex flex-col justify-between  md:flex-row gap-4">
          <DataCard
            icon={<TbFileInvoice color="white" fontSize="4.5em" />}
            title="Total Booking"
            value="1333"
            bgColor="bg-red-600"
          />
          <DataCard
            icon={<HiOutlineTicket color="white" fontSize="4.5em" />}
            title="Total Ticket"
            value="1555"
            bgColor="bg-orange-400"
          />
          <DataCard
            icon={<CiMoneyBill color="white" fontSize="4.5em" />}
            title="Total Sales"
            value="500"
            bgColor="bg-amber-300"
          />
          <DataCard
            icon={<TbPlaneDeparture color="white" fontSize="4.5em" />}
            title="Highest Ticketed Airline"
            value="1111"
            bgColor="bg-yellow-400"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;

const DataCard = ({ icon, title, value, bgColor }) => {
  return (
    <div
      className={`basis-1/4 shadow-lg rounded-md ${bgColor} p-5 text-white max-h-[180px] w-full shadow-xl hover:scale-105 duration-700`}
    >
      {icon}
      <h2 className="text-xl font-bold text-start">{title}</h2>
      <h2 className="text-xl font-bold text-start">{value}</h2>
    </div>
  );
};
