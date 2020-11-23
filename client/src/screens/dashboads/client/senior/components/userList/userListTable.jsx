import React from "react";
import { withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Switch from "components/switch";

const styles = {
  table: {
    minWidth: 650,
  },

  root: {
    width: "100%",
  },

  container: {
    maxHeight: 650,
  },

  tableHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
};

const UserTable = ({ userList, classes, handleChange }) => {
  return (
    <Paper style={styles.root}>
      <TableContainer style={styles.container} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className={classes.tableHeader}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Email
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Role
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Designation
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Contact
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Date registered
              </TableCell>
              <TableCell align="center" className={classes.tableHeader}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((item) => {
              return (
                <React.Fragment>
                  <TableRow key={item._id}>
                    <TableCell align="center" component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell align="center">
                      <a href={"mailto:" + item.email}>{item.email}</a>
                    </TableCell>
                    <TableCell align="center">{item.role}</TableCell>
                    <TableCell align="center">{item.designation}</TableCell>
                    <TableCell align="center">{item.contact}</TableCell>
                    <TableCell align="center">
                      {item.dateCreated.split("T")[0]}
                    </TableCell>
                    <TableCell align="center">
                      <Switch
                        onChangeHandler={() => handleChange(item)}
                        checked={item.status}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default withStyles(styles)(UserTable);
