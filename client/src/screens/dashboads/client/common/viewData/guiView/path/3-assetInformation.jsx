import React, { Fragment } from "react";
import {
  Button,
  Grid,
  Box,
  Container,
  Typography,
  TextField,
  Paper,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import config from "config.js";
import Dialog from "components/dialog";
import Form from "components/form/form";
import http from "services/httpServices";
import { getUser } from "services/getToken";
import SwitchSelector from "components/switch";
import AssetInfoFields from "./assetInfoFields";
import ImageUpload from "components/imageUpload";
import { getAssetById } from "services/getAssets";
import { deleteAsset } from "services/deleteAsset";
import { sendEditedData } from "services/sendAssetData";
import { verifyAsset } from "services/assetVerification";
import QRCodeGenerator from "components/qrCodeGenerator";
import MultiSelect from "@khanacademy/react-multi-select";
import ModalImage from "react-modal-image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { options } from "./fieldsArray";
import LoaderApp from "components/loaderApp";
import { getTenantById} from "services/getUsers";
import {connect} from "services/assetDbCall";

const imageUploadUrl = config.apiUrl + "/imageUpload";
const imageUploadUrlAuditor = config.apiUrl + "/imageUpload/auditorFileUpload";

class AssetInformation extends Form {
  state = {
    id: "",
    selectedFile: null,
    loaded: 0,
    data: {
      remark: "",
    },
    selected: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const { id: _id, role: role } = this.props.match.params;
      // console.log(role);
      const { data: assetDataFrom } = role !== "senior" ? await getAssetById(_id) : await connect("hr").then(() => getTenantById(_id)) ;
      this.setState({ 
        data: assetDataFrom[0],
        id: _id,
        selected: assetDataFrom[0].assetTags,
        loading: false,
      });
    } catch (error) {}
  }

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  printOrder = () => {
    const printableElements = document.getElementById("printme").innerHTML;
    const orderHtml =
      "<html><head><title></title></head><body>" +
      printableElements +
      "</body></html>";
    const oldPage = document.body.innerHTML;
    document.body.innerHTML = orderHtml;
    window.print();
    document.body.innerHTML = oldPage;
  };

  onClickHandler = () => {
    const data = new FormData();
    if (!this.state.selectedFile) return;
    data.append("file", this.state.selectedFile);
    data.append("id", this.state.id);
    try {
      http.post(imageUploadUrl, data, {
        onUploadProgress: (ProgressEvent) => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      });
      toast.success("Image Uploaded");
    } catch (error) {
      toast.error("Upload failed");
    }
  };

  onClickHandlerAuditor = () => {
    const data = new FormData();
    if (!this.state.selectedFile) return;
    data.append("file", this.state.selectedFile);
    data.append("id", this.state.id);
    http.post(imageUploadUrlAuditor, data, {
      onUploadProgress: (ProgressEvent) => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
        });
      },
    });
  };

  handleSave = async () => {
    const { data, id } = this.state;
    data["assetTags"] = this.state.selected;
    try {
      const { data: result } = await sendEditedData(data, id);
      toast.success(result.msg);
    } catch (error) {
      toast.error(error.response.data.err);
    }
  };

  deleteAssetById = async () => {
    try {
      const data = await deleteAsset(this.state.id);
      if (data.status === 200) {
        toast.info(data.data.res);
        setTimeout(() => {
          this.props.history.goBack();
        }, 1700);
      }
    } catch (error) {
      const { data } = error.response;
      toast.error(data.res);
    }
  };

  handleChangeSwitch = () => {
    const data = { ...this.state.data };
    data["verifiedStatus"] = !data["verifiedStatus"];
    this.setState({ data }, () => {
      this.verifyAssetChange();
    });
  };

  verifyAssetChange = async () => {
    const { id } = this.state;
    const { verifiedStatus } = this.state.data;
    try {
      const result = await verifyAsset(verifiedStatus, id);
      if (result.status === 200) toast.success(result.data.res);
    } catch (error) {
      const { data } = error.response;
      toast.error(data.err);
    }
  };

  render() {
    const data = JSON.parse(getUser());
    const dbName = data.orgDatabase;
    const { id, loading } = this.state;
    const { verifiedStatus, imageUri, imageUriByAuditor } = this.state.data;
    const selected = this.state.selected;
    const { user } = this.props;
    const {role} = this.props.match.params;
    if (loading) return <LoaderApp />;

    return (
      <Fragment>
        <ToastContainer autoClose={1500} closeButton={false} />
        <Container maxWidth="lg">
          <Paper
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
              padding: 32,
            }}
          >
            <Box>
              <Grid container direction="column">
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    {user.role === "root" && <div id="printme">
                      <QRCodeGenerator id={id} keyValue={dbName} />
                    </div>}
                    <button onClick={() => this.printOrder()}>Print</button>
                    {user.role === "senior" && (
                      <div className="upload-btn-style">
                        <ImageUpload
                          onChangeHandler={this.onChangeHandler}
                          onClickHandler={this.onClickHandler}
                          loaded={this.state.loaded}
                          imageSet={this.state.selectedFile}
                        />
                      </div>
                    )}
                    {/* {user.role === "auditor" && (
                      <div className="upload-btn-style">
                        <ImageUpload
                          onChangeHandler={this.onChangeHandler}
                          onClickHandler={this.onClickHandlerAuditor}
                          loaded={this.state.loaded}
                          imageSet={this.state.selectedFile}
                        />
                      </div>
                    )} */}
                  </Grid>
                  <Grid item>
                    <ModalImage
                      className="image-upload-style"
                      small={imageUri}
                      large={imageUri}
                      alt="Image Preview"
                    />
                  </Grid>
                  {/* <Grid item>
                    <p>Auditor Uploaded Image</p>
                    <ModalImage
                      className="image-upload-style"
                      small={imageUriByAuditor}
                      large={imageUriByAuditor}
                      alt="Image Preview"
                    />
                  </Grid> */}
                </Grid>
                <br />
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  direction="row"
                >
                  {user.role === "auditor" && (
                    <Grid item lg={3} xs={6} md={6}>
                      <MultiSelect
                        overrideStrings={{
                          selectSomeItems: "Tag incase error...",
                          search: "Search tag",
                        }}
                        options={options}
                        selected={selected}
                        onSelectedChanged={(selected) =>
                          this.setState({ selected })
                        }
                      />
                    </Grid>
                  )}
                  {/* {(user.role === "junior" || user.role === "senior") && (
                    <Grid item lg={4} xs={6} md={4}>
                      <TextField
                        error
                        id="filled-error-helper-text"
                        label="Error Tag"
                        value={this.state.selected}
                        helperText="Submitted by Auditor"
                        variant="outlined"
                        style={{ marginTop: 25 }}
                        fullWidth
                      />
                    </Grid>
                  )} */}
                  {/* <Grid item>
                    <Typography
                      variant="overline"
                      style={{ fontWeight: "500", fontSize: 15 }}
                    >
                      Asset Verified:&nbsp;&nbsp;
                    </Typography>
                    <SwitchSelector
                      onChangeHandler={
                        user.role === "auditor" ? this.handleChangeSwitch : null
                      }
                      checked={verifiedStatus}
                    />
                  </Grid> */}
                </Grid>
                <br />
                <Grid>
                  <AssetInfoFields
                    assetData={this.state.data}
                    handleOnChange={this.handleOnChange}
                    user={user}
                    role={role}
                  />
                </Grid>
                <br />
                <Grid container direction="row" justify="space-between">
                  <Grid item>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<SaveIcon />}
                      onClick={this.handleSave}
                    >
                      Save
                    </Button>
                  </Grid>
                  {user.role === "senior" && (
                    <Grid item>
                      <Dialog onClick={this.deleteAssetById} />
                    </Grid>
                  )}
                  {user.role === "root" && (
                    <Grid item>
                      <Dialog onClick={this.deleteAssetById} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
        <br />
      </Fragment>
    );
  }
}

export default AssetInformation;
