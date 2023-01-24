import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { useCookies } from 'react-cookie';
import { Popup } from "./popup/popup";
import { margin } from '@mui/system';
const columns = [
  { id: 'message', label: 'Promotion Name', image: 'image' },
];


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dataEdit, setDataEdit] = React.useState({});
  const [type, setType] = React.useState('');
  const [cookies, removeCookie] = useCookies(['token']);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = async () => {
    try {
      const rawResponse = await fetch('http://localhost:3000/api/v1/promotion', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const content = await rawResponse.json();
      if (content.statusCode == '200') {
        setRows(content.result)
      }
    } catch (e) {
      console.log(e)
    }
  }

  const callApiDelete = async (id) => {
    try {
      const rawResponse = await fetch(`http://localhost:3000/api/v1/promotion/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authentication': `Bearer ${cookies.token}`
        }
      });
      const content = await rawResponse.json();
      if (content.statusCode == '200') {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        callApi();
      } else if (content.statusCode === '401') {
        removeCookie('token')
        Swal.fire({
          title: 'Error!',
          text: content.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      } else {
        Swal.fire({
          title: 'Error!',
          text: content.message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        style={{
          fontSize: "12px",
          width: "150px",
          margin: "15px"
        }}
        onClick={() => {
          setType('add')
          setOpen(true)
        }}
      >
        Add Promotion
      </Button>
      <Paper sx={{ height: '100%', width: '100%', overflow: 'hidden' }}>

        {open ? <Popup type={type} data={dataEdit} closePopup={() => {
          setOpen(false)
          callApi();
        }} /> : null}
        <TableContainer sx={{}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ width: '100%', textAlign: 'center' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>
                        <img src={row['image']} alt="promotion image" style={{ width: '150px', height: '150px' }} />
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} style={{ textAlign: 'center' }}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <Button
                          variant="contained"
                          style={{
                            fontSize: "12px",
                            width: "100px"
                          }}
                          onClick={() => {
                            setType('edit')
                            setOpen(true)
                            setDataEdit(row)
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="error"
                          style={{
                            fontSize: "12px",
                            width: "100px"
                          }}
                          onClick={() => {
                            Swal.fire({
                              title: 'Are you sure?',
                              text: `You want to delete ${row.message}.`,
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                callApiDelete(row.id);
                              }
                            })
                          }}
                        >
                          delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>


  );
}
