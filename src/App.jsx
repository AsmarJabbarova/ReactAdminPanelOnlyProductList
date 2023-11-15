import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const products = () => {
    axios
      .get("https://northwind.vercel.app/api/products")
      .then((res) => setData(res.data));
  };
  useEffect(() => {
    products();
  }, []);
  const handleDelete = (id) => {
    axios.delete(`https://northwind.vercel.app/api/products/${id}`);
  };
  const minMax = () => {
    const mySort = [...data].sort((a, b) => a.unitPrice - b.unitPrice);

    setData(mySort);
    console.log(data);
  };
  const maxMin = () => {
    const mySort = [...data].sort((a, b) => b.unitPrice - a.unitPrice);
    setData(mySort);
  };
  return (
    <>
      <div className="div">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button className="button-19">search</button>
      </div>
      <button className="button-34" onClick={minMax}>
        min
      </button>
      <button className="button-34" onClick={maxMin}>
        max
      </button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Id</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>

              <StyledTableCell align="right">UnitsInStock</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    {item.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.unitPrice}
                  </StyledTableCell>

                  <StyledTableCell
                    sx={{
                      "&:nth-of-type(odd)": {
                        backgroundColor: (theme) => theme.palette.action.hover,
                      },
                      ...(item.unitsInStock < 20 && {
                        border: "1px solid red",
                      }),
                    }}
                    align="right"
                  >
                    {item.unitsInStock}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default App;
