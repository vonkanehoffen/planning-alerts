import gql from "graphql-tag";

export const QUERY_PLANNING_APPS_NEAR_POINT = gql`
    query ($point: geography!){
        planning_app(
            where: { location: { _st_d_within: { distance: 20000, from: $point } } }
        ) {
            ref,
            location,
            proposal
        }
    }
`;
