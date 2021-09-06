import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  FaTachometerAlt,
  FaTasks,
  FaUserAlt,
  FaCheckSquare,
  FaChevronLeft,
  FaBars,
  FaPowerOff,
} from "react-icons/fa";

const Sidebar = (props) => {
  const { sidebarCollapsed } = props;
  const [collapsed, setCollapsed] = React.useState(false);

  function logout() {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    window.location.href = "/login";
  }

  function openSidebar() {
    setCollapsed(false);
    sidebarCollapsed(false);
  }

  function closeSidebar() {
    setCollapsed(true);
    sidebarCollapsed(true);
  }

  return (
    <ProSidebar collapsed={collapsed} className="nav-sidebar" breakpoint="md">
      {!collapsed ? (
        <Button className="btn" onClick={closeSidebar}>
          <FaChevronLeft />
        </Button>
      ) : (
        <Button className="btn" onClick={openSidebar}>
          <FaBars />
        </Button>
      )}
      <SidebarHeader>
        <div className="sidebar-header">Online Meeting System</div>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaTachometerAlt />}>
            <NavLink exact to="/" activeClassName="active">
              Dashboard
            </NavLink>
          </MenuItem>
          <MenuItem icon={<FaTasks />}>
            <NavLink to="/manage-meeting" activeClassName="active">
              Manage Meeting
            </NavLink>
          </MenuItem>
          <MenuItem icon={<FaCheckSquare />}>
            <NavLink to="/tasks-management" activeClassName="active">
              Task Management
            </NavLink>
          </MenuItem>
          <MenuItem icon={<FaUserAlt />}>
            <NavLink to="/profile" activeClassName="active">
              User Profile
            </NavLink>
          </MenuItem>
          <MenuItem icon={<FaPowerOff />}>
            <NavLink to="/login" activeClassName="active" onClick={logout}>
              Log Out
            </NavLink>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter style={{ textAlign: "center" }}>
        {!collapsed ? (
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "15px",
            }}
          >
            &copy;{new Date().getFullYear()} Copyright: Group 14
          </div>
        ) : (
          ""
        )}
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
