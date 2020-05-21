import React from "react";
import { useRecent_Pa_StatusQuery } from "../generated/graphql";
import { CircularProgress } from "@material-ui/core";
import { Error } from "../components/Error";
import MUIDataTable from "mui-datatables";
import { formatDistance, parseISO } from "date-fns";

interface PaStatusProps {}

export const PaStatus: React.FC<PaStatusProps> = ({}) => {
  const { loading, error, data } = useRecent_Pa_StatusQuery();

  if (loading) return <CircularProgress />;
  if (error) return <Error message={error.message} />;

  const columns = [
    {
      name: "council.title",
      label: "Council"
    },
    {
      name: "address",
      label: "Address"
    },
    {
      name: "proposal",
      label: "Proposal"
    },
    {
      name: "created_at",
      label: "Created at",
      options: {
        // @ts-ignore
        customBodyRender: (value, tableMeta, updateValue) =>
          `${formatDistance(parseISO(value), new Date())} ago`
      }
    }
  ];
  return (
    <div>
      <MUIDataTable
        columns={columns}
        data={data?.pa_status || []}
        title="Recent PA Statuses"
      />
      {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    </div>
  );
};
