import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TextField,
  Box
} from "@material-ui/core";
import { Error } from "../components/Error";
// import MUIDataTable from "mui-datatables";
// import { TableEditField } from "../components/TableEditField";

const GET_COUNCILS = gql`
  query get_councils {
    council {
      id
      title
      portal_url
      scraper
      council_type
    }
  }
`;

const UPDATE_COUNCIL = gql`
  mutation update_council($id: Int, $changes: council_set_input) {
    update_council(where: { id: { _eq: $id } }, _set: $changes) {
      affected_rows
      returning {
        id
        title
        portal_url
        scraper
        council_type
      }
    }
  }
`;

export const Home: React.FC = () => {
  const { loading, error, data } = useQuery(GET_COUNCILS);
  const [
    updateCouncil,
    { loading: updateLoading, error: updateError }
  ] = useMutation(UPDATE_COUNCIL);
  const [selectedId, setSelectedId] = useState(null);
  if (loading) return <CircularProgress />;
  if (error) return <Error message={error.message} />;

  const columns = [
    {
      name: "title",
      label: "Title"
    },
    {
      name: "portal_url",
      label: "Portal URL",
      // render: TableEditField
      editable: true
    },
    {
      name: "scraper",
      label: "Scraper"
    },
    {
      name: "council_type",
      label: "Council Type"
    }
  ];

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((c, i) => (
                <TableCell key={i}>{c.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.council.map((row: any, i: number) => (
              <TableRow key={i}>
                {columns.map((column: any, i) => {
                  return (
                    <TableCell key={i}>
                      {column.editable ? (
                        <Box display="flex">
                          <TextField
                            defaultValue={row[column.name]}
                            fullWidth
                            onKeyPress={(ev: any) => {
                              // console.log(`Pressed keyCode ${ev.key}`, ev.target.value);
                              if (ev.key === "Enter") {
                                // Do code here
                                const update = {
                                  variables: {
                                    id: row.id,
                                    changes: {
                                      [column.name]: ev.target.value
                                    }
                                  }
                                };
                                setSelectedId(row.id);
                                updateCouncil(update);
                                ev.preventDefault();
                              }
                            }}
                          />
                          {updateLoading && row.id === selectedId && (
                            <CircularProgress />
                          )}
                          {updateError && row.id === selectedId && (
                            <Error message={updateError.message}/>
                          )}
                        </Box>
                      ) : (
                        <div>{row[column.name]}</div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
