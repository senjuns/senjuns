# How to create a new model
## Create SQL table
* update ```neatleaf/databases/postgres_schemas/schema.sql``` under the appropriate section add SQL table
* ```sql
    CREATE TABLE data.heat_map (
        id SERIAL primary key,
        measurement_run_id int4 NOT NULL,
        version_id int4 NOT NULL,
        type_id int4 NOT NULL,
        metadata jsonb NULL,
        CONSTRAINT measurement_run_id_fk FOREIGN KEY (measurement_run_id) REFERENCES spyder.measurement_run(id) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT version_id_fk FOREIGN KEY (version_id) REFERENCES public.version(id) ON UPDATE CASCADE,
        CONSTRAINT type_id_fk FOREIGN KEY (type_id) REFERENCES public.enumeration(id) ON UPDATE CASCADE,
        CONSTRAINT heat_map_un UNIQUE (measurement_run_id, version_id, type_id)
    );
  ```
## Update ORM
* update orm file ```neatleaf/databases/postgres_layer/source/postgres_orm.py``` add class definition of table to this file under the appropriate section
* ```python
    class Heat_Map(Base):
        __tablename__ = 'heat_map'
        __table_args__ = ({'schema': 'data'})
        id = Column(Integer, primary_key=True)
        measurement_run_id = Column(
            ForeignKey('spyder.measurement_run.id',
                ondelete='CASCADE',
                onupdate='CASCADE'),
            nullable=False)
        type_id = Column(
            ForeignKey('public.enumeration.id',
                onupdate='CASCADE'),
            nullable=False)
        metadata_ = Column('metadata', JSONB(astext_type=Text()))
        version_id = Column(
            ForeignKey('public.version.id', onupdate='CASCADE'),
            nullable=False)
        measurement_run = relationship('MeasurementRun')
        type = relationship('Enumeration')
        version = relationship('Version')
  ```
## Update population script (optional) 
* update this script ```neatleaf/databases/test_postgres_data/populate_data_script.py```

## Upadate schema.graphql
* run script to generate graphql types/input
* add types
* ```graphql
    input CreateHeatMapInput {
        id: Int!
        measurement_run_id: Int!
        metadata: AWSJSON
        type_id: Int!
    }

    type heat_map {
        id: Int!
        measurement_run_id: Int!
        metadata: AWSJSON
        type_id: Int!
        roi: String!
    }

    input UpdateHeatMapInput {
        id: Int!
        measurement_run_id: Int
        metadata: AWSJSON
        type_id: Int
    }
 * update the API.ts
    * ```bash amplify codegen```
 * generate resolvers from fresh API.ts
    * ```bash 
      # Go to generator directory.
      cd neatleaf/dashboard/scripts/generate_service_controllers/
      # transpile
      npx tsc  --project ./tsconfig.json
      # execute
      node dist/generate_schema.js -n heat_map -s data
      # Inspect results.
      ls output/resolver

      # Copy resolver templates to graphql custom resource input folder.
      cp output/resolver/*.vtl ../../../databases/graphql/src/input/

      # Go to custom resources generator directory.
      cd neatleaf/databases/graphql
      
      # transpile
      npx tsc src/scripts/generate_custom_resources.ts
      
      # Generate custom resources
      node src/scripts/generate_custom_resources.js -d src/input/

      # Inspect results
      ls src/output

      # Update customResources.json
      code /neatleaf/dashboard/backends/amplify_test/backend/api/enmoApiTest/stacks/CustomResources.json

      # Sync backend with amplify folder.
      yarn sync

      # Update amplify api
      amplify status
      amplify push
    ```
* test resolvers on aws console
* https://us-west-2.console.aws.amazon.com/appsync/home?region=us-west-2#/jmvhm77cm5dxlmwlmypp4lksr4/v1/queries

## Generate model / service / controller