import "./styles/index.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ManageMeeting from "./pages/ManageMeeting";
import MeetingDetails from "./pages/MeetingDetails";
import TasksManagement from "./pages/TasksManagement";
import TaskDetails from "./pages/TaskDetail";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "react-pro-sidebar/dist/css/styles.css";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("userRole") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

function App() {
  //const pathname = window.location.pathname;
  //const showNavBar = pathname === "/login" ? false : true;
  //const [collapsed, setCollapsed] = React.useState("");

  //function sidebarCollapsed(collapsed) {
    //setCollapsed(!collapsed);
  //}
  
  const pathname = window.location.pathname;
  const showNavBar = pathname === "/login" ? false : true;
  const [collapsed, setCollapsed] = React.useState(true);
  let mainClass;
  function sidebarCollapsed(collapsed) {
    setCollapsed(!collapsed);
    mainClass = mainCssClass();
  }

  function mainCssClass() {
    let mainCssClass;
    if (!showNavBar) {
      mainCssClass = "noSidebar";
    } else {
      mainCssClass = collapsed ? "sidebarOpen" : "sidebarClose";
    }
    return mainCssClass;
  }
  mainClass = mainCssClass();

  return (
    <Router>
      {showNavBar ? <Sidebar sidebarCollapsed={sidebarCollapsed} /> : ""}
      {collapsed ? <div className="sidebar-open overlay"></div> : ""}
      <main className={mainClass}>
        {/* {showNavBar ? <Header /> : ""} */}
        <Header />
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/profile" exact component={Profile} />
          <ProtectedRoute
            path="/manage-meeting/:id"
            exact
            component={MeetingDetails}
          />
          <ProtectedRoute
            path="/manage-meeting"
            exact
            component={ManageMeeting}
          />
          <ProtectedRoute
            path="/tasks-management/:Task_ID"
            exact
            component={TaskDetails}
          />
          <ProtectedRoute
            path="/tasks-management"
            exact
            component={TasksManagement}
          />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
