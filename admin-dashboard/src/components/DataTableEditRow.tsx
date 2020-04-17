import React from "react";
import { IconButton, TableCell, TableRow, TextField } from "@material-ui/core";
import { MUIDataTableColumnDef } from "mui-datatables";
import { Save } from "@material-ui/icons";

type DataTableEditRowProps = {
  data: any;
  dataIndex: number;
  rowIndex: number;
  columns: Array<object>;
  update: (data: any) => any;
  rowId: number;
};

export class DataTableEditRow extends React.Component<DataTableEditRowProps> {
  state = {
    changes: {}
  };

  doUpdate = () => {
    const variables = {
      id: this.props.data[0],
      changes: this.state.changes
    };
    this.props.update({
      variables
    });
    this.setState({ changes: {} });
  };
  render() {
    const { data, columns } = this.props;
    const hasUpdate = Object.keys(this.state.changes).length > 0;
    return (
      <TableRow>
        <TableCell>
          <IconButton onClick={this.doUpdate} disabled={!hasUpdate}>
            <Save />
          </IconButton>
        </TableCell>
        {data.map((cell: any, i: number) => {
          // @ts-ignore
          if (!columns[i].editable)
            return (
              // return (
              <TableCell key={i}>{cell}</TableCell>
            );

          // @ts-ignore
          const field = columns[i].name;

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
              changes: { ...this.state.changes, [field]: e.target.value }
            });
          };

          let value = "";
          if (this.state.changes.hasOwnProperty(field)) {
            value = this.state.changes[field as keyof object];
          } else {
            value = cell;
          }

          return (
            <TableCell key={i}>
              <TextField
                value={value || ""}
                onChange={handleChange}
                onKeyPress={(ev: React.KeyboardEvent) => {
                  if (ev.key === "Enter") {
                    this.doUpdate();
                    ev.preventDefault();
                  }
                }}
                fullWidth
              />
              {/*<pre>cell = {cell}</pre>*/}
              {/*<pre>value = {value}</pre>*/}
              {/*<pre>{JSON.stringify(this.state, null, 2)}</pre>*/}
            </TableCell>
          );
        })}
      </TableRow>
    );
  }
}
