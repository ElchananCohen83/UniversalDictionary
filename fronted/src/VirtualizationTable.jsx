// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { TableVirtuoso } from "react-virtuoso";
// import table from "./table";

// const columns = [
//   { width: 150, label: "English", dataKey: "original", english: true },
//   { width: 150, label: "עברית", dataKey: "translation", english: false },
// ];
// const rows = table;

// const VirtuosoTableComponents = {
//   Scroller: React.forwardRef((props, ref) => (
//     <TableContainer component={Paper} {...props} ref={ref} />
//   )),
//   Table: (props) => (
//     <Table
//       {...props}
//       sx={{
//         borderCollapse: "separate",
//         tableLayout: "fixed",
//       }}
//     />
//   ),
//   TableHead,
//   TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
//   TableBody: React.forwardRef((props, ref) => (
//     <TableBody {...props} ref={ref} />
//   )),
// };

// function fixedHeaderContent() {
//   return (
//     <TableRow>
//       {columns.map((column) => (
//         <TableCell
//           key={column.dataKey}
//           variant="head"
//           align={"center"}
//           style={{
//             width: column.width,
//             padding: "1px",
//             border: "1px solid grey",
//             fontWeight: "bold",
//           }}
//           sx={{
//             backgroundColor: "#F6C927",
//           }}
//         >
//           {column.label}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

// function rowContent(_index, row) {
//   return (
//     <React.Fragment>
//       {columns.map((column) => (
//         <TableCell
//           key={column.dataKey}
//           align={column.english ? "left" : "right"}
//           style={{
//             padding: "0px 7px",
//             border: "1px solid grey",
//           }}
//         >
//           {row[column.dataKey]}
//         </TableCell>
//       ))}
//     </React.Fragment>
//   );
// }

// export default function ReactVirtualizedTable() {
//   const tableHeight = Math.min((rows.length + 1) * 23.3, 400);

//   return (
//     <Paper
//       style={{
//         margin: "auto",
//         width: 400,
//       }}
//     >
//       <TableVirtuoso
//         data={rows}
//         components={VirtuosoTableComponents}
//         fixedHeaderContent={fixedHeaderContent}
//         itemContent={rowContent}
//         style={{ backgroundColor: "#F6C927", height: `${tableHeight}px` }}
//       />
//     </Paper>
//   );
// }
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

const columns = [
  { width: 150, label: "English", dataKey: "original", english: true },
  { width: 150, label: "עברית", dataKey: "translation", english: false },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
      }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function ReactVirtualizedTable(data) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Replace this with your actual endpoint
    const apiUrl = "https://your-api-endpoint.com/data";
    
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, like componentDidMount

  const tableHeight = Math.min((rows.length + 1) * 23.3, 400);

  return (
    <Paper
      style={{
        margin: "auto",
        width: 400,
      }}
    >
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        style={{ backgroundColor: "#F6C927", height: `${tableHeight}px` }}
      />
    </Paper>
  );
}

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={"center"}
          style={{
            width: column.width,
            padding: "1px",
            border: "1px solid grey",
            fontWeight: "bold",
          }}
          sx={{
            backgroundColor: "#F6C927",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.english ? "left" : "right"}
          style={{
            padding: "0px 7px",
            border: "1px solid grey",
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default ReactVirtualizedTable;
