"use client";
import { Drawer, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";
import { IoSettings } from "react-icons/io5";
import { MdMarkEmailUnread } from "react-icons/md";
import { LuPackageOpen } from "react-icons/lu";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/dashboard", <MdDashboardCustomize />),
  getItem("User", "2", <FaUserCircle />, [
    getItem(
      "Type",
      "/dashboard/category"
      // ,
      //  <MdRestaurantMenu />, [
      //     getItem('Category', '/category'),
      //     getItem('Sub Category', '/subcategory'),
      // ]
    ),
    getItem("List", "/dashboard/user"),
  ]),
  getItem("Markup", "3", <TbCoinTakaFilled />, [
    getItem("Default", "/dashboard/defaultmarkup"),
    getItem("Dynamic", "/dashboard/dynamicmarkup"),
  ]),
  getItem("Settings", "4", <IoSettings />, [
    getItem("Marquee", "/dashboard/marquee"),
    getItem("Banner Type", "/dashboard/banner"),
    getItem("Advertisement", "/dashboard/advertisement"),
    getItem("Coin", "/dashboard/coin"),
    getItem("Coupon", "/dashboard/coupon"),
  ]),
  getItem("Template", "5", <MdMarkEmailUnread />, [
    getItem("Template Type", "/dashboard/templatetype"),
    getItem("Email Template", "/dashboard/template"),
  ]),
  getItem("Product", "6", <MdOutlineProductionQuantityLimits />, [
    getItem("Product", "/dashboard/product"),
    getItem("Free Product", "/dashboard/freeproduct"),
    getItem("Coin Product", "/dashboard/coinproduct"),
  ]),
  getItem("Package", "7", <LuPackageOpen />, [
    getItem("Combo Package", "/dashboard/combopackage"),
    getItem("Family Package", "/dashboard/familypackage"),
  ]),
  // getItem("Users", "/dashboard/user", <FaUserCircle />),
];

export default function RootLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(true);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClick = (e) => {
    router.push(e.key);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={onClick}
          />
        </Sider>
      )}
      {isMobile && (
        <div className="remove-shadow">
          <Drawer
            placement="left"
            closable={false}
            onClose={onClose}
            open={open}
            key="left"
            style={{ width: "200px", backgroundColor: "#001529" }}
            rootClassName="custom-drawer"
          >
            <Sider
              collapsed={false}
              onCollapse={setCollapsed}
              style={{ minHeight: "100vh" }}
            >
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                defaultSelectedKeys={["1"]}
                mode="inline"
                items={items}
              />
            </Sider>
          </Drawer>
        </div>
      )}
      <MainContent showDrawer={showDrawer} items={items}>
        {children}
      </MainContent>
    </Layout>
  );
}

const MainContent = ({ showDrawer, items, children }) => {
  return (
    <Layout>
      <Navbar showDrawer={showDrawer} />
      <Content style={{ margin: "5px 25px 35px 25px" }}>{children}</Content>
      <Footer />
    </Layout>
  );
};
