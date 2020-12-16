import React, { Fragment, Component } from "react";
import { Grid } from "@material-ui/core";
import InputField from "components/form/inputField";
import {
  assetInfoArray,
  juniorRemarksArray,
  auditorRemarksArray,
  juniorAndAuditorAssetInfo,
  hrInfoArray
} from "./fieldsArray";

class AssetInfoFields extends Component {
  state = {
    readStatus: false
  };

  componentDidMount() {
    const { role } = this.props.user;
    if (role !== "senior" || role !== "root") {
      this.setState({ readStatus: !this.state.readStatus });
    }
  }

  render() {
    const { handleOnChange, assetData, user,role } = this.props;
    const { readStatus } = this.state;
    console.log(role);
    return (
      <Fragment>
        <Grid container spacing={3}>
          { role === "senior" ? hrInfoArray.map(item => {
              return (
                <Grid item xs={6} md={4} lg={3}>
                  <InputField
                    id="standard-read-only-input"
                    value={assetData[item.value]}
                    helperText={item.helperText}
                    InputProps={{ readOnly: readStatus }}
                    name={item.value}
                    onChange={handleOnChange}
                  />
                </Grid>
              );
            })
          :  assetInfoArray.map(item => {
            return (
              <Grid item xs={6} md={4} lg={3}>
                <InputField
                  id="standard-read-only-input"
                  value={assetData[item.value]}
                  helperText={item.helperText}
                  InputProps={{ readOnly: readStatus }}
                  name={item.value}
                  onChange={handleOnChange}
                />
              </Grid>
            );
          })
            }
        </Grid>
      </Fragment>
    );
  }
}

export default AssetInfoFields;
