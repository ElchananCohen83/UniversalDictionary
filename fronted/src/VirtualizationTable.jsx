import * as React from "react";
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

export default function ReactVirtualizedTable(props) {
  //const tableHeight = Math.min((props.length + 1) * 23.3, 400);
  const tableHeight = Math.min((props.props && props.props.length + 1) * 23.3, 430);


  return (
    <Paper
      style={{
        margin: "auto",
        width: 500,
      }}
    >
      <TableVirtuoso
        data={props.props}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        style={{ backgroundColor: "#F6C927", height: `${tableHeight}px` }}
      />
    </Paper>
  );
}