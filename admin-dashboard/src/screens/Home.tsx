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

interface ColumnConfig {
  name: string,
  label: string,
  editable?: boolean
}

interface Council {
  id: number
  title: string
  portal_url: string
  scraper: string
  council_type: string
}

interface CouncilData {
  council: Council[]
}

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
  const { loading, error, data } = useQuery<CouncilData>(GET_COUNCILS);
  const [
    updateCouncil,
    { loading: updateLoading, error: updateError }
  ] = useMutation(UPDATE_COUNCIL);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  if (loading) return <CircularProgress />;
  if (error) return <Error message={error.message} />;

  const columns: Array<ColumnConfig> = [
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
            {data && data.council.map((row, i) => (
              <TableRow key={i}>
                {columns.map((column: ColumnConfig, i) => {
                  return (
                    <TableCell key={i}>
                      {column.editable ? (
                        <Box display="flex">
                          <TextField
                            defaultValue={row[column.name as keyof Council]}
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
                        <div>{row[column.name as keyof Council]}</div>
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
