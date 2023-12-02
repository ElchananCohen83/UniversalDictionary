import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

let columns = [];

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

function ReactVirtualizedTable(props) {
  if (props.props) {
    const letter = props.props[0].original.charAt(0);
    if ((letter >= "A" && letter <= "Z") || (letter >= "a" && letter <= "z")) {
      columns = [
        {
          width: "50%",
          maxWidth: 150,
          label: "English",
          dataKey: "original",
          english: true,
        },
        {
          width: "50%",
          maxWidth: 150,
          label: "עברית",
          dataKey: "translation",
          english: false,
        },
      ];
    } else {
      columns = [
        {
          width: "50%",
          maxWidth: 150,
          label: "English",
          dataKey: "translation",
          english: true,
        },
        {
          width: "50%",
          maxWidth: 150,
          label: "עברית",
          dataKey: "dottedOriginal",
          english: false,
        },
      ];
    }
  }

  const tableHeight = Math.min(
    (props.props && props.props.length + 1.6) * 23.3,
    430
  );
  const maxTableHeight = "calc(100vh - 200px)"; // Example: 100vh minus 200px for the footer

  return (
    <Paper
      style={{
        margin: "auto",
        width: "90%",
        maxWidth: "500px",
        overflowX: "auto",
      }}
    >
      <TableVirtuoso
        data={props.props}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        style={{
          backgroundColor: "#F6C927",
          height: `${tableHeight}px`,
          maxHeight: maxTableHeight,
          overflowY: "auto",
        }}
      />
    </Paper>
  );
}

export default ReactVirtualizedTable;