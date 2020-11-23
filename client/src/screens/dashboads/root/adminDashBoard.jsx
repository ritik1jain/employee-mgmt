import React, { Component } from "react";

import { Route, Switch } from "react-router-dom";

import QRCodeList from "../client/common/qrCodeList";
import NotFound from "components/pageNotFound";
import EditProfile from "components/editProfile";
import Home from "./components/home";
import Reports from "./components/reports";
import DashboardLayout from "../../../components/dashboard/dashboardLayout";
import TenantsList from "./components/tenantsList";
import Organizations from "./components/orgComponents/organizations";

class AdminDashBoard extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <DashboardLayout user={user}>
        <Switch>
          <Route path="/editprofile" component={EditProfile} />
          <Route path="/dashboard/qrList" component={QRCodeList} />
          {/* <Route path="/dashboard/reports" component={Reports} /> */}
          <Route path="/dashboard/organizations" component={Organizations} />
          <Route
            path="/dashboard/tenantsList"
            render={props => <TenantsList user={user} {...props} />}
          />
          <Route exact path="/dashboard/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </DashboardLayout>
    );
  }
}

export default AdminDashBoard;
