import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable(props) {
  const classes = useStyles();

  console.log(props.data)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.data && props.data[0] && Object.keys(props.data[0]).map((item) => (
              <TableCell><b>{item}</b></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data && props.data.map((row) => (
            <TableRow key={row.name}>
              {row && Object.values(row).map((item) => (
                <TableCell>{item}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}