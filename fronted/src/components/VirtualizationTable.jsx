import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

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


  function rowContent(index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => {
          let cellContent = row;
  
          column.dataKey.split('.').forEach(key => {
            cellContent = cellContent ? cellContent[key] : 'N/A';
          });
  
          return (
            <TableCell
              key={column.dataKey}
              align={column.english ? "left" : "right"}
              style={{
                padding: "0px 7px",
                border: "1px solid grey",
                position: 'relative',
              }}
            >
              {cellContent || 'N/A'}
            </TableCell>
          );
        })}
      </React.Fragment>
    );
  }
  


  if (props.props) {
    const letter = props.props[0].word.charAt(0);
    if ((letter >= "A" && letter <= "Z") || (letter >= "a" && letter <= "z")) {
      columns = [
        { width: "20%", maxWidth: 150, label: "English", dataKey: "word", english: true },
        { width: "20%", maxWidth: 150, label: "Hebrew", dataKey: "translations.hebrew", english: false },
        { width: "20%", maxWidth: 150, label: "Arabic", dataKey: "translations.arabic", english: false },
        { width: "20%", maxWidth: 150, label: "French", dataKey: "translations.french", english: false },
        { width: "20%", maxWidth: 150, label: "Spanish", dataKey: "translations.spanish", english: false },
        { width: "20%", maxWidth: 150, label: "PartSpeech", dataKey: "partOfSpeech", english: true },
      ];
    } else {
      columns = [
        { width: "50%", maxWidth: 150, label: "English", dataKey: "transcription", english: true, },
        { width: "50%", maxWidth: 150, label: "עברית", dataKey: "word", english: false, },
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
      {/* Use Webkit-specific styles to hide the scrollbar */}
      <style>
        {`
            ::-webkit-scrollbar {
                width: 5px;
            }

            ::-webkit-scrollbar-thumb {
              background-color: #888;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #555;
        }
        `}
      </style>
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