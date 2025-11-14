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
    getItem("Users", "/dashboard/user"),
  ]),
   getItem("Product", "3", <MdOutlineProductionQuantityLimits />, [
    getItem("Products", "/dashboard/product"),
  ])
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
