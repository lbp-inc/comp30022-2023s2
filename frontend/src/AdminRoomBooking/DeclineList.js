import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import { Button } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect } from 'react';


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
          <TableRow sx={{ borderBottom: open ? 0 : '1px solid rgba(224, 224, 224, 1)' }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.fullName}
          </TableCell>
          <TableCell align="right">{row.chosenRoom}</TableCell>
          <TableCell align="right">{row.eventDate}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }} component="div">
                  Additional Details
                </Typography>
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 'bold' }}>Event Start</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Event End</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.startTime}</TableCell>
                      <TableCell>{row.endTime}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    eventHours: PropTypes.string.isRequired,
    numberOfPeople: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default function DeclineList(props) {
    const rows = props.children;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
      <Paper sx={{ width: '100%' }}>
          <TableContainer component={TableContainer}>
              <Table aria-label="collapsible table">
                  <TableHead>
                      <TableRow>
                          <TableCell />
                          <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                          <TableCell align="right" style={{ fontWeight: 'bold' }}>Room</TableCell>
                          <TableCell align="right" style={{ fontWeight: 'bold' }}>Event Date</TableCell>
                          <TableCell align="right" style={{ fontWeight: 'bold' }}>Status</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                              <Row key={row.name} row={row} />
                          ))}
                  </TableBody>
              </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>
  );
  }
  
