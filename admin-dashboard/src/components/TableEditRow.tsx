import React, { ChangeEvent } from "react";
import { graphql, ChildDataProps } from "@apollo/react-hoc";
import gql from "graphql-tag";
import {
  Box,
  Button,
  CircularProgress,
  TableCell,
  TableRow,
  TextField,
  IconButton
} from "@material-ui/core";
import { Error } from "./Error";
import { Save } from "@material-ui/icons";

export interface ColumnConfig {
  name: string;
  label: string;
  editable?: boolean;
}

interface TableEditRowProps {
  data: Array<any>;
  columns: Array<ColumnConfig>;
  update: (changes: object) => any;
}

type TableEditRowState = {
  changes: object;
  showSave: boolean;
};

// Note this is a class as useState doesn't work for array mapped component instances like this.
export class TableEditRow extends React.Component<
  TableEditRowProps,
  TableEditRowState
> {
  state: TableEditRowState = {
    changes: {},
    showSave: false
  };

  doUpdate = () => {
    console.log('would udatye', this.props.data[0], this.state.changes);
    // this.props.update({
    //   variables: {
    //     id: this.props.row.id,
    //     changes: this.state.changes
    //   }
    // });
  };

  render() {
    const { data, columns } = this.props;
    console.log("TR", this.props);

    return (
      <TableRow>
        <TableCell/>
        {data.map((cell, i) => {
          const colName = columns[i].name
          let value = "";
          if (this.state.changes.hasOwnProperty(colName)) {
            value = this.state.changes[colName as keyof object];
          } else {
            value = cell;
          }

          const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            this.setState({
              changes: {
                ...this.state.changes,
                [colName]: e.target.value
              },
              showSave: true
            });
          };

          return (
            <TableCell key={i}>
              {columns[i].editable ? (
                <Box display="flex">
                  <TextField
                    value={value}
                    fullWidth
                    onChange={handleChange}
                    onKeyPress={(ev: React.KeyboardEvent) => {
                      // const target = ev.target as HTMLInputElement;
                      if (ev.key === "Enter") {
                        this.doUpdate();
                        ev.preventDefault();
                      }
                    }}
                  />
                </Box>
              ) : (
                <div>{cell}</div>
              )}
            </TableCell>
          );
        })}
        <TableCell>
        {this.state.showSave && (
          <IconButton onClick={this.doUpdate}>
            <Save />
          </IconButton>
        )}
        </TableCell>
      </TableRow>
    );
  }
}
