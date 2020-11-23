import React, { Component, Fragment } from "react";
import { Grid, Button } from "@material-ui/core";
import HowToRegIcon from '@material-ui/icons/HowToReg';
import InputField from "components/form/inputField";

import { SelectField } from "components/form/select";

class OrgDataFields extends Component {
  state = {};
  render() {
    const role = [
      {
        value: 'admin',
        label: 'Admin'
      }
    ];

    const userType = [
      {
        value: 'client',
        label: 'Client'
      }
    ];
    const { onSubmit, onChange } = this.props;
    return (
      <Fragment>
        <form onSubmit={onSubmit}>
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="companyName"
                  label="Name of organization"
                  name="companyName"
                  onChange={onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="orgEmail"
                  label="Organisation Email"
                  name="companyEmail"
                  type="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="contact"
                  label="Organisation Contact number"
                  name="companyContact"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="panNumber"
                  label="Organisation Pan Number"
                  name="companyPanNum"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="address"
                  label="Organisation Address"
                  name="companyAddress"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="name"
                  label="Name of HR"
                  name="hrName"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="hremail"
                  label="HR Email"
                  type="email"
                  name="emailId"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="hrcontact"
                  label="HR Contact number"
                  name="hrContact"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="hraddress"
                  label="Address"
                  name="hrAddress"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="hrpanNumber"
                  label="HR Pan Number"
                  name="PanNumber"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <SelectField
                  onChange={onChange}
                  options={role}
                  label="Role"
                  name="userRole"
                />
              </Grid>

              <Grid item xs={12} md={3} lg={3}>
                <SelectField
                  onChange={onChange}
                  options={userType}
                  label="User Type"
                  name="userType"
                />
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="remark"
                  label="Remarks"
                  name="remark"
                  onChange={onChange}
                />
              </Grid>
              
              {/* <Grid item xs={12} md={4} lg={3}>
                <InputField
                  required
                  id="designation"
                  label="Designation"
                  name="designation"
                  onChange={onChange}
                />
              </Grid> */}
              {/* <Grid item xs={12} md={3} lg={4}>
                <FormControl variant="outlined" className="select-width">
                  <InputLabel id="demo-simple-select-outlined-label">
                    User Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    labelWidth="70"
                    name="userType"
                    required
                    onChange={onChange}
                  >
                    <MenuItem value={null}></MenuItem>
                    <MenuItem value="client">Client</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}
              
              <Grid item xs={12} lg={12}>
                <div>
                  <Button 
                   startIcon={<HowToRegIcon />}
                   variant="contained" 
                   color="secondary"
                   type="submit"
                   className="create-button-icon">
                    Register
                  </Button>
                </div>
              </Grid>
            </Grid>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default OrgDataFields;
