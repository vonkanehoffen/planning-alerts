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
  row: any;
  columns: Array<ColumnConfig>;
  update: (changes: object) => any;
  loading: boolean;
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
    this.props.update({
      variables: {
        id: this.props.row.id,
        changes: this.state.changes
      }
    });
  };
  render() {
    const { row, columns, loading } = this.props;
    return (
      <TableRow>
        {columns.map((column: ColumnConfig, i) => {
          let value = "";
          if (this.state.changes.hasOwnProperty(column.name)) {
            value = this.state.changes[column.name as keyof object];
          } else {
            value = row[column.name];
          }
          return (
            <TableCell key={i}>
              {column.editable ? (
                <Box display="flex">
                  <TextField
                    value={value}
                    fullWidth
                    disabled={loading}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      this.setState({
                        changes: {
                          ...this.state.changes,
                          [column.name]: e.target.value
                        },
                        showSave: true
                      });
                    }}
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
                <div>{row[column.name as keyof object]}</div>
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
