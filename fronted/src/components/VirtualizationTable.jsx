import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import CopyButton from './CopyButton'; // Import CopyButton component


function ReactVirtualizedTable(props) {
  const [clickedCell, setClickedCell] = useState(null);
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


  const handleCellClick = (columnKey, rowData, event) => {
    const rect = event.target.getBoundingClientRect();
    setClickedCell({
      columnKey,
      rowData,
      position: {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      },
    });
  };


  const closeCopyButton = () => {
    if (clickedCell) {
      setClickedCell(null)
    }
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
              position: 'relative',
            }}
            onClick={(e) => handleCellClick(column.dataKey, row, e)}

          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }


  if (props.props) {
    const letter = props.props[0].original.charAt(0);
    if ((letter >= "A" && letter <= "Z") || (letter >= "a" && letter <= "z")) {
      columns = [
        { width: "50%", maxWidth: 150, label: "English", dataKey: "original", english: true },
        { width: "50%", maxWidth: 150, label: "עברית", dataKey: "translation", english: false },
      ];
    } else {
      columns = [
        { width: "50%", maxWidth: 150, label: "English", dataKey: "translation", english: true, },
        { width: "50%", maxWidth: 150, label: "עברית", dataKey: "dottedOriginal", english: false, },
      ];
    }
  }

  const tableHeight = Math.min(
    (props.props && props.props.length + 1.6) * 23.3,
    430
  );


  const maxTableHeight = "calc(100vh - 200px)"; // Example: 100vh minus 200px for the footer

  const tableStyle = { userSelect: 'none', WebkitUserSelect: 'none' };


  return (

    <Paper
      style={{
        margin: "auto",
        width: "90%",
        maxWidth: "500px",
        overflowX: "auto",
        marginBottom: "15px",

      }}
    >
      <TableVirtuoso
        onClick={closeCopyButton}
        data={props.props}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
        style={{
          ...tableStyle,
          backgroundColor: "#f0e9a5", //"#F6C927"
          height: `${tableHeight}px`,
          maxHeight: maxTableHeight, //maxTableHeight
          overflowY: "auto",
        }}
      />
      {/* {clickedCell && (
        <div
          onClick={closeCopyButton}
          style={{
            position: 'absolute',
            top: `${clickedCell.position.top}px`,
            left: `${clickedCell.position.left}px`,
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <CopyButton text={clickedCell.rowData[clickedCell.columnKey]} />
        </div>
      )} */}
    </Paper>
  );
}

export default ReactVirtualizedTable;