import React from "react";
import MUIDataTable from "mui-datatables";
import { useGet_Scrape_LogQuery } from "../generated/graphql";
import { CircularProgress } from "@material-ui/core";
import { Error } from "../components/Error";
import { formatDistance, parseISO } from "date-fns";

interface ScrapeLogProps {}

export const ScrapeLog: React.FC<ScrapeLogProps> = ({}) => {
  const { loading, error, data } = useGet_Scrape_LogQuery({
    variables: { offset: 0 }
  });
  if (loading) return <CircularProgress />;
  if (error) return <Error message={error.message} />;

  const columns = [
    {
      name: "council.title",
      label: "Council"
    },
    {
      name: "event",
      label: "Event"
    },
    {
      name: "ts",
      label: "Timestamp",
      options: {
        // @ts-ignore
        customBodyRender: (value, tableMeta, updateValue) =>
          `${formatDistance(parseISO(value), new Date())} ago`
      }
    }
  ];

  console.log(data?.scrape_log);
  return (
    <div>
      <MUIDataTable
        columns={columns}
        data={data?.scrape_log || []}
        title="Scrape Log"
      />
    </div>
  );
};
