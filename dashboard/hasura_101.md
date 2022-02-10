# Setup

- set environment variables

# Create new query

- load `HASURA_GRAPHQL_URL` in a browser and compose new queries and their respective inputs
- copy your new query to a \*.graphql file
- create/update associated `src/graphql/<MODEL>/<MODEL>_query.graphql`
  - src/graphql/zone/zone_query.graphql
  ```graphql
  query getZonesByOrganizationCode($code: String_comparison_exp = {}) {
    zone(
      where: { location: { organization: { enumeration: { code: $code } } } }
    ) {
      id
      enumeration {
        description
      }
      location_id
      metadata
      name_id
      size_x
      size_y
      size_z
    }
  }
  ```
- run generator
  - ```bash
    yarn generate:graphql
    ```
  - this should update `graphql/generated/react_apollo.tsx`
- use created hook in file
  - `useGetZonesByOrganizationCodeQuery`
  - ```typescript
      const { data, loading, error } = useGetZonesByOrganizationCodeQuery({
        variables: {
            code: // value for 'code'
        },
    });
    ```
