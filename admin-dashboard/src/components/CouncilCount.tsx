import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Card, CardContent, Chip, CircularProgress } from "@material-ui/core";
import { Error } from "./Error";

interface CouncilCountProps {}

const COUNT_COUNCIL_META = gql`
  query check {
    council_aggregate(where: { scraper: { _eq: "idox" } }) {
      aggregate {
        totalCount: count
      }
    }
  }
`;

export const CouncilCount: React.FC<CouncilCountProps> = ({}) => {
  const { loading, error, data } = useQuery(COUNT_COUNCIL_META);

  if (error) return <Error message={error?.message} />;

  if (loading) return <CircularProgress />;

  if(data) return (
    <Card>
      {data && (
        <Chip
          color="primary"
          label={`IDOX ${data.council_aggregate.aggregate.totalCount} total`}
        />
      )}
    </Card>
  );

  return <div/>
};
