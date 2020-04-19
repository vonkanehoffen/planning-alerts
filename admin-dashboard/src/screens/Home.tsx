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
import MUIDataTable from "mui-datatables";
// import { TableEditField } from "../components/TableEditField";
import { TableEditRow, ColumnConfig } from "../components/TableEditRow";
import { DataTableEditRow } from "../components/DataTableEditRow";
import { CouncilCount } from "../components/CouncilCount";

interface Council {
  id: number;
  title: string;
  portal_url: string;
  scraper: string;
  council_type: string;
}

interface CouncilData {
  council: Council[];
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

  if (loading) return <CircularProgress />;
  if (error) return <Error message={error.message} />;

  const columns: Array<ColumnConfig> = [
    {
      name: "id",
      label: "ID"
    },
    {
      name: "title",
      label: "Title"
    },
    {
      name: "portal_url",
      label: "Portal URL",
      editable: true
    },
    {
      name: "scraper",
      label: "Scraper",
      editable: true
    },
    {
      name: "council_type",
      label: "Council Type"
    }
  ];

  return (
    <div>
      <CouncilCount />

      <MUIDataTable
        columns={columns}
        // @ts-ignore
        data={data.council}
        title="Councils"
        // @ts-ignore
        options={{
          customRowRender: (data, dataIndex, rowIndex) => (
            <DataTableEditRow
              data={data}
              dataIndex={dataIndex}
              rowIndex={rowIndex}
              columns={columns}
              update={updateCouncil}
              rowId={0}
            />
          )
        }}
      />
    </div>
  );
};
