import React, { Fragment } from "react";
import {
  Typography,
  Box,
  withStyles,
  Grid,
  Container,
  Paper
} from "@material-ui/core";

import { registerSenior } from "services/createCallsRoot";
import OrgDataFields from "./orgDataFields";
import Form from "components/form/form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const styles = {
  boxBorder: {
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
    opacity: "1",
    padding: "15px",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  paper:{
    display: 'flex',
    flexDirection: "column",
    overflow: 'auto',
    padding: 32
  }
};

class Organizations extends Form {
  state = {
    data: {
      companyName: "",
      panNumber: "",
      orgEmail: "",
      contact: "",
      designation: "",
      address: "",
      name: "",
      email: "",
      userType: "",
      role: "",
    },
  };

  onSubmit = async () => {
    // Call to backend to create organisation database

    try {
      const data = { ...this.state.data };
      if (data["role"] === "")
        return alert("Role cannot be empty. Please assign the role");
      if (data["userType"] === "")
        return alert("User Type cannot be empty. Please assign the user type");
      const register = await registerSenior(data);
      toast.success(register.data.res);
    } catch (error) {
      const { data } = error.response;
      toast.error(data.err);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <div>
          <main className={classes.content}>
            <Container maxWidth="lg">
              <br />
              <Paper className={classes.paper}>
                <Box className={classes.boxBorder}>
                  <div>
                    <Typography component="h5" variant="h5">
                      Add HR
                    </Typography>
                  </div>
                  <br />
                  <div>
                    <OrgDataFields
                      onSubmit={this.handleSubmit}
                      onChange={this.handleOnChange}
                    />
                  </div>
                </Box>
              </Paper>
              <Box>
                <Grid>{/* <Table /> */}</Grid>
              </Box>
            </Container>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Organizations);
