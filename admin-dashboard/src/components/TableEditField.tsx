import React, { useState } from "react";
import { graphql } from '@apollo/react-hoc';
import { MUIDataTableMeta } from "mui-datatables";
import { IconButton, TextField } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { TableCell } from "@material-ui/core";

// interface TableEditFieldProps {
//   data: Array<object>,
//   dataIndex: number,
//   rowIndex: number
// }

// interface TableEditFieldProps {
//   value: any;
//   tableMeta: any;
//   updateValue: any;
// }

// export const TableEditField = (row: any, column: any, update: any) => {
  // const [editing, setEditing] = useState(false);
  // const [update, setUpdate] = useState(value);
  // return (
  //   <TableCell>
  //     <TextField defaultValue={row[column.name]} fullWidth on/>
  //   </TableCell>
  // );
  // return (
  //   <div>
  //     <IconButton onClick={() => setEditing(!editing)}>
  //       <Edit />
  //     </IconButton>
  //     {editing ? <TextField value={update} onChange={(e) => setUpdate(e.target.value)} /> : value}
  //   </div>
  // );
// };

// type TableEditFieldProps {
//   row: any;
//   column: any
// }
//
// type TabelEditFieldState {
//   editing
// }
// class TableEditField extends React.Component<TableEditFieldProps, any> {
//
// }
