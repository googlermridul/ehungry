import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThLarge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import NotFound from "../../NotFound/NotFound";
import TopHeader from "../TopHeader/TopHeader";
import useAuth from "../../../hooks/useAuth";
import "./Dashboard.scss";
import AddMenu from "../AddMenu/AddMenu";
import ManageMenus from "../ManageMenus/ManageMenus";
import ManageOrders from "../ManageOrders/ManageOrders";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import TableBookings from "../TableBookings/TableBookings";
import ManageUsers from "../ManageUsers/ManageUsers";

const Dashboard = () => {
   const { path, url } = useRouteMatch();
   const { logOut } = useAuth();

   return (
      <>
         <TopHeader />

         <div className="container-fluid">
            <div className="row">
               <nav
                  id="sidebarMenu"
                  className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
               >
                  <div className="position-sticky">
                     <ul className="nav flex-column">
                        <li className="nav-item">
                           <Link className="link" to={`${url}/addMenu`}>
                              <FontAwesomeIcon
                                 className="fa-icon"
                                 icon={faThLarge}
                              />{" "}
                              Add Menu
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link className="link" to={`${url}/manageMenus`}>
                              <FontAwesomeIcon
                                 className="fa-icon"
                                 icon={faThLarge}
                              />{" "}
                              Manage Menus
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link className="link" to={`${url}/manageOrders`}>
                              <FontAwesomeIcon
                                 className="fa-icon"
                                 icon={faThLarge}
                              />{" "}
                              Manage Food Orders
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link className="link" to={`${url}/tableBookings`}>
                              <FontAwesomeIcon
                                 className="fa-icon"
                                 icon={faThLarge}
                              />{" "}
                              Manage Table Bookings
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link className="link" to={`${url}/manageUsers`}>
                              <FontAwesomeIcon
                                 className="fa-icon"
                                 icon={faThLarge}
                              />{" "}
                              Manage Users
                           </Link>
                        </li>
                        <li className="nav-item">
                           <Link className="link" to={`${url}/makeAdmin`}>
                              <FontAwesomeIcon
                                 className="fa-icon"
                                 icon={faThLarge}
                              />{" "}
                              Make Admin
                           </Link>
                        </li>
                        <li className="nav-item">
                           <span
                              className="link"
                              style={{ cursor: "pointer" }}
                              onClick={logOut}
                           >
                              <FontAwesomeIcon
                                 className="fa-icon"
                                 icon={faSignOutAlt}
                              />{" "}
                              Logout
                           </span>
                        </li>
                     </ul>
                  </div>
               </nav>

               <main className="col-md-9 ms-sm-auto col-lg-10 p-0 main">
                  <Switch>
                     <Route exact path={path}>
                        <h1>Dashboard</h1>
                     </Route>
                     <Route path={`${path}/addMenu`}>
                        <AddMenu />
                     </Route>
                     <Route path={`${path}/manageMenus`}>
                        <ManageMenus />
                     </Route>
                     <Route path={`${path}/manageOrders`}>
                        <ManageOrders />
                     </Route>
                     <Route path={`${path}/tableBookings`}>
                        <TableBookings />
                     </Route>
                     <Route path={`${path}/manageUsers`}>
                        <ManageUsers />
                     </Route>
                     <Route path={`${path}/makeAdmin`}>
                        <MakeAdmin />
                     </Route>
                     <Route path="*">
                        <NotFound />
                     </Route>
                  </Switch>
               </main>
            </div>
         </div>
      </>
   );
};

export default Dashboard;
