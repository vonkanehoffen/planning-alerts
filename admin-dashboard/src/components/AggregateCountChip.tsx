import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Box, Card, CardContent, Chip, CircularProgress } from '@material-ui/core'
import { Error } from "./Error";

interface AggregateCountChipProps {
  label: string;
  condition: object;
  color?: "primary" | "secondary"
}

const COUNT_QUERY = gql`
  query check($condition: council_bool_exp) {
    council_aggregate(where: $condition) {
      aggregate {
        totalCount: count
      }
    }
  }
`;

export const AggregateCountChip: React.FC<AggregateCountChipProps> = ({
  label,
  condition,
  color = "primary"
}) => {
  const { loading, error, data } = useQuery(COUNT_QUERY, {
    variables: {
      condition
    }
  });

  if (error) return <Error message={error?.message} />;

  if (loading) return <CircularProgress />;

  if (data)
    return (
      <Box m={1}>
        <Chip
          color={color}
          label={
            <span>
            {label} <b>{data.council_aggregate.aggregate.totalCount} total</b>
          </span>
          }
        />
      </Box>

    );

  return <div />;
};
