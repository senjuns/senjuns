/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: any;
  float8: any;
  geography: any;
  geometry: any;
  jsonb: any;
  name: any;
  numeric: any;
  oid: any;
  smallint: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'. */
export type FloatComparisonExp = {
  _eq?: Maybe<Scalars['Float']>;
  _gt?: Maybe<Scalars['Float']>;
  _gte?: Maybe<Scalars['Float']>;
  _in?: Maybe<Array<Scalars['Float']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Float']>;
  _lte?: Maybe<Scalars['Float']>;
  _neq?: Maybe<Scalars['Float']>;
  _nin?: Maybe<Array<Scalars['Float']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

export type MyLogEvent = {
  __typename?: 'MyLogEvent';
  compute: Scalars['String'];
  device: Scalars['String'];
  level: Scalars['Int'];
  message: Scalars['String'];
  module: Scalars['String'];
  timestamp: Scalars['Int'];
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: Maybe<Scalars['String']>;
  _is_null?: Maybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: Maybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: Maybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: Maybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: Maybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "address" */
export type Address = {
  __typename?: 'address';
  city_id: Scalars['Int'];
  country_code_id: Scalars['Int'];
  /** An object relationship */
  enumeration: Enumeration;
  /** An object relationship */
  enumerationByCityId: Enumeration;
  /** An object relationship */
  enumerationByRegionId: Enumeration;
  id: Scalars['Int'];
  /** An array relationship */
  locations: Array<Location>;
  /** An aggregate relationship */
  locations_aggregate: LocationAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  organizations: Array<Organization>;
  /** An aggregate relationship */
  organizations_aggregate: OrganizationAggregate;
  postal_code?: Maybe<Scalars['String']>;
  region_id: Scalars['Int'];
  street?: Maybe<Scalars['String']>;
};

/** columns and relationships of "address" */
export type AddressLocationsArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

/** columns and relationships of "address" */
export type AddressLocationsAggregateArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

/** columns and relationships of "address" */
export type AddressMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "address" */
export type AddressOrganizationsArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

/** columns and relationships of "address" */
export type AddressOrganizationsAggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

/** aggregated selection of "address" */
export type AddressAggregate = {
  __typename?: 'address_aggregate';
  aggregate?: Maybe<AddressAggregateFields>;
  nodes: Array<Address>;
};

/** aggregate fields of "address" */
export type AddressAggregateFields = {
  __typename?: 'address_aggregate_fields';
  avg?: Maybe<AddressAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<AddressMaxFields>;
  min?: Maybe<AddressMinFields>;
  stddev?: Maybe<AddressStddevFields>;
  stddev_pop?: Maybe<AddressStddevPopFields>;
  stddev_samp?: Maybe<AddressStddevSampFields>;
  sum?: Maybe<AddressSumFields>;
  var_pop?: Maybe<AddressVarPopFields>;
  var_samp?: Maybe<AddressVarSampFields>;
  variance?: Maybe<AddressVarianceFields>;
};

/** aggregate fields of "address" */
export type AddressAggregateFieldsCountArgs = {
  columns?: Maybe<Array<AddressSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "address" */
export type AddressAggregateOrderBy = {
  avg?: Maybe<AddressAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<AddressMaxOrderBy>;
  min?: Maybe<AddressMinOrderBy>;
  stddev?: Maybe<AddressStddevOrderBy>;
  stddev_pop?: Maybe<AddressStddevPopOrderBy>;
  stddev_samp?: Maybe<AddressStddevSampOrderBy>;
  sum?: Maybe<AddressSumOrderBy>;
  var_pop?: Maybe<AddressVarPopOrderBy>;
  var_samp?: Maybe<AddressVarSampOrderBy>;
  variance?: Maybe<AddressVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AddressAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "address" */
export type AddressArrRelInsertInput = {
  data: Array<AddressInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<AddressOnConflict>;
};

/** aggregate avg on columns */
export type AddressAvgFields = {
  __typename?: 'address_avg_fields';
  city_id?: Maybe<Scalars['Float']>;
  country_code_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  region_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "address" */
export type AddressAvgOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "address". All fields are combined with a logical 'AND'. */
export type AddressBoolExp = {
  _and?: Maybe<Array<AddressBoolExp>>;
  _not?: Maybe<AddressBoolExp>;
  _or?: Maybe<Array<AddressBoolExp>>;
  city_id?: Maybe<IntComparisonExp>;
  country_code_id?: Maybe<IntComparisonExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  enumerationByCityId?: Maybe<EnumerationBoolExp>;
  enumerationByRegionId?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  locations?: Maybe<LocationBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  organizations?: Maybe<OrganizationBoolExp>;
  postal_code?: Maybe<StringComparisonExp>;
  region_id?: Maybe<IntComparisonExp>;
  street?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "address" */
export enum AddressConstraint {
  /** unique or primary key constraint */
  address_pkey = 'address_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AddressDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AddressDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AddressDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "address" */
export type AddressIncInput = {
  city_id?: Maybe<Scalars['Int']>;
  country_code_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  region_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "address" */
export type AddressInsertInput = {
  city_id?: Maybe<Scalars['Int']>;
  country_code_id?: Maybe<Scalars['Int']>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  enumerationByCityId?: Maybe<EnumerationObjRelInsertInput>;
  enumerationByRegionId?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  locations?: Maybe<LocationArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  organizations?: Maybe<OrganizationArrRelInsertInput>;
  postal_code?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  street?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AddressMaxFields = {
  __typename?: 'address_max_fields';
  city_id?: Maybe<Scalars['Int']>;
  country_code_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  postal_code?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  street?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "address" */
export type AddressMaxOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  postal_code?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
  street?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type AddressMinFields = {
  __typename?: 'address_min_fields';
  city_id?: Maybe<Scalars['Int']>;
  country_code_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  postal_code?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  street?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "address" */
export type AddressMinOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  postal_code?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
  street?: Maybe<OrderBy>;
};

/** response of any mutation on the table "address" */
export type AddressMutationResponse = {
  __typename?: 'address_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Address>;
};

/** input type for inserting object relation for remote table "address" */
export type AddressObjRelInsertInput = {
  data: AddressInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<AddressOnConflict>;
};

/** on conflict condition type for table "address" */
export type AddressOnConflict = {
  constraint: AddressConstraint;
  update_columns?: Array<AddressUpdateColumn>;
  where?: Maybe<AddressBoolExp>;
};

/** Ordering options when selecting data from "address". */
export type AddressOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  enumerationByCityId?: Maybe<EnumerationOrderBy>;
  enumerationByRegionId?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  locations_aggregate?: Maybe<LocationAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  organizations_aggregate?: Maybe<OrganizationAggregateOrderBy>;
  postal_code?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
  street?: Maybe<OrderBy>;
};

/** primary key columns input for table: address */
export type AddressPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AddressPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "address" */
export enum AddressSelectColumn {
  /** column name */
  city_id = 'city_id',
  /** column name */
  country_code_id = 'country_code_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  postal_code = 'postal_code',
  /** column name */
  region_id = 'region_id',
  /** column name */
  street = 'street',
}

/** input type for updating data in table "address" */
export type AddressSetInput = {
  city_id?: Maybe<Scalars['Int']>;
  country_code_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  postal_code?: Maybe<Scalars['String']>;
  region_id?: Maybe<Scalars['Int']>;
  street?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type AddressStddevFields = {
  __typename?: 'address_stddev_fields';
  city_id?: Maybe<Scalars['Float']>;
  country_code_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  region_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "address" */
export type AddressStddevOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type AddressStddevPopFields = {
  __typename?: 'address_stddev_pop_fields';
  city_id?: Maybe<Scalars['Float']>;
  country_code_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  region_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "address" */
export type AddressStddevPopOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type AddressStddevSampFields = {
  __typename?: 'address_stddev_samp_fields';
  city_id?: Maybe<Scalars['Float']>;
  country_code_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  region_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "address" */
export type AddressStddevSampOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type AddressSumFields = {
  __typename?: 'address_sum_fields';
  city_id?: Maybe<Scalars['Int']>;
  country_code_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  region_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "address" */
export type AddressSumOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** update columns of table "address" */
export enum AddressUpdateColumn {
  /** column name */
  city_id = 'city_id',
  /** column name */
  country_code_id = 'country_code_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  postal_code = 'postal_code',
  /** column name */
  region_id = 'region_id',
  /** column name */
  street = 'street',
}

/** aggregate var_pop on columns */
export type AddressVarPopFields = {
  __typename?: 'address_var_pop_fields';
  city_id?: Maybe<Scalars['Float']>;
  country_code_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  region_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "address" */
export type AddressVarPopOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type AddressVarSampFields = {
  __typename?: 'address_var_samp_fields';
  city_id?: Maybe<Scalars['Float']>;
  country_code_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  region_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "address" */
export type AddressVarSampOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type AddressVarianceFields = {
  __typename?: 'address_variance_fields';
  city_id?: Maybe<Scalars['Float']>;
  country_code_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  region_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "address" */
export type AddressVarianceOrderBy = {
  city_id?: Maybe<OrderBy>;
  country_code_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  region_id?: Maybe<OrderBy>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type BigintComparisonExp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};

/** columns and relationships of "classification" */
export type Classification = {
  __typename?: 'classification';
  /** An array relationship */
  detections: Array<Detection>;
  /** An aggregate relationship */
  detections_aggregate: DetectionAggregate;
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  name_id: Scalars['Int'];
  /** An array relationship */
  tracks: Array<Track>;
  /** An aggregate relationship */
  tracks_aggregate: TrackAggregate;
  /** An array relationship */
  user_labels: Array<UserLabel>;
  /** An aggregate relationship */
  user_labels_aggregate: UserLabelAggregate;
};

/** columns and relationships of "classification" */
export type ClassificationDetectionsArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

/** columns and relationships of "classification" */
export type ClassificationDetectionsAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

/** columns and relationships of "classification" */
export type ClassificationMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "classification" */
export type ClassificationTracksArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

/** columns and relationships of "classification" */
export type ClassificationTracksAggregateArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

/** columns and relationships of "classification" */
export type ClassificationUserLabelsArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** columns and relationships of "classification" */
export type ClassificationUserLabelsAggregateArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** aggregated selection of "classification" */
export type ClassificationAggregate = {
  __typename?: 'classification_aggregate';
  aggregate?: Maybe<ClassificationAggregateFields>;
  nodes: Array<Classification>;
};

/** aggregate fields of "classification" */
export type ClassificationAggregateFields = {
  __typename?: 'classification_aggregate_fields';
  avg?: Maybe<ClassificationAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ClassificationMaxFields>;
  min?: Maybe<ClassificationMinFields>;
  stddev?: Maybe<ClassificationStddevFields>;
  stddev_pop?: Maybe<ClassificationStddevPopFields>;
  stddev_samp?: Maybe<ClassificationStddevSampFields>;
  sum?: Maybe<ClassificationSumFields>;
  var_pop?: Maybe<ClassificationVarPopFields>;
  var_samp?: Maybe<ClassificationVarSampFields>;
  variance?: Maybe<ClassificationVarianceFields>;
};

/** aggregate fields of "classification" */
export type ClassificationAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ClassificationSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "classification" */
export type ClassificationAggregateOrderBy = {
  avg?: Maybe<ClassificationAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ClassificationMaxOrderBy>;
  min?: Maybe<ClassificationMinOrderBy>;
  stddev?: Maybe<ClassificationStddevOrderBy>;
  stddev_pop?: Maybe<ClassificationStddevPopOrderBy>;
  stddev_samp?: Maybe<ClassificationStddevSampOrderBy>;
  sum?: Maybe<ClassificationSumOrderBy>;
  var_pop?: Maybe<ClassificationVarPopOrderBy>;
  var_samp?: Maybe<ClassificationVarSampOrderBy>;
  variance?: Maybe<ClassificationVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ClassificationAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "classification" */
export type ClassificationArrRelInsertInput = {
  data: Array<ClassificationInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<ClassificationOnConflict>;
};

/** aggregate avg on columns */
export type ClassificationAvgFields = {
  __typename?: 'classification_avg_fields';
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "classification" */
export type ClassificationAvgOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "classification". All fields are combined with a logical 'AND'. */
export type ClassificationBoolExp = {
  _and?: Maybe<Array<ClassificationBoolExp>>;
  _not?: Maybe<ClassificationBoolExp>;
  _or?: Maybe<Array<ClassificationBoolExp>>;
  detections?: Maybe<DetectionBoolExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  name_id?: Maybe<IntComparisonExp>;
  tracks?: Maybe<TrackBoolExp>;
  user_labels?: Maybe<UserLabelBoolExp>;
};

/** unique or primary key constraints on table "classification" */
export enum ClassificationConstraint {
  /** unique or primary key constraint */
  classification_pkey = 'classification_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ClassificationDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ClassificationDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ClassificationDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "classification" */
export type ClassificationIncInput = {
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "classification" */
export type ClassificationInsertInput = {
  detections?: Maybe<DetectionArrRelInsertInput>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
  tracks?: Maybe<TrackArrRelInsertInput>;
  user_labels?: Maybe<UserLabelArrRelInsertInput>;
};

/** aggregate max on columns */
export type ClassificationMaxFields = {
  __typename?: 'classification_max_fields';
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "classification" */
export type ClassificationMaxOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ClassificationMinFields = {
  __typename?: 'classification_min_fields';
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "classification" */
export type ClassificationMinOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "classification" */
export type ClassificationMutationResponse = {
  __typename?: 'classification_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Classification>;
};

/** input type for inserting object relation for remote table "classification" */
export type ClassificationObjRelInsertInput = {
  data: ClassificationInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<ClassificationOnConflict>;
};

/** on conflict condition type for table "classification" */
export type ClassificationOnConflict = {
  constraint: ClassificationConstraint;
  update_columns?: Array<ClassificationUpdateColumn>;
  where?: Maybe<ClassificationBoolExp>;
};

/** Ordering options when selecting data from "classification". */
export type ClassificationOrderBy = {
  detections_aggregate?: Maybe<DetectionAggregateOrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  tracks_aggregate?: Maybe<TrackAggregateOrderBy>;
  user_labels_aggregate?: Maybe<UserLabelAggregateOrderBy>;
};

/** primary key columns input for table: classification */
export type ClassificationPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ClassificationPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "classification" */
export enum ClassificationSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
}

/** input type for updating data in table "classification" */
export type ClassificationSetInput = {
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type ClassificationStddevFields = {
  __typename?: 'classification_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "classification" */
export type ClassificationStddevOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ClassificationStddevPopFields = {
  __typename?: 'classification_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "classification" */
export type ClassificationStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ClassificationStddevSampFields = {
  __typename?: 'classification_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "classification" */
export type ClassificationStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ClassificationSumFields = {
  __typename?: 'classification_sum_fields';
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "classification" */
export type ClassificationSumOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** update columns of table "classification" */
export enum ClassificationUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
}

/** aggregate var_pop on columns */
export type ClassificationVarPopFields = {
  __typename?: 'classification_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "classification" */
export type ClassificationVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ClassificationVarSampFields = {
  __typename?: 'classification_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "classification" */
export type ClassificationVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ClassificationVarianceFields = {
  __typename?: 'classification_variance_fields';
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "classification" */
export type ClassificationVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** columns and relationships of "compute" */
export type Compute = {
  __typename?: 'compute';
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  mac_address: Scalars['bigint'];
  metadata?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  organization: Organization;
  organization_id: Scalars['Int'];
  /** An object relationship */
  system?: Maybe<System>;
  system_id?: Maybe<Scalars['Int']>;
  type_id: Scalars['Int'];
};

/** columns and relationships of "compute" */
export type ComputeMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "compute" */
export type ComputeAggregate = {
  __typename?: 'compute_aggregate';
  aggregate?: Maybe<ComputeAggregateFields>;
  nodes: Array<Compute>;
};

/** aggregate fields of "compute" */
export type ComputeAggregateFields = {
  __typename?: 'compute_aggregate_fields';
  avg?: Maybe<ComputeAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ComputeMaxFields>;
  min?: Maybe<ComputeMinFields>;
  stddev?: Maybe<ComputeStddevFields>;
  stddev_pop?: Maybe<ComputeStddevPopFields>;
  stddev_samp?: Maybe<ComputeStddevSampFields>;
  sum?: Maybe<ComputeSumFields>;
  var_pop?: Maybe<ComputeVarPopFields>;
  var_samp?: Maybe<ComputeVarSampFields>;
  variance?: Maybe<ComputeVarianceFields>;
};

/** aggregate fields of "compute" */
export type ComputeAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ComputeSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "compute" */
export type ComputeAggregateOrderBy = {
  avg?: Maybe<ComputeAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ComputeMaxOrderBy>;
  min?: Maybe<ComputeMinOrderBy>;
  stddev?: Maybe<ComputeStddevOrderBy>;
  stddev_pop?: Maybe<ComputeStddevPopOrderBy>;
  stddev_samp?: Maybe<ComputeStddevSampOrderBy>;
  sum?: Maybe<ComputeSumOrderBy>;
  var_pop?: Maybe<ComputeVarPopOrderBy>;
  var_samp?: Maybe<ComputeVarSampOrderBy>;
  variance?: Maybe<ComputeVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ComputeAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "compute" */
export type ComputeArrRelInsertInput = {
  data: Array<ComputeInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<ComputeOnConflict>;
};

/** aggregate avg on columns */
export type ComputeAvgFields = {
  __typename?: 'compute_avg_fields';
  id?: Maybe<Scalars['Float']>;
  mac_address?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "compute" */
export type ComputeAvgOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "compute". All fields are combined with a logical 'AND'. */
export type ComputeBoolExp = {
  _and?: Maybe<Array<ComputeBoolExp>>;
  _not?: Maybe<ComputeBoolExp>;
  _or?: Maybe<Array<ComputeBoolExp>>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  mac_address?: Maybe<BigintComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  organization?: Maybe<OrganizationBoolExp>;
  organization_id?: Maybe<IntComparisonExp>;
  system?: Maybe<SystemBoolExp>;
  system_id?: Maybe<IntComparisonExp>;
  type_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "compute" */
export enum ComputeConstraint {
  /** unique or primary key constraint */
  compute_pkey = 'compute_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ComputeDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ComputeDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ComputeDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "compute" */
export type ComputeIncInput = {
  id?: Maybe<Scalars['Int']>;
  mac_address?: Maybe<Scalars['bigint']>;
  organization_id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "compute" */
export type ComputeInsertInput = {
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  mac_address?: Maybe<Scalars['bigint']>;
  metadata?: Maybe<Scalars['jsonb']>;
  organization?: Maybe<OrganizationObjRelInsertInput>;
  organization_id?: Maybe<Scalars['Int']>;
  system?: Maybe<SystemObjRelInsertInput>;
  system_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type ComputeMaxFields = {
  __typename?: 'compute_max_fields';
  id?: Maybe<Scalars['Int']>;
  mac_address?: Maybe<Scalars['bigint']>;
  organization_id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "compute" */
export type ComputeMaxOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ComputeMinFields = {
  __typename?: 'compute_min_fields';
  id?: Maybe<Scalars['Int']>;
  mac_address?: Maybe<Scalars['bigint']>;
  organization_id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "compute" */
export type ComputeMinOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "compute" */
export type ComputeMutationResponse = {
  __typename?: 'compute_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Compute>;
};

/** on conflict condition type for table "compute" */
export type ComputeOnConflict = {
  constraint: ComputeConstraint;
  update_columns?: Array<ComputeUpdateColumn>;
  where?: Maybe<ComputeBoolExp>;
};

/** Ordering options when selecting data from "compute". */
export type ComputeOrderBy = {
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  organization?: Maybe<OrganizationOrderBy>;
  organization_id?: Maybe<OrderBy>;
  system?: Maybe<SystemOrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: compute */
export type ComputePkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ComputePrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "compute" */
export enum ComputeSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  mac_address = 'mac_address',
  /** column name */
  metadata = 'metadata',
  /** column name */
  organization_id = 'organization_id',
  /** column name */
  system_id = 'system_id',
  /** column name */
  type_id = 'type_id',
}

/** input type for updating data in table "compute" */
export type ComputeSetInput = {
  id?: Maybe<Scalars['Int']>;
  mac_address?: Maybe<Scalars['bigint']>;
  metadata?: Maybe<Scalars['jsonb']>;
  organization_id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type ComputeStddevFields = {
  __typename?: 'compute_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  mac_address?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "compute" */
export type ComputeStddevOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ComputeStddevPopFields = {
  __typename?: 'compute_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  mac_address?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "compute" */
export type ComputeStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ComputeStddevSampFields = {
  __typename?: 'compute_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  mac_address?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "compute" */
export type ComputeStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ComputeSumFields = {
  __typename?: 'compute_sum_fields';
  id?: Maybe<Scalars['Int']>;
  mac_address?: Maybe<Scalars['bigint']>;
  organization_id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "compute" */
export type ComputeSumOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** update columns of table "compute" */
export enum ComputeUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  mac_address = 'mac_address',
  /** column name */
  metadata = 'metadata',
  /** column name */
  organization_id = 'organization_id',
  /** column name */
  system_id = 'system_id',
  /** column name */
  type_id = 'type_id',
}

/** aggregate var_pop on columns */
export type ComputeVarPopFields = {
  __typename?: 'compute_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  mac_address?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "compute" */
export type ComputeVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ComputeVarSampFields = {
  __typename?: 'compute_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  mac_address?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "compute" */
export type ComputeVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ComputeVarianceFields = {
  __typename?: 'compute_variance_fields';
  id?: Maybe<Scalars['Float']>;
  mac_address?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "compute" */
export type ComputeVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  mac_address?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** columns and relationships of "config" */
export type Config = {
  __typename?: 'config';
  config?: Maybe<Scalars['jsonb']>;
  id: Scalars['Int'];
  is_active: Scalars['Boolean'];
  /** An array relationship */
  measurement_runs: Array<MeasurementRun>;
  /** An aggregate relationship */
  measurement_runs_aggregate: MeasurementRunAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  system: System;
  system_id: Scalars['Int'];
  /** An object relationship */
  version: Version;
  version_id: Scalars['Int'];
};

/** columns and relationships of "config" */
export type ConfigConfigArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "config" */
export type ConfigMeasurementRunsArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

/** columns and relationships of "config" */
export type ConfigMeasurementRunsAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

/** columns and relationships of "config" */
export type ConfigMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "config" */
export type ConfigAggregate = {
  __typename?: 'config_aggregate';
  aggregate?: Maybe<ConfigAggregateFields>;
  nodes: Array<Config>;
};

/** aggregate fields of "config" */
export type ConfigAggregateFields = {
  __typename?: 'config_aggregate_fields';
  avg?: Maybe<ConfigAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ConfigMaxFields>;
  min?: Maybe<ConfigMinFields>;
  stddev?: Maybe<ConfigStddevFields>;
  stddev_pop?: Maybe<ConfigStddevPopFields>;
  stddev_samp?: Maybe<ConfigStddevSampFields>;
  sum?: Maybe<ConfigSumFields>;
  var_pop?: Maybe<ConfigVarPopFields>;
  var_samp?: Maybe<ConfigVarSampFields>;
  variance?: Maybe<ConfigVarianceFields>;
};

/** aggregate fields of "config" */
export type ConfigAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ConfigSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "config" */
export type ConfigAggregateOrderBy = {
  avg?: Maybe<ConfigAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ConfigMaxOrderBy>;
  min?: Maybe<ConfigMinOrderBy>;
  stddev?: Maybe<ConfigStddevOrderBy>;
  stddev_pop?: Maybe<ConfigStddevPopOrderBy>;
  stddev_samp?: Maybe<ConfigStddevSampOrderBy>;
  sum?: Maybe<ConfigSumOrderBy>;
  var_pop?: Maybe<ConfigVarPopOrderBy>;
  var_samp?: Maybe<ConfigVarSampOrderBy>;
  variance?: Maybe<ConfigVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ConfigAppendInput = {
  config?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "config" */
export type ConfigArrRelInsertInput = {
  data: Array<ConfigInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<ConfigOnConflict>;
};

/** aggregate avg on columns */
export type ConfigAvgFields = {
  __typename?: 'config_avg_fields';
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "config" */
export type ConfigAvgOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "config". All fields are combined with a logical 'AND'. */
export type ConfigBoolExp = {
  _and?: Maybe<Array<ConfigBoolExp>>;
  _not?: Maybe<ConfigBoolExp>;
  _or?: Maybe<Array<ConfigBoolExp>>;
  config?: Maybe<JsonbComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  is_active?: Maybe<BooleanComparisonExp>;
  measurement_runs?: Maybe<MeasurementRunBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  system?: Maybe<SystemBoolExp>;
  system_id?: Maybe<IntComparisonExp>;
  version?: Maybe<VersionBoolExp>;
  version_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "config" */
export enum ConfigConstraint {
  /** unique or primary key constraint */
  config_pkey = 'config_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ConfigDeleteAtPathInput = {
  config?: Maybe<Array<Scalars['String']>>;
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ConfigDeleteElemInput = {
  config?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ConfigDeleteKeyInput = {
  config?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "config" */
export type ConfigIncInput = {
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "config" */
export type ConfigInsertInput = {
  config?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  measurement_runs?: Maybe<MeasurementRunArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  system?: Maybe<SystemObjRelInsertInput>;
  system_id?: Maybe<Scalars['Int']>;
  version?: Maybe<VersionObjRelInsertInput>;
  version_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type ConfigMaxFields = {
  __typename?: 'config_max_fields';
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "config" */
export type ConfigMaxOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ConfigMinFields = {
  __typename?: 'config_min_fields';
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "config" */
export type ConfigMinOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "config" */
export type ConfigMutationResponse = {
  __typename?: 'config_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Config>;
};

/** input type for inserting object relation for remote table "config" */
export type ConfigObjRelInsertInput = {
  data: ConfigInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<ConfigOnConflict>;
};

/** on conflict condition type for table "config" */
export type ConfigOnConflict = {
  constraint: ConfigConstraint;
  update_columns?: Array<ConfigUpdateColumn>;
  where?: Maybe<ConfigBoolExp>;
};

/** Ordering options when selecting data from "config". */
export type ConfigOrderBy = {
  config?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  is_active?: Maybe<OrderBy>;
  measurement_runs_aggregate?: Maybe<MeasurementRunAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  system?: Maybe<SystemOrderBy>;
  system_id?: Maybe<OrderBy>;
  version?: Maybe<VersionOrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: config */
export type ConfigPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ConfigPrependInput = {
  config?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "config" */
export enum ConfigSelectColumn {
  /** column name */
  config = 'config',
  /** column name */
  id = 'id',
  /** column name */
  is_active = 'is_active',
  /** column name */
  metadata = 'metadata',
  /** column name */
  system_id = 'system_id',
  /** column name */
  version_id = 'version_id',
}

/** input type for updating data in table "config" */
export type ConfigSetInput = {
  config?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['Int']>;
  is_active?: Maybe<Scalars['Boolean']>;
  metadata?: Maybe<Scalars['jsonb']>;
  system_id?: Maybe<Scalars['Int']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type ConfigStddevFields = {
  __typename?: 'config_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "config" */
export type ConfigStddevOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ConfigStddevPopFields = {
  __typename?: 'config_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "config" */
export type ConfigStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ConfigStddevSampFields = {
  __typename?: 'config_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "config" */
export type ConfigStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ConfigSumFields = {
  __typename?: 'config_sum_fields';
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "config" */
export type ConfigSumOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** update columns of table "config" */
export enum ConfigUpdateColumn {
  /** column name */
  config = 'config',
  /** column name */
  id = 'id',
  /** column name */
  is_active = 'is_active',
  /** column name */
  metadata = 'metadata',
  /** column name */
  system_id = 'system_id',
  /** column name */
  version_id = 'version_id',
}

/** aggregate var_pop on columns */
export type ConfigVarPopFields = {
  __typename?: 'config_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "config" */
export type ConfigVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ConfigVarSampFields = {
  __typename?: 'config_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "config" */
export type ConfigVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ConfigVarianceFields = {
  __typename?: 'config_variance_fields';
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "config" */
export type ConfigVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** columns and relationships of "detection" */
export type Detection = {
  __typename?: 'detection';
  /** An object relationship */
  classification: Classification;
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_distribution?: Maybe<Scalars['jsonb']>;
  classification_id: Scalars['Int'];
  crop_resource_path: Scalars['String'];
  detection_confidence?: Maybe<Scalars['Float']>;
  /** An object relationship */
  detection_run: DetectionRun;
  detection_run_id: Scalars['Int'];
  id: Scalars['Int'];
  /** An array relationship */
  label_tasks: Array<LabelTask>;
  /** An aggregate relationship */
  label_tasks_aggregate: LabelTaskAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  region_of_interest: Scalars['geometry'];
  /** An array relationship */
  track_detections: Array<TrackDetections>;
  /** An aggregate relationship */
  track_detections_aggregate: TrackDetectionsAggregate;
  /** An array relationship */
  user_labels: Array<UserLabel>;
  /** An aggregate relationship */
  user_labels_aggregate: UserLabelAggregate;
};

/** columns and relationships of "detection" */
export type DetectionClassificationDistributionArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "detection" */
export type DetectionLabelTasksArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "detection" */
export type DetectionLabelTasksAggregateArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "detection" */
export type DetectionMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "detection" */
export type DetectionTrackDetectionsArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

/** columns and relationships of "detection" */
export type DetectionTrackDetectionsAggregateArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

/** columns and relationships of "detection" */
export type DetectionUserLabelsArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** columns and relationships of "detection" */
export type DetectionUserLabelsAggregateArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** aggregated selection of "detection" */
export type DetectionAggregate = {
  __typename?: 'detection_aggregate';
  aggregate?: Maybe<DetectionAggregateFields>;
  nodes: Array<Detection>;
};

/** aggregate fields of "detection" */
export type DetectionAggregateFields = {
  __typename?: 'detection_aggregate_fields';
  avg?: Maybe<DetectionAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<DetectionMaxFields>;
  min?: Maybe<DetectionMinFields>;
  stddev?: Maybe<DetectionStddevFields>;
  stddev_pop?: Maybe<DetectionStddevPopFields>;
  stddev_samp?: Maybe<DetectionStddevSampFields>;
  sum?: Maybe<DetectionSumFields>;
  var_pop?: Maybe<DetectionVarPopFields>;
  var_samp?: Maybe<DetectionVarSampFields>;
  variance?: Maybe<DetectionVarianceFields>;
};

/** aggregate fields of "detection" */
export type DetectionAggregateFieldsCountArgs = {
  columns?: Maybe<Array<DetectionSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "detection" */
export type DetectionAggregateOrderBy = {
  avg?: Maybe<DetectionAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<DetectionMaxOrderBy>;
  min?: Maybe<DetectionMinOrderBy>;
  stddev?: Maybe<DetectionStddevOrderBy>;
  stddev_pop?: Maybe<DetectionStddevPopOrderBy>;
  stddev_samp?: Maybe<DetectionStddevSampOrderBy>;
  sum?: Maybe<DetectionSumOrderBy>;
  var_pop?: Maybe<DetectionVarPopOrderBy>;
  var_samp?: Maybe<DetectionVarSampOrderBy>;
  variance?: Maybe<DetectionVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type DetectionAppendInput = {
  classification_distribution?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "detection" */
export type DetectionArrRelInsertInput = {
  data: Array<DetectionInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<DetectionOnConflict>;
};

/** aggregate avg on columns */
export type DetectionAvgFields = {
  __typename?: 'detection_avg_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Float']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "detection" */
export type DetectionAvgOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "detection". All fields are combined with a logical 'AND'. */
export type DetectionBoolExp = {
  _and?: Maybe<Array<DetectionBoolExp>>;
  _not?: Maybe<DetectionBoolExp>;
  _or?: Maybe<Array<DetectionBoolExp>>;
  classification?: Maybe<ClassificationBoolExp>;
  classification_confidence?: Maybe<FloatComparisonExp>;
  classification_distribution?: Maybe<JsonbComparisonExp>;
  classification_id?: Maybe<IntComparisonExp>;
  crop_resource_path?: Maybe<StringComparisonExp>;
  detection_confidence?: Maybe<FloatComparisonExp>;
  detection_run?: Maybe<DetectionRunBoolExp>;
  detection_run_id?: Maybe<IntComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  label_tasks?: Maybe<LabelTaskBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  region_of_interest?: Maybe<GeometryComparisonExp>;
  track_detections?: Maybe<TrackDetectionsBoolExp>;
  user_labels?: Maybe<UserLabelBoolExp>;
};

/** unique or primary key constraints on table "detection" */
export enum DetectionConstraint {
  /** unique or primary key constraint */
  detection_pkey = 'detection_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type DetectionDeleteAtPathInput = {
  classification_distribution?: Maybe<Array<Scalars['String']>>;
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type DetectionDeleteElemInput = {
  classification_distribution?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type DetectionDeleteKeyInput = {
  classification_distribution?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "detection" */
export type DetectionIncInput = {
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Int']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "detection" */
export type DetectionInsertInput = {
  classification?: Maybe<ClassificationObjRelInsertInput>;
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_distribution?: Maybe<Scalars['jsonb']>;
  classification_id?: Maybe<Scalars['Int']>;
  crop_resource_path?: Maybe<Scalars['String']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run?: Maybe<DetectionRunObjRelInsertInput>;
  detection_run_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  label_tasks?: Maybe<LabelTaskArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  region_of_interest?: Maybe<Scalars['geometry']>;
  track_detections?: Maybe<TrackDetectionsArrRelInsertInput>;
  user_labels?: Maybe<UserLabelArrRelInsertInput>;
};

/** aggregate max on columns */
export type DetectionMaxFields = {
  __typename?: 'detection_max_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Int']>;
  crop_resource_path?: Maybe<Scalars['String']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "detection" */
export type DetectionMaxOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  crop_resource_path?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type DetectionMinFields = {
  __typename?: 'detection_min_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Int']>;
  crop_resource_path?: Maybe<Scalars['String']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "detection" */
export type DetectionMinOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  crop_resource_path?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "detection" */
export type DetectionMutationResponse = {
  __typename?: 'detection_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Detection>;
};

/** input type for inserting object relation for remote table "detection" */
export type DetectionObjRelInsertInput = {
  data: DetectionInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<DetectionOnConflict>;
};

/** on conflict condition type for table "detection" */
export type DetectionOnConflict = {
  constraint: DetectionConstraint;
  update_columns?: Array<DetectionUpdateColumn>;
  where?: Maybe<DetectionBoolExp>;
};

/** Ordering options when selecting data from "detection". */
export type DetectionOrderBy = {
  classification?: Maybe<ClassificationOrderBy>;
  classification_confidence?: Maybe<OrderBy>;
  classification_distribution?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  crop_resource_path?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run?: Maybe<DetectionRunOrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  label_tasks_aggregate?: Maybe<LabelTaskAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  region_of_interest?: Maybe<OrderBy>;
  track_detections_aggregate?: Maybe<TrackDetectionsAggregateOrderBy>;
  user_labels_aggregate?: Maybe<UserLabelAggregateOrderBy>;
};

/** primary key columns input for table: detection */
export type DetectionPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type DetectionPrependInput = {
  classification_distribution?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** columns and relationships of "detection_run" */
export type DetectionRun = {
  __typename?: 'detection_run';
  create_timestamp: Scalars['timestamptz'];
  /** An array relationship */
  detections: Array<Detection>;
  /** An aggregate relationship */
  detections_aggregate: DetectionAggregate;
  /** An object relationship */
  detector?: Maybe<Detector>;
  detector_id?: Maybe<Scalars['Int']>;
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  /** An object relationship */
  measurement?: Maybe<Measurement>;
  measurement_id: Scalars['bigint'];
  measurement_time: Scalars['timestamptz'];
  metadata?: Maybe<Scalars['jsonb']>;
  start_timestamp?: Maybe<Scalars['timestamptz']>;
  state_id: Scalars['Int'];
};

/** columns and relationships of "detection_run" */
export type DetectionRunDetectionsArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

/** columns and relationships of "detection_run" */
export type DetectionRunDetectionsAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

/** columns and relationships of "detection_run" */
export type DetectionRunMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "detection_run" */
export type DetectionRunAggregate = {
  __typename?: 'detection_run_aggregate';
  aggregate?: Maybe<DetectionRunAggregateFields>;
  nodes: Array<DetectionRun>;
};

/** aggregate fields of "detection_run" */
export type DetectionRunAggregateFields = {
  __typename?: 'detection_run_aggregate_fields';
  avg?: Maybe<DetectionRunAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<DetectionRunMaxFields>;
  min?: Maybe<DetectionRunMinFields>;
  stddev?: Maybe<DetectionRunStddevFields>;
  stddev_pop?: Maybe<DetectionRunStddevPopFields>;
  stddev_samp?: Maybe<DetectionRunStddevSampFields>;
  sum?: Maybe<DetectionRunSumFields>;
  var_pop?: Maybe<DetectionRunVarPopFields>;
  var_samp?: Maybe<DetectionRunVarSampFields>;
  variance?: Maybe<DetectionRunVarianceFields>;
};

/** aggregate fields of "detection_run" */
export type DetectionRunAggregateFieldsCountArgs = {
  columns?: Maybe<Array<DetectionRunSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "detection_run" */
export type DetectionRunAggregateOrderBy = {
  avg?: Maybe<DetectionRunAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<DetectionRunMaxOrderBy>;
  min?: Maybe<DetectionRunMinOrderBy>;
  stddev?: Maybe<DetectionRunStddevOrderBy>;
  stddev_pop?: Maybe<DetectionRunStddevPopOrderBy>;
  stddev_samp?: Maybe<DetectionRunStddevSampOrderBy>;
  sum?: Maybe<DetectionRunSumOrderBy>;
  var_pop?: Maybe<DetectionRunVarPopOrderBy>;
  var_samp?: Maybe<DetectionRunVarSampOrderBy>;
  variance?: Maybe<DetectionRunVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type DetectionRunAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "detection_run" */
export type DetectionRunArrRelInsertInput = {
  data: Array<DetectionRunInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<DetectionRunOnConflict>;
};

/** aggregate avg on columns */
export type DetectionRunAvgFields = {
  __typename?: 'detection_run_avg_fields';
  detector_id?: Maybe<Scalars['Float']>;
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measurement_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "detection_run" */
export type DetectionRunAvgOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "detection_run". All fields are combined with a logical 'AND'. */
export type DetectionRunBoolExp = {
  _and?: Maybe<Array<DetectionRunBoolExp>>;
  _not?: Maybe<DetectionRunBoolExp>;
  _or?: Maybe<Array<DetectionRunBoolExp>>;
  create_timestamp?: Maybe<TimestamptzComparisonExp>;
  detections?: Maybe<DetectionBoolExp>;
  detector?: Maybe<DetectorBoolExp>;
  detector_id?: Maybe<IntComparisonExp>;
  duration_milliseconds?: Maybe<BigintComparisonExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  measurement?: Maybe<MeasurementBoolExp>;
  measurement_id?: Maybe<BigintComparisonExp>;
  measurement_time?: Maybe<TimestamptzComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  start_timestamp?: Maybe<TimestamptzComparisonExp>;
  state_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "detection_run" */
export enum DetectionRunConstraint {
  /** unique or primary key constraint */
  detection_run_pkey = 'detection_run_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type DetectionRunDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type DetectionRunDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type DetectionRunDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "detection_run" */
export type DetectionRunIncInput = {
  detector_id?: Maybe<Scalars['Int']>;
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  measurement_id?: Maybe<Scalars['bigint']>;
  state_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "detection_run" */
export type DetectionRunInsertInput = {
  create_timestamp?: Maybe<Scalars['timestamptz']>;
  detections?: Maybe<DetectionArrRelInsertInput>;
  detector?: Maybe<DetectorObjRelInsertInput>;
  detector_id?: Maybe<Scalars['Int']>;
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  measurement?: Maybe<MeasurementObjRelInsertInput>;
  measurement_id?: Maybe<Scalars['bigint']>;
  measurement_time?: Maybe<Scalars['timestamptz']>;
  metadata?: Maybe<Scalars['jsonb']>;
  start_timestamp?: Maybe<Scalars['timestamptz']>;
  state_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type DetectionRunMaxFields = {
  __typename?: 'detection_run_max_fields';
  create_timestamp?: Maybe<Scalars['timestamptz']>;
  detector_id?: Maybe<Scalars['Int']>;
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  measurement_id?: Maybe<Scalars['bigint']>;
  measurement_time?: Maybe<Scalars['timestamptz']>;
  start_timestamp?: Maybe<Scalars['timestamptz']>;
  state_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "detection_run" */
export type DetectionRunMaxOrderBy = {
  create_timestamp?: Maybe<OrderBy>;
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  measurement_time?: Maybe<OrderBy>;
  start_timestamp?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type DetectionRunMinFields = {
  __typename?: 'detection_run_min_fields';
  create_timestamp?: Maybe<Scalars['timestamptz']>;
  detector_id?: Maybe<Scalars['Int']>;
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  measurement_id?: Maybe<Scalars['bigint']>;
  measurement_time?: Maybe<Scalars['timestamptz']>;
  start_timestamp?: Maybe<Scalars['timestamptz']>;
  state_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "detection_run" */
export type DetectionRunMinOrderBy = {
  create_timestamp?: Maybe<OrderBy>;
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  measurement_time?: Maybe<OrderBy>;
  start_timestamp?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "detection_run" */
export type DetectionRunMutationResponse = {
  __typename?: 'detection_run_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<DetectionRun>;
};

/** input type for inserting object relation for remote table "detection_run" */
export type DetectionRunObjRelInsertInput = {
  data: DetectionRunInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<DetectionRunOnConflict>;
};

/** on conflict condition type for table "detection_run" */
export type DetectionRunOnConflict = {
  constraint: DetectionRunConstraint;
  update_columns?: Array<DetectionRunUpdateColumn>;
  where?: Maybe<DetectionRunBoolExp>;
};

/** Ordering options when selecting data from "detection_run". */
export type DetectionRunOrderBy = {
  create_timestamp?: Maybe<OrderBy>;
  detections_aggregate?: Maybe<DetectionAggregateOrderBy>;
  detector?: Maybe<DetectorOrderBy>;
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  measurement?: Maybe<MeasurementOrderBy>;
  measurement_id?: Maybe<OrderBy>;
  measurement_time?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  start_timestamp?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: detection_run */
export type DetectionRunPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type DetectionRunPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "detection_run" */
export enum DetectionRunSelectColumn {
  /** column name */
  create_timestamp = 'create_timestamp',
  /** column name */
  detector_id = 'detector_id',
  /** column name */
  duration_milliseconds = 'duration_milliseconds',
  /** column name */
  id = 'id',
  /** column name */
  measurement_id = 'measurement_id',
  /** column name */
  measurement_time = 'measurement_time',
  /** column name */
  metadata = 'metadata',
  /** column name */
  start_timestamp = 'start_timestamp',
  /** column name */
  state_id = 'state_id',
}

/** input type for updating data in table "detection_run" */
export type DetectionRunSetInput = {
  create_timestamp?: Maybe<Scalars['timestamptz']>;
  detector_id?: Maybe<Scalars['Int']>;
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  measurement_id?: Maybe<Scalars['bigint']>;
  measurement_time?: Maybe<Scalars['timestamptz']>;
  metadata?: Maybe<Scalars['jsonb']>;
  start_timestamp?: Maybe<Scalars['timestamptz']>;
  state_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type DetectionRunStddevFields = {
  __typename?: 'detection_run_stddev_fields';
  detector_id?: Maybe<Scalars['Float']>;
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measurement_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "detection_run" */
export type DetectionRunStddevOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type DetectionRunStddevPopFields = {
  __typename?: 'detection_run_stddev_pop_fields';
  detector_id?: Maybe<Scalars['Float']>;
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measurement_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "detection_run" */
export type DetectionRunStddevPopOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type DetectionRunStddevSampFields = {
  __typename?: 'detection_run_stddev_samp_fields';
  detector_id?: Maybe<Scalars['Float']>;
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measurement_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "detection_run" */
export type DetectionRunStddevSampOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type DetectionRunSumFields = {
  __typename?: 'detection_run_sum_fields';
  detector_id?: Maybe<Scalars['Int']>;
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  measurement_id?: Maybe<Scalars['bigint']>;
  state_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "detection_run" */
export type DetectionRunSumOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** update columns of table "detection_run" */
export enum DetectionRunUpdateColumn {
  /** column name */
  create_timestamp = 'create_timestamp',
  /** column name */
  detector_id = 'detector_id',
  /** column name */
  duration_milliseconds = 'duration_milliseconds',
  /** column name */
  id = 'id',
  /** column name */
  measurement_id = 'measurement_id',
  /** column name */
  measurement_time = 'measurement_time',
  /** column name */
  metadata = 'metadata',
  /** column name */
  start_timestamp = 'start_timestamp',
  /** column name */
  state_id = 'state_id',
}

/** aggregate var_pop on columns */
export type DetectionRunVarPopFields = {
  __typename?: 'detection_run_var_pop_fields';
  detector_id?: Maybe<Scalars['Float']>;
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measurement_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "detection_run" */
export type DetectionRunVarPopOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type DetectionRunVarSampFields = {
  __typename?: 'detection_run_var_samp_fields';
  detector_id?: Maybe<Scalars['Float']>;
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measurement_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "detection_run" */
export type DetectionRunVarSampOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type DetectionRunVarianceFields = {
  __typename?: 'detection_run_variance_fields';
  detector_id?: Maybe<Scalars['Float']>;
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  measurement_id?: Maybe<Scalars['Float']>;
  state_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "detection_run" */
export type DetectionRunVarianceOrderBy = {
  detector_id?: Maybe<OrderBy>;
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_id?: Maybe<OrderBy>;
  state_id?: Maybe<OrderBy>;
};

/** select columns of table "detection" */
export enum DetectionSelectColumn {
  /** column name */
  classification_confidence = 'classification_confidence',
  /** column name */
  classification_distribution = 'classification_distribution',
  /** column name */
  classification_id = 'classification_id',
  /** column name */
  crop_resource_path = 'crop_resource_path',
  /** column name */
  detection_confidence = 'detection_confidence',
  /** column name */
  detection_run_id = 'detection_run_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  region_of_interest = 'region_of_interest',
}

/** input type for updating data in table "detection" */
export type DetectionSetInput = {
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_distribution?: Maybe<Scalars['jsonb']>;
  classification_id?: Maybe<Scalars['Int']>;
  crop_resource_path?: Maybe<Scalars['String']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  region_of_interest?: Maybe<Scalars['geometry']>;
};

/** aggregate stddev on columns */
export type DetectionStddevFields = {
  __typename?: 'detection_stddev_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Float']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "detection" */
export type DetectionStddevOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type DetectionStddevPopFields = {
  __typename?: 'detection_stddev_pop_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Float']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "detection" */
export type DetectionStddevPopOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type DetectionStddevSampFields = {
  __typename?: 'detection_stddev_samp_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Float']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "detection" */
export type DetectionStddevSampOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type DetectionSumFields = {
  __typename?: 'detection_sum_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Int']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "detection" */
export type DetectionSumOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** update columns of table "detection" */
export enum DetectionUpdateColumn {
  /** column name */
  classification_confidence = 'classification_confidence',
  /** column name */
  classification_distribution = 'classification_distribution',
  /** column name */
  classification_id = 'classification_id',
  /** column name */
  crop_resource_path = 'crop_resource_path',
  /** column name */
  detection_confidence = 'detection_confidence',
  /** column name */
  detection_run_id = 'detection_run_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  region_of_interest = 'region_of_interest',
}

/** aggregate var_pop on columns */
export type DetectionVarPopFields = {
  __typename?: 'detection_var_pop_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Float']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "detection" */
export type DetectionVarPopOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type DetectionVarSampFields = {
  __typename?: 'detection_var_samp_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Float']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "detection" */
export type DetectionVarSampOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type DetectionVarianceFields = {
  __typename?: 'detection_variance_fields';
  classification_confidence?: Maybe<Scalars['Float']>;
  classification_id?: Maybe<Scalars['Float']>;
  detection_confidence?: Maybe<Scalars['Float']>;
  detection_run_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "detection" */
export type DetectionVarianceOrderBy = {
  classification_confidence?: Maybe<OrderBy>;
  classification_id?: Maybe<OrderBy>;
  detection_confidence?: Maybe<OrderBy>;
  detection_run_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
};

/** columns and relationships of "detector" */
export type Detector = {
  __typename?: 'detector';
  /** An array relationship */
  detection_runs: Array<DetectionRun>;
  /** An aggregate relationship */
  detection_runs_aggregate: DetectionRunAggregate;
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  name: Scalars['String'];
  /** An object relationship */
  version: Version;
  version_id: Scalars['Int'];
};

/** columns and relationships of "detector" */
export type DetectorDetectionRunsArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

/** columns and relationships of "detector" */
export type DetectorDetectionRunsAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

/** columns and relationships of "detector" */
export type DetectorMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "detector" */
export type DetectorAggregate = {
  __typename?: 'detector_aggregate';
  aggregate?: Maybe<DetectorAggregateFields>;
  nodes: Array<Detector>;
};

/** aggregate fields of "detector" */
export type DetectorAggregateFields = {
  __typename?: 'detector_aggregate_fields';
  avg?: Maybe<DetectorAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<DetectorMaxFields>;
  min?: Maybe<DetectorMinFields>;
  stddev?: Maybe<DetectorStddevFields>;
  stddev_pop?: Maybe<DetectorStddevPopFields>;
  stddev_samp?: Maybe<DetectorStddevSampFields>;
  sum?: Maybe<DetectorSumFields>;
  var_pop?: Maybe<DetectorVarPopFields>;
  var_samp?: Maybe<DetectorVarSampFields>;
  variance?: Maybe<DetectorVarianceFields>;
};

/** aggregate fields of "detector" */
export type DetectorAggregateFieldsCountArgs = {
  columns?: Maybe<Array<DetectorSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "detector" */
export type DetectorAggregateOrderBy = {
  avg?: Maybe<DetectorAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<DetectorMaxOrderBy>;
  min?: Maybe<DetectorMinOrderBy>;
  stddev?: Maybe<DetectorStddevOrderBy>;
  stddev_pop?: Maybe<DetectorStddevPopOrderBy>;
  stddev_samp?: Maybe<DetectorStddevSampOrderBy>;
  sum?: Maybe<DetectorSumOrderBy>;
  var_pop?: Maybe<DetectorVarPopOrderBy>;
  var_samp?: Maybe<DetectorVarSampOrderBy>;
  variance?: Maybe<DetectorVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type DetectorAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "detector" */
export type DetectorArrRelInsertInput = {
  data: Array<DetectorInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<DetectorOnConflict>;
};

/** aggregate avg on columns */
export type DetectorAvgFields = {
  __typename?: 'detector_avg_fields';
  id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "detector" */
export type DetectorAvgOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "detector". All fields are combined with a logical 'AND'. */
export type DetectorBoolExp = {
  _and?: Maybe<Array<DetectorBoolExp>>;
  _not?: Maybe<DetectorBoolExp>;
  _or?: Maybe<Array<DetectorBoolExp>>;
  detection_runs?: Maybe<DetectionRunBoolExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  version?: Maybe<VersionBoolExp>;
  version_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "detector" */
export enum DetectorConstraint {
  /** unique or primary key constraint */
  detector_pkey = 'detector_pkey',
  /** unique or primary key constraint */
  name_version_un = 'name_version_un',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type DetectorDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type DetectorDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type DetectorDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "detector" */
export type DetectorIncInput = {
  id?: Maybe<Scalars['Int']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "detector" */
export type DetectorInsertInput = {
  detection_runs?: Maybe<DetectionRunArrRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  version?: Maybe<VersionObjRelInsertInput>;
  version_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type DetectorMaxFields = {
  __typename?: 'detector_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "detector" */
export type DetectorMaxOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type DetectorMinFields = {
  __typename?: 'detector_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "detector" */
export type DetectorMinOrderBy = {
  id?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "detector" */
export type DetectorMutationResponse = {
  __typename?: 'detector_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Detector>;
};

/** input type for inserting object relation for remote table "detector" */
export type DetectorObjRelInsertInput = {
  data: DetectorInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<DetectorOnConflict>;
};

/** on conflict condition type for table "detector" */
export type DetectorOnConflict = {
  constraint: DetectorConstraint;
  update_columns?: Array<DetectorUpdateColumn>;
  where?: Maybe<DetectorBoolExp>;
};

/** Ordering options when selecting data from "detector". */
export type DetectorOrderBy = {
  detection_runs_aggregate?: Maybe<DetectionRunAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  version?: Maybe<VersionOrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: detector */
export type DetectorPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type DetectorPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "detector" */
export enum DetectorSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name = 'name',
  /** column name */
  version_id = 'version_id',
}

/** input type for updating data in table "detector" */
export type DetectorSetInput = {
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type DetectorStddevFields = {
  __typename?: 'detector_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "detector" */
export type DetectorStddevOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type DetectorStddevPopFields = {
  __typename?: 'detector_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "detector" */
export type DetectorStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type DetectorStddevSampFields = {
  __typename?: 'detector_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "detector" */
export type DetectorStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type DetectorSumFields = {
  __typename?: 'detector_sum_fields';
  id?: Maybe<Scalars['Int']>;
  version_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "detector" */
export type DetectorSumOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** update columns of table "detector" */
export enum DetectorUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name = 'name',
  /** column name */
  version_id = 'version_id',
}

/** aggregate var_pop on columns */
export type DetectorVarPopFields = {
  __typename?: 'detector_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "detector" */
export type DetectorVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type DetectorVarSampFields = {
  __typename?: 'detector_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "detector" */
export type DetectorVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type DetectorVarianceFields = {
  __typename?: 'detector_variance_fields';
  id?: Maybe<Scalars['Float']>;
  version_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "detector" */
export type DetectorVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  version_id?: Maybe<OrderBy>;
};

/** columns and relationships of "enumeration" */
export type Enumeration = {
  __typename?: 'enumeration';
  /** An array relationship */
  addresses: Array<Address>;
  /** An array relationship */
  addressesByCityId: Array<Address>;
  /** An aggregate relationship */
  addressesByCityId_aggregate: AddressAggregate;
  /** An array relationship */
  addressesByRegionId: Array<Address>;
  /** An aggregate relationship */
  addressesByRegionId_aggregate: AddressAggregate;
  /** An aggregate relationship */
  addresses_aggregate: AddressAggregate;
  /** An array relationship */
  classifications: Array<Classification>;
  /** An aggregate relationship */
  classifications_aggregate: ClassificationAggregate;
  code: Scalars['String'];
  /** An array relationship */
  computes: Array<Compute>;
  /** An aggregate relationship */
  computes_aggregate: ComputeAggregate;
  description: Scalars['String'];
  /** An array relationship */
  detection_runs: Array<DetectionRun>;
  /** An aggregate relationship */
  detection_runs_aggregate: DetectionRunAggregate;
  /** An array relationship */
  heat_maps: Array<HeatMap>;
  /** An aggregate relationship */
  heat_maps_aggregate: HeatMapAggregate;
  id: Scalars['Int'];
  /** An array relationship */
  labelTasksByPriorityId: Array<LabelTask>;
  /** An aggregate relationship */
  labelTasksByPriorityId_aggregate: LabelTaskAggregate;
  /** An array relationship */
  labelTasksByStatusId: Array<LabelTask>;
  /** An aggregate relationship */
  labelTasksByStatusId_aggregate: LabelTaskAggregate;
  /** An array relationship */
  label_tasks: Array<LabelTask>;
  /** An aggregate relationship */
  label_tasks_aggregate: LabelTaskAggregate;
  /** An array relationship */
  locations: Array<Location>;
  /** An aggregate relationship */
  locations_aggregate: LocationAggregate;
  /** An array relationship */
  measurements: Array<Measurement>;
  /** An array relationship */
  measurementsByTypeId: Array<Measurement>;
  /** An aggregate relationship */
  measurementsByTypeId_aggregate: MeasurementAggregate;
  /** An aggregate relationship */
  measurements_aggregate: MeasurementAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  /** An array relationship */
  organizations: Array<Organization>;
  /** An aggregate relationship */
  organizations_aggregate: OrganizationAggregate;
  /** An array relationship */
  parameters: Array<Parameters>;
  /** An aggregate relationship */
  parameters_aggregate: ParametersAggregate;
  type: Scalars['String'];
  /** An array relationship */
  user_labels: Array<UserLabel>;
  /** An aggregate relationship */
  user_labels_aggregate: UserLabelAggregate;
  /** An array relationship */
  zones: Array<Zone>;
  /** An aggregate relationship */
  zones_aggregate: ZoneAggregate;
};

/** columns and relationships of "enumeration" */
export type EnumerationAddressesArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationAddressesByCityIdArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationAddressesByCityIdAggregateArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationAddressesByRegionIdArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationAddressesByRegionIdAggregateArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationAddressesAggregateArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationClassificationsArgs = {
  distinct_on?: Maybe<Array<ClassificationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ClassificationOrderBy>>;
  where?: Maybe<ClassificationBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationClassificationsAggregateArgs = {
  distinct_on?: Maybe<Array<ClassificationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ClassificationOrderBy>>;
  where?: Maybe<ClassificationBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationComputesArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationComputesAggregateArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationDetectionRunsArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationDetectionRunsAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationHeatMapsArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationHeatMapsAggregateArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLabelTasksByPriorityIdArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLabelTasksByPriorityIdAggregateArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLabelTasksByStatusIdArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLabelTasksByStatusIdAggregateArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLabelTasksArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLabelTasksAggregateArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLocationsArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationLocationsAggregateArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationMeasurementsArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationMeasurementsByTypeIdArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationMeasurementsByTypeIdAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationMeasurementsAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "enumeration" */
export type EnumerationOrganizationsArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationOrganizationsAggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationParametersArgs = {
  distinct_on?: Maybe<Array<ParametersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ParametersOrderBy>>;
  where?: Maybe<ParametersBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationParametersAggregateArgs = {
  distinct_on?: Maybe<Array<ParametersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ParametersOrderBy>>;
  where?: Maybe<ParametersBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationUserLabelsArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationUserLabelsAggregateArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationZonesArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

/** columns and relationships of "enumeration" */
export type EnumerationZonesAggregateArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

/** aggregated selection of "enumeration" */
export type EnumerationAggregate = {
  __typename?: 'enumeration_aggregate';
  aggregate?: Maybe<EnumerationAggregateFields>;
  nodes: Array<Enumeration>;
};

/** aggregate fields of "enumeration" */
export type EnumerationAggregateFields = {
  __typename?: 'enumeration_aggregate_fields';
  avg?: Maybe<EnumerationAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<EnumerationMaxFields>;
  min?: Maybe<EnumerationMinFields>;
  stddev?: Maybe<EnumerationStddevFields>;
  stddev_pop?: Maybe<EnumerationStddevPopFields>;
  stddev_samp?: Maybe<EnumerationStddevSampFields>;
  sum?: Maybe<EnumerationSumFields>;
  var_pop?: Maybe<EnumerationVarPopFields>;
  var_samp?: Maybe<EnumerationVarSampFields>;
  variance?: Maybe<EnumerationVarianceFields>;
};

/** aggregate fields of "enumeration" */
export type EnumerationAggregateFieldsCountArgs = {
  columns?: Maybe<Array<EnumerationSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type EnumerationAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type EnumerationAvgFields = {
  __typename?: 'enumeration_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "enumeration". All fields are combined with a logical 'AND'. */
export type EnumerationBoolExp = {
  _and?: Maybe<Array<EnumerationBoolExp>>;
  _not?: Maybe<EnumerationBoolExp>;
  _or?: Maybe<Array<EnumerationBoolExp>>;
  addresses?: Maybe<AddressBoolExp>;
  addressesByCityId?: Maybe<AddressBoolExp>;
  addressesByRegionId?: Maybe<AddressBoolExp>;
  classifications?: Maybe<ClassificationBoolExp>;
  code?: Maybe<StringComparisonExp>;
  computes?: Maybe<ComputeBoolExp>;
  description?: Maybe<StringComparisonExp>;
  detection_runs?: Maybe<DetectionRunBoolExp>;
  heat_maps?: Maybe<HeatMapBoolExp>;
  id?: Maybe<IntComparisonExp>;
  labelTasksByPriorityId?: Maybe<LabelTaskBoolExp>;
  labelTasksByStatusId?: Maybe<LabelTaskBoolExp>;
  label_tasks?: Maybe<LabelTaskBoolExp>;
  locations?: Maybe<LocationBoolExp>;
  measurements?: Maybe<MeasurementBoolExp>;
  measurementsByTypeId?: Maybe<MeasurementBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  organizations?: Maybe<OrganizationBoolExp>;
  parameters?: Maybe<ParametersBoolExp>;
  type?: Maybe<StringComparisonExp>;
  user_labels?: Maybe<UserLabelBoolExp>;
  zones?: Maybe<ZoneBoolExp>;
};

/** unique or primary key constraints on table "enumeration" */
export enum EnumerationConstraint {
  /** unique or primary key constraint */
  enumeration_pkey = 'enumeration_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type EnumerationDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type EnumerationDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type EnumerationDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "enumeration" */
export type EnumerationIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "enumeration" */
export type EnumerationInsertInput = {
  addresses?: Maybe<AddressArrRelInsertInput>;
  addressesByCityId?: Maybe<AddressArrRelInsertInput>;
  addressesByRegionId?: Maybe<AddressArrRelInsertInput>;
  classifications?: Maybe<ClassificationArrRelInsertInput>;
  code?: Maybe<Scalars['String']>;
  computes?: Maybe<ComputeArrRelInsertInput>;
  description?: Maybe<Scalars['String']>;
  detection_runs?: Maybe<DetectionRunArrRelInsertInput>;
  heat_maps?: Maybe<HeatMapArrRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  labelTasksByPriorityId?: Maybe<LabelTaskArrRelInsertInput>;
  labelTasksByStatusId?: Maybe<LabelTaskArrRelInsertInput>;
  label_tasks?: Maybe<LabelTaskArrRelInsertInput>;
  locations?: Maybe<LocationArrRelInsertInput>;
  measurements?: Maybe<MeasurementArrRelInsertInput>;
  measurementsByTypeId?: Maybe<MeasurementArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  organizations?: Maybe<OrganizationArrRelInsertInput>;
  parameters?: Maybe<ParametersArrRelInsertInput>;
  type?: Maybe<Scalars['String']>;
  user_labels?: Maybe<UserLabelArrRelInsertInput>;
  zones?: Maybe<ZoneArrRelInsertInput>;
};

/** aggregate max on columns */
export type EnumerationMaxFields = {
  __typename?: 'enumeration_max_fields';
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type EnumerationMinFields = {
  __typename?: 'enumeration_min_fields';
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "enumeration" */
export type EnumerationMutationResponse = {
  __typename?: 'enumeration_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Enumeration>;
};

/** input type for inserting object relation for remote table "enumeration" */
export type EnumerationObjRelInsertInput = {
  data: EnumerationInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<EnumerationOnConflict>;
};

/** on conflict condition type for table "enumeration" */
export type EnumerationOnConflict = {
  constraint: EnumerationConstraint;
  update_columns?: Array<EnumerationUpdateColumn>;
  where?: Maybe<EnumerationBoolExp>;
};

/** Ordering options when selecting data from "enumeration". */
export type EnumerationOrderBy = {
  addressesByCityId_aggregate?: Maybe<AddressAggregateOrderBy>;
  addressesByRegionId_aggregate?: Maybe<AddressAggregateOrderBy>;
  addresses_aggregate?: Maybe<AddressAggregateOrderBy>;
  classifications_aggregate?: Maybe<ClassificationAggregateOrderBy>;
  code?: Maybe<OrderBy>;
  computes_aggregate?: Maybe<ComputeAggregateOrderBy>;
  description?: Maybe<OrderBy>;
  detection_runs_aggregate?: Maybe<DetectionRunAggregateOrderBy>;
  heat_maps_aggregate?: Maybe<HeatMapAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  labelTasksByPriorityId_aggregate?: Maybe<LabelTaskAggregateOrderBy>;
  labelTasksByStatusId_aggregate?: Maybe<LabelTaskAggregateOrderBy>;
  label_tasks_aggregate?: Maybe<LabelTaskAggregateOrderBy>;
  locations_aggregate?: Maybe<LocationAggregateOrderBy>;
  measurementsByTypeId_aggregate?: Maybe<MeasurementAggregateOrderBy>;
  measurements_aggregate?: Maybe<MeasurementAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  organizations_aggregate?: Maybe<OrganizationAggregateOrderBy>;
  parameters_aggregate?: Maybe<ParametersAggregateOrderBy>;
  type?: Maybe<OrderBy>;
  user_labels_aggregate?: Maybe<UserLabelAggregateOrderBy>;
  zones_aggregate?: Maybe<ZoneAggregateOrderBy>;
};

/** primary key columns input for table: enumeration */
export type EnumerationPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type EnumerationPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "enumeration" */
export enum EnumerationSelectColumn {
  /** column name */
  code = 'code',
  /** column name */
  description = 'description',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  type = 'type',
}

/** input type for updating data in table "enumeration" */
export type EnumerationSetInput = {
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type EnumerationStddevFields = {
  __typename?: 'enumeration_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type EnumerationStddevPopFields = {
  __typename?: 'enumeration_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type EnumerationStddevSampFields = {
  __typename?: 'enumeration_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type EnumerationSumFields = {
  __typename?: 'enumeration_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "enumeration" */
export enum EnumerationUpdateColumn {
  /** column name */
  code = 'code',
  /** column name */
  description = 'description',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  type = 'type',
}

/** aggregate var_pop on columns */
export type EnumerationVarPopFields = {
  __typename?: 'enumeration_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type EnumerationVarSampFields = {
  __typename?: 'enumeration_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type EnumerationVarianceFields = {
  __typename?: 'enumeration_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8ComparisonExp = {
  _eq?: Maybe<Scalars['float8']>;
  _gt?: Maybe<Scalars['float8']>;
  _gte?: Maybe<Scalars['float8']>;
  _in?: Maybe<Array<Scalars['float8']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['float8']>;
  _lte?: Maybe<Scalars['float8']>;
  _neq?: Maybe<Scalars['float8']>;
  _nin?: Maybe<Array<Scalars['float8']>>;
};

export type GeographyCastExp = {
  geometry?: Maybe<GeometryComparisonExp>;
};

/** columns and relationships of "geography_columns" */
export type GeographyColumns = {
  __typename?: 'geography_columns';
  coord_dimension?: Maybe<Scalars['Int']>;
  f_geography_column?: Maybe<Scalars['name']>;
  f_table_catalog?: Maybe<Scalars['name']>;
  f_table_name?: Maybe<Scalars['name']>;
  f_table_schema?: Maybe<Scalars['name']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregated selection of "geography_columns" */
export type GeographyColumnsAggregate = {
  __typename?: 'geography_columns_aggregate';
  aggregate?: Maybe<GeographyColumnsAggregateFields>;
  nodes: Array<GeographyColumns>;
};

/** aggregate fields of "geography_columns" */
export type GeographyColumnsAggregateFields = {
  __typename?: 'geography_columns_aggregate_fields';
  avg?: Maybe<GeographyColumnsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<GeographyColumnsMaxFields>;
  min?: Maybe<GeographyColumnsMinFields>;
  stddev?: Maybe<GeographyColumnsStddevFields>;
  stddev_pop?: Maybe<GeographyColumnsStddevPopFields>;
  stddev_samp?: Maybe<GeographyColumnsStddevSampFields>;
  sum?: Maybe<GeographyColumnsSumFields>;
  var_pop?: Maybe<GeographyColumnsVarPopFields>;
  var_samp?: Maybe<GeographyColumnsVarSampFields>;
  variance?: Maybe<GeographyColumnsVarianceFields>;
};

/** aggregate fields of "geography_columns" */
export type GeographyColumnsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<GeographyColumnsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type GeographyColumnsAvgFields = {
  __typename?: 'geography_columns_avg_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "geography_columns". All fields are combined with a logical 'AND'. */
export type GeographyColumnsBoolExp = {
  _and?: Maybe<Array<GeographyColumnsBoolExp>>;
  _not?: Maybe<GeographyColumnsBoolExp>;
  _or?: Maybe<Array<GeographyColumnsBoolExp>>;
  coord_dimension?: Maybe<IntComparisonExp>;
  f_geography_column?: Maybe<NameComparisonExp>;
  f_table_catalog?: Maybe<NameComparisonExp>;
  f_table_name?: Maybe<NameComparisonExp>;
  f_table_schema?: Maybe<NameComparisonExp>;
  srid?: Maybe<IntComparisonExp>;
  type?: Maybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type GeographyColumnsMaxFields = {
  __typename?: 'geography_columns_max_fields';
  coord_dimension?: Maybe<Scalars['Int']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GeographyColumnsMinFields = {
  __typename?: 'geography_columns_min_fields';
  coord_dimension?: Maybe<Scalars['Int']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "geography_columns". */
export type GeographyColumnsOrderBy = {
  coord_dimension?: Maybe<OrderBy>;
  f_geography_column?: Maybe<OrderBy>;
  f_table_catalog?: Maybe<OrderBy>;
  f_table_name?: Maybe<OrderBy>;
  f_table_schema?: Maybe<OrderBy>;
  srid?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** select columns of table "geography_columns" */
export enum GeographyColumnsSelectColumn {
  /** column name */
  coord_dimension = 'coord_dimension',
  /** column name */
  f_geography_column = 'f_geography_column',
  /** column name */
  f_table_catalog = 'f_table_catalog',
  /** column name */
  f_table_name = 'f_table_name',
  /** column name */
  f_table_schema = 'f_table_schema',
  /** column name */
  srid = 'srid',
  /** column name */
  type = 'type',
}

/** aggregate stddev on columns */
export type GeographyColumnsStddevFields = {
  __typename?: 'geography_columns_stddev_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GeographyColumnsStddevPopFields = {
  __typename?: 'geography_columns_stddev_pop_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GeographyColumnsStddevSampFields = {
  __typename?: 'geography_columns_stddev_samp_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GeographyColumnsSumFields = {
  __typename?: 'geography_columns_sum_fields';
  coord_dimension?: Maybe<Scalars['Int']>;
  srid?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type GeographyColumnsVarPopFields = {
  __typename?: 'geography_columns_var_pop_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GeographyColumnsVarSampFields = {
  __typename?: 'geography_columns_var_samp_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GeographyColumnsVarianceFields = {
  __typename?: 'geography_columns_variance_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "geography". All fields are combined with logical 'AND'. */
export type GeographyComparisonExp = {
  _cast?: Maybe<GeographyCastExp>;
  _eq?: Maybe<Scalars['geography']>;
  _gt?: Maybe<Scalars['geography']>;
  _gte?: Maybe<Scalars['geography']>;
  _in?: Maybe<Array<Scalars['geography']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geography']>;
  _lte?: Maybe<Scalars['geography']>;
  _neq?: Maybe<Scalars['geography']>;
  _nin?: Maybe<Array<Scalars['geography']>>;
  /** is the column within a given distance from the given geography value */
  _st_d_within?: Maybe<StDWithinGeographyInput>;
  /** does the column spatially intersect the given geography value */
  _st_intersects?: Maybe<Scalars['geography']>;
};

export type GeometryCastExp = {
  geography?: Maybe<GeographyComparisonExp>;
};

/** columns and relationships of "geometry_columns" */
export type GeometryColumns = {
  __typename?: 'geometry_columns';
  coord_dimension?: Maybe<Scalars['Int']>;
  f_geometry_column?: Maybe<Scalars['name']>;
  f_table_catalog?: Maybe<Scalars['String']>;
  f_table_name?: Maybe<Scalars['name']>;
  f_table_schema?: Maybe<Scalars['name']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregated selection of "geometry_columns" */
export type GeometryColumnsAggregate = {
  __typename?: 'geometry_columns_aggregate';
  aggregate?: Maybe<GeometryColumnsAggregateFields>;
  nodes: Array<GeometryColumns>;
};

/** aggregate fields of "geometry_columns" */
export type GeometryColumnsAggregateFields = {
  __typename?: 'geometry_columns_aggregate_fields';
  avg?: Maybe<GeometryColumnsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<GeometryColumnsMaxFields>;
  min?: Maybe<GeometryColumnsMinFields>;
  stddev?: Maybe<GeometryColumnsStddevFields>;
  stddev_pop?: Maybe<GeometryColumnsStddevPopFields>;
  stddev_samp?: Maybe<GeometryColumnsStddevSampFields>;
  sum?: Maybe<GeometryColumnsSumFields>;
  var_pop?: Maybe<GeometryColumnsVarPopFields>;
  var_samp?: Maybe<GeometryColumnsVarSampFields>;
  variance?: Maybe<GeometryColumnsVarianceFields>;
};

/** aggregate fields of "geometry_columns" */
export type GeometryColumnsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<GeometryColumnsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type GeometryColumnsAvgFields = {
  __typename?: 'geometry_columns_avg_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "geometry_columns". All fields are combined with a logical 'AND'. */
export type GeometryColumnsBoolExp = {
  _and?: Maybe<Array<GeometryColumnsBoolExp>>;
  _not?: Maybe<GeometryColumnsBoolExp>;
  _or?: Maybe<Array<GeometryColumnsBoolExp>>;
  coord_dimension?: Maybe<IntComparisonExp>;
  f_geometry_column?: Maybe<NameComparisonExp>;
  f_table_catalog?: Maybe<StringComparisonExp>;
  f_table_name?: Maybe<NameComparisonExp>;
  f_table_schema?: Maybe<NameComparisonExp>;
  srid?: Maybe<IntComparisonExp>;
  type?: Maybe<StringComparisonExp>;
};

/** input type for incrementing numeric columns in table "geometry_columns" */
export type GeometryColumnsIncInput = {
  coord_dimension?: Maybe<Scalars['Int']>;
  srid?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "geometry_columns" */
export type GeometryColumnsInsertInput = {
  coord_dimension?: Maybe<Scalars['Int']>;
  f_geometry_column?: Maybe<Scalars['name']>;
  f_table_catalog?: Maybe<Scalars['String']>;
  f_table_name?: Maybe<Scalars['name']>;
  f_table_schema?: Maybe<Scalars['name']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GeometryColumnsMaxFields = {
  __typename?: 'geometry_columns_max_fields';
  coord_dimension?: Maybe<Scalars['Int']>;
  f_table_catalog?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GeometryColumnsMinFields = {
  __typename?: 'geometry_columns_min_fields';
  coord_dimension?: Maybe<Scalars['Int']>;
  f_table_catalog?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "geometry_columns" */
export type GeometryColumnsMutationResponse = {
  __typename?: 'geometry_columns_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GeometryColumns>;
};

/** Ordering options when selecting data from "geometry_columns". */
export type GeometryColumnsOrderBy = {
  coord_dimension?: Maybe<OrderBy>;
  f_geometry_column?: Maybe<OrderBy>;
  f_table_catalog?: Maybe<OrderBy>;
  f_table_name?: Maybe<OrderBy>;
  f_table_schema?: Maybe<OrderBy>;
  srid?: Maybe<OrderBy>;
  type?: Maybe<OrderBy>;
};

/** select columns of table "geometry_columns" */
export enum GeometryColumnsSelectColumn {
  /** column name */
  coord_dimension = 'coord_dimension',
  /** column name */
  f_geometry_column = 'f_geometry_column',
  /** column name */
  f_table_catalog = 'f_table_catalog',
  /** column name */
  f_table_name = 'f_table_name',
  /** column name */
  f_table_schema = 'f_table_schema',
  /** column name */
  srid = 'srid',
  /** column name */
  type = 'type',
}

/** input type for updating data in table "geometry_columns" */
export type GeometryColumnsSetInput = {
  coord_dimension?: Maybe<Scalars['Int']>;
  f_geometry_column?: Maybe<Scalars['name']>;
  f_table_catalog?: Maybe<Scalars['String']>;
  f_table_name?: Maybe<Scalars['name']>;
  f_table_schema?: Maybe<Scalars['name']>;
  srid?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type GeometryColumnsStddevFields = {
  __typename?: 'geometry_columns_stddev_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GeometryColumnsStddevPopFields = {
  __typename?: 'geometry_columns_stddev_pop_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GeometryColumnsStddevSampFields = {
  __typename?: 'geometry_columns_stddev_samp_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GeometryColumnsSumFields = {
  __typename?: 'geometry_columns_sum_fields';
  coord_dimension?: Maybe<Scalars['Int']>;
  srid?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type GeometryColumnsVarPopFields = {
  __typename?: 'geometry_columns_var_pop_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GeometryColumnsVarSampFields = {
  __typename?: 'geometry_columns_var_samp_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GeometryColumnsVarianceFields = {
  __typename?: 'geometry_columns_variance_fields';
  coord_dimension?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "geometry". All fields are combined with logical 'AND'. */
export type GeometryComparisonExp = {
  _cast?: Maybe<GeometryCastExp>;
  _eq?: Maybe<Scalars['geometry']>;
  _gt?: Maybe<Scalars['geometry']>;
  _gte?: Maybe<Scalars['geometry']>;
  _in?: Maybe<Array<Scalars['geometry']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geometry']>;
  _lte?: Maybe<Scalars['geometry']>;
  _neq?: Maybe<Scalars['geometry']>;
  _nin?: Maybe<Array<Scalars['geometry']>>;
  /** is the column within a given 3D distance from the given geometry value */
  _st_3d_d_within?: Maybe<StDWithinInput>;
  /** does the column spatially intersect the given geometry value in 3D */
  _st_3d_intersects?: Maybe<Scalars['geometry']>;
  /** does the column contain the given geometry value */
  _st_contains?: Maybe<Scalars['geometry']>;
  /** does the column cross the given geometry value */
  _st_crosses?: Maybe<Scalars['geometry']>;
  /** is the column within a given distance from the given geometry value */
  _st_d_within?: Maybe<StDWithinInput>;
  /** is the column equal to given geometry value (directionality is ignored) */
  _st_equals?: Maybe<Scalars['geometry']>;
  /** does the column spatially intersect the given geometry value */
  _st_intersects?: Maybe<Scalars['geometry']>;
  /** does the column 'spatially overlap' (intersect but not completely contain) the given geometry value */
  _st_overlaps?: Maybe<Scalars['geometry']>;
  /** does the column have atleast one point in common with the given geometry value */
  _st_touches?: Maybe<Scalars['geometry']>;
  /** is the column contained in the given geometry value */
  _st_within?: Maybe<Scalars['geometry']>;
};

/** columns and relationships of "growth_cycle" */
export type GrowthCycle = {
  __typename?: 'growth_cycle';
  end_time: Scalars['timestamptz'];
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  start_time: Scalars['timestamptz'];
  /** An object relationship */
  zone: Zone;
  zone_id: Scalars['Int'];
};

/** columns and relationships of "growth_cycle" */
export type GrowthCycleMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "growth_cycle" */
export type GrowthCycleAggregate = {
  __typename?: 'growth_cycle_aggregate';
  aggregate?: Maybe<GrowthCycleAggregateFields>;
  nodes: Array<GrowthCycle>;
};

/** aggregate fields of "growth_cycle" */
export type GrowthCycleAggregateFields = {
  __typename?: 'growth_cycle_aggregate_fields';
  avg?: Maybe<GrowthCycleAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<GrowthCycleMaxFields>;
  min?: Maybe<GrowthCycleMinFields>;
  stddev?: Maybe<GrowthCycleStddevFields>;
  stddev_pop?: Maybe<GrowthCycleStddevPopFields>;
  stddev_samp?: Maybe<GrowthCycleStddevSampFields>;
  sum?: Maybe<GrowthCycleSumFields>;
  var_pop?: Maybe<GrowthCycleVarPopFields>;
  var_samp?: Maybe<GrowthCycleVarSampFields>;
  variance?: Maybe<GrowthCycleVarianceFields>;
};

/** aggregate fields of "growth_cycle" */
export type GrowthCycleAggregateFieldsCountArgs = {
  columns?: Maybe<Array<GrowthCycleSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "growth_cycle" */
export type GrowthCycleAggregateOrderBy = {
  avg?: Maybe<GrowthCycleAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<GrowthCycleMaxOrderBy>;
  min?: Maybe<GrowthCycleMinOrderBy>;
  stddev?: Maybe<GrowthCycleStddevOrderBy>;
  stddev_pop?: Maybe<GrowthCycleStddevPopOrderBy>;
  stddev_samp?: Maybe<GrowthCycleStddevSampOrderBy>;
  sum?: Maybe<GrowthCycleSumOrderBy>;
  var_pop?: Maybe<GrowthCycleVarPopOrderBy>;
  var_samp?: Maybe<GrowthCycleVarSampOrderBy>;
  variance?: Maybe<GrowthCycleVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type GrowthCycleAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "growth_cycle" */
export type GrowthCycleArrRelInsertInput = {
  data: Array<GrowthCycleInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<GrowthCycleOnConflict>;
};

/** aggregate avg on columns */
export type GrowthCycleAvgFields = {
  __typename?: 'growth_cycle_avg_fields';
  id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "growth_cycle" */
export type GrowthCycleAvgOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "growth_cycle". All fields are combined with a logical 'AND'. */
export type GrowthCycleBoolExp = {
  _and?: Maybe<Array<GrowthCycleBoolExp>>;
  _not?: Maybe<GrowthCycleBoolExp>;
  _or?: Maybe<Array<GrowthCycleBoolExp>>;
  end_time?: Maybe<TimestamptzComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  start_time?: Maybe<TimestamptzComparisonExp>;
  zone?: Maybe<ZoneBoolExp>;
  zone_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "growth_cycle" */
export enum GrowthCycleConstraint {
  /** unique or primary key constraint */
  growth_cycle_pkey = 'growth_cycle_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type GrowthCycleDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type GrowthCycleDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type GrowthCycleDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "growth_cycle" */
export type GrowthCycleIncInput = {
  id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "growth_cycle" */
export type GrowthCycleInsertInput = {
  end_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  zone?: Maybe<ZoneObjRelInsertInput>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type GrowthCycleMaxFields = {
  __typename?: 'growth_cycle_max_fields';
  end_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "growth_cycle" */
export type GrowthCycleMaxOrderBy = {
  end_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type GrowthCycleMinFields = {
  __typename?: 'growth_cycle_min_fields';
  end_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "growth_cycle" */
export type GrowthCycleMinOrderBy = {
  end_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "growth_cycle" */
export type GrowthCycleMutationResponse = {
  __typename?: 'growth_cycle_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GrowthCycle>;
};

/** on conflict condition type for table "growth_cycle" */
export type GrowthCycleOnConflict = {
  constraint: GrowthCycleConstraint;
  update_columns?: Array<GrowthCycleUpdateColumn>;
  where?: Maybe<GrowthCycleBoolExp>;
};

/** Ordering options when selecting data from "growth_cycle". */
export type GrowthCycleOrderBy = {
  end_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
  zone?: Maybe<ZoneOrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: growth_cycle */
export type GrowthCyclePkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type GrowthCyclePrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "growth_cycle" */
export enum GrowthCycleSelectColumn {
  /** column name */
  end_time = 'end_time',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  start_time = 'start_time',
  /** column name */
  zone_id = 'zone_id',
}

/** input type for updating data in table "growth_cycle" */
export type GrowthCycleSetInput = {
  end_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type GrowthCycleStddevFields = {
  __typename?: 'growth_cycle_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "growth_cycle" */
export type GrowthCycleStddevOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type GrowthCycleStddevPopFields = {
  __typename?: 'growth_cycle_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "growth_cycle" */
export type GrowthCycleStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type GrowthCycleStddevSampFields = {
  __typename?: 'growth_cycle_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "growth_cycle" */
export type GrowthCycleStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type GrowthCycleSumFields = {
  __typename?: 'growth_cycle_sum_fields';
  id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "growth_cycle" */
export type GrowthCycleSumOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** update columns of table "growth_cycle" */
export enum GrowthCycleUpdateColumn {
  /** column name */
  end_time = 'end_time',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  start_time = 'start_time',
  /** column name */
  zone_id = 'zone_id',
}

/** aggregate var_pop on columns */
export type GrowthCycleVarPopFields = {
  __typename?: 'growth_cycle_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "growth_cycle" */
export type GrowthCycleVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type GrowthCycleVarSampFields = {
  __typename?: 'growth_cycle_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "growth_cycle" */
export type GrowthCycleVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type GrowthCycleVarianceFields = {
  __typename?: 'growth_cycle_variance_fields';
  id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "growth_cycle" */
export type GrowthCycleVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** columns and relationships of "heat_map" */
export type HeatMap = {
  __typename?: 'heat_map';
  data: Scalars['jsonb'];
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  /** An object relationship */
  lambda_run: LambdaRun;
  lambda_run_id: Scalars['Int'];
  /** An object relationship */
  measurement_run: MeasurementRun;
  measurement_run_id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  type_id: Scalars['Int'];
};

/** columns and relationships of "heat_map" */
export type HeatMapDataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "heat_map" */
export type HeatMapMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "heat_map" */
export type HeatMapAggregate = {
  __typename?: 'heat_map_aggregate';
  aggregate?: Maybe<HeatMapAggregateFields>;
  nodes: Array<HeatMap>;
};

/** aggregate fields of "heat_map" */
export type HeatMapAggregateFields = {
  __typename?: 'heat_map_aggregate_fields';
  avg?: Maybe<HeatMapAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<HeatMapMaxFields>;
  min?: Maybe<HeatMapMinFields>;
  stddev?: Maybe<HeatMapStddevFields>;
  stddev_pop?: Maybe<HeatMapStddevPopFields>;
  stddev_samp?: Maybe<HeatMapStddevSampFields>;
  sum?: Maybe<HeatMapSumFields>;
  var_pop?: Maybe<HeatMapVarPopFields>;
  var_samp?: Maybe<HeatMapVarSampFields>;
  variance?: Maybe<HeatMapVarianceFields>;
};

/** aggregate fields of "heat_map" */
export type HeatMapAggregateFieldsCountArgs = {
  columns?: Maybe<Array<HeatMapSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "heat_map" */
export type HeatMapAggregateOrderBy = {
  avg?: Maybe<HeatMapAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<HeatMapMaxOrderBy>;
  min?: Maybe<HeatMapMinOrderBy>;
  stddev?: Maybe<HeatMapStddevOrderBy>;
  stddev_pop?: Maybe<HeatMapStddevPopOrderBy>;
  stddev_samp?: Maybe<HeatMapStddevSampOrderBy>;
  sum?: Maybe<HeatMapSumOrderBy>;
  var_pop?: Maybe<HeatMapVarPopOrderBy>;
  var_samp?: Maybe<HeatMapVarSampOrderBy>;
  variance?: Maybe<HeatMapVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type HeatMapAppendInput = {
  data?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "heat_map" */
export type HeatMapArrRelInsertInput = {
  data: Array<HeatMapInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<HeatMapOnConflict>;
};

/** aggregate avg on columns */
export type HeatMapAvgFields = {
  __typename?: 'heat_map_avg_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "heat_map" */
export type HeatMapAvgOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "heat_map". All fields are combined with a logical 'AND'. */
export type HeatMapBoolExp = {
  _and?: Maybe<Array<HeatMapBoolExp>>;
  _not?: Maybe<HeatMapBoolExp>;
  _or?: Maybe<Array<HeatMapBoolExp>>;
  data?: Maybe<JsonbComparisonExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  lambda_run?: Maybe<LambdaRunBoolExp>;
  lambda_run_id?: Maybe<IntComparisonExp>;
  measurement_run?: Maybe<MeasurementRunBoolExp>;
  measurement_run_id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  type_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "heat_map" */
export enum HeatMapConstraint {
  /** unique or primary key constraint */
  heat_map_pkey = 'heat_map_pkey',
  /** unique or primary key constraint */
  heat_map_un = 'heat_map_un',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type HeatMapDeleteAtPathInput = {
  data?: Maybe<Array<Scalars['String']>>;
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type HeatMapDeleteElemInput = {
  data?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type HeatMapDeleteKeyInput = {
  data?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "heat_map" */
export type HeatMapIncInput = {
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "heat_map" */
export type HeatMapInsertInput = {
  data?: Maybe<Scalars['jsonb']>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  lambda_run?: Maybe<LambdaRunObjRelInsertInput>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run?: Maybe<MeasurementRunObjRelInsertInput>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type HeatMapMaxFields = {
  __typename?: 'heat_map_max_fields';
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "heat_map" */
export type HeatMapMaxOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type HeatMapMinFields = {
  __typename?: 'heat_map_min_fields';
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "heat_map" */
export type HeatMapMinOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "heat_map" */
export type HeatMapMutationResponse = {
  __typename?: 'heat_map_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<HeatMap>;
};

/** on conflict condition type for table "heat_map" */
export type HeatMapOnConflict = {
  constraint: HeatMapConstraint;
  update_columns?: Array<HeatMapUpdateColumn>;
  where?: Maybe<HeatMapBoolExp>;
};

/** Ordering options when selecting data from "heat_map". */
export type HeatMapOrderBy = {
  data?: Maybe<OrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  lambda_run?: Maybe<LambdaRunOrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run?: Maybe<MeasurementRunOrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: heat_map */
export type HeatMapPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type HeatMapPrependInput = {
  data?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "heat_map" */
export enum HeatMapSelectColumn {
  /** column name */
  data = 'data',
  /** column name */
  id = 'id',
  /** column name */
  lambda_run_id = 'lambda_run_id',
  /** column name */
  measurement_run_id = 'measurement_run_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  type_id = 'type_id',
}

/** input type for updating data in table "heat_map" */
export type HeatMapSetInput = {
  data?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type HeatMapStddevFields = {
  __typename?: 'heat_map_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "heat_map" */
export type HeatMapStddevOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type HeatMapStddevPopFields = {
  __typename?: 'heat_map_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "heat_map" */
export type HeatMapStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type HeatMapStddevSampFields = {
  __typename?: 'heat_map_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "heat_map" */
export type HeatMapStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type HeatMapSumFields = {
  __typename?: 'heat_map_sum_fields';
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "heat_map" */
export type HeatMapSumOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** update columns of table "heat_map" */
export enum HeatMapUpdateColumn {
  /** column name */
  data = 'data',
  /** column name */
  id = 'id',
  /** column name */
  lambda_run_id = 'lambda_run_id',
  /** column name */
  measurement_run_id = 'measurement_run_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  type_id = 'type_id',
}

/** aggregate var_pop on columns */
export type HeatMapVarPopFields = {
  __typename?: 'heat_map_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "heat_map" */
export type HeatMapVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type HeatMapVarSampFields = {
  __typename?: 'heat_map_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "heat_map" */
export type HeatMapVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type HeatMapVarianceFields = {
  __typename?: 'heat_map_variance_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "heat_map" */
export type HeatMapVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  /** is the column contained in the given json value */
  _contained_in?: Maybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: Maybe<Scalars['jsonb']>;
  _eq?: Maybe<Scalars['jsonb']>;
  _gt?: Maybe<Scalars['jsonb']>;
  _gte?: Maybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: Maybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: Maybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: Maybe<Array<Scalars['String']>>;
  _in?: Maybe<Array<Scalars['jsonb']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['jsonb']>;
  _lte?: Maybe<Scalars['jsonb']>;
  _neq?: Maybe<Scalars['jsonb']>;
  _nin?: Maybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "label_task" */
export type LabelTask = {
  __typename?: 'label_task';
  create_time: Scalars['timestamptz'];
  /** An object relationship */
  detection: Detection;
  detection_id: Scalars['Int'];
  /** An object relationship */
  enumeration?: Maybe<Enumeration>;
  /** An object relationship */
  enumerationByPriorityId?: Maybe<Enumeration>;
  /** An object relationship */
  enumerationByStatusId?: Maybe<Enumeration>;
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  minimum_expertise_id?: Maybe<Scalars['Int']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  priority_id?: Maybe<Scalars['Int']>;
  status_id?: Maybe<Scalars['Int']>;
};

/** columns and relationships of "label_task" */
export type LabelTaskMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "label_task" */
export type LabelTaskAggregate = {
  __typename?: 'label_task_aggregate';
  aggregate?: Maybe<LabelTaskAggregateFields>;
  nodes: Array<LabelTask>;
};

/** aggregate fields of "label_task" */
export type LabelTaskAggregateFields = {
  __typename?: 'label_task_aggregate_fields';
  avg?: Maybe<LabelTaskAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<LabelTaskMaxFields>;
  min?: Maybe<LabelTaskMinFields>;
  stddev?: Maybe<LabelTaskStddevFields>;
  stddev_pop?: Maybe<LabelTaskStddevPopFields>;
  stddev_samp?: Maybe<LabelTaskStddevSampFields>;
  sum?: Maybe<LabelTaskSumFields>;
  var_pop?: Maybe<LabelTaskVarPopFields>;
  var_samp?: Maybe<LabelTaskVarSampFields>;
  variance?: Maybe<LabelTaskVarianceFields>;
};

/** aggregate fields of "label_task" */
export type LabelTaskAggregateFieldsCountArgs = {
  columns?: Maybe<Array<LabelTaskSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "label_task" */
export type LabelTaskAggregateOrderBy = {
  avg?: Maybe<LabelTaskAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<LabelTaskMaxOrderBy>;
  min?: Maybe<LabelTaskMinOrderBy>;
  stddev?: Maybe<LabelTaskStddevOrderBy>;
  stddev_pop?: Maybe<LabelTaskStddevPopOrderBy>;
  stddev_samp?: Maybe<LabelTaskStddevSampOrderBy>;
  sum?: Maybe<LabelTaskSumOrderBy>;
  var_pop?: Maybe<LabelTaskVarPopOrderBy>;
  var_samp?: Maybe<LabelTaskVarSampOrderBy>;
  variance?: Maybe<LabelTaskVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type LabelTaskAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "label_task" */
export type LabelTaskArrRelInsertInput = {
  data: Array<LabelTaskInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<LabelTaskOnConflict>;
};

/** aggregate avg on columns */
export type LabelTaskAvgFields = {
  __typename?: 'label_task_avg_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  minimum_expertise_id?: Maybe<Scalars['Float']>;
  priority_id?: Maybe<Scalars['Float']>;
  status_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "label_task" */
export type LabelTaskAvgOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "label_task". All fields are combined with a logical 'AND'. */
export type LabelTaskBoolExp = {
  _and?: Maybe<Array<LabelTaskBoolExp>>;
  _not?: Maybe<LabelTaskBoolExp>;
  _or?: Maybe<Array<LabelTaskBoolExp>>;
  create_time?: Maybe<TimestamptzComparisonExp>;
  detection?: Maybe<DetectionBoolExp>;
  detection_id?: Maybe<IntComparisonExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  enumerationByPriorityId?: Maybe<EnumerationBoolExp>;
  enumerationByStatusId?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  minimum_expertise_id?: Maybe<IntComparisonExp>;
  modified_time?: Maybe<TimestamptzComparisonExp>;
  priority_id?: Maybe<IntComparisonExp>;
  status_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "label_task" */
export enum LabelTaskConstraint {
  /** unique or primary key constraint */
  label_task_pkey = 'label_task_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type LabelTaskDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type LabelTaskDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type LabelTaskDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "label_task" */
export type LabelTaskIncInput = {
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  minimum_expertise_id?: Maybe<Scalars['Int']>;
  priority_id?: Maybe<Scalars['Int']>;
  status_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "label_task" */
export type LabelTaskInsertInput = {
  create_time?: Maybe<Scalars['timestamptz']>;
  detection?: Maybe<DetectionObjRelInsertInput>;
  detection_id?: Maybe<Scalars['Int']>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  enumerationByPriorityId?: Maybe<EnumerationObjRelInsertInput>;
  enumerationByStatusId?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  minimum_expertise_id?: Maybe<Scalars['Int']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  priority_id?: Maybe<Scalars['Int']>;
  status_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type LabelTaskMaxFields = {
  __typename?: 'label_task_max_fields';
  create_time?: Maybe<Scalars['timestamptz']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  minimum_expertise_id?: Maybe<Scalars['Int']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  priority_id?: Maybe<Scalars['Int']>;
  status_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "label_task" */
export type LabelTaskMaxOrderBy = {
  create_time?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  modified_time?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type LabelTaskMinFields = {
  __typename?: 'label_task_min_fields';
  create_time?: Maybe<Scalars['timestamptz']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  minimum_expertise_id?: Maybe<Scalars['Int']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  priority_id?: Maybe<Scalars['Int']>;
  status_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "label_task" */
export type LabelTaskMinOrderBy = {
  create_time?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  modified_time?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "label_task" */
export type LabelTaskMutationResponse = {
  __typename?: 'label_task_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LabelTask>;
};

/** on conflict condition type for table "label_task" */
export type LabelTaskOnConflict = {
  constraint: LabelTaskConstraint;
  update_columns?: Array<LabelTaskUpdateColumn>;
  where?: Maybe<LabelTaskBoolExp>;
};

/** Ordering options when selecting data from "label_task". */
export type LabelTaskOrderBy = {
  create_time?: Maybe<OrderBy>;
  detection?: Maybe<DetectionOrderBy>;
  detection_id?: Maybe<OrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  enumerationByPriorityId?: Maybe<EnumerationOrderBy>;
  enumerationByStatusId?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  modified_time?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: label_task */
export type LabelTaskPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type LabelTaskPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "label_task" */
export enum LabelTaskSelectColumn {
  /** column name */
  create_time = 'create_time',
  /** column name */
  detection_id = 'detection_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  minimum_expertise_id = 'minimum_expertise_id',
  /** column name */
  modified_time = 'modified_time',
  /** column name */
  priority_id = 'priority_id',
  /** column name */
  status_id = 'status_id',
}

/** input type for updating data in table "label_task" */
export type LabelTaskSetInput = {
  create_time?: Maybe<Scalars['timestamptz']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  minimum_expertise_id?: Maybe<Scalars['Int']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  priority_id?: Maybe<Scalars['Int']>;
  status_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type LabelTaskStddevFields = {
  __typename?: 'label_task_stddev_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  minimum_expertise_id?: Maybe<Scalars['Float']>;
  priority_id?: Maybe<Scalars['Float']>;
  status_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "label_task" */
export type LabelTaskStddevOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type LabelTaskStddevPopFields = {
  __typename?: 'label_task_stddev_pop_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  minimum_expertise_id?: Maybe<Scalars['Float']>;
  priority_id?: Maybe<Scalars['Float']>;
  status_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "label_task" */
export type LabelTaskStddevPopOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type LabelTaskStddevSampFields = {
  __typename?: 'label_task_stddev_samp_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  minimum_expertise_id?: Maybe<Scalars['Float']>;
  priority_id?: Maybe<Scalars['Float']>;
  status_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "label_task" */
export type LabelTaskStddevSampOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type LabelTaskSumFields = {
  __typename?: 'label_task_sum_fields';
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  minimum_expertise_id?: Maybe<Scalars['Int']>;
  priority_id?: Maybe<Scalars['Int']>;
  status_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "label_task" */
export type LabelTaskSumOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** update columns of table "label_task" */
export enum LabelTaskUpdateColumn {
  /** column name */
  create_time = 'create_time',
  /** column name */
  detection_id = 'detection_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  minimum_expertise_id = 'minimum_expertise_id',
  /** column name */
  modified_time = 'modified_time',
  /** column name */
  priority_id = 'priority_id',
  /** column name */
  status_id = 'status_id',
}

/** aggregate var_pop on columns */
export type LabelTaskVarPopFields = {
  __typename?: 'label_task_var_pop_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  minimum_expertise_id?: Maybe<Scalars['Float']>;
  priority_id?: Maybe<Scalars['Float']>;
  status_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "label_task" */
export type LabelTaskVarPopOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type LabelTaskVarSampFields = {
  __typename?: 'label_task_var_samp_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  minimum_expertise_id?: Maybe<Scalars['Float']>;
  priority_id?: Maybe<Scalars['Float']>;
  status_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "label_task" */
export type LabelTaskVarSampOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type LabelTaskVarianceFields = {
  __typename?: 'label_task_variance_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  minimum_expertise_id?: Maybe<Scalars['Float']>;
  priority_id?: Maybe<Scalars['Float']>;
  status_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "label_task" */
export type LabelTaskVarianceOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  minimum_expertise_id?: Maybe<OrderBy>;
  priority_id?: Maybe<OrderBy>;
  status_id?: Maybe<OrderBy>;
};

/** columns and relationships of "lambda_run" */
export type LambdaRun = {
  __typename?: 'lambda_run';
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  /** An array relationship */
  heat_maps: Array<HeatMap>;
  /** An aggregate relationship */
  heat_maps_aggregate: HeatMapAggregate;
  id: Scalars['Int'];
  /** An array relationship */
  lambda_run_measurement_runs: Array<LambdaRunMeasurementRun>;
  /** An aggregate relationship */
  lambda_run_measurement_runs_aggregate: LambdaRunMeasurementRunAggregate;
  /** An object relationship */
  lambda_version: LambdaVersion;
  lambda_version_id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  result_code?: Maybe<Scalars['Int']>;
  start_time: Scalars['timestamptz'];
};

/** columns and relationships of "lambda_run" */
export type LambdaRunHeatMapsArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

/** columns and relationships of "lambda_run" */
export type LambdaRunHeatMapsAggregateArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

/** columns and relationships of "lambda_run" */
export type LambdaRunLambdaRunMeasurementRunsArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

/** columns and relationships of "lambda_run" */
export type LambdaRunLambdaRunMeasurementRunsAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

/** columns and relationships of "lambda_run" */
export type LambdaRunMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "lambda_run" */
export type LambdaRunAggregate = {
  __typename?: 'lambda_run_aggregate';
  aggregate?: Maybe<LambdaRunAggregateFields>;
  nodes: Array<LambdaRun>;
};

/** aggregate fields of "lambda_run" */
export type LambdaRunAggregateFields = {
  __typename?: 'lambda_run_aggregate_fields';
  avg?: Maybe<LambdaRunAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<LambdaRunMaxFields>;
  min?: Maybe<LambdaRunMinFields>;
  stddev?: Maybe<LambdaRunStddevFields>;
  stddev_pop?: Maybe<LambdaRunStddevPopFields>;
  stddev_samp?: Maybe<LambdaRunStddevSampFields>;
  sum?: Maybe<LambdaRunSumFields>;
  var_pop?: Maybe<LambdaRunVarPopFields>;
  var_samp?: Maybe<LambdaRunVarSampFields>;
  variance?: Maybe<LambdaRunVarianceFields>;
};

/** aggregate fields of "lambda_run" */
export type LambdaRunAggregateFieldsCountArgs = {
  columns?: Maybe<Array<LambdaRunSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "lambda_run" */
export type LambdaRunAggregateOrderBy = {
  avg?: Maybe<LambdaRunAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<LambdaRunMaxOrderBy>;
  min?: Maybe<LambdaRunMinOrderBy>;
  stddev?: Maybe<LambdaRunStddevOrderBy>;
  stddev_pop?: Maybe<LambdaRunStddevPopOrderBy>;
  stddev_samp?: Maybe<LambdaRunStddevSampOrderBy>;
  sum?: Maybe<LambdaRunSumOrderBy>;
  var_pop?: Maybe<LambdaRunVarPopOrderBy>;
  var_samp?: Maybe<LambdaRunVarSampOrderBy>;
  variance?: Maybe<LambdaRunVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type LambdaRunAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "lambda_run" */
export type LambdaRunArrRelInsertInput = {
  data: Array<LambdaRunInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<LambdaRunOnConflict>;
};

/** aggregate avg on columns */
export type LambdaRunAvgFields = {
  __typename?: 'lambda_run_avg_fields';
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lambda_version_id?: Maybe<Scalars['Float']>;
  result_code?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "lambda_run" */
export type LambdaRunAvgOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "lambda_run". All fields are combined with a logical 'AND'. */
export type LambdaRunBoolExp = {
  _and?: Maybe<Array<LambdaRunBoolExp>>;
  _not?: Maybe<LambdaRunBoolExp>;
  _or?: Maybe<Array<LambdaRunBoolExp>>;
  duration_milliseconds?: Maybe<BigintComparisonExp>;
  heat_maps?: Maybe<HeatMapBoolExp>;
  id?: Maybe<IntComparisonExp>;
  lambda_run_measurement_runs?: Maybe<LambdaRunMeasurementRunBoolExp>;
  lambda_version?: Maybe<LambdaVersionBoolExp>;
  lambda_version_id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  result_code?: Maybe<IntComparisonExp>;
  start_time?: Maybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "lambda_run" */
export enum LambdaRunConstraint {
  /** unique or primary key constraint */
  lambda_run_pkey = 'lambda_run_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type LambdaRunDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type LambdaRunDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type LambdaRunDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "lambda_run" */
export type LambdaRunIncInput = {
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  lambda_version_id?: Maybe<Scalars['Int']>;
  result_code?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "lambda_run" */
export type LambdaRunInsertInput = {
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  heat_maps?: Maybe<HeatMapArrRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  lambda_run_measurement_runs?: Maybe<LambdaRunMeasurementRunArrRelInsertInput>;
  lambda_version?: Maybe<LambdaVersionObjRelInsertInput>;
  lambda_version_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  result_code?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type LambdaRunMaxFields = {
  __typename?: 'lambda_run_max_fields';
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  lambda_version_id?: Maybe<Scalars['Int']>;
  result_code?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "lambda_run" */
export type LambdaRunMaxOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
};

/** columns and relationships of "lambda_run_measurement_run" */
export type LambdaRunMeasurementRun = {
  __typename?: 'lambda_run_measurement_run';
  id: Scalars['Int'];
  /** An object relationship */
  lambda_run: LambdaRun;
  lambda_run_id: Scalars['Int'];
  /** An object relationship */
  measurement_run: MeasurementRun;
  measurement_run_id: Scalars['Int'];
};

/** aggregated selection of "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunAggregate = {
  __typename?: 'lambda_run_measurement_run_aggregate';
  aggregate?: Maybe<LambdaRunMeasurementRunAggregateFields>;
  nodes: Array<LambdaRunMeasurementRun>;
};

/** aggregate fields of "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunAggregateFields = {
  __typename?: 'lambda_run_measurement_run_aggregate_fields';
  avg?: Maybe<LambdaRunMeasurementRunAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<LambdaRunMeasurementRunMaxFields>;
  min?: Maybe<LambdaRunMeasurementRunMinFields>;
  stddev?: Maybe<LambdaRunMeasurementRunStddevFields>;
  stddev_pop?: Maybe<LambdaRunMeasurementRunStddevPopFields>;
  stddev_samp?: Maybe<LambdaRunMeasurementRunStddevSampFields>;
  sum?: Maybe<LambdaRunMeasurementRunSumFields>;
  var_pop?: Maybe<LambdaRunMeasurementRunVarPopFields>;
  var_samp?: Maybe<LambdaRunMeasurementRunVarSampFields>;
  variance?: Maybe<LambdaRunMeasurementRunVarianceFields>;
};

/** aggregate fields of "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunAggregateFieldsCountArgs = {
  columns?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunAggregateOrderBy = {
  avg?: Maybe<LambdaRunMeasurementRunAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<LambdaRunMeasurementRunMaxOrderBy>;
  min?: Maybe<LambdaRunMeasurementRunMinOrderBy>;
  stddev?: Maybe<LambdaRunMeasurementRunStddevOrderBy>;
  stddev_pop?: Maybe<LambdaRunMeasurementRunStddevPopOrderBy>;
  stddev_samp?: Maybe<LambdaRunMeasurementRunStddevSampOrderBy>;
  sum?: Maybe<LambdaRunMeasurementRunSumOrderBy>;
  var_pop?: Maybe<LambdaRunMeasurementRunVarPopOrderBy>;
  var_samp?: Maybe<LambdaRunMeasurementRunVarSampOrderBy>;
  variance?: Maybe<LambdaRunMeasurementRunVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunArrRelInsertInput = {
  data: Array<LambdaRunMeasurementRunInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<LambdaRunMeasurementRunOnConflict>;
};

/** aggregate avg on columns */
export type LambdaRunMeasurementRunAvgFields = {
  __typename?: 'lambda_run_measurement_run_avg_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunAvgOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "lambda_run_measurement_run". All fields are combined with a logical 'AND'. */
export type LambdaRunMeasurementRunBoolExp = {
  _and?: Maybe<Array<LambdaRunMeasurementRunBoolExp>>;
  _not?: Maybe<LambdaRunMeasurementRunBoolExp>;
  _or?: Maybe<Array<LambdaRunMeasurementRunBoolExp>>;
  id?: Maybe<IntComparisonExp>;
  lambda_run?: Maybe<LambdaRunBoolExp>;
  lambda_run_id?: Maybe<IntComparisonExp>;
  measurement_run?: Maybe<MeasurementRunBoolExp>;
  measurement_run_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "lambda_run_measurement_run" */
export enum LambdaRunMeasurementRunConstraint {
  /** unique or primary key constraint */
  lambda_run_measurement_run_pkey = 'lambda_run_measurement_run_pkey',
}

/** input type for incrementing numeric columns in table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunIncInput = {
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunInsertInput = {
  id?: Maybe<Scalars['Int']>;
  lambda_run?: Maybe<LambdaRunObjRelInsertInput>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run?: Maybe<MeasurementRunObjRelInsertInput>;
  measurement_run_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type LambdaRunMeasurementRunMaxFields = {
  __typename?: 'lambda_run_measurement_run_max_fields';
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunMaxOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type LambdaRunMeasurementRunMinFields = {
  __typename?: 'lambda_run_measurement_run_min_fields';
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunMinOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunMutationResponse = {
  __typename?: 'lambda_run_measurement_run_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LambdaRunMeasurementRun>;
};

/** on conflict condition type for table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunOnConflict = {
  constraint: LambdaRunMeasurementRunConstraint;
  update_columns?: Array<LambdaRunMeasurementRunUpdateColumn>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

/** Ordering options when selecting data from "lambda_run_measurement_run". */
export type LambdaRunMeasurementRunOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run?: Maybe<LambdaRunOrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run?: Maybe<MeasurementRunOrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: lambda_run_measurement_run */
export type LambdaRunMeasurementRunPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "lambda_run_measurement_run" */
export enum LambdaRunMeasurementRunSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  lambda_run_id = 'lambda_run_id',
  /** column name */
  measurement_run_id = 'measurement_run_id',
}

/** input type for updating data in table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunSetInput = {
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type LambdaRunMeasurementRunStddevFields = {
  __typename?: 'lambda_run_measurement_run_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunStddevOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type LambdaRunMeasurementRunStddevPopFields = {
  __typename?: 'lambda_run_measurement_run_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type LambdaRunMeasurementRunStddevSampFields = {
  __typename?: 'lambda_run_measurement_run_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type LambdaRunMeasurementRunSumFields = {
  __typename?: 'lambda_run_measurement_run_sum_fields';
  id?: Maybe<Scalars['Int']>;
  lambda_run_id?: Maybe<Scalars['Int']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunSumOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** update columns of table "lambda_run_measurement_run" */
export enum LambdaRunMeasurementRunUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  lambda_run_id = 'lambda_run_id',
  /** column name */
  measurement_run_id = 'measurement_run_id',
}

/** aggregate var_pop on columns */
export type LambdaRunMeasurementRunVarPopFields = {
  __typename?: 'lambda_run_measurement_run_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type LambdaRunMeasurementRunVarSampFields = {
  __typename?: 'lambda_run_measurement_run_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type LambdaRunMeasurementRunVarianceFields = {
  __typename?: 'lambda_run_measurement_run_variance_fields';
  id?: Maybe<Scalars['Float']>;
  lambda_run_id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "lambda_run_measurement_run" */
export type LambdaRunMeasurementRunVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_run_id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type LambdaRunMinFields = {
  __typename?: 'lambda_run_min_fields';
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  lambda_version_id?: Maybe<Scalars['Int']>;
  result_code?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "lambda_run" */
export type LambdaRunMinOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
};

/** response of any mutation on the table "lambda_run" */
export type LambdaRunMutationResponse = {
  __typename?: 'lambda_run_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LambdaRun>;
};

/** input type for inserting object relation for remote table "lambda_run" */
export type LambdaRunObjRelInsertInput = {
  data: LambdaRunInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<LambdaRunOnConflict>;
};

/** on conflict condition type for table "lambda_run" */
export type LambdaRunOnConflict = {
  constraint: LambdaRunConstraint;
  update_columns?: Array<LambdaRunUpdateColumn>;
  where?: Maybe<LambdaRunBoolExp>;
};

/** Ordering options when selecting data from "lambda_run". */
export type LambdaRunOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  heat_maps_aggregate?: Maybe<HeatMapAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  lambda_run_measurement_runs_aggregate?: Maybe<LambdaRunMeasurementRunAggregateOrderBy>;
  lambda_version?: Maybe<LambdaVersionOrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
};

/** primary key columns input for table: lambda_run */
export type LambdaRunPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type LambdaRunPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "lambda_run" */
export enum LambdaRunSelectColumn {
  /** column name */
  duration_milliseconds = 'duration_milliseconds',
  /** column name */
  id = 'id',
  /** column name */
  lambda_version_id = 'lambda_version_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  result_code = 'result_code',
  /** column name */
  start_time = 'start_time',
}

/** input type for updating data in table "lambda_run" */
export type LambdaRunSetInput = {
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  lambda_version_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  result_code?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type LambdaRunStddevFields = {
  __typename?: 'lambda_run_stddev_fields';
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lambda_version_id?: Maybe<Scalars['Float']>;
  result_code?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "lambda_run" */
export type LambdaRunStddevOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type LambdaRunStddevPopFields = {
  __typename?: 'lambda_run_stddev_pop_fields';
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lambda_version_id?: Maybe<Scalars['Float']>;
  result_code?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "lambda_run" */
export type LambdaRunStddevPopOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type LambdaRunStddevSampFields = {
  __typename?: 'lambda_run_stddev_samp_fields';
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lambda_version_id?: Maybe<Scalars['Float']>;
  result_code?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "lambda_run" */
export type LambdaRunStddevSampOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type LambdaRunSumFields = {
  __typename?: 'lambda_run_sum_fields';
  duration_milliseconds?: Maybe<Scalars['bigint']>;
  id?: Maybe<Scalars['Int']>;
  lambda_version_id?: Maybe<Scalars['Int']>;
  result_code?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "lambda_run" */
export type LambdaRunSumOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** update columns of table "lambda_run" */
export enum LambdaRunUpdateColumn {
  /** column name */
  duration_milliseconds = 'duration_milliseconds',
  /** column name */
  id = 'id',
  /** column name */
  lambda_version_id = 'lambda_version_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  result_code = 'result_code',
  /** column name */
  start_time = 'start_time',
}

/** aggregate var_pop on columns */
export type LambdaRunVarPopFields = {
  __typename?: 'lambda_run_var_pop_fields';
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lambda_version_id?: Maybe<Scalars['Float']>;
  result_code?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "lambda_run" */
export type LambdaRunVarPopOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type LambdaRunVarSampFields = {
  __typename?: 'lambda_run_var_samp_fields';
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lambda_version_id?: Maybe<Scalars['Float']>;
  result_code?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "lambda_run" */
export type LambdaRunVarSampOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type LambdaRunVarianceFields = {
  __typename?: 'lambda_run_variance_fields';
  duration_milliseconds?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  lambda_version_id?: Maybe<Scalars['Float']>;
  result_code?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "lambda_run" */
export type LambdaRunVarianceOrderBy = {
  duration_milliseconds?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  lambda_version_id?: Maybe<OrderBy>;
  result_code?: Maybe<OrderBy>;
};

/** columns and relationships of "lambda_version" */
export type LambdaVersion = {
  __typename?: 'lambda_version';
  id: Scalars['Int'];
  /** An array relationship */
  lambda_runs: Array<LambdaRun>;
  /** An aggregate relationship */
  lambda_runs_aggregate: LambdaRunAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  name: Scalars['String'];
  uid: Scalars['String'];
};

/** columns and relationships of "lambda_version" */
export type LambdaVersionLambdaRunsArgs = {
  distinct_on?: Maybe<Array<LambdaRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunOrderBy>>;
  where?: Maybe<LambdaRunBoolExp>;
};

/** columns and relationships of "lambda_version" */
export type LambdaVersionLambdaRunsAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunOrderBy>>;
  where?: Maybe<LambdaRunBoolExp>;
};

/** columns and relationships of "lambda_version" */
export type LambdaVersionMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "lambda_version" */
export type LambdaVersionAggregate = {
  __typename?: 'lambda_version_aggregate';
  aggregate?: Maybe<LambdaVersionAggregateFields>;
  nodes: Array<LambdaVersion>;
};

/** aggregate fields of "lambda_version" */
export type LambdaVersionAggregateFields = {
  __typename?: 'lambda_version_aggregate_fields';
  avg?: Maybe<LambdaVersionAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<LambdaVersionMaxFields>;
  min?: Maybe<LambdaVersionMinFields>;
  stddev?: Maybe<LambdaVersionStddevFields>;
  stddev_pop?: Maybe<LambdaVersionStddevPopFields>;
  stddev_samp?: Maybe<LambdaVersionStddevSampFields>;
  sum?: Maybe<LambdaVersionSumFields>;
  var_pop?: Maybe<LambdaVersionVarPopFields>;
  var_samp?: Maybe<LambdaVersionVarSampFields>;
  variance?: Maybe<LambdaVersionVarianceFields>;
};

/** aggregate fields of "lambda_version" */
export type LambdaVersionAggregateFieldsCountArgs = {
  columns?: Maybe<Array<LambdaVersionSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type LambdaVersionAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type LambdaVersionAvgFields = {
  __typename?: 'lambda_version_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "lambda_version". All fields are combined with a logical 'AND'. */
export type LambdaVersionBoolExp = {
  _and?: Maybe<Array<LambdaVersionBoolExp>>;
  _not?: Maybe<LambdaVersionBoolExp>;
  _or?: Maybe<Array<LambdaVersionBoolExp>>;
  id?: Maybe<IntComparisonExp>;
  lambda_runs?: Maybe<LambdaRunBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  uid?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "lambda_version" */
export enum LambdaVersionConstraint {
  /** unique or primary key constraint */
  lambda_version_pkey = 'lambda_version_pkey',
  /** unique or primary key constraint */
  name_uid_un = 'name_uid_un',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type LambdaVersionDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type LambdaVersionDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type LambdaVersionDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "lambda_version" */
export type LambdaVersionIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "lambda_version" */
export type LambdaVersionInsertInput = {
  id?: Maybe<Scalars['Int']>;
  lambda_runs?: Maybe<LambdaRunArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type LambdaVersionMaxFields = {
  __typename?: 'lambda_version_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type LambdaVersionMinFields = {
  __typename?: 'lambda_version_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "lambda_version" */
export type LambdaVersionMutationResponse = {
  __typename?: 'lambda_version_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<LambdaVersion>;
};

/** input type for inserting object relation for remote table "lambda_version" */
export type LambdaVersionObjRelInsertInput = {
  data: LambdaVersionInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<LambdaVersionOnConflict>;
};

/** on conflict condition type for table "lambda_version" */
export type LambdaVersionOnConflict = {
  constraint: LambdaVersionConstraint;
  update_columns?: Array<LambdaVersionUpdateColumn>;
  where?: Maybe<LambdaVersionBoolExp>;
};

/** Ordering options when selecting data from "lambda_version". */
export type LambdaVersionOrderBy = {
  id?: Maybe<OrderBy>;
  lambda_runs_aggregate?: Maybe<LambdaRunAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  uid?: Maybe<OrderBy>;
};

/** primary key columns input for table: lambda_version */
export type LambdaVersionPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type LambdaVersionPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "lambda_version" */
export enum LambdaVersionSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name = 'name',
  /** column name */
  uid = 'uid',
}

/** input type for updating data in table "lambda_version" */
export type LambdaVersionSetInput = {
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type LambdaVersionStddevFields = {
  __typename?: 'lambda_version_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type LambdaVersionStddevPopFields = {
  __typename?: 'lambda_version_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type LambdaVersionStddevSampFields = {
  __typename?: 'lambda_version_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type LambdaVersionSumFields = {
  __typename?: 'lambda_version_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "lambda_version" */
export enum LambdaVersionUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name = 'name',
  /** column name */
  uid = 'uid',
}

/** aggregate var_pop on columns */
export type LambdaVersionVarPopFields = {
  __typename?: 'lambda_version_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type LambdaVersionVarSampFields = {
  __typename?: 'lambda_version_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type LambdaVersionVarianceFields = {
  __typename?: 'lambda_version_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "location" */
export type Location = {
  __typename?: 'location';
  /** An object relationship */
  address: Address;
  address_id: Scalars['Int'];
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  name_id: Scalars['Int'];
  /** An object relationship */
  organization: Organization;
  organization_id: Scalars['Int'];
  timezone_offset_15min_increments: Scalars['smallint'];
  /** An array relationship */
  zones: Array<Zone>;
  /** An aggregate relationship */
  zones_aggregate: ZoneAggregate;
};

/** columns and relationships of "location" */
export type LocationMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "location" */
export type LocationZonesArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

/** columns and relationships of "location" */
export type LocationZonesAggregateArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

/** aggregated selection of "location" */
export type LocationAggregate = {
  __typename?: 'location_aggregate';
  aggregate?: Maybe<LocationAggregateFields>;
  nodes: Array<Location>;
};

/** aggregate fields of "location" */
export type LocationAggregateFields = {
  __typename?: 'location_aggregate_fields';
  avg?: Maybe<LocationAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<LocationMaxFields>;
  min?: Maybe<LocationMinFields>;
  stddev?: Maybe<LocationStddevFields>;
  stddev_pop?: Maybe<LocationStddevPopFields>;
  stddev_samp?: Maybe<LocationStddevSampFields>;
  sum?: Maybe<LocationSumFields>;
  var_pop?: Maybe<LocationVarPopFields>;
  var_samp?: Maybe<LocationVarSampFields>;
  variance?: Maybe<LocationVarianceFields>;
};

/** aggregate fields of "location" */
export type LocationAggregateFieldsCountArgs = {
  columns?: Maybe<Array<LocationSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "location" */
export type LocationAggregateOrderBy = {
  avg?: Maybe<LocationAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<LocationMaxOrderBy>;
  min?: Maybe<LocationMinOrderBy>;
  stddev?: Maybe<LocationStddevOrderBy>;
  stddev_pop?: Maybe<LocationStddevPopOrderBy>;
  stddev_samp?: Maybe<LocationStddevSampOrderBy>;
  sum?: Maybe<LocationSumOrderBy>;
  var_pop?: Maybe<LocationVarPopOrderBy>;
  var_samp?: Maybe<LocationVarSampOrderBy>;
  variance?: Maybe<LocationVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type LocationAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "location" */
export type LocationArrRelInsertInput = {
  data: Array<LocationInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<LocationOnConflict>;
};

/** aggregate avg on columns */
export type LocationAvgFields = {
  __typename?: 'location_avg_fields';
  address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  timezone_offset_15min_increments?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "location" */
export type LocationAvgOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "location". All fields are combined with a logical 'AND'. */
export type LocationBoolExp = {
  _and?: Maybe<Array<LocationBoolExp>>;
  _not?: Maybe<LocationBoolExp>;
  _or?: Maybe<Array<LocationBoolExp>>;
  address?: Maybe<AddressBoolExp>;
  address_id?: Maybe<IntComparisonExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  name_id?: Maybe<IntComparisonExp>;
  organization?: Maybe<OrganizationBoolExp>;
  organization_id?: Maybe<IntComparisonExp>;
  timezone_offset_15min_increments?: Maybe<SmallintComparisonExp>;
  zones?: Maybe<ZoneBoolExp>;
};

/** unique or primary key constraints on table "location" */
export enum LocationConstraint {
  /** unique or primary key constraint */
  location_pkey = 'location_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type LocationDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type LocationDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type LocationDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "location" */
export type LocationIncInput = {
  address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  timezone_offset_15min_increments?: Maybe<Scalars['smallint']>;
};

/** input type for inserting data into table "location" */
export type LocationInsertInput = {
  address?: Maybe<AddressObjRelInsertInput>;
  address_id?: Maybe<Scalars['Int']>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
  organization?: Maybe<OrganizationObjRelInsertInput>;
  organization_id?: Maybe<Scalars['Int']>;
  timezone_offset_15min_increments?: Maybe<Scalars['smallint']>;
  zones?: Maybe<ZoneArrRelInsertInput>;
};

/** aggregate max on columns */
export type LocationMaxFields = {
  __typename?: 'location_max_fields';
  address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  timezone_offset_15min_increments?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "location" */
export type LocationMaxOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type LocationMinFields = {
  __typename?: 'location_min_fields';
  address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  timezone_offset_15min_increments?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "location" */
export type LocationMinOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** response of any mutation on the table "location" */
export type LocationMutationResponse = {
  __typename?: 'location_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Location>;
};

/** input type for inserting object relation for remote table "location" */
export type LocationObjRelInsertInput = {
  data: LocationInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<LocationOnConflict>;
};

/** on conflict condition type for table "location" */
export type LocationOnConflict = {
  constraint: LocationConstraint;
  update_columns?: Array<LocationUpdateColumn>;
  where?: Maybe<LocationBoolExp>;
};

/** Ordering options when selecting data from "location". */
export type LocationOrderBy = {
  address?: Maybe<AddressOrderBy>;
  address_id?: Maybe<OrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization?: Maybe<OrganizationOrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
  zones_aggregate?: Maybe<ZoneAggregateOrderBy>;
};

/** primary key columns input for table: location */
export type LocationPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type LocationPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "location" */
export enum LocationSelectColumn {
  /** column name */
  address_id = 'address_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
  /** column name */
  organization_id = 'organization_id',
  /** column name */
  timezone_offset_15min_increments = 'timezone_offset_15min_increments',
}

/** input type for updating data in table "location" */
export type LocationSetInput = {
  address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  timezone_offset_15min_increments?: Maybe<Scalars['smallint']>;
};

/** aggregate stddev on columns */
export type LocationStddevFields = {
  __typename?: 'location_stddev_fields';
  address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  timezone_offset_15min_increments?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "location" */
export type LocationStddevOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type LocationStddevPopFields = {
  __typename?: 'location_stddev_pop_fields';
  address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  timezone_offset_15min_increments?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "location" */
export type LocationStddevPopOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type LocationStddevSampFields = {
  __typename?: 'location_stddev_samp_fields';
  address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  timezone_offset_15min_increments?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "location" */
export type LocationStddevSampOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type LocationSumFields = {
  __typename?: 'location_sum_fields';
  address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  timezone_offset_15min_increments?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "location" */
export type LocationSumOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** update columns of table "location" */
export enum LocationUpdateColumn {
  /** column name */
  address_id = 'address_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
  /** column name */
  organization_id = 'organization_id',
  /** column name */
  timezone_offset_15min_increments = 'timezone_offset_15min_increments',
}

/** aggregate var_pop on columns */
export type LocationVarPopFields = {
  __typename?: 'location_var_pop_fields';
  address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  timezone_offset_15min_increments?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "location" */
export type LocationVarPopOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type LocationVarSampFields = {
  __typename?: 'location_var_samp_fields';
  address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  timezone_offset_15min_increments?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "location" */
export type LocationVarSampOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type LocationVarianceFields = {
  __typename?: 'location_variance_fields';
  address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  timezone_offset_15min_increments?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "location" */
export type LocationVarianceOrderBy = {
  address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  timezone_offset_15min_increments?: Maybe<OrderBy>;
};

/** columns and relationships of "measurement" */
export type Measurement = {
  __typename?: 'measurement';
  data: Scalars['jsonb'];
  /** An array relationship */
  detection_runs: Array<DetectionRun>;
  /** An aggregate relationship */
  detection_runs_aggregate: DetectionRunAggregate;
  /** An object relationship */
  enumeration: Enumeration;
  /** An object relationship */
  enumerationByTypeId: Enumeration;
  id: Scalars['bigint'];
  /** An object relationship */
  measurement_run: MeasurementRun;
  measurement_run_id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  pose: Pose;
  pose_id: Scalars['Int'];
  sensor_model_id: Scalars['Int'];
  time: Scalars['timestamptz'];
  type_id: Scalars['Int'];
};

/** columns and relationships of "measurement" */
export type MeasurementDataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "measurement" */
export type MeasurementDetectionRunsArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

/** columns and relationships of "measurement" */
export type MeasurementDetectionRunsAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

/** columns and relationships of "measurement" */
export type MeasurementMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "measurement" */
export type MeasurementAggregate = {
  __typename?: 'measurement_aggregate';
  aggregate?: Maybe<MeasurementAggregateFields>;
  nodes: Array<Measurement>;
};

/** aggregate fields of "measurement" */
export type MeasurementAggregateFields = {
  __typename?: 'measurement_aggregate_fields';
  avg?: Maybe<MeasurementAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MeasurementMaxFields>;
  min?: Maybe<MeasurementMinFields>;
  stddev?: Maybe<MeasurementStddevFields>;
  stddev_pop?: Maybe<MeasurementStddevPopFields>;
  stddev_samp?: Maybe<MeasurementStddevSampFields>;
  sum?: Maybe<MeasurementSumFields>;
  var_pop?: Maybe<MeasurementVarPopFields>;
  var_samp?: Maybe<MeasurementVarSampFields>;
  variance?: Maybe<MeasurementVarianceFields>;
};

/** aggregate fields of "measurement" */
export type MeasurementAggregateFieldsCountArgs = {
  columns?: Maybe<Array<MeasurementSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "measurement" */
export type MeasurementAggregateOrderBy = {
  avg?: Maybe<MeasurementAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<MeasurementMaxOrderBy>;
  min?: Maybe<MeasurementMinOrderBy>;
  stddev?: Maybe<MeasurementStddevOrderBy>;
  stddev_pop?: Maybe<MeasurementStddevPopOrderBy>;
  stddev_samp?: Maybe<MeasurementStddevSampOrderBy>;
  sum?: Maybe<MeasurementSumOrderBy>;
  var_pop?: Maybe<MeasurementVarPopOrderBy>;
  var_samp?: Maybe<MeasurementVarSampOrderBy>;
  variance?: Maybe<MeasurementVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type MeasurementAppendInput = {
  data?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "measurement" */
export type MeasurementArrRelInsertInput = {
  data: Array<MeasurementInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<MeasurementOnConflict>;
};

/** aggregate avg on columns */
export type MeasurementAvgFields = {
  __typename?: 'measurement_avg_fields';
  id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  pose_id?: Maybe<Scalars['Float']>;
  sensor_model_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "measurement" */
export type MeasurementAvgOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "measurement". All fields are combined with a logical 'AND'. */
export type MeasurementBoolExp = {
  _and?: Maybe<Array<MeasurementBoolExp>>;
  _not?: Maybe<MeasurementBoolExp>;
  _or?: Maybe<Array<MeasurementBoolExp>>;
  data?: Maybe<JsonbComparisonExp>;
  detection_runs?: Maybe<DetectionRunBoolExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  enumerationByTypeId?: Maybe<EnumerationBoolExp>;
  id?: Maybe<BigintComparisonExp>;
  measurement_run?: Maybe<MeasurementRunBoolExp>;
  measurement_run_id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  pose?: Maybe<PoseBoolExp>;
  pose_id?: Maybe<IntComparisonExp>;
  sensor_model_id?: Maybe<IntComparisonExp>;
  time?: Maybe<TimestamptzComparisonExp>;
  type_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "measurement" */
export enum MeasurementConstraint {
  /** unique or primary key constraint */
  measurement_pkey = 'measurement_pkey',
  /** unique or primary key constraint */
  measurement_time_un = 'measurement_time_un',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type MeasurementDeleteAtPathInput = {
  data?: Maybe<Array<Scalars['String']>>;
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type MeasurementDeleteElemInput = {
  data?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type MeasurementDeleteKeyInput = {
  data?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "measurement" */
export type MeasurementIncInput = {
  id?: Maybe<Scalars['bigint']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  pose_id?: Maybe<Scalars['Int']>;
  sensor_model_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "measurement" */
export type MeasurementInsertInput = {
  data?: Maybe<Scalars['jsonb']>;
  detection_runs?: Maybe<DetectionRunArrRelInsertInput>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  enumerationByTypeId?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['bigint']>;
  measurement_run?: Maybe<MeasurementRunObjRelInsertInput>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  pose?: Maybe<PoseObjRelInsertInput>;
  pose_id?: Maybe<Scalars['Int']>;
  sensor_model_id?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['timestamptz']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type MeasurementMaxFields = {
  __typename?: 'measurement_max_fields';
  id?: Maybe<Scalars['bigint']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  pose_id?: Maybe<Scalars['Int']>;
  sensor_model_id?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['timestamptz']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "measurement" */
export type MeasurementMaxOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  time?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type MeasurementMinFields = {
  __typename?: 'measurement_min_fields';
  id?: Maybe<Scalars['bigint']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  pose_id?: Maybe<Scalars['Int']>;
  sensor_model_id?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['timestamptz']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "measurement" */
export type MeasurementMinOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  time?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "measurement" */
export type MeasurementMutationResponse = {
  __typename?: 'measurement_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Measurement>;
};

/** input type for inserting object relation for remote table "measurement" */
export type MeasurementObjRelInsertInput = {
  data: MeasurementInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<MeasurementOnConflict>;
};

/** on conflict condition type for table "measurement" */
export type MeasurementOnConflict = {
  constraint: MeasurementConstraint;
  update_columns?: Array<MeasurementUpdateColumn>;
  where?: Maybe<MeasurementBoolExp>;
};

/** Ordering options when selecting data from "measurement". */
export type MeasurementOrderBy = {
  data?: Maybe<OrderBy>;
  detection_runs_aggregate?: Maybe<DetectionRunAggregateOrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  enumerationByTypeId?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  measurement_run?: Maybe<MeasurementRunOrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  pose?: Maybe<PoseOrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  time?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: measurement */
export type MeasurementPkColumnsInput = {
  id: Scalars['bigint'];
  time: Scalars['timestamptz'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type MeasurementPrependInput = {
  data?: Maybe<Scalars['jsonb']>;
  metadata?: Maybe<Scalars['jsonb']>;
};

/** columns and relationships of "measurement_run" */
export type MeasurementRun = {
  __typename?: 'measurement_run';
  /** An object relationship */
  config: Config;
  config_id: Scalars['Int'];
  end_time?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  heat_maps: Array<HeatMap>;
  /** An aggregate relationship */
  heat_maps_aggregate: HeatMapAggregate;
  id: Scalars['Int'];
  /** An array relationship */
  lambda_run_measurement_runs: Array<LambdaRunMeasurementRun>;
  /** An aggregate relationship */
  lambda_run_measurement_runs_aggregate: LambdaRunMeasurementRunAggregate;
  /** An array relationship */
  measurements: Array<Measurement>;
  /** An aggregate relationship */
  measurements_aggregate: MeasurementAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  start_time: Scalars['timestamptz'];
  /** An object relationship */
  system: System;
  system_id: Scalars['Int'];
};

/** columns and relationships of "measurement_run" */
export type MeasurementRunHeatMapsArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

/** columns and relationships of "measurement_run" */
export type MeasurementRunHeatMapsAggregateArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

/** columns and relationships of "measurement_run" */
export type MeasurementRunLambdaRunMeasurementRunsArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

/** columns and relationships of "measurement_run" */
export type MeasurementRunLambdaRunMeasurementRunsAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

/** columns and relationships of "measurement_run" */
export type MeasurementRunMeasurementsArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** columns and relationships of "measurement_run" */
export type MeasurementRunMeasurementsAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** columns and relationships of "measurement_run" */
export type MeasurementRunMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "measurement_run" */
export type MeasurementRunAggregate = {
  __typename?: 'measurement_run_aggregate';
  aggregate?: Maybe<MeasurementRunAggregateFields>;
  nodes: Array<MeasurementRun>;
};

/** aggregate fields of "measurement_run" */
export type MeasurementRunAggregateFields = {
  __typename?: 'measurement_run_aggregate_fields';
  avg?: Maybe<MeasurementRunAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<MeasurementRunMaxFields>;
  min?: Maybe<MeasurementRunMinFields>;
  stddev?: Maybe<MeasurementRunStddevFields>;
  stddev_pop?: Maybe<MeasurementRunStddevPopFields>;
  stddev_samp?: Maybe<MeasurementRunStddevSampFields>;
  sum?: Maybe<MeasurementRunSumFields>;
  var_pop?: Maybe<MeasurementRunVarPopFields>;
  var_samp?: Maybe<MeasurementRunVarSampFields>;
  variance?: Maybe<MeasurementRunVarianceFields>;
};

/** aggregate fields of "measurement_run" */
export type MeasurementRunAggregateFieldsCountArgs = {
  columns?: Maybe<Array<MeasurementRunSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "measurement_run" */
export type MeasurementRunAggregateOrderBy = {
  avg?: Maybe<MeasurementRunAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<MeasurementRunMaxOrderBy>;
  min?: Maybe<MeasurementRunMinOrderBy>;
  stddev?: Maybe<MeasurementRunStddevOrderBy>;
  stddev_pop?: Maybe<MeasurementRunStddevPopOrderBy>;
  stddev_samp?: Maybe<MeasurementRunStddevSampOrderBy>;
  sum?: Maybe<MeasurementRunSumOrderBy>;
  var_pop?: Maybe<MeasurementRunVarPopOrderBy>;
  var_samp?: Maybe<MeasurementRunVarSampOrderBy>;
  variance?: Maybe<MeasurementRunVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type MeasurementRunAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "measurement_run" */
export type MeasurementRunArrRelInsertInput = {
  data: Array<MeasurementRunInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<MeasurementRunOnConflict>;
};

/** aggregate avg on columns */
export type MeasurementRunAvgFields = {
  __typename?: 'measurement_run_avg_fields';
  config_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "measurement_run" */
export type MeasurementRunAvgOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "measurement_run". All fields are combined with a logical 'AND'. */
export type MeasurementRunBoolExp = {
  _and?: Maybe<Array<MeasurementRunBoolExp>>;
  _not?: Maybe<MeasurementRunBoolExp>;
  _or?: Maybe<Array<MeasurementRunBoolExp>>;
  config?: Maybe<ConfigBoolExp>;
  config_id?: Maybe<IntComparisonExp>;
  end_time?: Maybe<TimestamptzComparisonExp>;
  heat_maps?: Maybe<HeatMapBoolExp>;
  id?: Maybe<IntComparisonExp>;
  lambda_run_measurement_runs?: Maybe<LambdaRunMeasurementRunBoolExp>;
  measurements?: Maybe<MeasurementBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  start_time?: Maybe<TimestamptzComparisonExp>;
  system?: Maybe<SystemBoolExp>;
  system_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "measurement_run" */
export enum MeasurementRunConstraint {
  /** unique or primary key constraint */
  measurement_run_pkey = 'measurement_run_pkey',
  /** unique or primary key constraint */
  measurement_run_un = 'measurement_run_un',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type MeasurementRunDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type MeasurementRunDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type MeasurementRunDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "measurement_run" */
export type MeasurementRunIncInput = {
  config_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "measurement_run" */
export type MeasurementRunInsertInput = {
  config?: Maybe<ConfigObjRelInsertInput>;
  config_id?: Maybe<Scalars['Int']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  heat_maps?: Maybe<HeatMapArrRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  lambda_run_measurement_runs?: Maybe<LambdaRunMeasurementRunArrRelInsertInput>;
  measurements?: Maybe<MeasurementArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  system?: Maybe<SystemObjRelInsertInput>;
  system_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type MeasurementRunMaxFields = {
  __typename?: 'measurement_run_max_fields';
  config_id?: Maybe<Scalars['Int']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "measurement_run" */
export type MeasurementRunMaxOrderBy = {
  config_id?: Maybe<OrderBy>;
  end_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type MeasurementRunMinFields = {
  __typename?: 'measurement_run_min_fields';
  config_id?: Maybe<Scalars['Int']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "measurement_run" */
export type MeasurementRunMinOrderBy = {
  config_id?: Maybe<OrderBy>;
  end_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "measurement_run" */
export type MeasurementRunMutationResponse = {
  __typename?: 'measurement_run_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<MeasurementRun>;
};

/** input type for inserting object relation for remote table "measurement_run" */
export type MeasurementRunObjRelInsertInput = {
  data: MeasurementRunInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<MeasurementRunOnConflict>;
};

/** on conflict condition type for table "measurement_run" */
export type MeasurementRunOnConflict = {
  constraint: MeasurementRunConstraint;
  update_columns?: Array<MeasurementRunUpdateColumn>;
  where?: Maybe<MeasurementRunBoolExp>;
};

/** Ordering options when selecting data from "measurement_run". */
export type MeasurementRunOrderBy = {
  config?: Maybe<ConfigOrderBy>;
  config_id?: Maybe<OrderBy>;
  end_time?: Maybe<OrderBy>;
  heat_maps_aggregate?: Maybe<HeatMapAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  lambda_run_measurement_runs_aggregate?: Maybe<LambdaRunMeasurementRunAggregateOrderBy>;
  measurements_aggregate?: Maybe<MeasurementAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  start_time?: Maybe<OrderBy>;
  system?: Maybe<SystemOrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: measurement_run */
export type MeasurementRunPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type MeasurementRunPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "measurement_run" */
export enum MeasurementRunSelectColumn {
  /** column name */
  config_id = 'config_id',
  /** column name */
  end_time = 'end_time',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  start_time = 'start_time',
  /** column name */
  system_id = 'system_id',
}

/** input type for updating data in table "measurement_run" */
export type MeasurementRunSetInput = {
  config_id?: Maybe<Scalars['Int']>;
  end_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  start_time?: Maybe<Scalars['timestamptz']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type MeasurementRunStddevFields = {
  __typename?: 'measurement_run_stddev_fields';
  config_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "measurement_run" */
export type MeasurementRunStddevOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type MeasurementRunStddevPopFields = {
  __typename?: 'measurement_run_stddev_pop_fields';
  config_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "measurement_run" */
export type MeasurementRunStddevPopOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type MeasurementRunStddevSampFields = {
  __typename?: 'measurement_run_stddev_samp_fields';
  config_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "measurement_run" */
export type MeasurementRunStddevSampOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type MeasurementRunSumFields = {
  __typename?: 'measurement_run_sum_fields';
  config_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "measurement_run" */
export type MeasurementRunSumOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** update columns of table "measurement_run" */
export enum MeasurementRunUpdateColumn {
  /** column name */
  config_id = 'config_id',
  /** column name */
  end_time = 'end_time',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  start_time = 'start_time',
  /** column name */
  system_id = 'system_id',
}

/** aggregate var_pop on columns */
export type MeasurementRunVarPopFields = {
  __typename?: 'measurement_run_var_pop_fields';
  config_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "measurement_run" */
export type MeasurementRunVarPopOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type MeasurementRunVarSampFields = {
  __typename?: 'measurement_run_var_samp_fields';
  config_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "measurement_run" */
export type MeasurementRunVarSampOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type MeasurementRunVarianceFields = {
  __typename?: 'measurement_run_variance_fields';
  config_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "measurement_run" */
export type MeasurementRunVarianceOrderBy = {
  config_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** select columns of table "measurement" */
export enum MeasurementSelectColumn {
  /** column name */
  data = 'data',
  /** column name */
  id = 'id',
  /** column name */
  measurement_run_id = 'measurement_run_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  pose_id = 'pose_id',
  /** column name */
  sensor_model_id = 'sensor_model_id',
  /** column name */
  time = 'time',
  /** column name */
  type_id = 'type_id',
}

/** input type for updating data in table "measurement" */
export type MeasurementSetInput = {
  data?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['bigint']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  pose_id?: Maybe<Scalars['Int']>;
  sensor_model_id?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['timestamptz']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type MeasurementStddevFields = {
  __typename?: 'measurement_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  pose_id?: Maybe<Scalars['Float']>;
  sensor_model_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "measurement" */
export type MeasurementStddevOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type MeasurementStddevPopFields = {
  __typename?: 'measurement_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  pose_id?: Maybe<Scalars['Float']>;
  sensor_model_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "measurement" */
export type MeasurementStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type MeasurementStddevSampFields = {
  __typename?: 'measurement_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  pose_id?: Maybe<Scalars['Float']>;
  sensor_model_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "measurement" */
export type MeasurementStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type MeasurementSumFields = {
  __typename?: 'measurement_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  measurement_run_id?: Maybe<Scalars['Int']>;
  pose_id?: Maybe<Scalars['Int']>;
  sensor_model_id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "measurement" */
export type MeasurementSumOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** update columns of table "measurement" */
export enum MeasurementUpdateColumn {
  /** column name */
  data = 'data',
  /** column name */
  id = 'id',
  /** column name */
  measurement_run_id = 'measurement_run_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  pose_id = 'pose_id',
  /** column name */
  sensor_model_id = 'sensor_model_id',
  /** column name */
  time = 'time',
  /** column name */
  type_id = 'type_id',
}

/** aggregate var_pop on columns */
export type MeasurementVarPopFields = {
  __typename?: 'measurement_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  pose_id?: Maybe<Scalars['Float']>;
  sensor_model_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "measurement" */
export type MeasurementVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type MeasurementVarSampFields = {
  __typename?: 'measurement_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  pose_id?: Maybe<Scalars['Float']>;
  sensor_model_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "measurement" */
export type MeasurementVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type MeasurementVarianceFields = {
  __typename?: 'measurement_variance_fields';
  id?: Maybe<Scalars['Float']>;
  measurement_run_id?: Maybe<Scalars['Float']>;
  pose_id?: Maybe<Scalars['Float']>;
  sensor_model_id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "measurement" */
export type MeasurementVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  measurement_run_id?: Maybe<OrderBy>;
  pose_id?: Maybe<OrderBy>;
  sensor_model_id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** mutation root */
export type MutationRoot = {
  __typename?: 'mutation_root';
  /** delete data from the table: "address" */
  delete_address?: Maybe<AddressMutationResponse>;
  /** delete single row from the table: "address" */
  delete_address_by_pk?: Maybe<Address>;
  /** delete data from the table: "classification" */
  delete_classification?: Maybe<ClassificationMutationResponse>;
  /** delete single row from the table: "classification" */
  delete_classification_by_pk?: Maybe<Classification>;
  /** delete data from the table: "compute" */
  delete_compute?: Maybe<ComputeMutationResponse>;
  /** delete single row from the table: "compute" */
  delete_compute_by_pk?: Maybe<Compute>;
  /** delete data from the table: "config" */
  delete_config?: Maybe<ConfigMutationResponse>;
  /** delete single row from the table: "config" */
  delete_config_by_pk?: Maybe<Config>;
  /** delete data from the table: "detection" */
  delete_detection?: Maybe<DetectionMutationResponse>;
  /** delete single row from the table: "detection" */
  delete_detection_by_pk?: Maybe<Detection>;
  /** delete data from the table: "detection_run" */
  delete_detection_run?: Maybe<DetectionRunMutationResponse>;
  /** delete single row from the table: "detection_run" */
  delete_detection_run_by_pk?: Maybe<DetectionRun>;
  /** delete data from the table: "detector" */
  delete_detector?: Maybe<DetectorMutationResponse>;
  /** delete single row from the table: "detector" */
  delete_detector_by_pk?: Maybe<Detector>;
  /** delete data from the table: "enumeration" */
  delete_enumeration?: Maybe<EnumerationMutationResponse>;
  /** delete single row from the table: "enumeration" */
  delete_enumeration_by_pk?: Maybe<Enumeration>;
  /** delete data from the table: "geometry_columns" */
  delete_geometry_columns?: Maybe<GeometryColumnsMutationResponse>;
  /** delete data from the table: "growth_cycle" */
  delete_growth_cycle?: Maybe<GrowthCycleMutationResponse>;
  /** delete single row from the table: "growth_cycle" */
  delete_growth_cycle_by_pk?: Maybe<GrowthCycle>;
  /** delete data from the table: "heat_map" */
  delete_heat_map?: Maybe<HeatMapMutationResponse>;
  /** delete single row from the table: "heat_map" */
  delete_heat_map_by_pk?: Maybe<HeatMap>;
  /** delete data from the table: "label_task" */
  delete_label_task?: Maybe<LabelTaskMutationResponse>;
  /** delete single row from the table: "label_task" */
  delete_label_task_by_pk?: Maybe<LabelTask>;
  /** delete data from the table: "lambda_run" */
  delete_lambda_run?: Maybe<LambdaRunMutationResponse>;
  /** delete single row from the table: "lambda_run" */
  delete_lambda_run_by_pk?: Maybe<LambdaRun>;
  /** delete data from the table: "lambda_run_measurement_run" */
  delete_lambda_run_measurement_run?: Maybe<LambdaRunMeasurementRunMutationResponse>;
  /** delete single row from the table: "lambda_run_measurement_run" */
  delete_lambda_run_measurement_run_by_pk?: Maybe<LambdaRunMeasurementRun>;
  /** delete data from the table: "lambda_version" */
  delete_lambda_version?: Maybe<LambdaVersionMutationResponse>;
  /** delete single row from the table: "lambda_version" */
  delete_lambda_version_by_pk?: Maybe<LambdaVersion>;
  /** delete data from the table: "location" */
  delete_location?: Maybe<LocationMutationResponse>;
  /** delete single row from the table: "location" */
  delete_location_by_pk?: Maybe<Location>;
  /** delete data from the table: "measurement" */
  delete_measurement?: Maybe<MeasurementMutationResponse>;
  /** delete single row from the table: "measurement" */
  delete_measurement_by_pk?: Maybe<Measurement>;
  /** delete data from the table: "measurement_run" */
  delete_measurement_run?: Maybe<MeasurementRunMutationResponse>;
  /** delete single row from the table: "measurement_run" */
  delete_measurement_run_by_pk?: Maybe<MeasurementRun>;
  /** delete data from the table: "organization" */
  delete_organization?: Maybe<OrganizationMutationResponse>;
  /** delete single row from the table: "organization" */
  delete_organization_by_pk?: Maybe<Organization>;
  /** delete data from the table: "parameters" */
  delete_parameters?: Maybe<ParametersMutationResponse>;
  /** delete single row from the table: "parameters" */
  delete_parameters_by_pk?: Maybe<Parameters>;
  /** delete data from the table: "pose" */
  delete_pose?: Maybe<PoseMutationResponse>;
  /** delete single row from the table: "pose" */
  delete_pose_by_pk?: Maybe<Pose>;
  /** delete data from the table: "spatial_ref_sys" */
  delete_spatial_ref_sys?: Maybe<SpatialRefSysMutationResponse>;
  /** delete single row from the table: "spatial_ref_sys" */
  delete_spatial_ref_sys_by_pk?: Maybe<SpatialRefSys>;
  /** delete data from the table: "system" */
  delete_system?: Maybe<SystemMutationResponse>;
  /** delete single row from the table: "system" */
  delete_system_by_pk?: Maybe<System>;
  /** delete data from the table: "track" */
  delete_track?: Maybe<TrackMutationResponse>;
  /** delete single row from the table: "track" */
  delete_track_by_pk?: Maybe<Track>;
  /** delete data from the table: "track_detections" */
  delete_track_detections?: Maybe<TrackDetectionsMutationResponse>;
  /** delete single row from the table: "track_detections" */
  delete_track_detections_by_pk?: Maybe<TrackDetections>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<UserMutationResponse>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "user_label" */
  delete_user_label?: Maybe<UserLabelMutationResponse>;
  /** delete single row from the table: "user_label" */
  delete_user_label_by_pk?: Maybe<UserLabel>;
  /** delete data from the table: "version" */
  delete_version?: Maybe<VersionMutationResponse>;
  /** delete single row from the table: "version" */
  delete_version_by_pk?: Maybe<Version>;
  /** delete data from the table: "zone" */
  delete_zone?: Maybe<ZoneMutationResponse>;
  /** delete single row from the table: "zone" */
  delete_zone_by_pk?: Maybe<Zone>;
  /** insert data into the table: "address" */
  insert_address?: Maybe<AddressMutationResponse>;
  /** insert a single row into the table: "address" */
  insert_address_one?: Maybe<Address>;
  /** insert data into the table: "classification" */
  insert_classification?: Maybe<ClassificationMutationResponse>;
  /** insert a single row into the table: "classification" */
  insert_classification_one?: Maybe<Classification>;
  /** insert data into the table: "compute" */
  insert_compute?: Maybe<ComputeMutationResponse>;
  /** insert a single row into the table: "compute" */
  insert_compute_one?: Maybe<Compute>;
  /** insert data into the table: "config" */
  insert_config?: Maybe<ConfigMutationResponse>;
  /** insert a single row into the table: "config" */
  insert_config_one?: Maybe<Config>;
  /** insert data into the table: "detection" */
  insert_detection?: Maybe<DetectionMutationResponse>;
  /** insert a single row into the table: "detection" */
  insert_detection_one?: Maybe<Detection>;
  /** insert data into the table: "detection_run" */
  insert_detection_run?: Maybe<DetectionRunMutationResponse>;
  /** insert a single row into the table: "detection_run" */
  insert_detection_run_one?: Maybe<DetectionRun>;
  /** insert data into the table: "detector" */
  insert_detector?: Maybe<DetectorMutationResponse>;
  /** insert a single row into the table: "detector" */
  insert_detector_one?: Maybe<Detector>;
  /** insert data into the table: "enumeration" */
  insert_enumeration?: Maybe<EnumerationMutationResponse>;
  /** insert a single row into the table: "enumeration" */
  insert_enumeration_one?: Maybe<Enumeration>;
  /** insert data into the table: "geometry_columns" */
  insert_geometry_columns?: Maybe<GeometryColumnsMutationResponse>;
  /** insert a single row into the table: "geometry_columns" */
  insert_geometry_columns_one?: Maybe<GeometryColumns>;
  /** insert data into the table: "growth_cycle" */
  insert_growth_cycle?: Maybe<GrowthCycleMutationResponse>;
  /** insert a single row into the table: "growth_cycle" */
  insert_growth_cycle_one?: Maybe<GrowthCycle>;
  /** insert data into the table: "heat_map" */
  insert_heat_map?: Maybe<HeatMapMutationResponse>;
  /** insert a single row into the table: "heat_map" */
  insert_heat_map_one?: Maybe<HeatMap>;
  /** insert data into the table: "label_task" */
  insert_label_task?: Maybe<LabelTaskMutationResponse>;
  /** insert a single row into the table: "label_task" */
  insert_label_task_one?: Maybe<LabelTask>;
  /** insert data into the table: "lambda_run" */
  insert_lambda_run?: Maybe<LambdaRunMutationResponse>;
  /** insert data into the table: "lambda_run_measurement_run" */
  insert_lambda_run_measurement_run?: Maybe<LambdaRunMeasurementRunMutationResponse>;
  /** insert a single row into the table: "lambda_run_measurement_run" */
  insert_lambda_run_measurement_run_one?: Maybe<LambdaRunMeasurementRun>;
  /** insert a single row into the table: "lambda_run" */
  insert_lambda_run_one?: Maybe<LambdaRun>;
  /** insert data into the table: "lambda_version" */
  insert_lambda_version?: Maybe<LambdaVersionMutationResponse>;
  /** insert a single row into the table: "lambda_version" */
  insert_lambda_version_one?: Maybe<LambdaVersion>;
  /** insert data into the table: "location" */
  insert_location?: Maybe<LocationMutationResponse>;
  /** insert a single row into the table: "location" */
  insert_location_one?: Maybe<Location>;
  /** insert data into the table: "measurement" */
  insert_measurement?: Maybe<MeasurementMutationResponse>;
  /** insert a single row into the table: "measurement" */
  insert_measurement_one?: Maybe<Measurement>;
  /** insert data into the table: "measurement_run" */
  insert_measurement_run?: Maybe<MeasurementRunMutationResponse>;
  /** insert a single row into the table: "measurement_run" */
  insert_measurement_run_one?: Maybe<MeasurementRun>;
  /** insert data into the table: "organization" */
  insert_organization?: Maybe<OrganizationMutationResponse>;
  /** insert a single row into the table: "organization" */
  insert_organization_one?: Maybe<Organization>;
  /** insert data into the table: "parameters" */
  insert_parameters?: Maybe<ParametersMutationResponse>;
  /** insert a single row into the table: "parameters" */
  insert_parameters_one?: Maybe<Parameters>;
  /** insert data into the table: "pose" */
  insert_pose?: Maybe<PoseMutationResponse>;
  /** insert a single row into the table: "pose" */
  insert_pose_one?: Maybe<Pose>;
  /** insert data into the table: "spatial_ref_sys" */
  insert_spatial_ref_sys?: Maybe<SpatialRefSysMutationResponse>;
  /** insert a single row into the table: "spatial_ref_sys" */
  insert_spatial_ref_sys_one?: Maybe<SpatialRefSys>;
  /** insert data into the table: "system" */
  insert_system?: Maybe<SystemMutationResponse>;
  /** insert a single row into the table: "system" */
  insert_system_one?: Maybe<System>;
  /** insert data into the table: "track" */
  insert_track?: Maybe<TrackMutationResponse>;
  /** insert data into the table: "track_detections" */
  insert_track_detections?: Maybe<TrackDetectionsMutationResponse>;
  /** insert a single row into the table: "track_detections" */
  insert_track_detections_one?: Maybe<TrackDetections>;
  /** insert a single row into the table: "track" */
  insert_track_one?: Maybe<Track>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<UserMutationResponse>;
  /** insert data into the table: "user_label" */
  insert_user_label?: Maybe<UserLabelMutationResponse>;
  /** insert a single row into the table: "user_label" */
  insert_user_label_one?: Maybe<UserLabel>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "version" */
  insert_version?: Maybe<VersionMutationResponse>;
  /** insert a single row into the table: "version" */
  insert_version_one?: Maybe<Version>;
  /** insert data into the table: "zone" */
  insert_zone?: Maybe<ZoneMutationResponse>;
  /** insert a single row into the table: "zone" */
  insert_zone_one?: Maybe<Zone>;
  /** update data of the table: "address" */
  update_address?: Maybe<AddressMutationResponse>;
  /** update single row of the table: "address" */
  update_address_by_pk?: Maybe<Address>;
  /** update data of the table: "classification" */
  update_classification?: Maybe<ClassificationMutationResponse>;
  /** update single row of the table: "classification" */
  update_classification_by_pk?: Maybe<Classification>;
  /** update data of the table: "compute" */
  update_compute?: Maybe<ComputeMutationResponse>;
  /** update single row of the table: "compute" */
  update_compute_by_pk?: Maybe<Compute>;
  /** update data of the table: "config" */
  update_config?: Maybe<ConfigMutationResponse>;
  /** update single row of the table: "config" */
  update_config_by_pk?: Maybe<Config>;
  /** update data of the table: "detection" */
  update_detection?: Maybe<DetectionMutationResponse>;
  /** update single row of the table: "detection" */
  update_detection_by_pk?: Maybe<Detection>;
  /** update data of the table: "detection_run" */
  update_detection_run?: Maybe<DetectionRunMutationResponse>;
  /** update single row of the table: "detection_run" */
  update_detection_run_by_pk?: Maybe<DetectionRun>;
  /** update data of the table: "detector" */
  update_detector?: Maybe<DetectorMutationResponse>;
  /** update single row of the table: "detector" */
  update_detector_by_pk?: Maybe<Detector>;
  /** update data of the table: "enumeration" */
  update_enumeration?: Maybe<EnumerationMutationResponse>;
  /** update single row of the table: "enumeration" */
  update_enumeration_by_pk?: Maybe<Enumeration>;
  /** update data of the table: "geometry_columns" */
  update_geometry_columns?: Maybe<GeometryColumnsMutationResponse>;
  /** update data of the table: "growth_cycle" */
  update_growth_cycle?: Maybe<GrowthCycleMutationResponse>;
  /** update single row of the table: "growth_cycle" */
  update_growth_cycle_by_pk?: Maybe<GrowthCycle>;
  /** update data of the table: "heat_map" */
  update_heat_map?: Maybe<HeatMapMutationResponse>;
  /** update single row of the table: "heat_map" */
  update_heat_map_by_pk?: Maybe<HeatMap>;
  /** update data of the table: "label_task" */
  update_label_task?: Maybe<LabelTaskMutationResponse>;
  /** update single row of the table: "label_task" */
  update_label_task_by_pk?: Maybe<LabelTask>;
  /** update data of the table: "lambda_run" */
  update_lambda_run?: Maybe<LambdaRunMutationResponse>;
  /** update single row of the table: "lambda_run" */
  update_lambda_run_by_pk?: Maybe<LambdaRun>;
  /** update data of the table: "lambda_run_measurement_run" */
  update_lambda_run_measurement_run?: Maybe<LambdaRunMeasurementRunMutationResponse>;
  /** update single row of the table: "lambda_run_measurement_run" */
  update_lambda_run_measurement_run_by_pk?: Maybe<LambdaRunMeasurementRun>;
  /** update data of the table: "lambda_version" */
  update_lambda_version?: Maybe<LambdaVersionMutationResponse>;
  /** update single row of the table: "lambda_version" */
  update_lambda_version_by_pk?: Maybe<LambdaVersion>;
  /** update data of the table: "location" */
  update_location?: Maybe<LocationMutationResponse>;
  /** update single row of the table: "location" */
  update_location_by_pk?: Maybe<Location>;
  /** update data of the table: "measurement" */
  update_measurement?: Maybe<MeasurementMutationResponse>;
  /** update single row of the table: "measurement" */
  update_measurement_by_pk?: Maybe<Measurement>;
  /** update data of the table: "measurement_run" */
  update_measurement_run?: Maybe<MeasurementRunMutationResponse>;
  /** update single row of the table: "measurement_run" */
  update_measurement_run_by_pk?: Maybe<MeasurementRun>;
  /** update data of the table: "organization" */
  update_organization?: Maybe<OrganizationMutationResponse>;
  /** update single row of the table: "organization" */
  update_organization_by_pk?: Maybe<Organization>;
  /** update data of the table: "parameters" */
  update_parameters?: Maybe<ParametersMutationResponse>;
  /** update single row of the table: "parameters" */
  update_parameters_by_pk?: Maybe<Parameters>;
  /** update data of the table: "pose" */
  update_pose?: Maybe<PoseMutationResponse>;
  /** update single row of the table: "pose" */
  update_pose_by_pk?: Maybe<Pose>;
  /** update data of the table: "spatial_ref_sys" */
  update_spatial_ref_sys?: Maybe<SpatialRefSysMutationResponse>;
  /** update single row of the table: "spatial_ref_sys" */
  update_spatial_ref_sys_by_pk?: Maybe<SpatialRefSys>;
  /** update data of the table: "system" */
  update_system?: Maybe<SystemMutationResponse>;
  /** update single row of the table: "system" */
  update_system_by_pk?: Maybe<System>;
  /** update data of the table: "track" */
  update_track?: Maybe<TrackMutationResponse>;
  /** update single row of the table: "track" */
  update_track_by_pk?: Maybe<Track>;
  /** update data of the table: "track_detections" */
  update_track_detections?: Maybe<TrackDetectionsMutationResponse>;
  /** update single row of the table: "track_detections" */
  update_track_detections_by_pk?: Maybe<TrackDetections>;
  /** update data of the table: "user" */
  update_user?: Maybe<UserMutationResponse>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update data of the table: "user_label" */
  update_user_label?: Maybe<UserLabelMutationResponse>;
  /** update single row of the table: "user_label" */
  update_user_label_by_pk?: Maybe<UserLabel>;
  /** update data of the table: "version" */
  update_version?: Maybe<VersionMutationResponse>;
  /** update single row of the table: "version" */
  update_version_by_pk?: Maybe<Version>;
  /** update data of the table: "zone" */
  update_zone?: Maybe<ZoneMutationResponse>;
  /** update single row of the table: "zone" */
  update_zone_by_pk?: Maybe<Zone>;
};

/** mutation root */
export type MutationRootDeleteAddressArgs = {
  where: AddressBoolExp;
};

/** mutation root */
export type MutationRootDeleteAddressByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteClassificationArgs = {
  where: ClassificationBoolExp;
};

/** mutation root */
export type MutationRootDeleteClassificationByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteComputeArgs = {
  where: ComputeBoolExp;
};

/** mutation root */
export type MutationRootDeleteComputeByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteConfigArgs = {
  where: ConfigBoolExp;
};

/** mutation root */
export type MutationRootDeleteConfigByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteDetectionArgs = {
  where: DetectionBoolExp;
};

/** mutation root */
export type MutationRootDeleteDetectionByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteDetectionRunArgs = {
  where: DetectionRunBoolExp;
};

/** mutation root */
export type MutationRootDeleteDetectionRunByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteDetectorArgs = {
  where: DetectorBoolExp;
};

/** mutation root */
export type MutationRootDeleteDetectorByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteEnumerationArgs = {
  where: EnumerationBoolExp;
};

/** mutation root */
export type MutationRootDeleteEnumerationByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteGeometryColumnsArgs = {
  where: GeometryColumnsBoolExp;
};

/** mutation root */
export type MutationRootDeleteGrowthCycleArgs = {
  where: GrowthCycleBoolExp;
};

/** mutation root */
export type MutationRootDeleteGrowthCycleByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteHeatMapArgs = {
  where: HeatMapBoolExp;
};

/** mutation root */
export type MutationRootDeleteHeatMapByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteLabelTaskArgs = {
  where: LabelTaskBoolExp;
};

/** mutation root */
export type MutationRootDeleteLabelTaskByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteLambdaRunArgs = {
  where: LambdaRunBoolExp;
};

/** mutation root */
export type MutationRootDeleteLambdaRunByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteLambdaRunMeasurementRunArgs = {
  where: LambdaRunMeasurementRunBoolExp;
};

/** mutation root */
export type MutationRootDeleteLambdaRunMeasurementRunByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteLambdaVersionArgs = {
  where: LambdaVersionBoolExp;
};

/** mutation root */
export type MutationRootDeleteLambdaVersionByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteLocationArgs = {
  where: LocationBoolExp;
};

/** mutation root */
export type MutationRootDeleteLocationByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteMeasurementArgs = {
  where: MeasurementBoolExp;
};

/** mutation root */
export type MutationRootDeleteMeasurementByPkArgs = {
  id: Scalars['bigint'];
  time: Scalars['timestamptz'];
};

/** mutation root */
export type MutationRootDeleteMeasurementRunArgs = {
  where: MeasurementRunBoolExp;
};

/** mutation root */
export type MutationRootDeleteMeasurementRunByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteOrganizationArgs = {
  where: OrganizationBoolExp;
};

/** mutation root */
export type MutationRootDeleteOrganizationByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteParametersArgs = {
  where: ParametersBoolExp;
};

/** mutation root */
export type MutationRootDeleteParametersByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeletePoseArgs = {
  where: PoseBoolExp;
};

/** mutation root */
export type MutationRootDeletePoseByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteSpatialRefSysArgs = {
  where: SpatialRefSysBoolExp;
};

/** mutation root */
export type MutationRootDeleteSpatialRefSysByPkArgs = {
  srid: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteSystemArgs = {
  where: SystemBoolExp;
};

/** mutation root */
export type MutationRootDeleteSystemByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteTrackArgs = {
  where: TrackBoolExp;
};

/** mutation root */
export type MutationRootDeleteTrackByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteTrackDetectionsArgs = {
  where: TrackDetectionsBoolExp;
};

/** mutation root */
export type MutationRootDeleteTrackDetectionsByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteUserArgs = {
  where: UserBoolExp;
};

/** mutation root */
export type MutationRootDeleteUserByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteUserLabelArgs = {
  where: UserLabelBoolExp;
};

/** mutation root */
export type MutationRootDeleteUserLabelByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteVersionArgs = {
  where: VersionBoolExp;
};

/** mutation root */
export type MutationRootDeleteVersionByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootDeleteZoneArgs = {
  where: ZoneBoolExp;
};

/** mutation root */
export type MutationRootDeleteZoneByPkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type MutationRootInsertAddressArgs = {
  objects: Array<AddressInsertInput>;
  on_conflict?: Maybe<AddressOnConflict>;
};

/** mutation root */
export type MutationRootInsertAddressOneArgs = {
  object: AddressInsertInput;
  on_conflict?: Maybe<AddressOnConflict>;
};

/** mutation root */
export type MutationRootInsertClassificationArgs = {
  objects: Array<ClassificationInsertInput>;
  on_conflict?: Maybe<ClassificationOnConflict>;
};

/** mutation root */
export type MutationRootInsertClassificationOneArgs = {
  object: ClassificationInsertInput;
  on_conflict?: Maybe<ClassificationOnConflict>;
};

/** mutation root */
export type MutationRootInsertComputeArgs = {
  objects: Array<ComputeInsertInput>;
  on_conflict?: Maybe<ComputeOnConflict>;
};

/** mutation root */
export type MutationRootInsertComputeOneArgs = {
  object: ComputeInsertInput;
  on_conflict?: Maybe<ComputeOnConflict>;
};

/** mutation root */
export type MutationRootInsertConfigArgs = {
  objects: Array<ConfigInsertInput>;
  on_conflict?: Maybe<ConfigOnConflict>;
};

/** mutation root */
export type MutationRootInsertConfigOneArgs = {
  object: ConfigInsertInput;
  on_conflict?: Maybe<ConfigOnConflict>;
};

/** mutation root */
export type MutationRootInsertDetectionArgs = {
  objects: Array<DetectionInsertInput>;
  on_conflict?: Maybe<DetectionOnConflict>;
};

/** mutation root */
export type MutationRootInsertDetectionOneArgs = {
  object: DetectionInsertInput;
  on_conflict?: Maybe<DetectionOnConflict>;
};

/** mutation root */
export type MutationRootInsertDetectionRunArgs = {
  objects: Array<DetectionRunInsertInput>;
  on_conflict?: Maybe<DetectionRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertDetectionRunOneArgs = {
  object: DetectionRunInsertInput;
  on_conflict?: Maybe<DetectionRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertDetectorArgs = {
  objects: Array<DetectorInsertInput>;
  on_conflict?: Maybe<DetectorOnConflict>;
};

/** mutation root */
export type MutationRootInsertDetectorOneArgs = {
  object: DetectorInsertInput;
  on_conflict?: Maybe<DetectorOnConflict>;
};

/** mutation root */
export type MutationRootInsertEnumerationArgs = {
  objects: Array<EnumerationInsertInput>;
  on_conflict?: Maybe<EnumerationOnConflict>;
};

/** mutation root */
export type MutationRootInsertEnumerationOneArgs = {
  object: EnumerationInsertInput;
  on_conflict?: Maybe<EnumerationOnConflict>;
};

/** mutation root */
export type MutationRootInsertGeometryColumnsArgs = {
  objects: Array<GeometryColumnsInsertInput>;
};

/** mutation root */
export type MutationRootInsertGeometryColumnsOneArgs = {
  object: GeometryColumnsInsertInput;
};

/** mutation root */
export type MutationRootInsertGrowthCycleArgs = {
  objects: Array<GrowthCycleInsertInput>;
  on_conflict?: Maybe<GrowthCycleOnConflict>;
};

/** mutation root */
export type MutationRootInsertGrowthCycleOneArgs = {
  object: GrowthCycleInsertInput;
  on_conflict?: Maybe<GrowthCycleOnConflict>;
};

/** mutation root */
export type MutationRootInsertHeatMapArgs = {
  objects: Array<HeatMapInsertInput>;
  on_conflict?: Maybe<HeatMapOnConflict>;
};

/** mutation root */
export type MutationRootInsertHeatMapOneArgs = {
  object: HeatMapInsertInput;
  on_conflict?: Maybe<HeatMapOnConflict>;
};

/** mutation root */
export type MutationRootInsertLabelTaskArgs = {
  objects: Array<LabelTaskInsertInput>;
  on_conflict?: Maybe<LabelTaskOnConflict>;
};

/** mutation root */
export type MutationRootInsertLabelTaskOneArgs = {
  object: LabelTaskInsertInput;
  on_conflict?: Maybe<LabelTaskOnConflict>;
};

/** mutation root */
export type MutationRootInsertLambdaRunArgs = {
  objects: Array<LambdaRunInsertInput>;
  on_conflict?: Maybe<LambdaRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertLambdaRunMeasurementRunArgs = {
  objects: Array<LambdaRunMeasurementRunInsertInput>;
  on_conflict?: Maybe<LambdaRunMeasurementRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertLambdaRunMeasurementRunOneArgs = {
  object: LambdaRunMeasurementRunInsertInput;
  on_conflict?: Maybe<LambdaRunMeasurementRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertLambdaRunOneArgs = {
  object: LambdaRunInsertInput;
  on_conflict?: Maybe<LambdaRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertLambdaVersionArgs = {
  objects: Array<LambdaVersionInsertInput>;
  on_conflict?: Maybe<LambdaVersionOnConflict>;
};

/** mutation root */
export type MutationRootInsertLambdaVersionOneArgs = {
  object: LambdaVersionInsertInput;
  on_conflict?: Maybe<LambdaVersionOnConflict>;
};

/** mutation root */
export type MutationRootInsertLocationArgs = {
  objects: Array<LocationInsertInput>;
  on_conflict?: Maybe<LocationOnConflict>;
};

/** mutation root */
export type MutationRootInsertLocationOneArgs = {
  object: LocationInsertInput;
  on_conflict?: Maybe<LocationOnConflict>;
};

/** mutation root */
export type MutationRootInsertMeasurementArgs = {
  objects: Array<MeasurementInsertInput>;
  on_conflict?: Maybe<MeasurementOnConflict>;
};

/** mutation root */
export type MutationRootInsertMeasurementOneArgs = {
  object: MeasurementInsertInput;
  on_conflict?: Maybe<MeasurementOnConflict>;
};

/** mutation root */
export type MutationRootInsertMeasurementRunArgs = {
  objects: Array<MeasurementRunInsertInput>;
  on_conflict?: Maybe<MeasurementRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertMeasurementRunOneArgs = {
  object: MeasurementRunInsertInput;
  on_conflict?: Maybe<MeasurementRunOnConflict>;
};

/** mutation root */
export type MutationRootInsertOrganizationArgs = {
  objects: Array<OrganizationInsertInput>;
  on_conflict?: Maybe<OrganizationOnConflict>;
};

/** mutation root */
export type MutationRootInsertOrganizationOneArgs = {
  object: OrganizationInsertInput;
  on_conflict?: Maybe<OrganizationOnConflict>;
};

/** mutation root */
export type MutationRootInsertParametersArgs = {
  objects: Array<ParametersInsertInput>;
  on_conflict?: Maybe<ParametersOnConflict>;
};

/** mutation root */
export type MutationRootInsertParametersOneArgs = {
  object: ParametersInsertInput;
  on_conflict?: Maybe<ParametersOnConflict>;
};

/** mutation root */
export type MutationRootInsertPoseArgs = {
  objects: Array<PoseInsertInput>;
  on_conflict?: Maybe<PoseOnConflict>;
};

/** mutation root */
export type MutationRootInsertPoseOneArgs = {
  object: PoseInsertInput;
  on_conflict?: Maybe<PoseOnConflict>;
};

/** mutation root */
export type MutationRootInsertSpatialRefSysArgs = {
  objects: Array<SpatialRefSysInsertInput>;
  on_conflict?: Maybe<SpatialRefSysOnConflict>;
};

/** mutation root */
export type MutationRootInsertSpatialRefSysOneArgs = {
  object: SpatialRefSysInsertInput;
  on_conflict?: Maybe<SpatialRefSysOnConflict>;
};

/** mutation root */
export type MutationRootInsertSystemArgs = {
  objects: Array<SystemInsertInput>;
  on_conflict?: Maybe<SystemOnConflict>;
};

/** mutation root */
export type MutationRootInsertSystemOneArgs = {
  object: SystemInsertInput;
  on_conflict?: Maybe<SystemOnConflict>;
};

/** mutation root */
export type MutationRootInsertTrackArgs = {
  objects: Array<TrackInsertInput>;
  on_conflict?: Maybe<TrackOnConflict>;
};

/** mutation root */
export type MutationRootInsertTrackDetectionsArgs = {
  objects: Array<TrackDetectionsInsertInput>;
  on_conflict?: Maybe<TrackDetectionsOnConflict>;
};

/** mutation root */
export type MutationRootInsertTrackDetectionsOneArgs = {
  object: TrackDetectionsInsertInput;
  on_conflict?: Maybe<TrackDetectionsOnConflict>;
};

/** mutation root */
export type MutationRootInsertTrackOneArgs = {
  object: TrackInsertInput;
  on_conflict?: Maybe<TrackOnConflict>;
};

/** mutation root */
export type MutationRootInsertUserArgs = {
  objects: Array<UserInsertInput>;
  on_conflict?: Maybe<UserOnConflict>;
};

/** mutation root */
export type MutationRootInsertUserLabelArgs = {
  objects: Array<UserLabelInsertInput>;
  on_conflict?: Maybe<UserLabelOnConflict>;
};

/** mutation root */
export type MutationRootInsertUserLabelOneArgs = {
  object: UserLabelInsertInput;
  on_conflict?: Maybe<UserLabelOnConflict>;
};

/** mutation root */
export type MutationRootInsertUserOneArgs = {
  object: UserInsertInput;
  on_conflict?: Maybe<UserOnConflict>;
};

/** mutation root */
export type MutationRootInsertVersionArgs = {
  objects: Array<VersionInsertInput>;
  on_conflict?: Maybe<VersionOnConflict>;
};

/** mutation root */
export type MutationRootInsertVersionOneArgs = {
  object: VersionInsertInput;
  on_conflict?: Maybe<VersionOnConflict>;
};

/** mutation root */
export type MutationRootInsertZoneArgs = {
  objects: Array<ZoneInsertInput>;
  on_conflict?: Maybe<ZoneOnConflict>;
};

/** mutation root */
export type MutationRootInsertZoneOneArgs = {
  object: ZoneInsertInput;
  on_conflict?: Maybe<ZoneOnConflict>;
};

/** mutation root */
export type MutationRootUpdateAddressArgs = {
  _append?: Maybe<AddressAppendInput>;
  _delete_at_path?: Maybe<AddressDeleteAtPathInput>;
  _delete_elem?: Maybe<AddressDeleteElemInput>;
  _delete_key?: Maybe<AddressDeleteKeyInput>;
  _inc?: Maybe<AddressIncInput>;
  _prepend?: Maybe<AddressPrependInput>;
  _set?: Maybe<AddressSetInput>;
  where: AddressBoolExp;
};

/** mutation root */
export type MutationRootUpdateAddressByPkArgs = {
  _append?: Maybe<AddressAppendInput>;
  _delete_at_path?: Maybe<AddressDeleteAtPathInput>;
  _delete_elem?: Maybe<AddressDeleteElemInput>;
  _delete_key?: Maybe<AddressDeleteKeyInput>;
  _inc?: Maybe<AddressIncInput>;
  _prepend?: Maybe<AddressPrependInput>;
  _set?: Maybe<AddressSetInput>;
  pk_columns: AddressPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateClassificationArgs = {
  _append?: Maybe<ClassificationAppendInput>;
  _delete_at_path?: Maybe<ClassificationDeleteAtPathInput>;
  _delete_elem?: Maybe<ClassificationDeleteElemInput>;
  _delete_key?: Maybe<ClassificationDeleteKeyInput>;
  _inc?: Maybe<ClassificationIncInput>;
  _prepend?: Maybe<ClassificationPrependInput>;
  _set?: Maybe<ClassificationSetInput>;
  where: ClassificationBoolExp;
};

/** mutation root */
export type MutationRootUpdateClassificationByPkArgs = {
  _append?: Maybe<ClassificationAppendInput>;
  _delete_at_path?: Maybe<ClassificationDeleteAtPathInput>;
  _delete_elem?: Maybe<ClassificationDeleteElemInput>;
  _delete_key?: Maybe<ClassificationDeleteKeyInput>;
  _inc?: Maybe<ClassificationIncInput>;
  _prepend?: Maybe<ClassificationPrependInput>;
  _set?: Maybe<ClassificationSetInput>;
  pk_columns: ClassificationPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateComputeArgs = {
  _append?: Maybe<ComputeAppendInput>;
  _delete_at_path?: Maybe<ComputeDeleteAtPathInput>;
  _delete_elem?: Maybe<ComputeDeleteElemInput>;
  _delete_key?: Maybe<ComputeDeleteKeyInput>;
  _inc?: Maybe<ComputeIncInput>;
  _prepend?: Maybe<ComputePrependInput>;
  _set?: Maybe<ComputeSetInput>;
  where: ComputeBoolExp;
};

/** mutation root */
export type MutationRootUpdateComputeByPkArgs = {
  _append?: Maybe<ComputeAppendInput>;
  _delete_at_path?: Maybe<ComputeDeleteAtPathInput>;
  _delete_elem?: Maybe<ComputeDeleteElemInput>;
  _delete_key?: Maybe<ComputeDeleteKeyInput>;
  _inc?: Maybe<ComputeIncInput>;
  _prepend?: Maybe<ComputePrependInput>;
  _set?: Maybe<ComputeSetInput>;
  pk_columns: ComputePkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateConfigArgs = {
  _append?: Maybe<ConfigAppendInput>;
  _delete_at_path?: Maybe<ConfigDeleteAtPathInput>;
  _delete_elem?: Maybe<ConfigDeleteElemInput>;
  _delete_key?: Maybe<ConfigDeleteKeyInput>;
  _inc?: Maybe<ConfigIncInput>;
  _prepend?: Maybe<ConfigPrependInput>;
  _set?: Maybe<ConfigSetInput>;
  where: ConfigBoolExp;
};

/** mutation root */
export type MutationRootUpdateConfigByPkArgs = {
  _append?: Maybe<ConfigAppendInput>;
  _delete_at_path?: Maybe<ConfigDeleteAtPathInput>;
  _delete_elem?: Maybe<ConfigDeleteElemInput>;
  _delete_key?: Maybe<ConfigDeleteKeyInput>;
  _inc?: Maybe<ConfigIncInput>;
  _prepend?: Maybe<ConfigPrependInput>;
  _set?: Maybe<ConfigSetInput>;
  pk_columns: ConfigPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateDetectionArgs = {
  _append?: Maybe<DetectionAppendInput>;
  _delete_at_path?: Maybe<DetectionDeleteAtPathInput>;
  _delete_elem?: Maybe<DetectionDeleteElemInput>;
  _delete_key?: Maybe<DetectionDeleteKeyInput>;
  _inc?: Maybe<DetectionIncInput>;
  _prepend?: Maybe<DetectionPrependInput>;
  _set?: Maybe<DetectionSetInput>;
  where: DetectionBoolExp;
};

/** mutation root */
export type MutationRootUpdateDetectionByPkArgs = {
  _append?: Maybe<DetectionAppendInput>;
  _delete_at_path?: Maybe<DetectionDeleteAtPathInput>;
  _delete_elem?: Maybe<DetectionDeleteElemInput>;
  _delete_key?: Maybe<DetectionDeleteKeyInput>;
  _inc?: Maybe<DetectionIncInput>;
  _prepend?: Maybe<DetectionPrependInput>;
  _set?: Maybe<DetectionSetInput>;
  pk_columns: DetectionPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateDetectionRunArgs = {
  _append?: Maybe<DetectionRunAppendInput>;
  _delete_at_path?: Maybe<DetectionRunDeleteAtPathInput>;
  _delete_elem?: Maybe<DetectionRunDeleteElemInput>;
  _delete_key?: Maybe<DetectionRunDeleteKeyInput>;
  _inc?: Maybe<DetectionRunIncInput>;
  _prepend?: Maybe<DetectionRunPrependInput>;
  _set?: Maybe<DetectionRunSetInput>;
  where: DetectionRunBoolExp;
};

/** mutation root */
export type MutationRootUpdateDetectionRunByPkArgs = {
  _append?: Maybe<DetectionRunAppendInput>;
  _delete_at_path?: Maybe<DetectionRunDeleteAtPathInput>;
  _delete_elem?: Maybe<DetectionRunDeleteElemInput>;
  _delete_key?: Maybe<DetectionRunDeleteKeyInput>;
  _inc?: Maybe<DetectionRunIncInput>;
  _prepend?: Maybe<DetectionRunPrependInput>;
  _set?: Maybe<DetectionRunSetInput>;
  pk_columns: DetectionRunPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateDetectorArgs = {
  _append?: Maybe<DetectorAppendInput>;
  _delete_at_path?: Maybe<DetectorDeleteAtPathInput>;
  _delete_elem?: Maybe<DetectorDeleteElemInput>;
  _delete_key?: Maybe<DetectorDeleteKeyInput>;
  _inc?: Maybe<DetectorIncInput>;
  _prepend?: Maybe<DetectorPrependInput>;
  _set?: Maybe<DetectorSetInput>;
  where: DetectorBoolExp;
};

/** mutation root */
export type MutationRootUpdateDetectorByPkArgs = {
  _append?: Maybe<DetectorAppendInput>;
  _delete_at_path?: Maybe<DetectorDeleteAtPathInput>;
  _delete_elem?: Maybe<DetectorDeleteElemInput>;
  _delete_key?: Maybe<DetectorDeleteKeyInput>;
  _inc?: Maybe<DetectorIncInput>;
  _prepend?: Maybe<DetectorPrependInput>;
  _set?: Maybe<DetectorSetInput>;
  pk_columns: DetectorPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateEnumerationArgs = {
  _append?: Maybe<EnumerationAppendInput>;
  _delete_at_path?: Maybe<EnumerationDeleteAtPathInput>;
  _delete_elem?: Maybe<EnumerationDeleteElemInput>;
  _delete_key?: Maybe<EnumerationDeleteKeyInput>;
  _inc?: Maybe<EnumerationIncInput>;
  _prepend?: Maybe<EnumerationPrependInput>;
  _set?: Maybe<EnumerationSetInput>;
  where: EnumerationBoolExp;
};

/** mutation root */
export type MutationRootUpdateEnumerationByPkArgs = {
  _append?: Maybe<EnumerationAppendInput>;
  _delete_at_path?: Maybe<EnumerationDeleteAtPathInput>;
  _delete_elem?: Maybe<EnumerationDeleteElemInput>;
  _delete_key?: Maybe<EnumerationDeleteKeyInput>;
  _inc?: Maybe<EnumerationIncInput>;
  _prepend?: Maybe<EnumerationPrependInput>;
  _set?: Maybe<EnumerationSetInput>;
  pk_columns: EnumerationPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateGeometryColumnsArgs = {
  _inc?: Maybe<GeometryColumnsIncInput>;
  _set?: Maybe<GeometryColumnsSetInput>;
  where: GeometryColumnsBoolExp;
};

/** mutation root */
export type MutationRootUpdateGrowthCycleArgs = {
  _append?: Maybe<GrowthCycleAppendInput>;
  _delete_at_path?: Maybe<GrowthCycleDeleteAtPathInput>;
  _delete_elem?: Maybe<GrowthCycleDeleteElemInput>;
  _delete_key?: Maybe<GrowthCycleDeleteKeyInput>;
  _inc?: Maybe<GrowthCycleIncInput>;
  _prepend?: Maybe<GrowthCyclePrependInput>;
  _set?: Maybe<GrowthCycleSetInput>;
  where: GrowthCycleBoolExp;
};

/** mutation root */
export type MutationRootUpdateGrowthCycleByPkArgs = {
  _append?: Maybe<GrowthCycleAppendInput>;
  _delete_at_path?: Maybe<GrowthCycleDeleteAtPathInput>;
  _delete_elem?: Maybe<GrowthCycleDeleteElemInput>;
  _delete_key?: Maybe<GrowthCycleDeleteKeyInput>;
  _inc?: Maybe<GrowthCycleIncInput>;
  _prepend?: Maybe<GrowthCyclePrependInput>;
  _set?: Maybe<GrowthCycleSetInput>;
  pk_columns: GrowthCyclePkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateHeatMapArgs = {
  _append?: Maybe<HeatMapAppendInput>;
  _delete_at_path?: Maybe<HeatMapDeleteAtPathInput>;
  _delete_elem?: Maybe<HeatMapDeleteElemInput>;
  _delete_key?: Maybe<HeatMapDeleteKeyInput>;
  _inc?: Maybe<HeatMapIncInput>;
  _prepend?: Maybe<HeatMapPrependInput>;
  _set?: Maybe<HeatMapSetInput>;
  where: HeatMapBoolExp;
};

/** mutation root */
export type MutationRootUpdateHeatMapByPkArgs = {
  _append?: Maybe<HeatMapAppendInput>;
  _delete_at_path?: Maybe<HeatMapDeleteAtPathInput>;
  _delete_elem?: Maybe<HeatMapDeleteElemInput>;
  _delete_key?: Maybe<HeatMapDeleteKeyInput>;
  _inc?: Maybe<HeatMapIncInput>;
  _prepend?: Maybe<HeatMapPrependInput>;
  _set?: Maybe<HeatMapSetInput>;
  pk_columns: HeatMapPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateLabelTaskArgs = {
  _append?: Maybe<LabelTaskAppendInput>;
  _delete_at_path?: Maybe<LabelTaskDeleteAtPathInput>;
  _delete_elem?: Maybe<LabelTaskDeleteElemInput>;
  _delete_key?: Maybe<LabelTaskDeleteKeyInput>;
  _inc?: Maybe<LabelTaskIncInput>;
  _prepend?: Maybe<LabelTaskPrependInput>;
  _set?: Maybe<LabelTaskSetInput>;
  where: LabelTaskBoolExp;
};

/** mutation root */
export type MutationRootUpdateLabelTaskByPkArgs = {
  _append?: Maybe<LabelTaskAppendInput>;
  _delete_at_path?: Maybe<LabelTaskDeleteAtPathInput>;
  _delete_elem?: Maybe<LabelTaskDeleteElemInput>;
  _delete_key?: Maybe<LabelTaskDeleteKeyInput>;
  _inc?: Maybe<LabelTaskIncInput>;
  _prepend?: Maybe<LabelTaskPrependInput>;
  _set?: Maybe<LabelTaskSetInput>;
  pk_columns: LabelTaskPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateLambdaRunArgs = {
  _append?: Maybe<LambdaRunAppendInput>;
  _delete_at_path?: Maybe<LambdaRunDeleteAtPathInput>;
  _delete_elem?: Maybe<LambdaRunDeleteElemInput>;
  _delete_key?: Maybe<LambdaRunDeleteKeyInput>;
  _inc?: Maybe<LambdaRunIncInput>;
  _prepend?: Maybe<LambdaRunPrependInput>;
  _set?: Maybe<LambdaRunSetInput>;
  where: LambdaRunBoolExp;
};

/** mutation root */
export type MutationRootUpdateLambdaRunByPkArgs = {
  _append?: Maybe<LambdaRunAppendInput>;
  _delete_at_path?: Maybe<LambdaRunDeleteAtPathInput>;
  _delete_elem?: Maybe<LambdaRunDeleteElemInput>;
  _delete_key?: Maybe<LambdaRunDeleteKeyInput>;
  _inc?: Maybe<LambdaRunIncInput>;
  _prepend?: Maybe<LambdaRunPrependInput>;
  _set?: Maybe<LambdaRunSetInput>;
  pk_columns: LambdaRunPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateLambdaRunMeasurementRunArgs = {
  _inc?: Maybe<LambdaRunMeasurementRunIncInput>;
  _set?: Maybe<LambdaRunMeasurementRunSetInput>;
  where: LambdaRunMeasurementRunBoolExp;
};

/** mutation root */
export type MutationRootUpdateLambdaRunMeasurementRunByPkArgs = {
  _inc?: Maybe<LambdaRunMeasurementRunIncInput>;
  _set?: Maybe<LambdaRunMeasurementRunSetInput>;
  pk_columns: LambdaRunMeasurementRunPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateLambdaVersionArgs = {
  _append?: Maybe<LambdaVersionAppendInput>;
  _delete_at_path?: Maybe<LambdaVersionDeleteAtPathInput>;
  _delete_elem?: Maybe<LambdaVersionDeleteElemInput>;
  _delete_key?: Maybe<LambdaVersionDeleteKeyInput>;
  _inc?: Maybe<LambdaVersionIncInput>;
  _prepend?: Maybe<LambdaVersionPrependInput>;
  _set?: Maybe<LambdaVersionSetInput>;
  where: LambdaVersionBoolExp;
};

/** mutation root */
export type MutationRootUpdateLambdaVersionByPkArgs = {
  _append?: Maybe<LambdaVersionAppendInput>;
  _delete_at_path?: Maybe<LambdaVersionDeleteAtPathInput>;
  _delete_elem?: Maybe<LambdaVersionDeleteElemInput>;
  _delete_key?: Maybe<LambdaVersionDeleteKeyInput>;
  _inc?: Maybe<LambdaVersionIncInput>;
  _prepend?: Maybe<LambdaVersionPrependInput>;
  _set?: Maybe<LambdaVersionSetInput>;
  pk_columns: LambdaVersionPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateLocationArgs = {
  _append?: Maybe<LocationAppendInput>;
  _delete_at_path?: Maybe<LocationDeleteAtPathInput>;
  _delete_elem?: Maybe<LocationDeleteElemInput>;
  _delete_key?: Maybe<LocationDeleteKeyInput>;
  _inc?: Maybe<LocationIncInput>;
  _prepend?: Maybe<LocationPrependInput>;
  _set?: Maybe<LocationSetInput>;
  where: LocationBoolExp;
};

/** mutation root */
export type MutationRootUpdateLocationByPkArgs = {
  _append?: Maybe<LocationAppendInput>;
  _delete_at_path?: Maybe<LocationDeleteAtPathInput>;
  _delete_elem?: Maybe<LocationDeleteElemInput>;
  _delete_key?: Maybe<LocationDeleteKeyInput>;
  _inc?: Maybe<LocationIncInput>;
  _prepend?: Maybe<LocationPrependInput>;
  _set?: Maybe<LocationSetInput>;
  pk_columns: LocationPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateMeasurementArgs = {
  _append?: Maybe<MeasurementAppendInput>;
  _delete_at_path?: Maybe<MeasurementDeleteAtPathInput>;
  _delete_elem?: Maybe<MeasurementDeleteElemInput>;
  _delete_key?: Maybe<MeasurementDeleteKeyInput>;
  _inc?: Maybe<MeasurementIncInput>;
  _prepend?: Maybe<MeasurementPrependInput>;
  _set?: Maybe<MeasurementSetInput>;
  where: MeasurementBoolExp;
};

/** mutation root */
export type MutationRootUpdateMeasurementByPkArgs = {
  _append?: Maybe<MeasurementAppendInput>;
  _delete_at_path?: Maybe<MeasurementDeleteAtPathInput>;
  _delete_elem?: Maybe<MeasurementDeleteElemInput>;
  _delete_key?: Maybe<MeasurementDeleteKeyInput>;
  _inc?: Maybe<MeasurementIncInput>;
  _prepend?: Maybe<MeasurementPrependInput>;
  _set?: Maybe<MeasurementSetInput>;
  pk_columns: MeasurementPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateMeasurementRunArgs = {
  _append?: Maybe<MeasurementRunAppendInput>;
  _delete_at_path?: Maybe<MeasurementRunDeleteAtPathInput>;
  _delete_elem?: Maybe<MeasurementRunDeleteElemInput>;
  _delete_key?: Maybe<MeasurementRunDeleteKeyInput>;
  _inc?: Maybe<MeasurementRunIncInput>;
  _prepend?: Maybe<MeasurementRunPrependInput>;
  _set?: Maybe<MeasurementRunSetInput>;
  where: MeasurementRunBoolExp;
};

/** mutation root */
export type MutationRootUpdateMeasurementRunByPkArgs = {
  _append?: Maybe<MeasurementRunAppendInput>;
  _delete_at_path?: Maybe<MeasurementRunDeleteAtPathInput>;
  _delete_elem?: Maybe<MeasurementRunDeleteElemInput>;
  _delete_key?: Maybe<MeasurementRunDeleteKeyInput>;
  _inc?: Maybe<MeasurementRunIncInput>;
  _prepend?: Maybe<MeasurementRunPrependInput>;
  _set?: Maybe<MeasurementRunSetInput>;
  pk_columns: MeasurementRunPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateOrganizationArgs = {
  _append?: Maybe<OrganizationAppendInput>;
  _delete_at_path?: Maybe<OrganizationDeleteAtPathInput>;
  _delete_elem?: Maybe<OrganizationDeleteElemInput>;
  _delete_key?: Maybe<OrganizationDeleteKeyInput>;
  _inc?: Maybe<OrganizationIncInput>;
  _prepend?: Maybe<OrganizationPrependInput>;
  _set?: Maybe<OrganizationSetInput>;
  where: OrganizationBoolExp;
};

/** mutation root */
export type MutationRootUpdateOrganizationByPkArgs = {
  _append?: Maybe<OrganizationAppendInput>;
  _delete_at_path?: Maybe<OrganizationDeleteAtPathInput>;
  _delete_elem?: Maybe<OrganizationDeleteElemInput>;
  _delete_key?: Maybe<OrganizationDeleteKeyInput>;
  _inc?: Maybe<OrganizationIncInput>;
  _prepend?: Maybe<OrganizationPrependInput>;
  _set?: Maybe<OrganizationSetInput>;
  pk_columns: OrganizationPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateParametersArgs = {
  _append?: Maybe<ParametersAppendInput>;
  _delete_at_path?: Maybe<ParametersDeleteAtPathInput>;
  _delete_elem?: Maybe<ParametersDeleteElemInput>;
  _delete_key?: Maybe<ParametersDeleteKeyInput>;
  _inc?: Maybe<ParametersIncInput>;
  _prepend?: Maybe<ParametersPrependInput>;
  _set?: Maybe<ParametersSetInput>;
  where: ParametersBoolExp;
};

/** mutation root */
export type MutationRootUpdateParametersByPkArgs = {
  _append?: Maybe<ParametersAppendInput>;
  _delete_at_path?: Maybe<ParametersDeleteAtPathInput>;
  _delete_elem?: Maybe<ParametersDeleteElemInput>;
  _delete_key?: Maybe<ParametersDeleteKeyInput>;
  _inc?: Maybe<ParametersIncInput>;
  _prepend?: Maybe<ParametersPrependInput>;
  _set?: Maybe<ParametersSetInput>;
  pk_columns: ParametersPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdatePoseArgs = {
  _inc?: Maybe<PoseIncInput>;
  _set?: Maybe<PoseSetInput>;
  where: PoseBoolExp;
};

/** mutation root */
export type MutationRootUpdatePoseByPkArgs = {
  _inc?: Maybe<PoseIncInput>;
  _set?: Maybe<PoseSetInput>;
  pk_columns: PosePkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateSpatialRefSysArgs = {
  _inc?: Maybe<SpatialRefSysIncInput>;
  _set?: Maybe<SpatialRefSysSetInput>;
  where: SpatialRefSysBoolExp;
};

/** mutation root */
export type MutationRootUpdateSpatialRefSysByPkArgs = {
  _inc?: Maybe<SpatialRefSysIncInput>;
  _set?: Maybe<SpatialRefSysSetInput>;
  pk_columns: SpatialRefSysPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateSystemArgs = {
  _append?: Maybe<SystemAppendInput>;
  _delete_at_path?: Maybe<SystemDeleteAtPathInput>;
  _delete_elem?: Maybe<SystemDeleteElemInput>;
  _delete_key?: Maybe<SystemDeleteKeyInput>;
  _inc?: Maybe<SystemIncInput>;
  _prepend?: Maybe<SystemPrependInput>;
  _set?: Maybe<SystemSetInput>;
  where: SystemBoolExp;
};

/** mutation root */
export type MutationRootUpdateSystemByPkArgs = {
  _append?: Maybe<SystemAppendInput>;
  _delete_at_path?: Maybe<SystemDeleteAtPathInput>;
  _delete_elem?: Maybe<SystemDeleteElemInput>;
  _delete_key?: Maybe<SystemDeleteKeyInput>;
  _inc?: Maybe<SystemIncInput>;
  _prepend?: Maybe<SystemPrependInput>;
  _set?: Maybe<SystemSetInput>;
  pk_columns: SystemPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateTrackArgs = {
  _append?: Maybe<TrackAppendInput>;
  _delete_at_path?: Maybe<TrackDeleteAtPathInput>;
  _delete_elem?: Maybe<TrackDeleteElemInput>;
  _delete_key?: Maybe<TrackDeleteKeyInput>;
  _inc?: Maybe<TrackIncInput>;
  _prepend?: Maybe<TrackPrependInput>;
  _set?: Maybe<TrackSetInput>;
  where: TrackBoolExp;
};

/** mutation root */
export type MutationRootUpdateTrackByPkArgs = {
  _append?: Maybe<TrackAppendInput>;
  _delete_at_path?: Maybe<TrackDeleteAtPathInput>;
  _delete_elem?: Maybe<TrackDeleteElemInput>;
  _delete_key?: Maybe<TrackDeleteKeyInput>;
  _inc?: Maybe<TrackIncInput>;
  _prepend?: Maybe<TrackPrependInput>;
  _set?: Maybe<TrackSetInput>;
  pk_columns: TrackPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateTrackDetectionsArgs = {
  _inc?: Maybe<TrackDetectionsIncInput>;
  _set?: Maybe<TrackDetectionsSetInput>;
  where: TrackDetectionsBoolExp;
};

/** mutation root */
export type MutationRootUpdateTrackDetectionsByPkArgs = {
  _inc?: Maybe<TrackDetectionsIncInput>;
  _set?: Maybe<TrackDetectionsSetInput>;
  pk_columns: TrackDetectionsPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateUserArgs = {
  _append?: Maybe<UserAppendInput>;
  _delete_at_path?: Maybe<UserDeleteAtPathInput>;
  _delete_elem?: Maybe<UserDeleteElemInput>;
  _delete_key?: Maybe<UserDeleteKeyInput>;
  _inc?: Maybe<UserIncInput>;
  _prepend?: Maybe<UserPrependInput>;
  _set?: Maybe<UserSetInput>;
  where: UserBoolExp;
};

/** mutation root */
export type MutationRootUpdateUserByPkArgs = {
  _append?: Maybe<UserAppendInput>;
  _delete_at_path?: Maybe<UserDeleteAtPathInput>;
  _delete_elem?: Maybe<UserDeleteElemInput>;
  _delete_key?: Maybe<UserDeleteKeyInput>;
  _inc?: Maybe<UserIncInput>;
  _prepend?: Maybe<UserPrependInput>;
  _set?: Maybe<UserSetInput>;
  pk_columns: UserPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateUserLabelArgs = {
  _append?: Maybe<UserLabelAppendInput>;
  _delete_at_path?: Maybe<UserLabelDeleteAtPathInput>;
  _delete_elem?: Maybe<UserLabelDeleteElemInput>;
  _delete_key?: Maybe<UserLabelDeleteKeyInput>;
  _inc?: Maybe<UserLabelIncInput>;
  _prepend?: Maybe<UserLabelPrependInput>;
  _set?: Maybe<UserLabelSetInput>;
  where: UserLabelBoolExp;
};

/** mutation root */
export type MutationRootUpdateUserLabelByPkArgs = {
  _append?: Maybe<UserLabelAppendInput>;
  _delete_at_path?: Maybe<UserLabelDeleteAtPathInput>;
  _delete_elem?: Maybe<UserLabelDeleteElemInput>;
  _delete_key?: Maybe<UserLabelDeleteKeyInput>;
  _inc?: Maybe<UserLabelIncInput>;
  _prepend?: Maybe<UserLabelPrependInput>;
  _set?: Maybe<UserLabelSetInput>;
  pk_columns: UserLabelPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateVersionArgs = {
  _inc?: Maybe<VersionIncInput>;
  _set?: Maybe<VersionSetInput>;
  where: VersionBoolExp;
};

/** mutation root */
export type MutationRootUpdateVersionByPkArgs = {
  _inc?: Maybe<VersionIncInput>;
  _set?: Maybe<VersionSetInput>;
  pk_columns: VersionPkColumnsInput;
};

/** mutation root */
export type MutationRootUpdateZoneArgs = {
  _append?: Maybe<ZoneAppendInput>;
  _delete_at_path?: Maybe<ZoneDeleteAtPathInput>;
  _delete_elem?: Maybe<ZoneDeleteElemInput>;
  _delete_key?: Maybe<ZoneDeleteKeyInput>;
  _inc?: Maybe<ZoneIncInput>;
  _prepend?: Maybe<ZonePrependInput>;
  _set?: Maybe<ZoneSetInput>;
  where: ZoneBoolExp;
};

/** mutation root */
export type MutationRootUpdateZoneByPkArgs = {
  _append?: Maybe<ZoneAppendInput>;
  _delete_at_path?: Maybe<ZoneDeleteAtPathInput>;
  _delete_elem?: Maybe<ZoneDeleteElemInput>;
  _delete_key?: Maybe<ZoneDeleteKeyInput>;
  _inc?: Maybe<ZoneIncInput>;
  _prepend?: Maybe<ZonePrependInput>;
  _set?: Maybe<ZoneSetInput>;
  pk_columns: ZonePkColumnsInput;
};

/** Boolean expression to compare columns of type "name". All fields are combined with logical 'AND'. */
export type NameComparisonExp = {
  _eq?: Maybe<Scalars['name']>;
  _gt?: Maybe<Scalars['name']>;
  _gte?: Maybe<Scalars['name']>;
  _in?: Maybe<Array<Scalars['name']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['name']>;
  _lte?: Maybe<Scalars['name']>;
  _neq?: Maybe<Scalars['name']>;
  _nin?: Maybe<Array<Scalars['name']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** Boolean expression to compare columns of type "oid". All fields are combined with logical 'AND'. */
export type OidComparisonExp = {
  _eq?: Maybe<Scalars['oid']>;
  _gt?: Maybe<Scalars['oid']>;
  _gte?: Maybe<Scalars['oid']>;
  _in?: Maybe<Array<Scalars['oid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['oid']>;
  _lte?: Maybe<Scalars['oid']>;
  _neq?: Maybe<Scalars['oid']>;
  _nin?: Maybe<Array<Scalars['oid']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  asc = 'asc',
  /** in ascending order, nulls first */
  asc_nulls_first = 'asc_nulls_first',
  /** in ascending order, nulls last */
  asc_nulls_last = 'asc_nulls_last',
  /** in descending order, nulls first */
  desc = 'desc',
  /** in descending order, nulls first */
  desc_nulls_first = 'desc_nulls_first',
  /** in descending order, nulls last */
  desc_nulls_last = 'desc_nulls_last',
}

/** columns and relationships of "organization" */
export type Organization = {
  __typename?: 'organization';
  /** An object relationship */
  address: Address;
  billing_address_id: Scalars['Int'];
  /** An array relationship */
  computes: Array<Compute>;
  /** An aggregate relationship */
  computes_aggregate: ComputeAggregate;
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  /** An array relationship */
  locations: Array<Location>;
  /** An aggregate relationship */
  locations_aggregate: LocationAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id: Scalars['Int'];
  /** An array relationship */
  systems: Array<System>;
  /** An aggregate relationship */
  systems_aggregate: SystemAggregate;
};

/** columns and relationships of "organization" */
export type OrganizationComputesArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

/** columns and relationships of "organization" */
export type OrganizationComputesAggregateArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

/** columns and relationships of "organization" */
export type OrganizationLocationsArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

/** columns and relationships of "organization" */
export type OrganizationLocationsAggregateArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

/** columns and relationships of "organization" */
export type OrganizationMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "organization" */
export type OrganizationSystemsArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** columns and relationships of "organization" */
export type OrganizationSystemsAggregateArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** aggregated selection of "organization" */
export type OrganizationAggregate = {
  __typename?: 'organization_aggregate';
  aggregate?: Maybe<OrganizationAggregateFields>;
  nodes: Array<Organization>;
};

/** aggregate fields of "organization" */
export type OrganizationAggregateFields = {
  __typename?: 'organization_aggregate_fields';
  avg?: Maybe<OrganizationAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<OrganizationMaxFields>;
  min?: Maybe<OrganizationMinFields>;
  stddev?: Maybe<OrganizationStddevFields>;
  stddev_pop?: Maybe<OrganizationStddevPopFields>;
  stddev_samp?: Maybe<OrganizationStddevSampFields>;
  sum?: Maybe<OrganizationSumFields>;
  var_pop?: Maybe<OrganizationVarPopFields>;
  var_samp?: Maybe<OrganizationVarSampFields>;
  variance?: Maybe<OrganizationVarianceFields>;
};

/** aggregate fields of "organization" */
export type OrganizationAggregateFieldsCountArgs = {
  columns?: Maybe<Array<OrganizationSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "organization" */
export type OrganizationAggregateOrderBy = {
  avg?: Maybe<OrganizationAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<OrganizationMaxOrderBy>;
  min?: Maybe<OrganizationMinOrderBy>;
  stddev?: Maybe<OrganizationStddevOrderBy>;
  stddev_pop?: Maybe<OrganizationStddevPopOrderBy>;
  stddev_samp?: Maybe<OrganizationStddevSampOrderBy>;
  sum?: Maybe<OrganizationSumOrderBy>;
  var_pop?: Maybe<OrganizationVarPopOrderBy>;
  var_samp?: Maybe<OrganizationVarSampOrderBy>;
  variance?: Maybe<OrganizationVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type OrganizationAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "organization" */
export type OrganizationArrRelInsertInput = {
  data: Array<OrganizationInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<OrganizationOnConflict>;
};

/** aggregate avg on columns */
export type OrganizationAvgFields = {
  __typename?: 'organization_avg_fields';
  billing_address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "organization" */
export type OrganizationAvgOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "organization". All fields are combined with a logical 'AND'. */
export type OrganizationBoolExp = {
  _and?: Maybe<Array<OrganizationBoolExp>>;
  _not?: Maybe<OrganizationBoolExp>;
  _or?: Maybe<Array<OrganizationBoolExp>>;
  address?: Maybe<AddressBoolExp>;
  billing_address_id?: Maybe<IntComparisonExp>;
  computes?: Maybe<ComputeBoolExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  locations?: Maybe<LocationBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  name_id?: Maybe<IntComparisonExp>;
  systems?: Maybe<SystemBoolExp>;
};

/** unique or primary key constraints on table "organization" */
export enum OrganizationConstraint {
  /** unique or primary key constraint */
  organization_pkey = 'organization_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type OrganizationDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type OrganizationDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type OrganizationDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "organization" */
export type OrganizationIncInput = {
  billing_address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "organization" */
export type OrganizationInsertInput = {
  address?: Maybe<AddressObjRelInsertInput>;
  billing_address_id?: Maybe<Scalars['Int']>;
  computes?: Maybe<ComputeArrRelInsertInput>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  locations?: Maybe<LocationArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
  systems?: Maybe<SystemArrRelInsertInput>;
};

/** aggregate max on columns */
export type OrganizationMaxFields = {
  __typename?: 'organization_max_fields';
  billing_address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "organization" */
export type OrganizationMaxOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type OrganizationMinFields = {
  __typename?: 'organization_min_fields';
  billing_address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "organization" */
export type OrganizationMinOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "organization" */
export type OrganizationMutationResponse = {
  __typename?: 'organization_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Organization>;
};

/** input type for inserting object relation for remote table "organization" */
export type OrganizationObjRelInsertInput = {
  data: OrganizationInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<OrganizationOnConflict>;
};

/** on conflict condition type for table "organization" */
export type OrganizationOnConflict = {
  constraint: OrganizationConstraint;
  update_columns?: Array<OrganizationUpdateColumn>;
  where?: Maybe<OrganizationBoolExp>;
};

/** Ordering options when selecting data from "organization". */
export type OrganizationOrderBy = {
  address?: Maybe<AddressOrderBy>;
  billing_address_id?: Maybe<OrderBy>;
  computes_aggregate?: Maybe<ComputeAggregateOrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  locations_aggregate?: Maybe<LocationAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  systems_aggregate?: Maybe<SystemAggregateOrderBy>;
};

/** primary key columns input for table: organization */
export type OrganizationPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type OrganizationPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "organization" */
export enum OrganizationSelectColumn {
  /** column name */
  billing_address_id = 'billing_address_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
}

/** input type for updating data in table "organization" */
export type OrganizationSetInput = {
  billing_address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type OrganizationStddevFields = {
  __typename?: 'organization_stddev_fields';
  billing_address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "organization" */
export type OrganizationStddevOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type OrganizationStddevPopFields = {
  __typename?: 'organization_stddev_pop_fields';
  billing_address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "organization" */
export type OrganizationStddevPopOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type OrganizationStddevSampFields = {
  __typename?: 'organization_stddev_samp_fields';
  billing_address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "organization" */
export type OrganizationStddevSampOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type OrganizationSumFields = {
  __typename?: 'organization_sum_fields';
  billing_address_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "organization" */
export type OrganizationSumOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** update columns of table "organization" */
export enum OrganizationUpdateColumn {
  /** column name */
  billing_address_id = 'billing_address_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
}

/** aggregate var_pop on columns */
export type OrganizationVarPopFields = {
  __typename?: 'organization_var_pop_fields';
  billing_address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "organization" */
export type OrganizationVarPopOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type OrganizationVarSampFields = {
  __typename?: 'organization_var_samp_fields';
  billing_address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "organization" */
export type OrganizationVarSampOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type OrganizationVarianceFields = {
  __typename?: 'organization_variance_fields';
  billing_address_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "organization" */
export type OrganizationVarianceOrderBy = {
  billing_address_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
};

/** columns and relationships of "parameters" */
export type Parameters = {
  __typename?: 'parameters';
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  type_id: Scalars['Int'];
};

/** columns and relationships of "parameters" */
export type ParametersMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "parameters" */
export type ParametersAggregate = {
  __typename?: 'parameters_aggregate';
  aggregate?: Maybe<ParametersAggregateFields>;
  nodes: Array<Parameters>;
};

/** aggregate fields of "parameters" */
export type ParametersAggregateFields = {
  __typename?: 'parameters_aggregate_fields';
  avg?: Maybe<ParametersAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ParametersMaxFields>;
  min?: Maybe<ParametersMinFields>;
  stddev?: Maybe<ParametersStddevFields>;
  stddev_pop?: Maybe<ParametersStddevPopFields>;
  stddev_samp?: Maybe<ParametersStddevSampFields>;
  sum?: Maybe<ParametersSumFields>;
  var_pop?: Maybe<ParametersVarPopFields>;
  var_samp?: Maybe<ParametersVarSampFields>;
  variance?: Maybe<ParametersVarianceFields>;
};

/** aggregate fields of "parameters" */
export type ParametersAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ParametersSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "parameters" */
export type ParametersAggregateOrderBy = {
  avg?: Maybe<ParametersAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ParametersMaxOrderBy>;
  min?: Maybe<ParametersMinOrderBy>;
  stddev?: Maybe<ParametersStddevOrderBy>;
  stddev_pop?: Maybe<ParametersStddevPopOrderBy>;
  stddev_samp?: Maybe<ParametersStddevSampOrderBy>;
  sum?: Maybe<ParametersSumOrderBy>;
  var_pop?: Maybe<ParametersVarPopOrderBy>;
  var_samp?: Maybe<ParametersVarSampOrderBy>;
  variance?: Maybe<ParametersVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ParametersAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "parameters" */
export type ParametersArrRelInsertInput = {
  data: Array<ParametersInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<ParametersOnConflict>;
};

/** aggregate avg on columns */
export type ParametersAvgFields = {
  __typename?: 'parameters_avg_fields';
  id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "parameters" */
export type ParametersAvgOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "parameters". All fields are combined with a logical 'AND'. */
export type ParametersBoolExp = {
  _and?: Maybe<Array<ParametersBoolExp>>;
  _not?: Maybe<ParametersBoolExp>;
  _or?: Maybe<Array<ParametersBoolExp>>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  type_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "parameters" */
export enum ParametersConstraint {
  /** unique or primary key constraint */
  parameters_pkey = 'parameters_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ParametersDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ParametersDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ParametersDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "parameters" */
export type ParametersIncInput = {
  id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "parameters" */
export type ParametersInsertInput = {
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type ParametersMaxFields = {
  __typename?: 'parameters_max_fields';
  id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "parameters" */
export type ParametersMaxOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ParametersMinFields = {
  __typename?: 'parameters_min_fields';
  id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "parameters" */
export type ParametersMinOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "parameters" */
export type ParametersMutationResponse = {
  __typename?: 'parameters_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Parameters>;
};

/** on conflict condition type for table "parameters" */
export type ParametersOnConflict = {
  constraint: ParametersConstraint;
  update_columns?: Array<ParametersUpdateColumn>;
  where?: Maybe<ParametersBoolExp>;
};

/** Ordering options when selecting data from "parameters". */
export type ParametersOrderBy = {
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: parameters */
export type ParametersPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ParametersPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "parameters" */
export enum ParametersSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  type_id = 'type_id',
}

/** input type for updating data in table "parameters" */
export type ParametersSetInput = {
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type ParametersStddevFields = {
  __typename?: 'parameters_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "parameters" */
export type ParametersStddevOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ParametersStddevPopFields = {
  __typename?: 'parameters_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "parameters" */
export type ParametersStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ParametersStddevSampFields = {
  __typename?: 'parameters_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "parameters" */
export type ParametersStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ParametersSumFields = {
  __typename?: 'parameters_sum_fields';
  id?: Maybe<Scalars['Int']>;
  type_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "parameters" */
export type ParametersSumOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** update columns of table "parameters" */
export enum ParametersUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  type_id = 'type_id',
}

/** aggregate var_pop on columns */
export type ParametersVarPopFields = {
  __typename?: 'parameters_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "parameters" */
export type ParametersVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ParametersVarSampFields = {
  __typename?: 'parameters_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "parameters" */
export type ParametersVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ParametersVarianceFields = {
  __typename?: 'parameters_variance_fields';
  id?: Maybe<Scalars['Float']>;
  type_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "parameters" */
export type ParametersVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  type_id?: Maybe<OrderBy>;
};

/** columns and relationships of "pg_stat_statements" */
export type PgStatStatements = {
  __typename?: 'pg_stat_statements';
  blk_read_time?: Maybe<Scalars['float8']>;
  blk_write_time?: Maybe<Scalars['float8']>;
  calls?: Maybe<Scalars['bigint']>;
  dbid?: Maybe<Scalars['oid']>;
  local_blks_dirtied?: Maybe<Scalars['bigint']>;
  local_blks_hit?: Maybe<Scalars['bigint']>;
  local_blks_read?: Maybe<Scalars['bigint']>;
  local_blks_written?: Maybe<Scalars['bigint']>;
  max_exec_time?: Maybe<Scalars['float8']>;
  max_plan_time?: Maybe<Scalars['float8']>;
  mean_exec_time?: Maybe<Scalars['float8']>;
  mean_plan_time?: Maybe<Scalars['float8']>;
  min_exec_time?: Maybe<Scalars['float8']>;
  min_plan_time?: Maybe<Scalars['float8']>;
  plans?: Maybe<Scalars['bigint']>;
  query?: Maybe<Scalars['String']>;
  queryid?: Maybe<Scalars['bigint']>;
  rows?: Maybe<Scalars['bigint']>;
  shared_blks_dirtied?: Maybe<Scalars['bigint']>;
  shared_blks_hit?: Maybe<Scalars['bigint']>;
  shared_blks_read?: Maybe<Scalars['bigint']>;
  shared_blks_written?: Maybe<Scalars['bigint']>;
  stddev_exec_time?: Maybe<Scalars['float8']>;
  stddev_plan_time?: Maybe<Scalars['float8']>;
  temp_blks_read?: Maybe<Scalars['bigint']>;
  temp_blks_written?: Maybe<Scalars['bigint']>;
  total_exec_time?: Maybe<Scalars['float8']>;
  total_plan_time?: Maybe<Scalars['float8']>;
  userid?: Maybe<Scalars['oid']>;
  wal_bytes?: Maybe<Scalars['numeric']>;
  wal_fpi?: Maybe<Scalars['bigint']>;
  wal_records?: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "pg_stat_statements" */
export type PgStatStatementsAggregate = {
  __typename?: 'pg_stat_statements_aggregate';
  aggregate?: Maybe<PgStatStatementsAggregateFields>;
  nodes: Array<PgStatStatements>;
};

/** aggregate fields of "pg_stat_statements" */
export type PgStatStatementsAggregateFields = {
  __typename?: 'pg_stat_statements_aggregate_fields';
  avg?: Maybe<PgStatStatementsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<PgStatStatementsMaxFields>;
  min?: Maybe<PgStatStatementsMinFields>;
  stddev?: Maybe<PgStatStatementsStddevFields>;
  stddev_pop?: Maybe<PgStatStatementsStddevPopFields>;
  stddev_samp?: Maybe<PgStatStatementsStddevSampFields>;
  sum?: Maybe<PgStatStatementsSumFields>;
  var_pop?: Maybe<PgStatStatementsVarPopFields>;
  var_samp?: Maybe<PgStatStatementsVarSampFields>;
  variance?: Maybe<PgStatStatementsVarianceFields>;
};

/** aggregate fields of "pg_stat_statements" */
export type PgStatStatementsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<PgStatStatementsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type PgStatStatementsAvgFields = {
  __typename?: 'pg_stat_statements_avg_fields';
  blk_read_time?: Maybe<Scalars['Float']>;
  blk_write_time?: Maybe<Scalars['Float']>;
  calls?: Maybe<Scalars['Float']>;
  local_blks_dirtied?: Maybe<Scalars['Float']>;
  local_blks_hit?: Maybe<Scalars['Float']>;
  local_blks_read?: Maybe<Scalars['Float']>;
  local_blks_written?: Maybe<Scalars['Float']>;
  max_exec_time?: Maybe<Scalars['Float']>;
  max_plan_time?: Maybe<Scalars['Float']>;
  mean_exec_time?: Maybe<Scalars['Float']>;
  mean_plan_time?: Maybe<Scalars['Float']>;
  min_exec_time?: Maybe<Scalars['Float']>;
  min_plan_time?: Maybe<Scalars['Float']>;
  plans?: Maybe<Scalars['Float']>;
  queryid?: Maybe<Scalars['Float']>;
  rows?: Maybe<Scalars['Float']>;
  shared_blks_dirtied?: Maybe<Scalars['Float']>;
  shared_blks_hit?: Maybe<Scalars['Float']>;
  shared_blks_read?: Maybe<Scalars['Float']>;
  shared_blks_written?: Maybe<Scalars['Float']>;
  stddev_exec_time?: Maybe<Scalars['Float']>;
  stddev_plan_time?: Maybe<Scalars['Float']>;
  temp_blks_read?: Maybe<Scalars['Float']>;
  temp_blks_written?: Maybe<Scalars['Float']>;
  total_exec_time?: Maybe<Scalars['Float']>;
  total_plan_time?: Maybe<Scalars['Float']>;
  wal_bytes?: Maybe<Scalars['Float']>;
  wal_fpi?: Maybe<Scalars['Float']>;
  wal_records?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "pg_stat_statements". All fields are combined with a logical 'AND'. */
export type PgStatStatementsBoolExp = {
  _and?: Maybe<Array<PgStatStatementsBoolExp>>;
  _not?: Maybe<PgStatStatementsBoolExp>;
  _or?: Maybe<Array<PgStatStatementsBoolExp>>;
  blk_read_time?: Maybe<Float8ComparisonExp>;
  blk_write_time?: Maybe<Float8ComparisonExp>;
  calls?: Maybe<BigintComparisonExp>;
  dbid?: Maybe<OidComparisonExp>;
  local_blks_dirtied?: Maybe<BigintComparisonExp>;
  local_blks_hit?: Maybe<BigintComparisonExp>;
  local_blks_read?: Maybe<BigintComparisonExp>;
  local_blks_written?: Maybe<BigintComparisonExp>;
  max_exec_time?: Maybe<Float8ComparisonExp>;
  max_plan_time?: Maybe<Float8ComparisonExp>;
  mean_exec_time?: Maybe<Float8ComparisonExp>;
  mean_plan_time?: Maybe<Float8ComparisonExp>;
  min_exec_time?: Maybe<Float8ComparisonExp>;
  min_plan_time?: Maybe<Float8ComparisonExp>;
  plans?: Maybe<BigintComparisonExp>;
  query?: Maybe<StringComparisonExp>;
  queryid?: Maybe<BigintComparisonExp>;
  rows?: Maybe<BigintComparisonExp>;
  shared_blks_dirtied?: Maybe<BigintComparisonExp>;
  shared_blks_hit?: Maybe<BigintComparisonExp>;
  shared_blks_read?: Maybe<BigintComparisonExp>;
  shared_blks_written?: Maybe<BigintComparisonExp>;
  stddev_exec_time?: Maybe<Float8ComparisonExp>;
  stddev_plan_time?: Maybe<Float8ComparisonExp>;
  temp_blks_read?: Maybe<BigintComparisonExp>;
  temp_blks_written?: Maybe<BigintComparisonExp>;
  total_exec_time?: Maybe<Float8ComparisonExp>;
  total_plan_time?: Maybe<Float8ComparisonExp>;
  userid?: Maybe<OidComparisonExp>;
  wal_bytes?: Maybe<NumericComparisonExp>;
  wal_fpi?: Maybe<BigintComparisonExp>;
  wal_records?: Maybe<BigintComparisonExp>;
};

/** aggregate max on columns */
export type PgStatStatementsMaxFields = {
  __typename?: 'pg_stat_statements_max_fields';
  blk_read_time?: Maybe<Scalars['float8']>;
  blk_write_time?: Maybe<Scalars['float8']>;
  calls?: Maybe<Scalars['bigint']>;
  local_blks_dirtied?: Maybe<Scalars['bigint']>;
  local_blks_hit?: Maybe<Scalars['bigint']>;
  local_blks_read?: Maybe<Scalars['bigint']>;
  local_blks_written?: Maybe<Scalars['bigint']>;
  max_exec_time?: Maybe<Scalars['float8']>;
  max_plan_time?: Maybe<Scalars['float8']>;
  mean_exec_time?: Maybe<Scalars['float8']>;
  mean_plan_time?: Maybe<Scalars['float8']>;
  min_exec_time?: Maybe<Scalars['float8']>;
  min_plan_time?: Maybe<Scalars['float8']>;
  plans?: Maybe<Scalars['bigint']>;
  query?: Maybe<Scalars['String']>;
  queryid?: Maybe<Scalars['bigint']>;
  rows?: Maybe<Scalars['bigint']>;
  shared_blks_dirtied?: Maybe<Scalars['bigint']>;
  shared_blks_hit?: Maybe<Scalars['bigint']>;
  shared_blks_read?: Maybe<Scalars['bigint']>;
  shared_blks_written?: Maybe<Scalars['bigint']>;
  stddev_exec_time?: Maybe<Scalars['float8']>;
  stddev_plan_time?: Maybe<Scalars['float8']>;
  temp_blks_read?: Maybe<Scalars['bigint']>;
  temp_blks_written?: Maybe<Scalars['bigint']>;
  total_exec_time?: Maybe<Scalars['float8']>;
  total_plan_time?: Maybe<Scalars['float8']>;
  wal_bytes?: Maybe<Scalars['numeric']>;
  wal_fpi?: Maybe<Scalars['bigint']>;
  wal_records?: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type PgStatStatementsMinFields = {
  __typename?: 'pg_stat_statements_min_fields';
  blk_read_time?: Maybe<Scalars['float8']>;
  blk_write_time?: Maybe<Scalars['float8']>;
  calls?: Maybe<Scalars['bigint']>;
  local_blks_dirtied?: Maybe<Scalars['bigint']>;
  local_blks_hit?: Maybe<Scalars['bigint']>;
  local_blks_read?: Maybe<Scalars['bigint']>;
  local_blks_written?: Maybe<Scalars['bigint']>;
  max_exec_time?: Maybe<Scalars['float8']>;
  max_plan_time?: Maybe<Scalars['float8']>;
  mean_exec_time?: Maybe<Scalars['float8']>;
  mean_plan_time?: Maybe<Scalars['float8']>;
  min_exec_time?: Maybe<Scalars['float8']>;
  min_plan_time?: Maybe<Scalars['float8']>;
  plans?: Maybe<Scalars['bigint']>;
  query?: Maybe<Scalars['String']>;
  queryid?: Maybe<Scalars['bigint']>;
  rows?: Maybe<Scalars['bigint']>;
  shared_blks_dirtied?: Maybe<Scalars['bigint']>;
  shared_blks_hit?: Maybe<Scalars['bigint']>;
  shared_blks_read?: Maybe<Scalars['bigint']>;
  shared_blks_written?: Maybe<Scalars['bigint']>;
  stddev_exec_time?: Maybe<Scalars['float8']>;
  stddev_plan_time?: Maybe<Scalars['float8']>;
  temp_blks_read?: Maybe<Scalars['bigint']>;
  temp_blks_written?: Maybe<Scalars['bigint']>;
  total_exec_time?: Maybe<Scalars['float8']>;
  total_plan_time?: Maybe<Scalars['float8']>;
  wal_bytes?: Maybe<Scalars['numeric']>;
  wal_fpi?: Maybe<Scalars['bigint']>;
  wal_records?: Maybe<Scalars['bigint']>;
};

/** Ordering options when selecting data from "pg_stat_statements". */
export type PgStatStatementsOrderBy = {
  blk_read_time?: Maybe<OrderBy>;
  blk_write_time?: Maybe<OrderBy>;
  calls?: Maybe<OrderBy>;
  dbid?: Maybe<OrderBy>;
  local_blks_dirtied?: Maybe<OrderBy>;
  local_blks_hit?: Maybe<OrderBy>;
  local_blks_read?: Maybe<OrderBy>;
  local_blks_written?: Maybe<OrderBy>;
  max_exec_time?: Maybe<OrderBy>;
  max_plan_time?: Maybe<OrderBy>;
  mean_exec_time?: Maybe<OrderBy>;
  mean_plan_time?: Maybe<OrderBy>;
  min_exec_time?: Maybe<OrderBy>;
  min_plan_time?: Maybe<OrderBy>;
  plans?: Maybe<OrderBy>;
  query?: Maybe<OrderBy>;
  queryid?: Maybe<OrderBy>;
  rows?: Maybe<OrderBy>;
  shared_blks_dirtied?: Maybe<OrderBy>;
  shared_blks_hit?: Maybe<OrderBy>;
  shared_blks_read?: Maybe<OrderBy>;
  shared_blks_written?: Maybe<OrderBy>;
  stddev_exec_time?: Maybe<OrderBy>;
  stddev_plan_time?: Maybe<OrderBy>;
  temp_blks_read?: Maybe<OrderBy>;
  temp_blks_written?: Maybe<OrderBy>;
  total_exec_time?: Maybe<OrderBy>;
  total_plan_time?: Maybe<OrderBy>;
  userid?: Maybe<OrderBy>;
  wal_bytes?: Maybe<OrderBy>;
  wal_fpi?: Maybe<OrderBy>;
  wal_records?: Maybe<OrderBy>;
};

/** select columns of table "pg_stat_statements" */
export enum PgStatStatementsSelectColumn {
  /** column name */
  blk_read_time = 'blk_read_time',
  /** column name */
  blk_write_time = 'blk_write_time',
  /** column name */
  calls = 'calls',
  /** column name */
  dbid = 'dbid',
  /** column name */
  local_blks_dirtied = 'local_blks_dirtied',
  /** column name */
  local_blks_hit = 'local_blks_hit',
  /** column name */
  local_blks_read = 'local_blks_read',
  /** column name */
  local_blks_written = 'local_blks_written',
  /** column name */
  max_exec_time = 'max_exec_time',
  /** column name */
  max_plan_time = 'max_plan_time',
  /** column name */
  mean_exec_time = 'mean_exec_time',
  /** column name */
  mean_plan_time = 'mean_plan_time',
  /** column name */
  min_exec_time = 'min_exec_time',
  /** column name */
  min_plan_time = 'min_plan_time',
  /** column name */
  plans = 'plans',
  /** column name */
  query = 'query',
  /** column name */
  queryid = 'queryid',
  /** column name */
  rows = 'rows',
  /** column name */
  shared_blks_dirtied = 'shared_blks_dirtied',
  /** column name */
  shared_blks_hit = 'shared_blks_hit',
  /** column name */
  shared_blks_read = 'shared_blks_read',
  /** column name */
  shared_blks_written = 'shared_blks_written',
  /** column name */
  stddev_exec_time = 'stddev_exec_time',
  /** column name */
  stddev_plan_time = 'stddev_plan_time',
  /** column name */
  temp_blks_read = 'temp_blks_read',
  /** column name */
  temp_blks_written = 'temp_blks_written',
  /** column name */
  total_exec_time = 'total_exec_time',
  /** column name */
  total_plan_time = 'total_plan_time',
  /** column name */
  userid = 'userid',
  /** column name */
  wal_bytes = 'wal_bytes',
  /** column name */
  wal_fpi = 'wal_fpi',
  /** column name */
  wal_records = 'wal_records',
}

/** aggregate stddev on columns */
export type PgStatStatementsStddevFields = {
  __typename?: 'pg_stat_statements_stddev_fields';
  blk_read_time?: Maybe<Scalars['Float']>;
  blk_write_time?: Maybe<Scalars['Float']>;
  calls?: Maybe<Scalars['Float']>;
  local_blks_dirtied?: Maybe<Scalars['Float']>;
  local_blks_hit?: Maybe<Scalars['Float']>;
  local_blks_read?: Maybe<Scalars['Float']>;
  local_blks_written?: Maybe<Scalars['Float']>;
  max_exec_time?: Maybe<Scalars['Float']>;
  max_plan_time?: Maybe<Scalars['Float']>;
  mean_exec_time?: Maybe<Scalars['Float']>;
  mean_plan_time?: Maybe<Scalars['Float']>;
  min_exec_time?: Maybe<Scalars['Float']>;
  min_plan_time?: Maybe<Scalars['Float']>;
  plans?: Maybe<Scalars['Float']>;
  queryid?: Maybe<Scalars['Float']>;
  rows?: Maybe<Scalars['Float']>;
  shared_blks_dirtied?: Maybe<Scalars['Float']>;
  shared_blks_hit?: Maybe<Scalars['Float']>;
  shared_blks_read?: Maybe<Scalars['Float']>;
  shared_blks_written?: Maybe<Scalars['Float']>;
  stddev_exec_time?: Maybe<Scalars['Float']>;
  stddev_plan_time?: Maybe<Scalars['Float']>;
  temp_blks_read?: Maybe<Scalars['Float']>;
  temp_blks_written?: Maybe<Scalars['Float']>;
  total_exec_time?: Maybe<Scalars['Float']>;
  total_plan_time?: Maybe<Scalars['Float']>;
  wal_bytes?: Maybe<Scalars['Float']>;
  wal_fpi?: Maybe<Scalars['Float']>;
  wal_records?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PgStatStatementsStddevPopFields = {
  __typename?: 'pg_stat_statements_stddev_pop_fields';
  blk_read_time?: Maybe<Scalars['Float']>;
  blk_write_time?: Maybe<Scalars['Float']>;
  calls?: Maybe<Scalars['Float']>;
  local_blks_dirtied?: Maybe<Scalars['Float']>;
  local_blks_hit?: Maybe<Scalars['Float']>;
  local_blks_read?: Maybe<Scalars['Float']>;
  local_blks_written?: Maybe<Scalars['Float']>;
  max_exec_time?: Maybe<Scalars['Float']>;
  max_plan_time?: Maybe<Scalars['Float']>;
  mean_exec_time?: Maybe<Scalars['Float']>;
  mean_plan_time?: Maybe<Scalars['Float']>;
  min_exec_time?: Maybe<Scalars['Float']>;
  min_plan_time?: Maybe<Scalars['Float']>;
  plans?: Maybe<Scalars['Float']>;
  queryid?: Maybe<Scalars['Float']>;
  rows?: Maybe<Scalars['Float']>;
  shared_blks_dirtied?: Maybe<Scalars['Float']>;
  shared_blks_hit?: Maybe<Scalars['Float']>;
  shared_blks_read?: Maybe<Scalars['Float']>;
  shared_blks_written?: Maybe<Scalars['Float']>;
  stddev_exec_time?: Maybe<Scalars['Float']>;
  stddev_plan_time?: Maybe<Scalars['Float']>;
  temp_blks_read?: Maybe<Scalars['Float']>;
  temp_blks_written?: Maybe<Scalars['Float']>;
  total_exec_time?: Maybe<Scalars['Float']>;
  total_plan_time?: Maybe<Scalars['Float']>;
  wal_bytes?: Maybe<Scalars['Float']>;
  wal_fpi?: Maybe<Scalars['Float']>;
  wal_records?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PgStatStatementsStddevSampFields = {
  __typename?: 'pg_stat_statements_stddev_samp_fields';
  blk_read_time?: Maybe<Scalars['Float']>;
  blk_write_time?: Maybe<Scalars['Float']>;
  calls?: Maybe<Scalars['Float']>;
  local_blks_dirtied?: Maybe<Scalars['Float']>;
  local_blks_hit?: Maybe<Scalars['Float']>;
  local_blks_read?: Maybe<Scalars['Float']>;
  local_blks_written?: Maybe<Scalars['Float']>;
  max_exec_time?: Maybe<Scalars['Float']>;
  max_plan_time?: Maybe<Scalars['Float']>;
  mean_exec_time?: Maybe<Scalars['Float']>;
  mean_plan_time?: Maybe<Scalars['Float']>;
  min_exec_time?: Maybe<Scalars['Float']>;
  min_plan_time?: Maybe<Scalars['Float']>;
  plans?: Maybe<Scalars['Float']>;
  queryid?: Maybe<Scalars['Float']>;
  rows?: Maybe<Scalars['Float']>;
  shared_blks_dirtied?: Maybe<Scalars['Float']>;
  shared_blks_hit?: Maybe<Scalars['Float']>;
  shared_blks_read?: Maybe<Scalars['Float']>;
  shared_blks_written?: Maybe<Scalars['Float']>;
  stddev_exec_time?: Maybe<Scalars['Float']>;
  stddev_plan_time?: Maybe<Scalars['Float']>;
  temp_blks_read?: Maybe<Scalars['Float']>;
  temp_blks_written?: Maybe<Scalars['Float']>;
  total_exec_time?: Maybe<Scalars['Float']>;
  total_plan_time?: Maybe<Scalars['Float']>;
  wal_bytes?: Maybe<Scalars['Float']>;
  wal_fpi?: Maybe<Scalars['Float']>;
  wal_records?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PgStatStatementsSumFields = {
  __typename?: 'pg_stat_statements_sum_fields';
  blk_read_time?: Maybe<Scalars['float8']>;
  blk_write_time?: Maybe<Scalars['float8']>;
  calls?: Maybe<Scalars['bigint']>;
  local_blks_dirtied?: Maybe<Scalars['bigint']>;
  local_blks_hit?: Maybe<Scalars['bigint']>;
  local_blks_read?: Maybe<Scalars['bigint']>;
  local_blks_written?: Maybe<Scalars['bigint']>;
  max_exec_time?: Maybe<Scalars['float8']>;
  max_plan_time?: Maybe<Scalars['float8']>;
  mean_exec_time?: Maybe<Scalars['float8']>;
  mean_plan_time?: Maybe<Scalars['float8']>;
  min_exec_time?: Maybe<Scalars['float8']>;
  min_plan_time?: Maybe<Scalars['float8']>;
  plans?: Maybe<Scalars['bigint']>;
  queryid?: Maybe<Scalars['bigint']>;
  rows?: Maybe<Scalars['bigint']>;
  shared_blks_dirtied?: Maybe<Scalars['bigint']>;
  shared_blks_hit?: Maybe<Scalars['bigint']>;
  shared_blks_read?: Maybe<Scalars['bigint']>;
  shared_blks_written?: Maybe<Scalars['bigint']>;
  stddev_exec_time?: Maybe<Scalars['float8']>;
  stddev_plan_time?: Maybe<Scalars['float8']>;
  temp_blks_read?: Maybe<Scalars['bigint']>;
  temp_blks_written?: Maybe<Scalars['bigint']>;
  total_exec_time?: Maybe<Scalars['float8']>;
  total_plan_time?: Maybe<Scalars['float8']>;
  wal_bytes?: Maybe<Scalars['numeric']>;
  wal_fpi?: Maybe<Scalars['bigint']>;
  wal_records?: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type PgStatStatementsVarPopFields = {
  __typename?: 'pg_stat_statements_var_pop_fields';
  blk_read_time?: Maybe<Scalars['Float']>;
  blk_write_time?: Maybe<Scalars['Float']>;
  calls?: Maybe<Scalars['Float']>;
  local_blks_dirtied?: Maybe<Scalars['Float']>;
  local_blks_hit?: Maybe<Scalars['Float']>;
  local_blks_read?: Maybe<Scalars['Float']>;
  local_blks_written?: Maybe<Scalars['Float']>;
  max_exec_time?: Maybe<Scalars['Float']>;
  max_plan_time?: Maybe<Scalars['Float']>;
  mean_exec_time?: Maybe<Scalars['Float']>;
  mean_plan_time?: Maybe<Scalars['Float']>;
  min_exec_time?: Maybe<Scalars['Float']>;
  min_plan_time?: Maybe<Scalars['Float']>;
  plans?: Maybe<Scalars['Float']>;
  queryid?: Maybe<Scalars['Float']>;
  rows?: Maybe<Scalars['Float']>;
  shared_blks_dirtied?: Maybe<Scalars['Float']>;
  shared_blks_hit?: Maybe<Scalars['Float']>;
  shared_blks_read?: Maybe<Scalars['Float']>;
  shared_blks_written?: Maybe<Scalars['Float']>;
  stddev_exec_time?: Maybe<Scalars['Float']>;
  stddev_plan_time?: Maybe<Scalars['Float']>;
  temp_blks_read?: Maybe<Scalars['Float']>;
  temp_blks_written?: Maybe<Scalars['Float']>;
  total_exec_time?: Maybe<Scalars['Float']>;
  total_plan_time?: Maybe<Scalars['Float']>;
  wal_bytes?: Maybe<Scalars['Float']>;
  wal_fpi?: Maybe<Scalars['Float']>;
  wal_records?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PgStatStatementsVarSampFields = {
  __typename?: 'pg_stat_statements_var_samp_fields';
  blk_read_time?: Maybe<Scalars['Float']>;
  blk_write_time?: Maybe<Scalars['Float']>;
  calls?: Maybe<Scalars['Float']>;
  local_blks_dirtied?: Maybe<Scalars['Float']>;
  local_blks_hit?: Maybe<Scalars['Float']>;
  local_blks_read?: Maybe<Scalars['Float']>;
  local_blks_written?: Maybe<Scalars['Float']>;
  max_exec_time?: Maybe<Scalars['Float']>;
  max_plan_time?: Maybe<Scalars['Float']>;
  mean_exec_time?: Maybe<Scalars['Float']>;
  mean_plan_time?: Maybe<Scalars['Float']>;
  min_exec_time?: Maybe<Scalars['Float']>;
  min_plan_time?: Maybe<Scalars['Float']>;
  plans?: Maybe<Scalars['Float']>;
  queryid?: Maybe<Scalars['Float']>;
  rows?: Maybe<Scalars['Float']>;
  shared_blks_dirtied?: Maybe<Scalars['Float']>;
  shared_blks_hit?: Maybe<Scalars['Float']>;
  shared_blks_read?: Maybe<Scalars['Float']>;
  shared_blks_written?: Maybe<Scalars['Float']>;
  stddev_exec_time?: Maybe<Scalars['Float']>;
  stddev_plan_time?: Maybe<Scalars['Float']>;
  temp_blks_read?: Maybe<Scalars['Float']>;
  temp_blks_written?: Maybe<Scalars['Float']>;
  total_exec_time?: Maybe<Scalars['Float']>;
  total_plan_time?: Maybe<Scalars['Float']>;
  wal_bytes?: Maybe<Scalars['Float']>;
  wal_fpi?: Maybe<Scalars['Float']>;
  wal_records?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PgStatStatementsVarianceFields = {
  __typename?: 'pg_stat_statements_variance_fields';
  blk_read_time?: Maybe<Scalars['Float']>;
  blk_write_time?: Maybe<Scalars['Float']>;
  calls?: Maybe<Scalars['Float']>;
  local_blks_dirtied?: Maybe<Scalars['Float']>;
  local_blks_hit?: Maybe<Scalars['Float']>;
  local_blks_read?: Maybe<Scalars['Float']>;
  local_blks_written?: Maybe<Scalars['Float']>;
  max_exec_time?: Maybe<Scalars['Float']>;
  max_plan_time?: Maybe<Scalars['Float']>;
  mean_exec_time?: Maybe<Scalars['Float']>;
  mean_plan_time?: Maybe<Scalars['Float']>;
  min_exec_time?: Maybe<Scalars['Float']>;
  min_plan_time?: Maybe<Scalars['Float']>;
  plans?: Maybe<Scalars['Float']>;
  queryid?: Maybe<Scalars['Float']>;
  rows?: Maybe<Scalars['Float']>;
  shared_blks_dirtied?: Maybe<Scalars['Float']>;
  shared_blks_hit?: Maybe<Scalars['Float']>;
  shared_blks_read?: Maybe<Scalars['Float']>;
  shared_blks_written?: Maybe<Scalars['Float']>;
  stddev_exec_time?: Maybe<Scalars['Float']>;
  stddev_plan_time?: Maybe<Scalars['Float']>;
  temp_blks_read?: Maybe<Scalars['Float']>;
  temp_blks_written?: Maybe<Scalars['Float']>;
  total_exec_time?: Maybe<Scalars['Float']>;
  total_plan_time?: Maybe<Scalars['Float']>;
  wal_bytes?: Maybe<Scalars['Float']>;
  wal_fpi?: Maybe<Scalars['Float']>;
  wal_records?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "pose" */
export type Pose = {
  __typename?: 'pose';
  coordinates: Scalars['geometry'];
  id: Scalars['Int'];
  /** An array relationship */
  measurements: Array<Measurement>;
  /** An aggregate relationship */
  measurements_aggregate: MeasurementAggregate;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "pose" */
export type PoseMeasurementsArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** columns and relationships of "pose" */
export type PoseMeasurementsAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

/** aggregated selection of "pose" */
export type PoseAggregate = {
  __typename?: 'pose_aggregate';
  aggregate?: Maybe<PoseAggregateFields>;
  nodes: Array<Pose>;
};

/** aggregate fields of "pose" */
export type PoseAggregateFields = {
  __typename?: 'pose_aggregate_fields';
  avg?: Maybe<PoseAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<PoseMaxFields>;
  min?: Maybe<PoseMinFields>;
  stddev?: Maybe<PoseStddevFields>;
  stddev_pop?: Maybe<PoseStddevPopFields>;
  stddev_samp?: Maybe<PoseStddevSampFields>;
  sum?: Maybe<PoseSumFields>;
  var_pop?: Maybe<PoseVarPopFields>;
  var_samp?: Maybe<PoseVarSampFields>;
  variance?: Maybe<PoseVarianceFields>;
};

/** aggregate fields of "pose" */
export type PoseAggregateFieldsCountArgs = {
  columns?: Maybe<Array<PoseSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type PoseAvgFields = {
  __typename?: 'pose_avg_fields';
  id?: Maybe<Scalars['Float']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "pose". All fields are combined with a logical 'AND'. */
export type PoseBoolExp = {
  _and?: Maybe<Array<PoseBoolExp>>;
  _not?: Maybe<PoseBoolExp>;
  _or?: Maybe<Array<PoseBoolExp>>;
  coordinates?: Maybe<GeometryComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  measurements?: Maybe<MeasurementBoolExp>;
  rotation_vector_x?: Maybe<FloatComparisonExp>;
  rotation_vector_y?: Maybe<FloatComparisonExp>;
  rotation_vector_z?: Maybe<FloatComparisonExp>;
};

/** unique or primary key constraints on table "pose" */
export enum PoseConstraint {
  /** unique or primary key constraint */
  pose_pkey = 'pose_pkey',
}

/** input type for incrementing numeric columns in table "pose" */
export type PoseIncInput = {
  id?: Maybe<Scalars['Int']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** input type for inserting data into table "pose" */
export type PoseInsertInput = {
  coordinates?: Maybe<Scalars['geometry']>;
  id?: Maybe<Scalars['Int']>;
  measurements?: Maybe<MeasurementArrRelInsertInput>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type PoseMaxFields = {
  __typename?: 'pose_max_fields';
  id?: Maybe<Scalars['Int']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate min on columns */
export type PoseMinFields = {
  __typename?: 'pose_min_fields';
  id?: Maybe<Scalars['Int']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** response of any mutation on the table "pose" */
export type PoseMutationResponse = {
  __typename?: 'pose_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Pose>;
};

/** input type for inserting object relation for remote table "pose" */
export type PoseObjRelInsertInput = {
  data: PoseInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<PoseOnConflict>;
};

/** on conflict condition type for table "pose" */
export type PoseOnConflict = {
  constraint: PoseConstraint;
  update_columns?: Array<PoseUpdateColumn>;
  where?: Maybe<PoseBoolExp>;
};

/** Ordering options when selecting data from "pose". */
export type PoseOrderBy = {
  coordinates?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurements_aggregate?: Maybe<MeasurementAggregateOrderBy>;
  rotation_vector_x?: Maybe<OrderBy>;
  rotation_vector_y?: Maybe<OrderBy>;
  rotation_vector_z?: Maybe<OrderBy>;
};

/** primary key columns input for table: pose */
export type PosePkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "pose" */
export enum PoseSelectColumn {
  /** column name */
  coordinates = 'coordinates',
  /** column name */
  id = 'id',
  /** column name */
  rotation_vector_x = 'rotation_vector_x',
  /** column name */
  rotation_vector_y = 'rotation_vector_y',
  /** column name */
  rotation_vector_z = 'rotation_vector_z',
}

/** input type for updating data in table "pose" */
export type PoseSetInput = {
  coordinates?: Maybe<Scalars['geometry']>;
  id?: Maybe<Scalars['Int']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate stddev on columns */
export type PoseStddevFields = {
  __typename?: 'pose_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PoseStddevPopFields = {
  __typename?: 'pose_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PoseStddevSampFields = {
  __typename?: 'pose_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PoseSumFields = {
  __typename?: 'pose_sum_fields';
  id?: Maybe<Scalars['Int']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** update columns of table "pose" */
export enum PoseUpdateColumn {
  /** column name */
  coordinates = 'coordinates',
  /** column name */
  id = 'id',
  /** column name */
  rotation_vector_x = 'rotation_vector_x',
  /** column name */
  rotation_vector_y = 'rotation_vector_y',
  /** column name */
  rotation_vector_z = 'rotation_vector_z',
}

/** aggregate var_pop on columns */
export type PoseVarPopFields = {
  __typename?: 'pose_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PoseVarSampFields = {
  __typename?: 'pose_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PoseVarianceFields = {
  __typename?: 'pose_variance_fields';
  id?: Maybe<Scalars['Float']>;
  rotation_vector_x?: Maybe<Scalars['Float']>;
  rotation_vector_y?: Maybe<Scalars['Float']>;
  rotation_vector_z?: Maybe<Scalars['Float']>;
};

export type QueryRoot = {
  __typename?: 'query_root';
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  address_aggregate: AddressAggregate;
  /** fetch data from the table: "address" using primary key columns */
  address_by_pk?: Maybe<Address>;
  /** fetch data from the table: "classification" */
  classification: Array<Classification>;
  /** fetch aggregated fields from the table: "classification" */
  classification_aggregate: ClassificationAggregate;
  /** fetch data from the table: "classification" using primary key columns */
  classification_by_pk?: Maybe<Classification>;
  /** fetch data from the table: "compute" */
  compute: Array<Compute>;
  /** fetch aggregated fields from the table: "compute" */
  compute_aggregate: ComputeAggregate;
  /** fetch data from the table: "compute" using primary key columns */
  compute_by_pk?: Maybe<Compute>;
  /** fetch data from the table: "config" */
  config: Array<Config>;
  /** fetch aggregated fields from the table: "config" */
  config_aggregate: ConfigAggregate;
  /** fetch data from the table: "config" using primary key columns */
  config_by_pk?: Maybe<Config>;
  /** fetch data from the table: "detection" */
  detection: Array<Detection>;
  /** fetch aggregated fields from the table: "detection" */
  detection_aggregate: DetectionAggregate;
  /** fetch data from the table: "detection" using primary key columns */
  detection_by_pk?: Maybe<Detection>;
  /** fetch data from the table: "detection_run" */
  detection_run: Array<DetectionRun>;
  /** fetch aggregated fields from the table: "detection_run" */
  detection_run_aggregate: DetectionRunAggregate;
  /** fetch data from the table: "detection_run" using primary key columns */
  detection_run_by_pk?: Maybe<DetectionRun>;
  /** fetch data from the table: "detector" */
  detector: Array<Detector>;
  /** fetch aggregated fields from the table: "detector" */
  detector_aggregate: DetectorAggregate;
  /** fetch data from the table: "detector" using primary key columns */
  detector_by_pk?: Maybe<Detector>;
  /** fetch data from the table: "enumeration" */
  enumeration: Array<Enumeration>;
  /** fetch aggregated fields from the table: "enumeration" */
  enumeration_aggregate: EnumerationAggregate;
  /** fetch data from the table: "enumeration" using primary key columns */
  enumeration_by_pk?: Maybe<Enumeration>;
  /** fetch data from the table: "geography_columns" */
  geography_columns: Array<GeographyColumns>;
  /** fetch aggregated fields from the table: "geography_columns" */
  geography_columns_aggregate: GeographyColumnsAggregate;
  /** fetch data from the table: "geometry_columns" */
  geometry_columns: Array<GeometryColumns>;
  /** fetch aggregated fields from the table: "geometry_columns" */
  geometry_columns_aggregate: GeometryColumnsAggregate;
  getMyLogEvent?: Maybe<MyLogEvent>;
  /** fetch data from the table: "growth_cycle" */
  growth_cycle: Array<GrowthCycle>;
  /** fetch aggregated fields from the table: "growth_cycle" */
  growth_cycle_aggregate: GrowthCycleAggregate;
  /** fetch data from the table: "growth_cycle" using primary key columns */
  growth_cycle_by_pk?: Maybe<GrowthCycle>;
  /** fetch data from the table: "heat_map" */
  heat_map: Array<HeatMap>;
  /** fetch aggregated fields from the table: "heat_map" */
  heat_map_aggregate: HeatMapAggregate;
  /** fetch data from the table: "heat_map" using primary key columns */
  heat_map_by_pk?: Maybe<HeatMap>;
  /** fetch data from the table: "label_task" */
  label_task: Array<LabelTask>;
  /** fetch aggregated fields from the table: "label_task" */
  label_task_aggregate: LabelTaskAggregate;
  /** fetch data from the table: "label_task" using primary key columns */
  label_task_by_pk?: Maybe<LabelTask>;
  /** fetch data from the table: "lambda_run" */
  lambda_run: Array<LambdaRun>;
  /** fetch aggregated fields from the table: "lambda_run" */
  lambda_run_aggregate: LambdaRunAggregate;
  /** fetch data from the table: "lambda_run" using primary key columns */
  lambda_run_by_pk?: Maybe<LambdaRun>;
  /** fetch data from the table: "lambda_run_measurement_run" */
  lambda_run_measurement_run: Array<LambdaRunMeasurementRun>;
  /** fetch aggregated fields from the table: "lambda_run_measurement_run" */
  lambda_run_measurement_run_aggregate: LambdaRunMeasurementRunAggregate;
  /** fetch data from the table: "lambda_run_measurement_run" using primary key columns */
  lambda_run_measurement_run_by_pk?: Maybe<LambdaRunMeasurementRun>;
  /** fetch data from the table: "lambda_version" */
  lambda_version: Array<LambdaVersion>;
  /** fetch aggregated fields from the table: "lambda_version" */
  lambda_version_aggregate: LambdaVersionAggregate;
  /** fetch data from the table: "lambda_version" using primary key columns */
  lambda_version_by_pk?: Maybe<LambdaVersion>;
  /** fetch data from the table: "location" */
  location: Array<Location>;
  /** fetch aggregated fields from the table: "location" */
  location_aggregate: LocationAggregate;
  /** fetch data from the table: "location" using primary key columns */
  location_by_pk?: Maybe<Location>;
  /** fetch data from the table: "measurement" */
  measurement: Array<Measurement>;
  /** fetch aggregated fields from the table: "measurement" */
  measurement_aggregate: MeasurementAggregate;
  /** fetch data from the table: "measurement" using primary key columns */
  measurement_by_pk?: Maybe<Measurement>;
  /** fetch data from the table: "measurement_run" */
  measurement_run: Array<MeasurementRun>;
  /** fetch aggregated fields from the table: "measurement_run" */
  measurement_run_aggregate: MeasurementRunAggregate;
  /** fetch data from the table: "measurement_run" using primary key columns */
  measurement_run_by_pk?: Maybe<MeasurementRun>;
  /** fetch data from the table: "organization" */
  organization: Array<Organization>;
  /** fetch aggregated fields from the table: "organization" */
  organization_aggregate: OrganizationAggregate;
  /** fetch data from the table: "organization" using primary key columns */
  organization_by_pk?: Maybe<Organization>;
  /** An array relationship */
  parameters: Array<Parameters>;
  /** An aggregate relationship */
  parameters_aggregate: ParametersAggregate;
  /** fetch data from the table: "parameters" using primary key columns */
  parameters_by_pk?: Maybe<Parameters>;
  /** fetch data from the table: "pg_stat_statements" */
  pg_stat_statements: Array<PgStatStatements>;
  /** fetch aggregated fields from the table: "pg_stat_statements" */
  pg_stat_statements_aggregate: PgStatStatementsAggregate;
  /** fetch data from the table: "pose" */
  pose: Array<Pose>;
  /** fetch aggregated fields from the table: "pose" */
  pose_aggregate: PoseAggregate;
  /** fetch data from the table: "pose" using primary key columns */
  pose_by_pk?: Maybe<Pose>;
  /** fetch data from the table: "spatial_ref_sys" */
  spatial_ref_sys: Array<SpatialRefSys>;
  /** fetch aggregated fields from the table: "spatial_ref_sys" */
  spatial_ref_sys_aggregate: SpatialRefSysAggregate;
  /** fetch data from the table: "spatial_ref_sys" using primary key columns */
  spatial_ref_sys_by_pk?: Maybe<SpatialRefSys>;
  /** fetch data from the table: "system" */
  system: Array<System>;
  /** fetch aggregated fields from the table: "system" */
  system_aggregate: SystemAggregate;
  /** fetch data from the table: "system" using primary key columns */
  system_by_pk?: Maybe<System>;
  /** fetch data from the table: "track" */
  track: Array<Track>;
  /** fetch aggregated fields from the table: "track" */
  track_aggregate: TrackAggregate;
  /** fetch data from the table: "track" using primary key columns */
  track_by_pk?: Maybe<Track>;
  /** An array relationship */
  track_detections: Array<TrackDetections>;
  /** An aggregate relationship */
  track_detections_aggregate: TrackDetectionsAggregate;
  /** fetch data from the table: "track_detections" using primary key columns */
  track_detections_by_pk?: Maybe<TrackDetections>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_label" */
  user_label: Array<UserLabel>;
  /** fetch aggregated fields from the table: "user_label" */
  user_label_aggregate: UserLabelAggregate;
  /** fetch data from the table: "user_label" using primary key columns */
  user_label_by_pk?: Maybe<UserLabel>;
  /** fetch data from the table: "version" */
  version: Array<Version>;
  /** fetch aggregated fields from the table: "version" */
  version_aggregate: VersionAggregate;
  /** fetch data from the table: "version" using primary key columns */
  version_by_pk?: Maybe<Version>;
  /** fetch data from the table: "zone" */
  zone: Array<Zone>;
  /** fetch aggregated fields from the table: "zone" */
  zone_aggregate: ZoneAggregate;
  /** fetch data from the table: "zone" using primary key columns */
  zone_by_pk?: Maybe<Zone>;
};

export type QueryRootAddressArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

export type QueryRootAddressAggregateArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

export type QueryRootAddressByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootClassificationArgs = {
  distinct_on?: Maybe<Array<ClassificationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ClassificationOrderBy>>;
  where?: Maybe<ClassificationBoolExp>;
};

export type QueryRootClassificationAggregateArgs = {
  distinct_on?: Maybe<Array<ClassificationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ClassificationOrderBy>>;
  where?: Maybe<ClassificationBoolExp>;
};

export type QueryRootClassificationByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootComputeArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

export type QueryRootComputeAggregateArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

export type QueryRootComputeByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootConfigArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

export type QueryRootConfigAggregateArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

export type QueryRootConfigByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootDetectionArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

export type QueryRootDetectionAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

export type QueryRootDetectionByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootDetectionRunArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

export type QueryRootDetectionRunAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

export type QueryRootDetectionRunByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootDetectorArgs = {
  distinct_on?: Maybe<Array<DetectorSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectorOrderBy>>;
  where?: Maybe<DetectorBoolExp>;
};

export type QueryRootDetectorAggregateArgs = {
  distinct_on?: Maybe<Array<DetectorSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectorOrderBy>>;
  where?: Maybe<DetectorBoolExp>;
};

export type QueryRootDetectorByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootEnumerationArgs = {
  distinct_on?: Maybe<Array<EnumerationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<EnumerationOrderBy>>;
  where?: Maybe<EnumerationBoolExp>;
};

export type QueryRootEnumerationAggregateArgs = {
  distinct_on?: Maybe<Array<EnumerationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<EnumerationOrderBy>>;
  where?: Maybe<EnumerationBoolExp>;
};

export type QueryRootEnumerationByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootGeographyColumnsArgs = {
  distinct_on?: Maybe<Array<GeographyColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeographyColumnsOrderBy>>;
  where?: Maybe<GeographyColumnsBoolExp>;
};

export type QueryRootGeographyColumnsAggregateArgs = {
  distinct_on?: Maybe<Array<GeographyColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeographyColumnsOrderBy>>;
  where?: Maybe<GeographyColumnsBoolExp>;
};

export type QueryRootGeometryColumnsArgs = {
  distinct_on?: Maybe<Array<GeometryColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeometryColumnsOrderBy>>;
  where?: Maybe<GeometryColumnsBoolExp>;
};

export type QueryRootGeometryColumnsAggregateArgs = {
  distinct_on?: Maybe<Array<GeometryColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeometryColumnsOrderBy>>;
  where?: Maybe<GeometryColumnsBoolExp>;
};

export type QueryRootGetMyLogEventArgs = {
  device: Scalars['String'];
  timestamp: Scalars['Int'];
};

export type QueryRootGrowthCycleArgs = {
  distinct_on?: Maybe<Array<GrowthCycleSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GrowthCycleOrderBy>>;
  where?: Maybe<GrowthCycleBoolExp>;
};

export type QueryRootGrowthCycleAggregateArgs = {
  distinct_on?: Maybe<Array<GrowthCycleSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GrowthCycleOrderBy>>;
  where?: Maybe<GrowthCycleBoolExp>;
};

export type QueryRootGrowthCycleByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootHeatMapArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

export type QueryRootHeatMapAggregateArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

export type QueryRootHeatMapByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootLabelTaskArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

export type QueryRootLabelTaskAggregateArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

export type QueryRootLabelTaskByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootLambdaRunArgs = {
  distinct_on?: Maybe<Array<LambdaRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunOrderBy>>;
  where?: Maybe<LambdaRunBoolExp>;
};

export type QueryRootLambdaRunAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunOrderBy>>;
  where?: Maybe<LambdaRunBoolExp>;
};

export type QueryRootLambdaRunByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootLambdaRunMeasurementRunArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

export type QueryRootLambdaRunMeasurementRunAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

export type QueryRootLambdaRunMeasurementRunByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootLambdaVersionArgs = {
  distinct_on?: Maybe<Array<LambdaVersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaVersionOrderBy>>;
  where?: Maybe<LambdaVersionBoolExp>;
};

export type QueryRootLambdaVersionAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaVersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaVersionOrderBy>>;
  where?: Maybe<LambdaVersionBoolExp>;
};

export type QueryRootLambdaVersionByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootLocationArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

export type QueryRootLocationAggregateArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

export type QueryRootLocationByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootMeasurementArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

export type QueryRootMeasurementAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

export type QueryRootMeasurementByPkArgs = {
  id: Scalars['bigint'];
  time: Scalars['timestamptz'];
};

export type QueryRootMeasurementRunArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

export type QueryRootMeasurementRunAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

export type QueryRootMeasurementRunByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootOrganizationArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

export type QueryRootOrganizationAggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

export type QueryRootOrganizationByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootParametersArgs = {
  distinct_on?: Maybe<Array<ParametersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ParametersOrderBy>>;
  where?: Maybe<ParametersBoolExp>;
};

export type QueryRootParametersAggregateArgs = {
  distinct_on?: Maybe<Array<ParametersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ParametersOrderBy>>;
  where?: Maybe<ParametersBoolExp>;
};

export type QueryRootParametersByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootPgStatStatementsArgs = {
  distinct_on?: Maybe<Array<PgStatStatementsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PgStatStatementsOrderBy>>;
  where?: Maybe<PgStatStatementsBoolExp>;
};

export type QueryRootPgStatStatementsAggregateArgs = {
  distinct_on?: Maybe<Array<PgStatStatementsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PgStatStatementsOrderBy>>;
  where?: Maybe<PgStatStatementsBoolExp>;
};

export type QueryRootPoseArgs = {
  distinct_on?: Maybe<Array<PoseSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PoseOrderBy>>;
  where?: Maybe<PoseBoolExp>;
};

export type QueryRootPoseAggregateArgs = {
  distinct_on?: Maybe<Array<PoseSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PoseOrderBy>>;
  where?: Maybe<PoseBoolExp>;
};

export type QueryRootPoseByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootSpatialRefSysArgs = {
  distinct_on?: Maybe<Array<SpatialRefSysSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SpatialRefSysOrderBy>>;
  where?: Maybe<SpatialRefSysBoolExp>;
};

export type QueryRootSpatialRefSysAggregateArgs = {
  distinct_on?: Maybe<Array<SpatialRefSysSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SpatialRefSysOrderBy>>;
  where?: Maybe<SpatialRefSysBoolExp>;
};

export type QueryRootSpatialRefSysByPkArgs = {
  srid: Scalars['Int'];
};

export type QueryRootSystemArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

export type QueryRootSystemAggregateArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

export type QueryRootSystemByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootTrackArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

export type QueryRootTrackAggregateArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

export type QueryRootTrackByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootTrackDetectionsArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

export type QueryRootTrackDetectionsAggregateArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

export type QueryRootTrackDetectionsByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootUserArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

export type QueryRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

export type QueryRootUserByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootUserLabelArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

export type QueryRootUserLabelAggregateArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

export type QueryRootUserLabelByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootVersionArgs = {
  distinct_on?: Maybe<Array<VersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<VersionOrderBy>>;
  where?: Maybe<VersionBoolExp>;
};

export type QueryRootVersionAggregateArgs = {
  distinct_on?: Maybe<Array<VersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<VersionOrderBy>>;
  where?: Maybe<VersionBoolExp>;
};

export type QueryRootVersionByPkArgs = {
  id: Scalars['Int'];
};

export type QueryRootZoneArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

export type QueryRootZoneAggregateArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

export type QueryRootZoneByPkArgs = {
  id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type SmallintComparisonExp = {
  _eq?: Maybe<Scalars['smallint']>;
  _gt?: Maybe<Scalars['smallint']>;
  _gte?: Maybe<Scalars['smallint']>;
  _in?: Maybe<Array<Scalars['smallint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['smallint']>;
  _lte?: Maybe<Scalars['smallint']>;
  _neq?: Maybe<Scalars['smallint']>;
  _nin?: Maybe<Array<Scalars['smallint']>>;
};

/** columns and relationships of "spatial_ref_sys" */
export type SpatialRefSys = {
  __typename?: 'spatial_ref_sys';
  auth_name?: Maybe<Scalars['String']>;
  auth_srid?: Maybe<Scalars['Int']>;
  proj4text?: Maybe<Scalars['String']>;
  srid: Scalars['Int'];
  srtext?: Maybe<Scalars['String']>;
};

/** aggregated selection of "spatial_ref_sys" */
export type SpatialRefSysAggregate = {
  __typename?: 'spatial_ref_sys_aggregate';
  aggregate?: Maybe<SpatialRefSysAggregateFields>;
  nodes: Array<SpatialRefSys>;
};

/** aggregate fields of "spatial_ref_sys" */
export type SpatialRefSysAggregateFields = {
  __typename?: 'spatial_ref_sys_aggregate_fields';
  avg?: Maybe<SpatialRefSysAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<SpatialRefSysMaxFields>;
  min?: Maybe<SpatialRefSysMinFields>;
  stddev?: Maybe<SpatialRefSysStddevFields>;
  stddev_pop?: Maybe<SpatialRefSysStddevPopFields>;
  stddev_samp?: Maybe<SpatialRefSysStddevSampFields>;
  sum?: Maybe<SpatialRefSysSumFields>;
  var_pop?: Maybe<SpatialRefSysVarPopFields>;
  var_samp?: Maybe<SpatialRefSysVarSampFields>;
  variance?: Maybe<SpatialRefSysVarianceFields>;
};

/** aggregate fields of "spatial_ref_sys" */
export type SpatialRefSysAggregateFieldsCountArgs = {
  columns?: Maybe<Array<SpatialRefSysSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type SpatialRefSysAvgFields = {
  __typename?: 'spatial_ref_sys_avg_fields';
  auth_srid?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "spatial_ref_sys". All fields are combined with a logical 'AND'. */
export type SpatialRefSysBoolExp = {
  _and?: Maybe<Array<SpatialRefSysBoolExp>>;
  _not?: Maybe<SpatialRefSysBoolExp>;
  _or?: Maybe<Array<SpatialRefSysBoolExp>>;
  auth_name?: Maybe<StringComparisonExp>;
  auth_srid?: Maybe<IntComparisonExp>;
  proj4text?: Maybe<StringComparisonExp>;
  srid?: Maybe<IntComparisonExp>;
  srtext?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "spatial_ref_sys" */
export enum SpatialRefSysConstraint {
  /** unique or primary key constraint */
  spatial_ref_sys_pkey = 'spatial_ref_sys_pkey',
}

/** input type for incrementing numeric columns in table "spatial_ref_sys" */
export type SpatialRefSysIncInput = {
  auth_srid?: Maybe<Scalars['Int']>;
  srid?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "spatial_ref_sys" */
export type SpatialRefSysInsertInput = {
  auth_name?: Maybe<Scalars['String']>;
  auth_srid?: Maybe<Scalars['Int']>;
  proj4text?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
  srtext?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type SpatialRefSysMaxFields = {
  __typename?: 'spatial_ref_sys_max_fields';
  auth_name?: Maybe<Scalars['String']>;
  auth_srid?: Maybe<Scalars['Int']>;
  proj4text?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
  srtext?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type SpatialRefSysMinFields = {
  __typename?: 'spatial_ref_sys_min_fields';
  auth_name?: Maybe<Scalars['String']>;
  auth_srid?: Maybe<Scalars['Int']>;
  proj4text?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
  srtext?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "spatial_ref_sys" */
export type SpatialRefSysMutationResponse = {
  __typename?: 'spatial_ref_sys_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<SpatialRefSys>;
};

/** on conflict condition type for table "spatial_ref_sys" */
export type SpatialRefSysOnConflict = {
  constraint: SpatialRefSysConstraint;
  update_columns?: Array<SpatialRefSysUpdateColumn>;
  where?: Maybe<SpatialRefSysBoolExp>;
};

/** Ordering options when selecting data from "spatial_ref_sys". */
export type SpatialRefSysOrderBy = {
  auth_name?: Maybe<OrderBy>;
  auth_srid?: Maybe<OrderBy>;
  proj4text?: Maybe<OrderBy>;
  srid?: Maybe<OrderBy>;
  srtext?: Maybe<OrderBy>;
};

/** primary key columns input for table: spatial_ref_sys */
export type SpatialRefSysPkColumnsInput = {
  srid: Scalars['Int'];
};

/** select columns of table "spatial_ref_sys" */
export enum SpatialRefSysSelectColumn {
  /** column name */
  auth_name = 'auth_name',
  /** column name */
  auth_srid = 'auth_srid',
  /** column name */
  proj4text = 'proj4text',
  /** column name */
  srid = 'srid',
  /** column name */
  srtext = 'srtext',
}

/** input type for updating data in table "spatial_ref_sys" */
export type SpatialRefSysSetInput = {
  auth_name?: Maybe<Scalars['String']>;
  auth_srid?: Maybe<Scalars['Int']>;
  proj4text?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
  srtext?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type SpatialRefSysStddevFields = {
  __typename?: 'spatial_ref_sys_stddev_fields';
  auth_srid?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type SpatialRefSysStddevPopFields = {
  __typename?: 'spatial_ref_sys_stddev_pop_fields';
  auth_srid?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type SpatialRefSysStddevSampFields = {
  __typename?: 'spatial_ref_sys_stddev_samp_fields';
  auth_srid?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type SpatialRefSysSumFields = {
  __typename?: 'spatial_ref_sys_sum_fields';
  auth_srid?: Maybe<Scalars['Int']>;
  srid?: Maybe<Scalars['Int']>;
};

/** update columns of table "spatial_ref_sys" */
export enum SpatialRefSysUpdateColumn {
  /** column name */
  auth_name = 'auth_name',
  /** column name */
  auth_srid = 'auth_srid',
  /** column name */
  proj4text = 'proj4text',
  /** column name */
  srid = 'srid',
  /** column name */
  srtext = 'srtext',
}

/** aggregate var_pop on columns */
export type SpatialRefSysVarPopFields = {
  __typename?: 'spatial_ref_sys_var_pop_fields';
  auth_srid?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type SpatialRefSysVarSampFields = {
  __typename?: 'spatial_ref_sys_var_samp_fields';
  auth_srid?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type SpatialRefSysVarianceFields = {
  __typename?: 'spatial_ref_sys_variance_fields';
  auth_srid?: Maybe<Scalars['Float']>;
  srid?: Maybe<Scalars['Float']>;
};

export type StDWithinGeographyInput = {
  distance: Scalars['Float'];
  start: Scalars['geography'];
  use_spheroid?: Maybe<Scalars['Boolean']>;
};

export type StDWithinInput = {
  distance: Scalars['Float'];
  start: Scalars['geometry'];
};

export type SubscriptionRoot = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  address_aggregate: AddressAggregate;
  /** fetch data from the table: "address" using primary key columns */
  address_by_pk?: Maybe<Address>;
  /** fetch data from the table: "classification" */
  classification: Array<Classification>;
  /** fetch aggregated fields from the table: "classification" */
  classification_aggregate: ClassificationAggregate;
  /** fetch data from the table: "classification" using primary key columns */
  classification_by_pk?: Maybe<Classification>;
  /** fetch data from the table: "compute" */
  compute: Array<Compute>;
  /** fetch aggregated fields from the table: "compute" */
  compute_aggregate: ComputeAggregate;
  /** fetch data from the table: "compute" using primary key columns */
  compute_by_pk?: Maybe<Compute>;
  /** fetch data from the table: "config" */
  config: Array<Config>;
  /** fetch aggregated fields from the table: "config" */
  config_aggregate: ConfigAggregate;
  /** fetch data from the table: "config" using primary key columns */
  config_by_pk?: Maybe<Config>;
  /** fetch data from the table: "detection" */
  detection: Array<Detection>;
  /** fetch aggregated fields from the table: "detection" */
  detection_aggregate: DetectionAggregate;
  /** fetch data from the table: "detection" using primary key columns */
  detection_by_pk?: Maybe<Detection>;
  /** fetch data from the table: "detection_run" */
  detection_run: Array<DetectionRun>;
  /** fetch aggregated fields from the table: "detection_run" */
  detection_run_aggregate: DetectionRunAggregate;
  /** fetch data from the table: "detection_run" using primary key columns */
  detection_run_by_pk?: Maybe<DetectionRun>;
  /** fetch data from the table: "detector" */
  detector: Array<Detector>;
  /** fetch aggregated fields from the table: "detector" */
  detector_aggregate: DetectorAggregate;
  /** fetch data from the table: "detector" using primary key columns */
  detector_by_pk?: Maybe<Detector>;
  /** fetch data from the table: "enumeration" */
  enumeration: Array<Enumeration>;
  /** fetch aggregated fields from the table: "enumeration" */
  enumeration_aggregate: EnumerationAggregate;
  /** fetch data from the table: "enumeration" using primary key columns */
  enumeration_by_pk?: Maybe<Enumeration>;
  /** fetch data from the table: "geography_columns" */
  geography_columns: Array<GeographyColumns>;
  /** fetch aggregated fields from the table: "geography_columns" */
  geography_columns_aggregate: GeographyColumnsAggregate;
  /** fetch data from the table: "geometry_columns" */
  geometry_columns: Array<GeometryColumns>;
  /** fetch aggregated fields from the table: "geometry_columns" */
  geometry_columns_aggregate: GeometryColumnsAggregate;
  /** fetch data from the table: "growth_cycle" */
  growth_cycle: Array<GrowthCycle>;
  /** fetch aggregated fields from the table: "growth_cycle" */
  growth_cycle_aggregate: GrowthCycleAggregate;
  /** fetch data from the table: "growth_cycle" using primary key columns */
  growth_cycle_by_pk?: Maybe<GrowthCycle>;
  /** fetch data from the table: "heat_map" */
  heat_map: Array<HeatMap>;
  /** fetch aggregated fields from the table: "heat_map" */
  heat_map_aggregate: HeatMapAggregate;
  /** fetch data from the table: "heat_map" using primary key columns */
  heat_map_by_pk?: Maybe<HeatMap>;
  /** fetch data from the table: "label_task" */
  label_task: Array<LabelTask>;
  /** fetch aggregated fields from the table: "label_task" */
  label_task_aggregate: LabelTaskAggregate;
  /** fetch data from the table: "label_task" using primary key columns */
  label_task_by_pk?: Maybe<LabelTask>;
  /** fetch data from the table: "lambda_run" */
  lambda_run: Array<LambdaRun>;
  /** fetch aggregated fields from the table: "lambda_run" */
  lambda_run_aggregate: LambdaRunAggregate;
  /** fetch data from the table: "lambda_run" using primary key columns */
  lambda_run_by_pk?: Maybe<LambdaRun>;
  /** fetch data from the table: "lambda_run_measurement_run" */
  lambda_run_measurement_run: Array<LambdaRunMeasurementRun>;
  /** fetch aggregated fields from the table: "lambda_run_measurement_run" */
  lambda_run_measurement_run_aggregate: LambdaRunMeasurementRunAggregate;
  /** fetch data from the table: "lambda_run_measurement_run" using primary key columns */
  lambda_run_measurement_run_by_pk?: Maybe<LambdaRunMeasurementRun>;
  /** fetch data from the table: "lambda_version" */
  lambda_version: Array<LambdaVersion>;
  /** fetch aggregated fields from the table: "lambda_version" */
  lambda_version_aggregate: LambdaVersionAggregate;
  /** fetch data from the table: "lambda_version" using primary key columns */
  lambda_version_by_pk?: Maybe<LambdaVersion>;
  /** fetch data from the table: "location" */
  location: Array<Location>;
  /** fetch aggregated fields from the table: "location" */
  location_aggregate: LocationAggregate;
  /** fetch data from the table: "location" using primary key columns */
  location_by_pk?: Maybe<Location>;
  /** fetch data from the table: "measurement" */
  measurement: Array<Measurement>;
  /** fetch aggregated fields from the table: "measurement" */
  measurement_aggregate: MeasurementAggregate;
  /** fetch data from the table: "measurement" using primary key columns */
  measurement_by_pk?: Maybe<Measurement>;
  /** fetch data from the table: "measurement_run" */
  measurement_run: Array<MeasurementRun>;
  /** fetch aggregated fields from the table: "measurement_run" */
  measurement_run_aggregate: MeasurementRunAggregate;
  /** fetch data from the table: "measurement_run" using primary key columns */
  measurement_run_by_pk?: Maybe<MeasurementRun>;
  /** fetch data from the table: "organization" */
  organization: Array<Organization>;
  /** fetch aggregated fields from the table: "organization" */
  organization_aggregate: OrganizationAggregate;
  /** fetch data from the table: "organization" using primary key columns */
  organization_by_pk?: Maybe<Organization>;
  /** An array relationship */
  parameters: Array<Parameters>;
  /** An aggregate relationship */
  parameters_aggregate: ParametersAggregate;
  /** fetch data from the table: "parameters" using primary key columns */
  parameters_by_pk?: Maybe<Parameters>;
  /** fetch data from the table: "pg_stat_statements" */
  pg_stat_statements: Array<PgStatStatements>;
  /** fetch aggregated fields from the table: "pg_stat_statements" */
  pg_stat_statements_aggregate: PgStatStatementsAggregate;
  /** fetch data from the table: "pose" */
  pose: Array<Pose>;
  /** fetch aggregated fields from the table: "pose" */
  pose_aggregate: PoseAggregate;
  /** fetch data from the table: "pose" using primary key columns */
  pose_by_pk?: Maybe<Pose>;
  /** fetch data from the table: "spatial_ref_sys" */
  spatial_ref_sys: Array<SpatialRefSys>;
  /** fetch aggregated fields from the table: "spatial_ref_sys" */
  spatial_ref_sys_aggregate: SpatialRefSysAggregate;
  /** fetch data from the table: "spatial_ref_sys" using primary key columns */
  spatial_ref_sys_by_pk?: Maybe<SpatialRefSys>;
  /** fetch data from the table: "system" */
  system: Array<System>;
  /** fetch aggregated fields from the table: "system" */
  system_aggregate: SystemAggregate;
  /** fetch data from the table: "system" using primary key columns */
  system_by_pk?: Maybe<System>;
  /** fetch data from the table: "track" */
  track: Array<Track>;
  /** fetch aggregated fields from the table: "track" */
  track_aggregate: TrackAggregate;
  /** fetch data from the table: "track" using primary key columns */
  track_by_pk?: Maybe<Track>;
  /** An array relationship */
  track_detections: Array<TrackDetections>;
  /** An aggregate relationship */
  track_detections_aggregate: TrackDetectionsAggregate;
  /** fetch data from the table: "track_detections" using primary key columns */
  track_detections_by_pk?: Maybe<TrackDetections>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table: "user_label" */
  user_label: Array<UserLabel>;
  /** fetch aggregated fields from the table: "user_label" */
  user_label_aggregate: UserLabelAggregate;
  /** fetch data from the table: "user_label" using primary key columns */
  user_label_by_pk?: Maybe<UserLabel>;
  /** fetch data from the table: "version" */
  version: Array<Version>;
  /** fetch aggregated fields from the table: "version" */
  version_aggregate: VersionAggregate;
  /** fetch data from the table: "version" using primary key columns */
  version_by_pk?: Maybe<Version>;
  /** fetch data from the table: "zone" */
  zone: Array<Zone>;
  /** fetch aggregated fields from the table: "zone" */
  zone_aggregate: ZoneAggregate;
  /** fetch data from the table: "zone" using primary key columns */
  zone_by_pk?: Maybe<Zone>;
};

export type SubscriptionRootAddressArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

export type SubscriptionRootAddressAggregateArgs = {
  distinct_on?: Maybe<Array<AddressSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<AddressOrderBy>>;
  where?: Maybe<AddressBoolExp>;
};

export type SubscriptionRootAddressByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootClassificationArgs = {
  distinct_on?: Maybe<Array<ClassificationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ClassificationOrderBy>>;
  where?: Maybe<ClassificationBoolExp>;
};

export type SubscriptionRootClassificationAggregateArgs = {
  distinct_on?: Maybe<Array<ClassificationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ClassificationOrderBy>>;
  where?: Maybe<ClassificationBoolExp>;
};

export type SubscriptionRootClassificationByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootComputeArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

export type SubscriptionRootComputeAggregateArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

export type SubscriptionRootComputeByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootConfigArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

export type SubscriptionRootConfigAggregateArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

export type SubscriptionRootConfigByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootDetectionArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

export type SubscriptionRootDetectionAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionOrderBy>>;
  where?: Maybe<DetectionBoolExp>;
};

export type SubscriptionRootDetectionByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootDetectionRunArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

export type SubscriptionRootDetectionRunAggregateArgs = {
  distinct_on?: Maybe<Array<DetectionRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectionRunOrderBy>>;
  where?: Maybe<DetectionRunBoolExp>;
};

export type SubscriptionRootDetectionRunByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootDetectorArgs = {
  distinct_on?: Maybe<Array<DetectorSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectorOrderBy>>;
  where?: Maybe<DetectorBoolExp>;
};

export type SubscriptionRootDetectorAggregateArgs = {
  distinct_on?: Maybe<Array<DetectorSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectorOrderBy>>;
  where?: Maybe<DetectorBoolExp>;
};

export type SubscriptionRootDetectorByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootEnumerationArgs = {
  distinct_on?: Maybe<Array<EnumerationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<EnumerationOrderBy>>;
  where?: Maybe<EnumerationBoolExp>;
};

export type SubscriptionRootEnumerationAggregateArgs = {
  distinct_on?: Maybe<Array<EnumerationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<EnumerationOrderBy>>;
  where?: Maybe<EnumerationBoolExp>;
};

export type SubscriptionRootEnumerationByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootGeographyColumnsArgs = {
  distinct_on?: Maybe<Array<GeographyColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeographyColumnsOrderBy>>;
  where?: Maybe<GeographyColumnsBoolExp>;
};

export type SubscriptionRootGeographyColumnsAggregateArgs = {
  distinct_on?: Maybe<Array<GeographyColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeographyColumnsOrderBy>>;
  where?: Maybe<GeographyColumnsBoolExp>;
};

export type SubscriptionRootGeometryColumnsArgs = {
  distinct_on?: Maybe<Array<GeometryColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeometryColumnsOrderBy>>;
  where?: Maybe<GeometryColumnsBoolExp>;
};

export type SubscriptionRootGeometryColumnsAggregateArgs = {
  distinct_on?: Maybe<Array<GeometryColumnsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GeometryColumnsOrderBy>>;
  where?: Maybe<GeometryColumnsBoolExp>;
};

export type SubscriptionRootGrowthCycleArgs = {
  distinct_on?: Maybe<Array<GrowthCycleSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GrowthCycleOrderBy>>;
  where?: Maybe<GrowthCycleBoolExp>;
};

export type SubscriptionRootGrowthCycleAggregateArgs = {
  distinct_on?: Maybe<Array<GrowthCycleSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GrowthCycleOrderBy>>;
  where?: Maybe<GrowthCycleBoolExp>;
};

export type SubscriptionRootGrowthCycleByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootHeatMapArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

export type SubscriptionRootHeatMapAggregateArgs = {
  distinct_on?: Maybe<Array<HeatMapSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<HeatMapOrderBy>>;
  where?: Maybe<HeatMapBoolExp>;
};

export type SubscriptionRootHeatMapByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootLabelTaskArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

export type SubscriptionRootLabelTaskAggregateArgs = {
  distinct_on?: Maybe<Array<LabelTaskSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LabelTaskOrderBy>>;
  where?: Maybe<LabelTaskBoolExp>;
};

export type SubscriptionRootLabelTaskByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootLambdaRunArgs = {
  distinct_on?: Maybe<Array<LambdaRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunOrderBy>>;
  where?: Maybe<LambdaRunBoolExp>;
};

export type SubscriptionRootLambdaRunAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunOrderBy>>;
  where?: Maybe<LambdaRunBoolExp>;
};

export type SubscriptionRootLambdaRunByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootLambdaRunMeasurementRunArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

export type SubscriptionRootLambdaRunMeasurementRunAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaRunMeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaRunMeasurementRunOrderBy>>;
  where?: Maybe<LambdaRunMeasurementRunBoolExp>;
};

export type SubscriptionRootLambdaRunMeasurementRunByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootLambdaVersionArgs = {
  distinct_on?: Maybe<Array<LambdaVersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaVersionOrderBy>>;
  where?: Maybe<LambdaVersionBoolExp>;
};

export type SubscriptionRootLambdaVersionAggregateArgs = {
  distinct_on?: Maybe<Array<LambdaVersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LambdaVersionOrderBy>>;
  where?: Maybe<LambdaVersionBoolExp>;
};

export type SubscriptionRootLambdaVersionByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootLocationArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

export type SubscriptionRootLocationAggregateArgs = {
  distinct_on?: Maybe<Array<LocationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<LocationOrderBy>>;
  where?: Maybe<LocationBoolExp>;
};

export type SubscriptionRootLocationByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootMeasurementArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

export type SubscriptionRootMeasurementAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementOrderBy>>;
  where?: Maybe<MeasurementBoolExp>;
};

export type SubscriptionRootMeasurementByPkArgs = {
  id: Scalars['bigint'];
  time: Scalars['timestamptz'];
};

export type SubscriptionRootMeasurementRunArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

export type SubscriptionRootMeasurementRunAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

export type SubscriptionRootMeasurementRunByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootOrganizationArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

export type SubscriptionRootOrganizationAggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<OrganizationOrderBy>>;
  where?: Maybe<OrganizationBoolExp>;
};

export type SubscriptionRootOrganizationByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootParametersArgs = {
  distinct_on?: Maybe<Array<ParametersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ParametersOrderBy>>;
  where?: Maybe<ParametersBoolExp>;
};

export type SubscriptionRootParametersAggregateArgs = {
  distinct_on?: Maybe<Array<ParametersSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ParametersOrderBy>>;
  where?: Maybe<ParametersBoolExp>;
};

export type SubscriptionRootParametersByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootPgStatStatementsArgs = {
  distinct_on?: Maybe<Array<PgStatStatementsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PgStatStatementsOrderBy>>;
  where?: Maybe<PgStatStatementsBoolExp>;
};

export type SubscriptionRootPgStatStatementsAggregateArgs = {
  distinct_on?: Maybe<Array<PgStatStatementsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PgStatStatementsOrderBy>>;
  where?: Maybe<PgStatStatementsBoolExp>;
};

export type SubscriptionRootPoseArgs = {
  distinct_on?: Maybe<Array<PoseSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PoseOrderBy>>;
  where?: Maybe<PoseBoolExp>;
};

export type SubscriptionRootPoseAggregateArgs = {
  distinct_on?: Maybe<Array<PoseSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<PoseOrderBy>>;
  where?: Maybe<PoseBoolExp>;
};

export type SubscriptionRootPoseByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootSpatialRefSysArgs = {
  distinct_on?: Maybe<Array<SpatialRefSysSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SpatialRefSysOrderBy>>;
  where?: Maybe<SpatialRefSysBoolExp>;
};

export type SubscriptionRootSpatialRefSysAggregateArgs = {
  distinct_on?: Maybe<Array<SpatialRefSysSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SpatialRefSysOrderBy>>;
  where?: Maybe<SpatialRefSysBoolExp>;
};

export type SubscriptionRootSpatialRefSysByPkArgs = {
  srid: Scalars['Int'];
};

export type SubscriptionRootSystemArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

export type SubscriptionRootSystemAggregateArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

export type SubscriptionRootSystemByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootTrackArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

export type SubscriptionRootTrackAggregateArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

export type SubscriptionRootTrackByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootTrackDetectionsArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

export type SubscriptionRootTrackDetectionsAggregateArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

export type SubscriptionRootTrackDetectionsByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootUserArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

export type SubscriptionRootUserAggregateArgs = {
  distinct_on?: Maybe<Array<UserSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserOrderBy>>;
  where?: Maybe<UserBoolExp>;
};

export type SubscriptionRootUserByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootUserLabelArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

export type SubscriptionRootUserLabelAggregateArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

export type SubscriptionRootUserLabelByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootVersionArgs = {
  distinct_on?: Maybe<Array<VersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<VersionOrderBy>>;
  where?: Maybe<VersionBoolExp>;
};

export type SubscriptionRootVersionAggregateArgs = {
  distinct_on?: Maybe<Array<VersionSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<VersionOrderBy>>;
  where?: Maybe<VersionBoolExp>;
};

export type SubscriptionRootVersionByPkArgs = {
  id: Scalars['Int'];
};

export type SubscriptionRootZoneArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

export type SubscriptionRootZoneAggregateArgs = {
  distinct_on?: Maybe<Array<ZoneSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ZoneOrderBy>>;
  where?: Maybe<ZoneBoolExp>;
};

export type SubscriptionRootZoneByPkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "system" */
export type System = {
  __typename?: 'system';
  /** An array relationship */
  computes: Array<Compute>;
  /** An aggregate relationship */
  computes_aggregate: ComputeAggregate;
  /** An array relationship */
  configs: Array<Config>;
  /** An aggregate relationship */
  configs_aggregate: ConfigAggregate;
  hardware_version_id: Scalars['Int'];
  id: Scalars['Int'];
  /** An array relationship */
  measurement_runs: Array<MeasurementRun>;
  /** An aggregate relationship */
  measurement_runs_aggregate: MeasurementRunAggregate;
  metadata?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  organization: Organization;
  organization_id: Scalars['Int'];
  software_version_id: Scalars['Int'];
  /** An array relationship */
  tracks: Array<Track>;
  /** An aggregate relationship */
  tracks_aggregate: TrackAggregate;
  /** An object relationship */
  version: Version;
  /** An object relationship */
  versionBySoftwareVersionId: Version;
  /** An object relationship */
  zone: Zone;
  zone_id: Scalars['Int'];
};

/** columns and relationships of "system" */
export type SystemComputesArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

/** columns and relationships of "system" */
export type SystemComputesAggregateArgs = {
  distinct_on?: Maybe<Array<ComputeSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ComputeOrderBy>>;
  where?: Maybe<ComputeBoolExp>;
};

/** columns and relationships of "system" */
export type SystemConfigsArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

/** columns and relationships of "system" */
export type SystemConfigsAggregateArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

/** columns and relationships of "system" */
export type SystemMeasurementRunsArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

/** columns and relationships of "system" */
export type SystemMeasurementRunsAggregateArgs = {
  distinct_on?: Maybe<Array<MeasurementRunSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<MeasurementRunOrderBy>>;
  where?: Maybe<MeasurementRunBoolExp>;
};

/** columns and relationships of "system" */
export type SystemMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "system" */
export type SystemTracksArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

/** columns and relationships of "system" */
export type SystemTracksAggregateArgs = {
  distinct_on?: Maybe<Array<TrackSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackOrderBy>>;
  where?: Maybe<TrackBoolExp>;
};

/** aggregated selection of "system" */
export type SystemAggregate = {
  __typename?: 'system_aggregate';
  aggregate?: Maybe<SystemAggregateFields>;
  nodes: Array<System>;
};

/** aggregate fields of "system" */
export type SystemAggregateFields = {
  __typename?: 'system_aggregate_fields';
  avg?: Maybe<SystemAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<SystemMaxFields>;
  min?: Maybe<SystemMinFields>;
  stddev?: Maybe<SystemStddevFields>;
  stddev_pop?: Maybe<SystemStddevPopFields>;
  stddev_samp?: Maybe<SystemStddevSampFields>;
  sum?: Maybe<SystemSumFields>;
  var_pop?: Maybe<SystemVarPopFields>;
  var_samp?: Maybe<SystemVarSampFields>;
  variance?: Maybe<SystemVarianceFields>;
};

/** aggregate fields of "system" */
export type SystemAggregateFieldsCountArgs = {
  columns?: Maybe<Array<SystemSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "system" */
export type SystemAggregateOrderBy = {
  avg?: Maybe<SystemAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<SystemMaxOrderBy>;
  min?: Maybe<SystemMinOrderBy>;
  stddev?: Maybe<SystemStddevOrderBy>;
  stddev_pop?: Maybe<SystemStddevPopOrderBy>;
  stddev_samp?: Maybe<SystemStddevSampOrderBy>;
  sum?: Maybe<SystemSumOrderBy>;
  var_pop?: Maybe<SystemVarPopOrderBy>;
  var_samp?: Maybe<SystemVarSampOrderBy>;
  variance?: Maybe<SystemVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type SystemAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "system" */
export type SystemArrRelInsertInput = {
  data: Array<SystemInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<SystemOnConflict>;
};

/** aggregate avg on columns */
export type SystemAvgFields = {
  __typename?: 'system_avg_fields';
  hardware_version_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  software_version_id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "system" */
export type SystemAvgOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "system". All fields are combined with a logical 'AND'. */
export type SystemBoolExp = {
  _and?: Maybe<Array<SystemBoolExp>>;
  _not?: Maybe<SystemBoolExp>;
  _or?: Maybe<Array<SystemBoolExp>>;
  computes?: Maybe<ComputeBoolExp>;
  configs?: Maybe<ConfigBoolExp>;
  hardware_version_id?: Maybe<IntComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  measurement_runs?: Maybe<MeasurementRunBoolExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  organization?: Maybe<OrganizationBoolExp>;
  organization_id?: Maybe<IntComparisonExp>;
  software_version_id?: Maybe<IntComparisonExp>;
  tracks?: Maybe<TrackBoolExp>;
  version?: Maybe<VersionBoolExp>;
  versionBySoftwareVersionId?: Maybe<VersionBoolExp>;
  zone?: Maybe<ZoneBoolExp>;
  zone_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "system" */
export enum SystemConstraint {
  /** unique or primary key constraint */
  system_pkey = 'system_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type SystemDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type SystemDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type SystemDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "system" */
export type SystemIncInput = {
  hardware_version_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  software_version_id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "system" */
export type SystemInsertInput = {
  computes?: Maybe<ComputeArrRelInsertInput>;
  configs?: Maybe<ConfigArrRelInsertInput>;
  hardware_version_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  measurement_runs?: Maybe<MeasurementRunArrRelInsertInput>;
  metadata?: Maybe<Scalars['jsonb']>;
  organization?: Maybe<OrganizationObjRelInsertInput>;
  organization_id?: Maybe<Scalars['Int']>;
  software_version_id?: Maybe<Scalars['Int']>;
  tracks?: Maybe<TrackArrRelInsertInput>;
  version?: Maybe<VersionObjRelInsertInput>;
  versionBySoftwareVersionId?: Maybe<VersionObjRelInsertInput>;
  zone?: Maybe<ZoneObjRelInsertInput>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type SystemMaxFields = {
  __typename?: 'system_max_fields';
  hardware_version_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  software_version_id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "system" */
export type SystemMaxOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type SystemMinFields = {
  __typename?: 'system_min_fields';
  hardware_version_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  software_version_id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "system" */
export type SystemMinOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "system" */
export type SystemMutationResponse = {
  __typename?: 'system_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<System>;
};

/** input type for inserting object relation for remote table "system" */
export type SystemObjRelInsertInput = {
  data: SystemInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<SystemOnConflict>;
};

/** on conflict condition type for table "system" */
export type SystemOnConflict = {
  constraint: SystemConstraint;
  update_columns?: Array<SystemUpdateColumn>;
  where?: Maybe<SystemBoolExp>;
};

/** Ordering options when selecting data from "system". */
export type SystemOrderBy = {
  computes_aggregate?: Maybe<ComputeAggregateOrderBy>;
  configs_aggregate?: Maybe<ConfigAggregateOrderBy>;
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  measurement_runs_aggregate?: Maybe<MeasurementRunAggregateOrderBy>;
  metadata?: Maybe<OrderBy>;
  organization?: Maybe<OrganizationOrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  tracks_aggregate?: Maybe<TrackAggregateOrderBy>;
  version?: Maybe<VersionOrderBy>;
  versionBySoftwareVersionId?: Maybe<VersionOrderBy>;
  zone?: Maybe<ZoneOrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: system */
export type SystemPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type SystemPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "system" */
export enum SystemSelectColumn {
  /** column name */
  hardware_version_id = 'hardware_version_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  organization_id = 'organization_id',
  /** column name */
  software_version_id = 'software_version_id',
  /** column name */
  zone_id = 'zone_id',
}

/** input type for updating data in table "system" */
export type SystemSetInput = {
  hardware_version_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  organization_id?: Maybe<Scalars['Int']>;
  software_version_id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type SystemStddevFields = {
  __typename?: 'system_stddev_fields';
  hardware_version_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  software_version_id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "system" */
export type SystemStddevOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type SystemStddevPopFields = {
  __typename?: 'system_stddev_pop_fields';
  hardware_version_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  software_version_id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "system" */
export type SystemStddevPopOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type SystemStddevSampFields = {
  __typename?: 'system_stddev_samp_fields';
  hardware_version_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  software_version_id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "system" */
export type SystemStddevSampOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type SystemSumFields = {
  __typename?: 'system_sum_fields';
  hardware_version_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  organization_id?: Maybe<Scalars['Int']>;
  software_version_id?: Maybe<Scalars['Int']>;
  zone_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "system" */
export type SystemSumOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** update columns of table "system" */
export enum SystemUpdateColumn {
  /** column name */
  hardware_version_id = 'hardware_version_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  organization_id = 'organization_id',
  /** column name */
  software_version_id = 'software_version_id',
  /** column name */
  zone_id = 'zone_id',
}

/** aggregate var_pop on columns */
export type SystemVarPopFields = {
  __typename?: 'system_var_pop_fields';
  hardware_version_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  software_version_id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "system" */
export type SystemVarPopOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type SystemVarSampFields = {
  __typename?: 'system_var_samp_fields';
  hardware_version_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  software_version_id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "system" */
export type SystemVarSampOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type SystemVarianceFields = {
  __typename?: 'system_variance_fields';
  hardware_version_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  organization_id?: Maybe<Scalars['Float']>;
  software_version_id?: Maybe<Scalars['Float']>;
  zone_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "system" */
export type SystemVarianceOrderBy = {
  hardware_version_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  organization_id?: Maybe<OrderBy>;
  software_version_id?: Maybe<OrderBy>;
  zone_id?: Maybe<OrderBy>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "track" */
export type Track = {
  __typename?: 'track';
  /** An object relationship */
  classification?: Maybe<Classification>;
  classification_id?: Maybe<Scalars['Int']>;
  first_image_time: Scalars['timestamptz'];
  id: Scalars['Int'];
  last_image_time: Scalars['timestamptz'];
  metadata?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  system: System;
  system_id: Scalars['Int'];
  /** An array relationship */
  track_detections: Array<TrackDetections>;
  /** An aggregate relationship */
  track_detections_aggregate: TrackDetectionsAggregate;
};

/** columns and relationships of "track" */
export type TrackMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "track" */
export type TrackTrackDetectionsArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

/** columns and relationships of "track" */
export type TrackTrackDetectionsAggregateArgs = {
  distinct_on?: Maybe<Array<TrackDetectionsSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<TrackDetectionsOrderBy>>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

/** aggregated selection of "track" */
export type TrackAggregate = {
  __typename?: 'track_aggregate';
  aggregate?: Maybe<TrackAggregateFields>;
  nodes: Array<Track>;
};

/** aggregate fields of "track" */
export type TrackAggregateFields = {
  __typename?: 'track_aggregate_fields';
  avg?: Maybe<TrackAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<TrackMaxFields>;
  min?: Maybe<TrackMinFields>;
  stddev?: Maybe<TrackStddevFields>;
  stddev_pop?: Maybe<TrackStddevPopFields>;
  stddev_samp?: Maybe<TrackStddevSampFields>;
  sum?: Maybe<TrackSumFields>;
  var_pop?: Maybe<TrackVarPopFields>;
  var_samp?: Maybe<TrackVarSampFields>;
  variance?: Maybe<TrackVarianceFields>;
};

/** aggregate fields of "track" */
export type TrackAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TrackSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "track" */
export type TrackAggregateOrderBy = {
  avg?: Maybe<TrackAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<TrackMaxOrderBy>;
  min?: Maybe<TrackMinOrderBy>;
  stddev?: Maybe<TrackStddevOrderBy>;
  stddev_pop?: Maybe<TrackStddevPopOrderBy>;
  stddev_samp?: Maybe<TrackStddevSampOrderBy>;
  sum?: Maybe<TrackSumOrderBy>;
  var_pop?: Maybe<TrackVarPopOrderBy>;
  var_samp?: Maybe<TrackVarSampOrderBy>;
  variance?: Maybe<TrackVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type TrackAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "track" */
export type TrackArrRelInsertInput = {
  data: Array<TrackInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<TrackOnConflict>;
};

/** aggregate avg on columns */
export type TrackAvgFields = {
  __typename?: 'track_avg_fields';
  classification_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "track" */
export type TrackAvgOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "track". All fields are combined with a logical 'AND'. */
export type TrackBoolExp = {
  _and?: Maybe<Array<TrackBoolExp>>;
  _not?: Maybe<TrackBoolExp>;
  _or?: Maybe<Array<TrackBoolExp>>;
  classification?: Maybe<ClassificationBoolExp>;
  classification_id?: Maybe<IntComparisonExp>;
  first_image_time?: Maybe<TimestamptzComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  last_image_time?: Maybe<TimestamptzComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  system?: Maybe<SystemBoolExp>;
  system_id?: Maybe<IntComparisonExp>;
  track_detections?: Maybe<TrackDetectionsBoolExp>;
};

/** unique or primary key constraints on table "track" */
export enum TrackConstraint {
  /** unique or primary key constraint */
  track_pkey = 'track_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type TrackDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type TrackDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type TrackDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** columns and relationships of "track_detections" */
export type TrackDetections = {
  __typename?: 'track_detections';
  /** An object relationship */
  detection: Detection;
  detection_id: Scalars['Int'];
  id: Scalars['Int'];
  /** An object relationship */
  track: Track;
  track_id: Scalars['Int'];
};

/** aggregated selection of "track_detections" */
export type TrackDetectionsAggregate = {
  __typename?: 'track_detections_aggregate';
  aggregate?: Maybe<TrackDetectionsAggregateFields>;
  nodes: Array<TrackDetections>;
};

/** aggregate fields of "track_detections" */
export type TrackDetectionsAggregateFields = {
  __typename?: 'track_detections_aggregate_fields';
  avg?: Maybe<TrackDetectionsAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<TrackDetectionsMaxFields>;
  min?: Maybe<TrackDetectionsMinFields>;
  stddev?: Maybe<TrackDetectionsStddevFields>;
  stddev_pop?: Maybe<TrackDetectionsStddevPopFields>;
  stddev_samp?: Maybe<TrackDetectionsStddevSampFields>;
  sum?: Maybe<TrackDetectionsSumFields>;
  var_pop?: Maybe<TrackDetectionsVarPopFields>;
  var_samp?: Maybe<TrackDetectionsVarSampFields>;
  variance?: Maybe<TrackDetectionsVarianceFields>;
};

/** aggregate fields of "track_detections" */
export type TrackDetectionsAggregateFieldsCountArgs = {
  columns?: Maybe<Array<TrackDetectionsSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "track_detections" */
export type TrackDetectionsAggregateOrderBy = {
  avg?: Maybe<TrackDetectionsAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<TrackDetectionsMaxOrderBy>;
  min?: Maybe<TrackDetectionsMinOrderBy>;
  stddev?: Maybe<TrackDetectionsStddevOrderBy>;
  stddev_pop?: Maybe<TrackDetectionsStddevPopOrderBy>;
  stddev_samp?: Maybe<TrackDetectionsStddevSampOrderBy>;
  sum?: Maybe<TrackDetectionsSumOrderBy>;
  var_pop?: Maybe<TrackDetectionsVarPopOrderBy>;
  var_samp?: Maybe<TrackDetectionsVarSampOrderBy>;
  variance?: Maybe<TrackDetectionsVarianceOrderBy>;
};

/** input type for inserting array relation for remote table "track_detections" */
export type TrackDetectionsArrRelInsertInput = {
  data: Array<TrackDetectionsInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<TrackDetectionsOnConflict>;
};

/** aggregate avg on columns */
export type TrackDetectionsAvgFields = {
  __typename?: 'track_detections_avg_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  track_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "track_detections" */
export type TrackDetectionsAvgOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "track_detections". All fields are combined with a logical 'AND'. */
export type TrackDetectionsBoolExp = {
  _and?: Maybe<Array<TrackDetectionsBoolExp>>;
  _not?: Maybe<TrackDetectionsBoolExp>;
  _or?: Maybe<Array<TrackDetectionsBoolExp>>;
  detection?: Maybe<DetectionBoolExp>;
  detection_id?: Maybe<IntComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  track?: Maybe<TrackBoolExp>;
  track_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "track_detections" */
export enum TrackDetectionsConstraint {
  /** unique or primary key constraint */
  track_detections_pkey = 'track_detections_pkey',
}

/** input type for incrementing numeric columns in table "track_detections" */
export type TrackDetectionsIncInput = {
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  track_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "track_detections" */
export type TrackDetectionsInsertInput = {
  detection?: Maybe<DetectionObjRelInsertInput>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  track?: Maybe<TrackObjRelInsertInput>;
  track_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type TrackDetectionsMaxFields = {
  __typename?: 'track_detections_max_fields';
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  track_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "track_detections" */
export type TrackDetectionsMaxOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type TrackDetectionsMinFields = {
  __typename?: 'track_detections_min_fields';
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  track_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "track_detections" */
export type TrackDetectionsMinOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "track_detections" */
export type TrackDetectionsMutationResponse = {
  __typename?: 'track_detections_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<TrackDetections>;
};

/** on conflict condition type for table "track_detections" */
export type TrackDetectionsOnConflict = {
  constraint: TrackDetectionsConstraint;
  update_columns?: Array<TrackDetectionsUpdateColumn>;
  where?: Maybe<TrackDetectionsBoolExp>;
};

/** Ordering options when selecting data from "track_detections". */
export type TrackDetectionsOrderBy = {
  detection?: Maybe<DetectionOrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track?: Maybe<TrackOrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: track_detections */
export type TrackDetectionsPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "track_detections" */
export enum TrackDetectionsSelectColumn {
  /** column name */
  detection_id = 'detection_id',
  /** column name */
  id = 'id',
  /** column name */
  track_id = 'track_id',
}

/** input type for updating data in table "track_detections" */
export type TrackDetectionsSetInput = {
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  track_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type TrackDetectionsStddevFields = {
  __typename?: 'track_detections_stddev_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  track_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "track_detections" */
export type TrackDetectionsStddevOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type TrackDetectionsStddevPopFields = {
  __typename?: 'track_detections_stddev_pop_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  track_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "track_detections" */
export type TrackDetectionsStddevPopOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type TrackDetectionsStddevSampFields = {
  __typename?: 'track_detections_stddev_samp_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  track_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "track_detections" */
export type TrackDetectionsStddevSampOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type TrackDetectionsSumFields = {
  __typename?: 'track_detections_sum_fields';
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  track_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "track_detections" */
export type TrackDetectionsSumOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** update columns of table "track_detections" */
export enum TrackDetectionsUpdateColumn {
  /** column name */
  detection_id = 'detection_id',
  /** column name */
  id = 'id',
  /** column name */
  track_id = 'track_id',
}

/** aggregate var_pop on columns */
export type TrackDetectionsVarPopFields = {
  __typename?: 'track_detections_var_pop_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  track_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "track_detections" */
export type TrackDetectionsVarPopOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type TrackDetectionsVarSampFields = {
  __typename?: 'track_detections_var_samp_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  track_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "track_detections" */
export type TrackDetectionsVarSampOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type TrackDetectionsVarianceFields = {
  __typename?: 'track_detections_variance_fields';
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  track_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "track_detections" */
export type TrackDetectionsVarianceOrderBy = {
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  track_id?: Maybe<OrderBy>;
};

/** input type for incrementing numeric columns in table "track" */
export type TrackIncInput = {
  classification_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "track" */
export type TrackInsertInput = {
  classification?: Maybe<ClassificationObjRelInsertInput>;
  classification_id?: Maybe<Scalars['Int']>;
  first_image_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_image_time?: Maybe<Scalars['timestamptz']>;
  metadata?: Maybe<Scalars['jsonb']>;
  system?: Maybe<SystemObjRelInsertInput>;
  system_id?: Maybe<Scalars['Int']>;
  track_detections?: Maybe<TrackDetectionsArrRelInsertInput>;
};

/** aggregate max on columns */
export type TrackMaxFields = {
  __typename?: 'track_max_fields';
  classification_id?: Maybe<Scalars['Int']>;
  first_image_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_image_time?: Maybe<Scalars['timestamptz']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "track" */
export type TrackMaxOrderBy = {
  classification_id?: Maybe<OrderBy>;
  first_image_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  last_image_time?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type TrackMinFields = {
  __typename?: 'track_min_fields';
  classification_id?: Maybe<Scalars['Int']>;
  first_image_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_image_time?: Maybe<Scalars['timestamptz']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "track" */
export type TrackMinOrderBy = {
  classification_id?: Maybe<OrderBy>;
  first_image_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  last_image_time?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "track" */
export type TrackMutationResponse = {
  __typename?: 'track_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Track>;
};

/** input type for inserting object relation for remote table "track" */
export type TrackObjRelInsertInput = {
  data: TrackInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<TrackOnConflict>;
};

/** on conflict condition type for table "track" */
export type TrackOnConflict = {
  constraint: TrackConstraint;
  update_columns?: Array<TrackUpdateColumn>;
  where?: Maybe<TrackBoolExp>;
};

/** Ordering options when selecting data from "track". */
export type TrackOrderBy = {
  classification?: Maybe<ClassificationOrderBy>;
  classification_id?: Maybe<OrderBy>;
  first_image_time?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  last_image_time?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  system?: Maybe<SystemOrderBy>;
  system_id?: Maybe<OrderBy>;
  track_detections_aggregate?: Maybe<TrackDetectionsAggregateOrderBy>;
};

/** primary key columns input for table: track */
export type TrackPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type TrackPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "track" */
export enum TrackSelectColumn {
  /** column name */
  classification_id = 'classification_id',
  /** column name */
  first_image_time = 'first_image_time',
  /** column name */
  id = 'id',
  /** column name */
  last_image_time = 'last_image_time',
  /** column name */
  metadata = 'metadata',
  /** column name */
  system_id = 'system_id',
}

/** input type for updating data in table "track" */
export type TrackSetInput = {
  classification_id?: Maybe<Scalars['Int']>;
  first_image_time?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_image_time?: Maybe<Scalars['timestamptz']>;
  metadata?: Maybe<Scalars['jsonb']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type TrackStddevFields = {
  __typename?: 'track_stddev_fields';
  classification_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "track" */
export type TrackStddevOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type TrackStddevPopFields = {
  __typename?: 'track_stddev_pop_fields';
  classification_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "track" */
export type TrackStddevPopOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type TrackStddevSampFields = {
  __typename?: 'track_stddev_samp_fields';
  classification_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "track" */
export type TrackStddevSampOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type TrackSumFields = {
  __typename?: 'track_sum_fields';
  classification_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  system_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "track" */
export type TrackSumOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** update columns of table "track" */
export enum TrackUpdateColumn {
  /** column name */
  classification_id = 'classification_id',
  /** column name */
  first_image_time = 'first_image_time',
  /** column name */
  id = 'id',
  /** column name */
  last_image_time = 'last_image_time',
  /** column name */
  metadata = 'metadata',
  /** column name */
  system_id = 'system_id',
}

/** aggregate var_pop on columns */
export type TrackVarPopFields = {
  __typename?: 'track_var_pop_fields';
  classification_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "track" */
export type TrackVarPopOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type TrackVarSampFields = {
  __typename?: 'track_var_samp_fields';
  classification_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "track" */
export type TrackVarSampOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type TrackVarianceFields = {
  __typename?: 'track_variance_fields';
  classification_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  system_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "track" */
export type TrackVarianceOrderBy = {
  classification_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  system_id?: Maybe<OrderBy>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  email: Scalars['String'];
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  name: Scalars['String'];
  password: Scalars['String'];
  /** An array relationship */
  user_labels: Array<UserLabel>;
  /** An aggregate relationship */
  user_labels_aggregate: UserLabelAggregate;
};

/** columns and relationships of "user" */
export type UserMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "user" */
export type UserUserLabelsArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** columns and relationships of "user" */
export type UserUserLabelsAggregateArgs = {
  distinct_on?: Maybe<Array<UserLabelSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<UserLabelOrderBy>>;
  where?: Maybe<UserLabelBoolExp>;
};

/** aggregated selection of "user" */
export type UserAggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<UserAggregateFields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type UserAggregateFields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<UserAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<UserMaxFields>;
  min?: Maybe<UserMinFields>;
  stddev?: Maybe<UserStddevFields>;
  stddev_pop?: Maybe<UserStddevPopFields>;
  stddev_samp?: Maybe<UserStddevSampFields>;
  sum?: Maybe<UserSumFields>;
  var_pop?: Maybe<UserVarPopFields>;
  var_samp?: Maybe<UserVarSampFields>;
  variance?: Maybe<UserVarianceFields>;
};

/** aggregate fields of "user" */
export type UserAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UserSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UserAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type UserAvgFields = {
  __typename?: 'user_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type UserBoolExp = {
  _and?: Maybe<Array<UserBoolExp>>;
  _not?: Maybe<UserBoolExp>;
  _or?: Maybe<Array<UserBoolExp>>;
  email?: Maybe<StringComparisonExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  name?: Maybe<StringComparisonExp>;
  password?: Maybe<StringComparisonExp>;
  user_labels?: Maybe<UserLabelBoolExp>;
};

/** unique or primary key constraints on table "user" */
export enum UserConstraint {
  /** unique or primary key constraint */
  user_pkey = 'user_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UserDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UserDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UserDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "user" */
export type UserIncInput = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user" */
export type UserInsertInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  user_labels?: Maybe<UserLabelArrRelInsertInput>;
};

/** columns and relationships of "user_label" */
export type UserLabel = {
  __typename?: 'user_label';
  /** An object relationship */
  classification: Classification;
  classification_id: Scalars['Int'];
  confidence_id: Scalars['Int'];
  create_time: Scalars['timestamptz'];
  /** An object relationship */
  detection: Detection;
  detection_id: Scalars['Int'];
  /** An object relationship */
  enumeration: Enumeration;
  id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: User;
  user_id: Scalars['Int'];
};

/** columns and relationships of "user_label" */
export type UserLabelMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "user_label" */
export type UserLabelAggregate = {
  __typename?: 'user_label_aggregate';
  aggregate?: Maybe<UserLabelAggregateFields>;
  nodes: Array<UserLabel>;
};

/** aggregate fields of "user_label" */
export type UserLabelAggregateFields = {
  __typename?: 'user_label_aggregate_fields';
  avg?: Maybe<UserLabelAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<UserLabelMaxFields>;
  min?: Maybe<UserLabelMinFields>;
  stddev?: Maybe<UserLabelStddevFields>;
  stddev_pop?: Maybe<UserLabelStddevPopFields>;
  stddev_samp?: Maybe<UserLabelStddevSampFields>;
  sum?: Maybe<UserLabelSumFields>;
  var_pop?: Maybe<UserLabelVarPopFields>;
  var_samp?: Maybe<UserLabelVarSampFields>;
  variance?: Maybe<UserLabelVarianceFields>;
};

/** aggregate fields of "user_label" */
export type UserLabelAggregateFieldsCountArgs = {
  columns?: Maybe<Array<UserLabelSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_label" */
export type UserLabelAggregateOrderBy = {
  avg?: Maybe<UserLabelAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<UserLabelMaxOrderBy>;
  min?: Maybe<UserLabelMinOrderBy>;
  stddev?: Maybe<UserLabelStddevOrderBy>;
  stddev_pop?: Maybe<UserLabelStddevPopOrderBy>;
  stddev_samp?: Maybe<UserLabelStddevSampOrderBy>;
  sum?: Maybe<UserLabelSumOrderBy>;
  var_pop?: Maybe<UserLabelVarPopOrderBy>;
  var_samp?: Maybe<UserLabelVarSampOrderBy>;
  variance?: Maybe<UserLabelVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UserLabelAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "user_label" */
export type UserLabelArrRelInsertInput = {
  data: Array<UserLabelInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<UserLabelOnConflict>;
};

/** aggregate avg on columns */
export type UserLabelAvgFields = {
  __typename?: 'user_label_avg_fields';
  classification_id?: Maybe<Scalars['Float']>;
  confidence_id?: Maybe<Scalars['Float']>;
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_label" */
export type UserLabelAvgOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "user_label". All fields are combined with a logical 'AND'. */
export type UserLabelBoolExp = {
  _and?: Maybe<Array<UserLabelBoolExp>>;
  _not?: Maybe<UserLabelBoolExp>;
  _or?: Maybe<Array<UserLabelBoolExp>>;
  classification?: Maybe<ClassificationBoolExp>;
  classification_id?: Maybe<IntComparisonExp>;
  confidence_id?: Maybe<IntComparisonExp>;
  create_time?: Maybe<TimestamptzComparisonExp>;
  detection?: Maybe<DetectionBoolExp>;
  detection_id?: Maybe<IntComparisonExp>;
  enumeration?: Maybe<EnumerationBoolExp>;
  id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  modified_time?: Maybe<TimestamptzComparisonExp>;
  user?: Maybe<UserBoolExp>;
  user_id?: Maybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "user_label" */
export enum UserLabelConstraint {
  /** unique or primary key constraint */
  user_label_pkey = 'user_label_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UserLabelDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UserLabelDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UserLabelDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "user_label" */
export type UserLabelIncInput = {
  classification_id?: Maybe<Scalars['Int']>;
  confidence_id?: Maybe<Scalars['Int']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "user_label" */
export type UserLabelInsertInput = {
  classification?: Maybe<ClassificationObjRelInsertInput>;
  classification_id?: Maybe<Scalars['Int']>;
  confidence_id?: Maybe<Scalars['Int']>;
  create_time?: Maybe<Scalars['timestamptz']>;
  detection?: Maybe<DetectionObjRelInsertInput>;
  detection_id?: Maybe<Scalars['Int']>;
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<UserObjRelInsertInput>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type UserLabelMaxFields = {
  __typename?: 'user_label_max_fields';
  classification_id?: Maybe<Scalars['Int']>;
  confidence_id?: Maybe<Scalars['Int']>;
  create_time?: Maybe<Scalars['timestamptz']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "user_label" */
export type UserLabelMaxOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  create_time?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  modified_time?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type UserLabelMinFields = {
  __typename?: 'user_label_min_fields';
  classification_id?: Maybe<Scalars['Int']>;
  confidence_id?: Maybe<Scalars['Int']>;
  create_time?: Maybe<Scalars['timestamptz']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "user_label" */
export type UserLabelMinOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  create_time?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  modified_time?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** response of any mutation on the table "user_label" */
export type UserLabelMutationResponse = {
  __typename?: 'user_label_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserLabel>;
};

/** on conflict condition type for table "user_label" */
export type UserLabelOnConflict = {
  constraint: UserLabelConstraint;
  update_columns?: Array<UserLabelUpdateColumn>;
  where?: Maybe<UserLabelBoolExp>;
};

/** Ordering options when selecting data from "user_label". */
export type UserLabelOrderBy = {
  classification?: Maybe<ClassificationOrderBy>;
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  create_time?: Maybe<OrderBy>;
  detection?: Maybe<DetectionOrderBy>;
  detection_id?: Maybe<OrderBy>;
  enumeration?: Maybe<EnumerationOrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  modified_time?: Maybe<OrderBy>;
  user?: Maybe<UserOrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** primary key columns input for table: user_label */
export type UserLabelPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UserLabelPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "user_label" */
export enum UserLabelSelectColumn {
  /** column name */
  classification_id = 'classification_id',
  /** column name */
  confidence_id = 'confidence_id',
  /** column name */
  create_time = 'create_time',
  /** column name */
  detection_id = 'detection_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  modified_time = 'modified_time',
  /** column name */
  user_id = 'user_id',
}

/** input type for updating data in table "user_label" */
export type UserLabelSetInput = {
  classification_id?: Maybe<Scalars['Int']>;
  confidence_id?: Maybe<Scalars['Int']>;
  create_time?: Maybe<Scalars['timestamptz']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  modified_time?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type UserLabelStddevFields = {
  __typename?: 'user_label_stddev_fields';
  classification_id?: Maybe<Scalars['Float']>;
  confidence_id?: Maybe<Scalars['Float']>;
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_label" */
export type UserLabelStddevOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type UserLabelStddevPopFields = {
  __typename?: 'user_label_stddev_pop_fields';
  classification_id?: Maybe<Scalars['Float']>;
  confidence_id?: Maybe<Scalars['Float']>;
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_label" */
export type UserLabelStddevPopOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type UserLabelStddevSampFields = {
  __typename?: 'user_label_stddev_samp_fields';
  classification_id?: Maybe<Scalars['Float']>;
  confidence_id?: Maybe<Scalars['Float']>;
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_label" */
export type UserLabelStddevSampOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type UserLabelSumFields = {
  __typename?: 'user_label_sum_fields';
  classification_id?: Maybe<Scalars['Int']>;
  confidence_id?: Maybe<Scalars['Int']>;
  detection_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_label" */
export type UserLabelSumOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** update columns of table "user_label" */
export enum UserLabelUpdateColumn {
  /** column name */
  classification_id = 'classification_id',
  /** column name */
  confidence_id = 'confidence_id',
  /** column name */
  create_time = 'create_time',
  /** column name */
  detection_id = 'detection_id',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  modified_time = 'modified_time',
  /** column name */
  user_id = 'user_id',
}

/** aggregate var_pop on columns */
export type UserLabelVarPopFields = {
  __typename?: 'user_label_var_pop_fields';
  classification_id?: Maybe<Scalars['Float']>;
  confidence_id?: Maybe<Scalars['Float']>;
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_label" */
export type UserLabelVarPopOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type UserLabelVarSampFields = {
  __typename?: 'user_label_var_samp_fields';
  classification_id?: Maybe<Scalars['Float']>;
  confidence_id?: Maybe<Scalars['Float']>;
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_label" */
export type UserLabelVarSampOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type UserLabelVarianceFields = {
  __typename?: 'user_label_variance_fields';
  classification_id?: Maybe<Scalars['Float']>;
  confidence_id?: Maybe<Scalars['Float']>;
  detection_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  user_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_label" */
export type UserLabelVarianceOrderBy = {
  classification_id?: Maybe<OrderBy>;
  confidence_id?: Maybe<OrderBy>;
  detection_id?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  user_id?: Maybe<OrderBy>;
};

/** aggregate max on columns */
export type UserMaxFields = {
  __typename?: 'user_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type UserMinFields = {
  __typename?: 'user_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "user" */
export type UserMutationResponse = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type UserObjRelInsertInput = {
  data: UserInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<UserOnConflict>;
};

/** on conflict condition type for table "user" */
export type UserOnConflict = {
  constraint: UserConstraint;
  update_columns?: Array<UserUpdateColumn>;
  where?: Maybe<UserBoolExp>;
};

/** Ordering options when selecting data from "user". */
export type UserOrderBy = {
  email?: Maybe<OrderBy>;
  id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  name?: Maybe<OrderBy>;
  password?: Maybe<OrderBy>;
  user_labels_aggregate?: Maybe<UserLabelAggregateOrderBy>;
};

/** primary key columns input for table: user */
export type UserPkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UserPrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "user" */
export enum UserSelectColumn {
  /** column name */
  email = 'email',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name = 'name',
  /** column name */
  password = 'password',
}

/** input type for updating data in table "user" */
export type UserSetInput = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type UserStddevFields = {
  __typename?: 'user_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type UserStddevPopFields = {
  __typename?: 'user_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type UserStddevSampFields = {
  __typename?: 'user_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type UserSumFields = {
  __typename?: 'user_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "user" */
export enum UserUpdateColumn {
  /** column name */
  email = 'email',
  /** column name */
  id = 'id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name = 'name',
  /** column name */
  password = 'password',
}

/** aggregate var_pop on columns */
export type UserVarPopFields = {
  __typename?: 'user_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type UserVarSampFields = {
  __typename?: 'user_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type UserVarianceFields = {
  __typename?: 'user_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "version" */
export type Version = {
  __typename?: 'version';
  /** An array relationship */
  configs: Array<Config>;
  /** An aggregate relationship */
  configs_aggregate: ConfigAggregate;
  /** An array relationship */
  detectors: Array<Detector>;
  /** An aggregate relationship */
  detectors_aggregate: DetectorAggregate;
  id: Scalars['Int'];
  major: Scalars['Int'];
  minor: Scalars['Int'];
  patch: Scalars['Int'];
  /** An array relationship */
  systems: Array<System>;
  /** An array relationship */
  systemsBySoftwareVersionId: Array<System>;
  /** An aggregate relationship */
  systemsBySoftwareVersionId_aggregate: SystemAggregate;
  /** An aggregate relationship */
  systems_aggregate: SystemAggregate;
  type: Scalars['String'];
};

/** columns and relationships of "version" */
export type VersionConfigsArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

/** columns and relationships of "version" */
export type VersionConfigsAggregateArgs = {
  distinct_on?: Maybe<Array<ConfigSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<ConfigOrderBy>>;
  where?: Maybe<ConfigBoolExp>;
};

/** columns and relationships of "version" */
export type VersionDetectorsArgs = {
  distinct_on?: Maybe<Array<DetectorSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectorOrderBy>>;
  where?: Maybe<DetectorBoolExp>;
};

/** columns and relationships of "version" */
export type VersionDetectorsAggregateArgs = {
  distinct_on?: Maybe<Array<DetectorSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<DetectorOrderBy>>;
  where?: Maybe<DetectorBoolExp>;
};

/** columns and relationships of "version" */
export type VersionSystemsArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** columns and relationships of "version" */
export type VersionSystemsBySoftwareVersionIdArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** columns and relationships of "version" */
export type VersionSystemsBySoftwareVersionIdAggregateArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** columns and relationships of "version" */
export type VersionSystemsAggregateArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** aggregated selection of "version" */
export type VersionAggregate = {
  __typename?: 'version_aggregate';
  aggregate?: Maybe<VersionAggregateFields>;
  nodes: Array<Version>;
};

/** aggregate fields of "version" */
export type VersionAggregateFields = {
  __typename?: 'version_aggregate_fields';
  avg?: Maybe<VersionAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<VersionMaxFields>;
  min?: Maybe<VersionMinFields>;
  stddev?: Maybe<VersionStddevFields>;
  stddev_pop?: Maybe<VersionStddevPopFields>;
  stddev_samp?: Maybe<VersionStddevSampFields>;
  sum?: Maybe<VersionSumFields>;
  var_pop?: Maybe<VersionVarPopFields>;
  var_samp?: Maybe<VersionVarSampFields>;
  variance?: Maybe<VersionVarianceFields>;
};

/** aggregate fields of "version" */
export type VersionAggregateFieldsCountArgs = {
  columns?: Maybe<Array<VersionSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type VersionAvgFields = {
  __typename?: 'version_avg_fields';
  id?: Maybe<Scalars['Float']>;
  major?: Maybe<Scalars['Float']>;
  minor?: Maybe<Scalars['Float']>;
  patch?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "version". All fields are combined with a logical 'AND'. */
export type VersionBoolExp = {
  _and?: Maybe<Array<VersionBoolExp>>;
  _not?: Maybe<VersionBoolExp>;
  _or?: Maybe<Array<VersionBoolExp>>;
  configs?: Maybe<ConfigBoolExp>;
  detectors?: Maybe<DetectorBoolExp>;
  id?: Maybe<IntComparisonExp>;
  major?: Maybe<IntComparisonExp>;
  minor?: Maybe<IntComparisonExp>;
  patch?: Maybe<IntComparisonExp>;
  systems?: Maybe<SystemBoolExp>;
  systemsBySoftwareVersionId?: Maybe<SystemBoolExp>;
  type?: Maybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "version" */
export enum VersionConstraint {
  /** unique or primary key constraint */
  version_pkey = 'version_pkey',
}

/** input type for incrementing numeric columns in table "version" */
export type VersionIncInput = {
  id?: Maybe<Scalars['Int']>;
  major?: Maybe<Scalars['Int']>;
  minor?: Maybe<Scalars['Int']>;
  patch?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "version" */
export type VersionInsertInput = {
  configs?: Maybe<ConfigArrRelInsertInput>;
  detectors?: Maybe<DetectorArrRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  major?: Maybe<Scalars['Int']>;
  minor?: Maybe<Scalars['Int']>;
  patch?: Maybe<Scalars['Int']>;
  systems?: Maybe<SystemArrRelInsertInput>;
  systemsBySoftwareVersionId?: Maybe<SystemArrRelInsertInput>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type VersionMaxFields = {
  __typename?: 'version_max_fields';
  id?: Maybe<Scalars['Int']>;
  major?: Maybe<Scalars['Int']>;
  minor?: Maybe<Scalars['Int']>;
  patch?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type VersionMinFields = {
  __typename?: 'version_min_fields';
  id?: Maybe<Scalars['Int']>;
  major?: Maybe<Scalars['Int']>;
  minor?: Maybe<Scalars['Int']>;
  patch?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "version" */
export type VersionMutationResponse = {
  __typename?: 'version_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Version>;
};

/** input type for inserting object relation for remote table "version" */
export type VersionObjRelInsertInput = {
  data: VersionInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<VersionOnConflict>;
};

/** on conflict condition type for table "version" */
export type VersionOnConflict = {
  constraint: VersionConstraint;
  update_columns?: Array<VersionUpdateColumn>;
  where?: Maybe<VersionBoolExp>;
};

/** Ordering options when selecting data from "version". */
export type VersionOrderBy = {
  configs_aggregate?: Maybe<ConfigAggregateOrderBy>;
  detectors_aggregate?: Maybe<DetectorAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  major?: Maybe<OrderBy>;
  minor?: Maybe<OrderBy>;
  patch?: Maybe<OrderBy>;
  systemsBySoftwareVersionId_aggregate?: Maybe<SystemAggregateOrderBy>;
  systems_aggregate?: Maybe<SystemAggregateOrderBy>;
  type?: Maybe<OrderBy>;
};

/** primary key columns input for table: version */
export type VersionPkColumnsInput = {
  id: Scalars['Int'];
};

/** select columns of table "version" */
export enum VersionSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  major = 'major',
  /** column name */
  minor = 'minor',
  /** column name */
  patch = 'patch',
  /** column name */
  type = 'type',
}

/** input type for updating data in table "version" */
export type VersionSetInput = {
  id?: Maybe<Scalars['Int']>;
  major?: Maybe<Scalars['Int']>;
  minor?: Maybe<Scalars['Int']>;
  patch?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type VersionStddevFields = {
  __typename?: 'version_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  major?: Maybe<Scalars['Float']>;
  minor?: Maybe<Scalars['Float']>;
  patch?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type VersionStddevPopFields = {
  __typename?: 'version_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  major?: Maybe<Scalars['Float']>;
  minor?: Maybe<Scalars['Float']>;
  patch?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type VersionStddevSampFields = {
  __typename?: 'version_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  major?: Maybe<Scalars['Float']>;
  minor?: Maybe<Scalars['Float']>;
  patch?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type VersionSumFields = {
  __typename?: 'version_sum_fields';
  id?: Maybe<Scalars['Int']>;
  major?: Maybe<Scalars['Int']>;
  minor?: Maybe<Scalars['Int']>;
  patch?: Maybe<Scalars['Int']>;
};

/** update columns of table "version" */
export enum VersionUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  major = 'major',
  /** column name */
  minor = 'minor',
  /** column name */
  patch = 'patch',
  /** column name */
  type = 'type',
}

/** aggregate var_pop on columns */
export type VersionVarPopFields = {
  __typename?: 'version_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  major?: Maybe<Scalars['Float']>;
  minor?: Maybe<Scalars['Float']>;
  patch?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type VersionVarSampFields = {
  __typename?: 'version_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  major?: Maybe<Scalars['Float']>;
  minor?: Maybe<Scalars['Float']>;
  patch?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type VersionVarianceFields = {
  __typename?: 'version_variance_fields';
  id?: Maybe<Scalars['Float']>;
  major?: Maybe<Scalars['Float']>;
  minor?: Maybe<Scalars['Float']>;
  patch?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "zone" */
export type Zone = {
  __typename?: 'zone';
  /** An object relationship */
  enumeration: Enumeration;
  /** An array relationship */
  growth_cycles: Array<GrowthCycle>;
  /** An aggregate relationship */
  growth_cycles_aggregate: GrowthCycleAggregate;
  id: Scalars['Int'];
  /** An object relationship */
  location: Location;
  location_id: Scalars['Int'];
  metadata?: Maybe<Scalars['jsonb']>;
  name_id: Scalars['Int'];
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
  /** An array relationship */
  systems: Array<System>;
  /** An aggregate relationship */
  systems_aggregate: SystemAggregate;
};

/** columns and relationships of "zone" */
export type ZoneGrowthCyclesArgs = {
  distinct_on?: Maybe<Array<GrowthCycleSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GrowthCycleOrderBy>>;
  where?: Maybe<GrowthCycleBoolExp>;
};

/** columns and relationships of "zone" */
export type ZoneGrowthCyclesAggregateArgs = {
  distinct_on?: Maybe<Array<GrowthCycleSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<GrowthCycleOrderBy>>;
  where?: Maybe<GrowthCycleBoolExp>;
};

/** columns and relationships of "zone" */
export type ZoneMetadataArgs = {
  path?: Maybe<Scalars['String']>;
};

/** columns and relationships of "zone" */
export type ZoneSystemsArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** columns and relationships of "zone" */
export type ZoneSystemsAggregateArgs = {
  distinct_on?: Maybe<Array<SystemSelectColumn>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<SystemOrderBy>>;
  where?: Maybe<SystemBoolExp>;
};

/** aggregated selection of "zone" */
export type ZoneAggregate = {
  __typename?: 'zone_aggregate';
  aggregate?: Maybe<ZoneAggregateFields>;
  nodes: Array<Zone>;
};

/** aggregate fields of "zone" */
export type ZoneAggregateFields = {
  __typename?: 'zone_aggregate_fields';
  avg?: Maybe<ZoneAvgFields>;
  count: Scalars['Int'];
  max?: Maybe<ZoneMaxFields>;
  min?: Maybe<ZoneMinFields>;
  stddev?: Maybe<ZoneStddevFields>;
  stddev_pop?: Maybe<ZoneStddevPopFields>;
  stddev_samp?: Maybe<ZoneStddevSampFields>;
  sum?: Maybe<ZoneSumFields>;
  var_pop?: Maybe<ZoneVarPopFields>;
  var_samp?: Maybe<ZoneVarSampFields>;
  variance?: Maybe<ZoneVarianceFields>;
};

/** aggregate fields of "zone" */
export type ZoneAggregateFieldsCountArgs = {
  columns?: Maybe<Array<ZoneSelectColumn>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "zone" */
export type ZoneAggregateOrderBy = {
  avg?: Maybe<ZoneAvgOrderBy>;
  count?: Maybe<OrderBy>;
  max?: Maybe<ZoneMaxOrderBy>;
  min?: Maybe<ZoneMinOrderBy>;
  stddev?: Maybe<ZoneStddevOrderBy>;
  stddev_pop?: Maybe<ZoneStddevPopOrderBy>;
  stddev_samp?: Maybe<ZoneStddevSampOrderBy>;
  sum?: Maybe<ZoneSumOrderBy>;
  var_pop?: Maybe<ZoneVarPopOrderBy>;
  var_samp?: Maybe<ZoneVarSampOrderBy>;
  variance?: Maybe<ZoneVarianceOrderBy>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ZoneAppendInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "zone" */
export type ZoneArrRelInsertInput = {
  data: Array<ZoneInsertInput>;
  /** on conflict condition */
  on_conflict?: Maybe<ZoneOnConflict>;
};

/** aggregate avg on columns */
export type ZoneAvgFields = {
  __typename?: 'zone_avg_fields';
  id?: Maybe<Scalars['Float']>;
  location_id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "zone" */
export type ZoneAvgOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** Boolean expression to filter rows from the table "zone". All fields are combined with a logical 'AND'. */
export type ZoneBoolExp = {
  _and?: Maybe<Array<ZoneBoolExp>>;
  _not?: Maybe<ZoneBoolExp>;
  _or?: Maybe<Array<ZoneBoolExp>>;
  enumeration?: Maybe<EnumerationBoolExp>;
  growth_cycles?: Maybe<GrowthCycleBoolExp>;
  id?: Maybe<IntComparisonExp>;
  location?: Maybe<LocationBoolExp>;
  location_id?: Maybe<IntComparisonExp>;
  metadata?: Maybe<JsonbComparisonExp>;
  name_id?: Maybe<IntComparisonExp>;
  size_x?: Maybe<FloatComparisonExp>;
  size_y?: Maybe<FloatComparisonExp>;
  size_z?: Maybe<FloatComparisonExp>;
  systems?: Maybe<SystemBoolExp>;
};

/** unique or primary key constraints on table "zone" */
export enum ZoneConstraint {
  /** unique or primary key constraint */
  zone_pkey = 'zone_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ZoneDeleteAtPathInput = {
  metadata?: Maybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ZoneDeleteElemInput = {
  metadata?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ZoneDeleteKeyInput = {
  metadata?: Maybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "zone" */
export type ZoneIncInput = {
  id?: Maybe<Scalars['Int']>;
  location_id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** input type for inserting data into table "zone" */
export type ZoneInsertInput = {
  enumeration?: Maybe<EnumerationObjRelInsertInput>;
  growth_cycles?: Maybe<GrowthCycleArrRelInsertInput>;
  id?: Maybe<Scalars['Int']>;
  location?: Maybe<LocationObjRelInsertInput>;
  location_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
  systems?: Maybe<SystemArrRelInsertInput>;
};

/** aggregate max on columns */
export type ZoneMaxFields = {
  __typename?: 'zone_max_fields';
  id?: Maybe<Scalars['Int']>;
  location_id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by max() on columns of table "zone" */
export type ZoneMaxOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** aggregate min on columns */
export type ZoneMinFields = {
  __typename?: 'zone_min_fields';
  id?: Maybe<Scalars['Int']>;
  location_id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by min() on columns of table "zone" */
export type ZoneMinOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** response of any mutation on the table "zone" */
export type ZoneMutationResponse = {
  __typename?: 'zone_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Zone>;
};

/** input type for inserting object relation for remote table "zone" */
export type ZoneObjRelInsertInput = {
  data: ZoneInsertInput;
  /** on conflict condition */
  on_conflict?: Maybe<ZoneOnConflict>;
};

/** on conflict condition type for table "zone" */
export type ZoneOnConflict = {
  constraint: ZoneConstraint;
  update_columns?: Array<ZoneUpdateColumn>;
  where?: Maybe<ZoneBoolExp>;
};

/** Ordering options when selecting data from "zone". */
export type ZoneOrderBy = {
  enumeration?: Maybe<EnumerationOrderBy>;
  growth_cycles_aggregate?: Maybe<GrowthCycleAggregateOrderBy>;
  id?: Maybe<OrderBy>;
  location?: Maybe<LocationOrderBy>;
  location_id?: Maybe<OrderBy>;
  metadata?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
  systems_aggregate?: Maybe<SystemAggregateOrderBy>;
};

/** primary key columns input for table: zone */
export type ZonePkColumnsInput = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ZonePrependInput = {
  metadata?: Maybe<Scalars['jsonb']>;
};

/** select columns of table "zone" */
export enum ZoneSelectColumn {
  /** column name */
  id = 'id',
  /** column name */
  location_id = 'location_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
  /** column name */
  size_x = 'size_x',
  /** column name */
  size_y = 'size_y',
  /** column name */
  size_z = 'size_z',
}

/** input type for updating data in table "zone" */
export type ZoneSetInput = {
  id?: Maybe<Scalars['Int']>;
  location_id?: Maybe<Scalars['Int']>;
  metadata?: Maybe<Scalars['jsonb']>;
  name_id?: Maybe<Scalars['Int']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** aggregate stddev on columns */
export type ZoneStddevFields = {
  __typename?: 'zone_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  location_id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "zone" */
export type ZoneStddevOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** aggregate stddev_pop on columns */
export type ZoneStddevPopFields = {
  __typename?: 'zone_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  location_id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "zone" */
export type ZoneStddevPopOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** aggregate stddev_samp on columns */
export type ZoneStddevSampFields = {
  __typename?: 'zone_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  location_id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "zone" */
export type ZoneStddevSampOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** aggregate sum on columns */
export type ZoneSumFields = {
  __typename?: 'zone_sum_fields';
  id?: Maybe<Scalars['Int']>;
  location_id?: Maybe<Scalars['Int']>;
  name_id?: Maybe<Scalars['Int']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by sum() on columns of table "zone" */
export type ZoneSumOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** update columns of table "zone" */
export enum ZoneUpdateColumn {
  /** column name */
  id = 'id',
  /** column name */
  location_id = 'location_id',
  /** column name */
  metadata = 'metadata',
  /** column name */
  name_id = 'name_id',
  /** column name */
  size_x = 'size_x',
  /** column name */
  size_y = 'size_y',
  /** column name */
  size_z = 'size_z',
}

/** aggregate var_pop on columns */
export type ZoneVarPopFields = {
  __typename?: 'zone_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  location_id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "zone" */
export type ZoneVarPopOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** aggregate var_samp on columns */
export type ZoneVarSampFields = {
  __typename?: 'zone_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  location_id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "zone" */
export type ZoneVarSampOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

/** aggregate variance on columns */
export type ZoneVarianceFields = {
  __typename?: 'zone_variance_fields';
  id?: Maybe<Scalars['Float']>;
  location_id?: Maybe<Scalars['Float']>;
  name_id?: Maybe<Scalars['Float']>;
  size_x?: Maybe<Scalars['Float']>;
  size_y?: Maybe<Scalars['Float']>;
  size_z?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "zone" */
export type ZoneVarianceOrderBy = {
  id?: Maybe<OrderBy>;
  location_id?: Maybe<OrderBy>;
  name_id?: Maybe<OrderBy>;
  size_x?: Maybe<OrderBy>;
  size_y?: Maybe<OrderBy>;
  size_z?: Maybe<OrderBy>;
};

export type GetGrowthCycleByZoneIdQueryVariables = Exact<{
  zone_id?: Maybe<Scalars['Int']>;
}>;

export type GetGrowthCycleByZoneIdQuery = {
  __typename?: 'query_root';
  growth_cycle: Array<{
    __typename?: 'growth_cycle';
    id: number;
    start_time: any;
    end_time: any;
    zone_id: number;
    metadata?: any | null | undefined;
  }>;
};

export type GetGrowthCycleByZoneIdAndDateQueryVariables = Exact<{
  zone_id?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['timestamptz']>;
}>;

export type GetGrowthCycleByZoneIdAndDateQuery = {
  __typename?: 'query_root';
  growth_cycle: Array<{
    __typename?: 'growth_cycle';
    id: number;
    start_time: any;
    end_time: any;
    zone_id: number;
    metadata?: any | null | undefined;
  }>;
};

export type GetRecentHeatMapsBySystemIdQueryVariables = Exact<{
  start?: Maybe<Scalars['timestamptz']>;
  end?: Maybe<Scalars['timestamptz']>;
  system_id?: Maybe<Scalars['Int']>;
  enumeration?: Maybe<Scalars['String']>;
}>;

export type GetRecentHeatMapsBySystemIdQuery = {
  __typename?: 'query_root';
  heat_map: Array<{
    __typename?: 'heat_map';
    id: number;
    data: any;
    measurement_run: {
      __typename?: 'measurement_run';
      start_time: any;
      end_time?: any | null | undefined;
      id: number;
      metadata?: any | null | undefined;
    };
    enumeration: {
      __typename?: 'enumeration';
      code: string;
      description: string;
    };
  }>;
};

export type GetMeasurementRunsBetweenDatesQueryVariables = Exact<{
  system_id?: Maybe<Scalars['Int']>;
  start: Scalars['timestamptz'];
  end: Scalars['timestamptz'];
}>;

export type GetMeasurementRunsBetweenDatesQuery = {
  __typename?: 'query_root';
  measurement_run: Array<{
    __typename?: 'measurement_run';
    start_time: any;
    id: number;
    metadata?: any | null | undefined;
  }>;
};

export type GetLatestMeasurementRunWithImagesBySystemIdQueryVariables = Exact<{
  system_id?: Maybe<IntComparisonExp>;
  start?: Maybe<Scalars['timestamptz']>;
  end?: Maybe<Scalars['timestamptz']>;
}>;

export type GetLatestMeasurementRunWithImagesBySystemIdQuery = {
  __typename?: 'query_root';
  measurement_run: Array<{
    __typename?: 'measurement_run';
    start_time: any;
    id: number;
    metadata?: any | null | undefined;
  }>;
};

export type GetLatestMeasurementRunBySystemIdQueryVariables = Exact<{
  system_id?: Maybe<IntComparisonExp>;
  start?: Maybe<Scalars['timestamptz']>;
  end?: Maybe<Scalars['timestamptz']>;
}>;

export type GetLatestMeasurementRunBySystemIdQuery = {
  __typename?: 'query_root';
  measurement_run: Array<{
    __typename?: 'measurement_run';
    start_time: any;
    id: number;
    metadata?: any | null | undefined;
  }>;
};

export type GetPhotoFeedDataByRunIdQueryVariables = Exact<{
  run_id?: Maybe<Scalars['Int']>;
}>;

export type GetPhotoFeedDataByRunIdQuery = {
  __typename?: 'query_root';
  measurement: Array<{
    __typename?: 'measurement';
    data: any;
    id: any;
    pose: { __typename?: 'pose'; coordinates: any };
  }>;
};

export type GetMeasurementRunsBySystemIdQueryVariables = Exact<{
  system_id?: Maybe<Scalars['Int']>;
  start?: Maybe<Scalars['timestamptz']>;
  end?: Maybe<Scalars['timestamptz']>;
}>;

export type GetMeasurementRunsBySystemIdQuery = {
  __typename?: 'query_root';
  measurement_run: Array<{
    __typename?: 'measurement_run';
    metadata?: any | null | undefined;
    system_id: number;
    start_time: any;
  }>;
};

export type GetMeasurementsByIdsQueryVariables = Exact<{
  ids?: Maybe<Array<Scalars['bigint']> | Scalars['bigint']>;
}>;

export type GetMeasurementsByIdsQuery = {
  __typename?: 'query_root';
  measurement: Array<{
    __typename?: 'measurement';
    id: any;
    type_id: number;
    pose_id: number;
    data: any;
    time: any;
    metadata?: any | null | undefined;
    measurement_run: {
      __typename?: 'measurement_run';
      metadata?: any | null | undefined;
    };
  }>;
};

export type GetSystemsByZoneIdQueryVariables = Exact<{
  zone_id?: Maybe<Scalars['Int']>;
}>;

export type GetSystemsByZoneIdQuery = {
  __typename?: 'query_root';
  system: Array<{
    __typename?: 'system';
    id: number;
    organization_id: number;
    zone_id: number;
  }>;
};

export type GetEnumerationByCodeAndTypeQueryVariables = Exact<{
  code?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
}>;

export type GetEnumerationByCodeAndTypeQuery = {
  __typename?: 'query_root';
  enumeration: Array<{
    __typename?: 'enumeration';
    code: string;
    description: string;
    id: number;
  }>;
};

export type GetZonesByOrganizationIdQueryVariables = Exact<{
  organization_id?: Maybe<IntComparisonExp>;
}>;

export type GetZonesByOrganizationIdQuery = {
  __typename?: 'query_root';
  zone: Array<{ __typename?: 'zone'; id: number }>;
};

export type GetZonesByOrganizationCodeQueryVariables = Exact<{
  code?: Maybe<StringComparisonExp>;
}>;

export type GetZonesByOrganizationCodeQuery = {
  __typename?: 'query_root';
  zone: Array<{
    __typename?: 'zone';
    id: number;
    location_id: number;
    metadata?: any | null | undefined;
    name_id: number;
    size_x?: number | null | undefined;
    size_y?: number | null | undefined;
    size_z?: number | null | undefined;
    enumeration: { __typename?: 'enumeration'; description: string };
  }>;
};

export const GetGrowthCycleByZoneIdDocument = gql`
  query getGrowthCycleByZoneId($zone_id: Int) {
    growth_cycle(where: { zone_id: { _eq: $zone_id } }) {
      id
      start_time
      end_time
      zone_id
      metadata
    }
  }
`;
export type GetGrowthCycleByZoneIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetGrowthCycleByZoneIdQuery,
    GetGrowthCycleByZoneIdQueryVariables
  >,
  'query'
>;

export const GetGrowthCycleByZoneIdComponent = (
  props: GetGrowthCycleByZoneIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetGrowthCycleByZoneIdQuery,
    GetGrowthCycleByZoneIdQueryVariables
  >
    query={GetGrowthCycleByZoneIdDocument}
    {...props}
  />
);

/**
 * __useGetGrowthCycleByZoneIdQuery__
 *
 * To run a query within a React component, call `useGetGrowthCycleByZoneIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGrowthCycleByZoneIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGrowthCycleByZoneIdQuery({
 *   variables: {
 *      zone_id: // value for 'zone_id'
 *   },
 * });
 */
export function useGetGrowthCycleByZoneIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetGrowthCycleByZoneIdQuery,
    GetGrowthCycleByZoneIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetGrowthCycleByZoneIdQuery,
    GetGrowthCycleByZoneIdQueryVariables
  >(GetGrowthCycleByZoneIdDocument, options);
}
export function useGetGrowthCycleByZoneIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGrowthCycleByZoneIdQuery,
    GetGrowthCycleByZoneIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetGrowthCycleByZoneIdQuery,
    GetGrowthCycleByZoneIdQueryVariables
  >(GetGrowthCycleByZoneIdDocument, options);
}
export type GetGrowthCycleByZoneIdQueryHookResult = ReturnType<
  typeof useGetGrowthCycleByZoneIdQuery
>;
export type GetGrowthCycleByZoneIdLazyQueryHookResult = ReturnType<
  typeof useGetGrowthCycleByZoneIdLazyQuery
>;
export type GetGrowthCycleByZoneIdQueryResult = Apollo.QueryResult<
  GetGrowthCycleByZoneIdQuery,
  GetGrowthCycleByZoneIdQueryVariables
>;
export const GetGrowthCycleByZoneIdAndDateDocument = gql`
  query getGrowthCycleByZoneIdAndDate($zone_id: Int, $start: timestamptz = "") {
    growth_cycle(
      where: { zone_id: { _eq: $zone_id }, start_time: { _lte: $start } }
      order_by: { end_time: desc }
      limit: 1
    ) {
      id
      start_time
      end_time
      zone_id
      metadata
    }
  }
`;
export type GetGrowthCycleByZoneIdAndDateComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetGrowthCycleByZoneIdAndDateQuery,
    GetGrowthCycleByZoneIdAndDateQueryVariables
  >,
  'query'
>;

export const GetGrowthCycleByZoneIdAndDateComponent = (
  props: GetGrowthCycleByZoneIdAndDateComponentProps
) => (
  <ApolloReactComponents.Query<
    GetGrowthCycleByZoneIdAndDateQuery,
    GetGrowthCycleByZoneIdAndDateQueryVariables
  >
    query={GetGrowthCycleByZoneIdAndDateDocument}
    {...props}
  />
);

/**
 * __useGetGrowthCycleByZoneIdAndDateQuery__
 *
 * To run a query within a React component, call `useGetGrowthCycleByZoneIdAndDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGrowthCycleByZoneIdAndDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGrowthCycleByZoneIdAndDateQuery({
 *   variables: {
 *      zone_id: // value for 'zone_id'
 *      start: // value for 'from'
 *   },
 * });
 */
export function useGetGrowthCycleByZoneIdAndDateQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetGrowthCycleByZoneIdAndDateQuery,
    GetGrowthCycleByZoneIdAndDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetGrowthCycleByZoneIdAndDateQuery,
    GetGrowthCycleByZoneIdAndDateQueryVariables
  >(GetGrowthCycleByZoneIdAndDateDocument, options);
}
export function useGetGrowthCycleByZoneIdAndDateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGrowthCycleByZoneIdAndDateQuery,
    GetGrowthCycleByZoneIdAndDateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetGrowthCycleByZoneIdAndDateQuery,
    GetGrowthCycleByZoneIdAndDateQueryVariables
  >(GetGrowthCycleByZoneIdAndDateDocument, options);
}
export type GetGrowthCycleByZoneIdAndDateQueryHookResult = ReturnType<
  typeof useGetGrowthCycleByZoneIdAndDateQuery
>;
export type GetGrowthCycleByZoneIdAndDateLazyQueryHookResult = ReturnType<
  typeof useGetGrowthCycleByZoneIdAndDateLazyQuery
>;
export type GetGrowthCycleByZoneIdAndDateQueryResult = Apollo.QueryResult<
  GetGrowthCycleByZoneIdAndDateQuery,
  GetGrowthCycleByZoneIdAndDateQueryVariables
>;
export const GetRecentHeatMapsBySystemIdDocument = gql`
  query getRecentHeatMapsBySystemId(
    $start: timestamptz = ""
    $end: timestamptz = ""
    $system_id: Int = 1
    $enumeration: String = ""
  ) {
    heat_map(
      order_by: { measurement_run: { start_time: asc } }
      where: {
        measurement_run: {
          system_id: { _eq: $system_id }
          end_time: { _gte: $start, _lte: $end }
        }
        enumeration: { code: { _eq: $enumeration } }
      }
    ) {
      id
      data
      measurement_run {
        start_time
        end_time
        id
        metadata
      }
      enumeration {
        code
        description
      }
    }
  }
`;
export type GetRecentHeatMapsBySystemIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetRecentHeatMapsBySystemIdQuery,
    GetRecentHeatMapsBySystemIdQueryVariables
  >,
  'query'
>;

export const GetRecentHeatMapsBySystemIdComponent = (
  props: GetRecentHeatMapsBySystemIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetRecentHeatMapsBySystemIdQuery,
    GetRecentHeatMapsBySystemIdQueryVariables
  >
    query={GetRecentHeatMapsBySystemIdDocument}
    {...props}
  />
);

/**
 * __useGetRecentHeatMapsBySystemIdQuery__
 *
 * To run a query within a React component, call `useGetRecentHeatMapsBySystemIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentHeatMapsBySystemIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentHeatMapsBySystemIdQuery({
 *   variables: {
 *      start: // value for 'from'
 *      end: // value for 'to'
 *      system_id: // value for 'system_id'
 *      enumeration: // value for 'enumeration'
 *   },
 * });
 */
export function useGetRecentHeatMapsBySystemIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRecentHeatMapsBySystemIdQuery,
    GetRecentHeatMapsBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRecentHeatMapsBySystemIdQuery,
    GetRecentHeatMapsBySystemIdQueryVariables
  >(GetRecentHeatMapsBySystemIdDocument, options);
}
export function useGetRecentHeatMapsBySystemIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRecentHeatMapsBySystemIdQuery,
    GetRecentHeatMapsBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRecentHeatMapsBySystemIdQuery,
    GetRecentHeatMapsBySystemIdQueryVariables
  >(GetRecentHeatMapsBySystemIdDocument, options);
}
export type GetRecentHeatMapsBySystemIdQueryHookResult = ReturnType<
  typeof useGetRecentHeatMapsBySystemIdQuery
>;
export type GetRecentHeatMapsBySystemIdLazyQueryHookResult = ReturnType<
  typeof useGetRecentHeatMapsBySystemIdLazyQuery
>;
export type GetRecentHeatMapsBySystemIdQueryResult = Apollo.QueryResult<
  GetRecentHeatMapsBySystemIdQuery,
  GetRecentHeatMapsBySystemIdQueryVariables
>;
export const GetMeasurementRunsBetweenDatesDocument = gql`
  query getMeasurementRunsBetweenDates(
    $system_id: Int
    $start: timestamptz!
    $end: timestamptz!
  ) {
    measurement_run(
      where: {
        system_id: { _eq: $system_id }
        _and: [
          {
            _and: [
              { start_time: { _gte: $start } }
              { start_time: { _lte: $end } }
            ]
          }
          {
            _and: [{ end_time: { _gte: $start } }, { end_time: { _lte: $end } }]
          }
        ]
        metadata: { _has_key: "statistics" }
      }
      order_by: { start_time: asc }
    ) {
      start_time
      id
      metadata
    }
  }
`;
export type GetMeasurementRunsBetweenDatesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetMeasurementRunsBetweenDatesQuery,
    GetMeasurementRunsBetweenDatesQueryVariables
  >,
  'query'
> &
  (
    | {
        variables: GetMeasurementRunsBetweenDatesQueryVariables;
        skip?: boolean;
      }
    | { skip: boolean }
  );

export const GetMeasurementRunsBetweenDatesComponent = (
  props: GetMeasurementRunsBetweenDatesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetMeasurementRunsBetweenDatesQuery,
    GetMeasurementRunsBetweenDatesQueryVariables
  >
    query={GetMeasurementRunsBetweenDatesDocument}
    {...props}
  />
);

/**
 * __useGetMeasurementRunsBetweenDatesQuery__
 *
 * To run a query within a React component, call `useGetMeasurementRunsBetweenDatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeasurementRunsBetweenDatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeasurementRunsBetweenDatesQuery({
 *   variables: {
 *      system_id: // value for 'system_id'
 *      start: // value for 'from'
 *      end: // value for 'to'
 *   },
 * });
 */
export function useGetMeasurementRunsBetweenDatesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMeasurementRunsBetweenDatesQuery,
    GetMeasurementRunsBetweenDatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMeasurementRunsBetweenDatesQuery,
    GetMeasurementRunsBetweenDatesQueryVariables
  >(GetMeasurementRunsBetweenDatesDocument, options);
}
export function useGetMeasurementRunsBetweenDatesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMeasurementRunsBetweenDatesQuery,
    GetMeasurementRunsBetweenDatesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMeasurementRunsBetweenDatesQuery,
    GetMeasurementRunsBetweenDatesQueryVariables
  >(GetMeasurementRunsBetweenDatesDocument, options);
}
export type GetMeasurementRunsBetweenDatesQueryHookResult = ReturnType<
  typeof useGetMeasurementRunsBetweenDatesQuery
>;
export type GetMeasurementRunsBetweenDatesLazyQueryHookResult = ReturnType<
  typeof useGetMeasurementRunsBetweenDatesLazyQuery
>;
export type GetMeasurementRunsBetweenDatesQueryResult = Apollo.QueryResult<
  GetMeasurementRunsBetweenDatesQuery,
  GetMeasurementRunsBetweenDatesQueryVariables
>;
export const GetLatestMeasurementRunWithImagesBySystemIdDocument = gql`
  query getLatestMeasurementRunWithImagesBySystemId(
    $system_id: Int_comparison_exp = {}
    $start: timestamptz = ""
    $end: timestamptz = ""
  ) {
    measurement_run(
      where: {
        system_id: $system_id
        metadata: { _has_key: "image_info" }
        start_time: { _gte: $start, _lte: $end }
      }
      order_by: { start_time: desc }
      limit: 1
    ) {
      start_time
      id
      metadata
    }
  }
`;
export type GetLatestMeasurementRunWithImagesBySystemIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetLatestMeasurementRunWithImagesBySystemIdQuery,
    GetLatestMeasurementRunWithImagesBySystemIdQueryVariables
  >,
  'query'
>;

export const GetLatestMeasurementRunWithImagesBySystemIdComponent = (
  props: GetLatestMeasurementRunWithImagesBySystemIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetLatestMeasurementRunWithImagesBySystemIdQuery,
    GetLatestMeasurementRunWithImagesBySystemIdQueryVariables
  >
    query={GetLatestMeasurementRunWithImagesBySystemIdDocument}
    {...props}
  />
);

/**
 * __useGetLatestMeasurementRunWithImagesBySystemIdQuery__
 *
 * To run a query within a React component, call `useGetLatestMeasurementRunWithImagesBySystemIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestMeasurementRunWithImagesBySystemIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestMeasurementRunWithImagesBySystemIdQuery({
 *   variables: {
 *      system_id: // value for 'system_id'
 *      start: // value for 'from'
 *      end: // value for 'to'
 *   },
 * });
 */
export function useGetLatestMeasurementRunWithImagesBySystemIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLatestMeasurementRunWithImagesBySystemIdQuery,
    GetLatestMeasurementRunWithImagesBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetLatestMeasurementRunWithImagesBySystemIdQuery,
    GetLatestMeasurementRunWithImagesBySystemIdQueryVariables
  >(GetLatestMeasurementRunWithImagesBySystemIdDocument, options);
}
export function useGetLatestMeasurementRunWithImagesBySystemIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLatestMeasurementRunWithImagesBySystemIdQuery,
    GetLatestMeasurementRunWithImagesBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLatestMeasurementRunWithImagesBySystemIdQuery,
    GetLatestMeasurementRunWithImagesBySystemIdQueryVariables
  >(GetLatestMeasurementRunWithImagesBySystemIdDocument, options);
}
export type GetLatestMeasurementRunWithImagesBySystemIdQueryHookResult =
  ReturnType<typeof useGetLatestMeasurementRunWithImagesBySystemIdQuery>;
export type GetLatestMeasurementRunWithImagesBySystemIdLazyQueryHookResult =
  ReturnType<typeof useGetLatestMeasurementRunWithImagesBySystemIdLazyQuery>;
export type GetLatestMeasurementRunWithImagesBySystemIdQueryResult =
  Apollo.QueryResult<
    GetLatestMeasurementRunWithImagesBySystemIdQuery,
    GetLatestMeasurementRunWithImagesBySystemIdQueryVariables
  >;
export const GetLatestMeasurementRunBySystemIdDocument = gql`
  query getLatestMeasurementRunBySystemId(
    $system_id: Int_comparison_exp = {}
    $start: timestamptz = ""
    $end: timestamptz = ""
  ) {
    measurement_run(
      where: {
        system_id: $system_id
        metadata: { _has_key: "statistics" }
        start_time: { _gte: $start, _lte: $end }
      }
      order_by: { start_time: desc }
      limit: 1
    ) {
      start_time
      id
      metadata
    }
  }
`;
export type GetLatestMeasurementRunBySystemIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetLatestMeasurementRunBySystemIdQuery,
    GetLatestMeasurementRunBySystemIdQueryVariables
  >,
  'query'
>;

export const GetLatestMeasurementRunBySystemIdComponent = (
  props: GetLatestMeasurementRunBySystemIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetLatestMeasurementRunBySystemIdQuery,
    GetLatestMeasurementRunBySystemIdQueryVariables
  >
    query={GetLatestMeasurementRunBySystemIdDocument}
    {...props}
  />
);

/**
 * __useGetLatestMeasurementRunBySystemIdQuery__
 *
 * To run a query within a React component, call `useGetLatestMeasurementRunBySystemIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLatestMeasurementRunBySystemIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLatestMeasurementRunBySystemIdQuery({
 *   variables: {
 *      system_id: // value for 'system_id'
 *      start: // value for 'from'
 *      end: // value for 'to'
 *   },
 * });
 */
export function useGetLatestMeasurementRunBySystemIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLatestMeasurementRunBySystemIdQuery,
    GetLatestMeasurementRunBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetLatestMeasurementRunBySystemIdQuery,
    GetLatestMeasurementRunBySystemIdQueryVariables
  >(GetLatestMeasurementRunBySystemIdDocument, options);
}
export function useGetLatestMeasurementRunBySystemIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLatestMeasurementRunBySystemIdQuery,
    GetLatestMeasurementRunBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetLatestMeasurementRunBySystemIdQuery,
    GetLatestMeasurementRunBySystemIdQueryVariables
  >(GetLatestMeasurementRunBySystemIdDocument, options);
}
export type GetLatestMeasurementRunBySystemIdQueryHookResult = ReturnType<
  typeof useGetLatestMeasurementRunBySystemIdQuery
>;
export type GetLatestMeasurementRunBySystemIdLazyQueryHookResult = ReturnType<
  typeof useGetLatestMeasurementRunBySystemIdLazyQuery
>;
export type GetLatestMeasurementRunBySystemIdQueryResult = Apollo.QueryResult<
  GetLatestMeasurementRunBySystemIdQuery,
  GetLatestMeasurementRunBySystemIdQueryVariables
>;
export const GetPhotoFeedDataByRunIdDocument = gql`
  query getPhotoFeedDataByRunId($run_id: Int) {
    measurement(
      where: {
        measurement_run_id: { _eq: $run_id }
        enumerationByTypeId: { code: { _eq: "RGB_IMAGE" } }
      }
    ) {
      pose {
        coordinates
      }
      data
      id
    }
  }
`;
export type GetPhotoFeedDataByRunIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPhotoFeedDataByRunIdQuery,
    GetPhotoFeedDataByRunIdQueryVariables
  >,
  'query'
>;

export const GetPhotoFeedDataByRunIdComponent = (
  props: GetPhotoFeedDataByRunIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetPhotoFeedDataByRunIdQuery,
    GetPhotoFeedDataByRunIdQueryVariables
  >
    query={GetPhotoFeedDataByRunIdDocument}
    {...props}
  />
);

/**
 * __useGetPhotoFeedDataByRunIdQuery__
 *
 * To run a query within a React component, call `useGetPhotoFeedDataByRunIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPhotoFeedDataByRunIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPhotoFeedDataByRunIdQuery({
 *   variables: {
 *      run_id: // value for 'run_id'
 *   },
 * });
 */
export function useGetPhotoFeedDataByRunIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPhotoFeedDataByRunIdQuery,
    GetPhotoFeedDataByRunIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPhotoFeedDataByRunIdQuery,
    GetPhotoFeedDataByRunIdQueryVariables
  >(GetPhotoFeedDataByRunIdDocument, options);
}
export function useGetPhotoFeedDataByRunIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPhotoFeedDataByRunIdQuery,
    GetPhotoFeedDataByRunIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPhotoFeedDataByRunIdQuery,
    GetPhotoFeedDataByRunIdQueryVariables
  >(GetPhotoFeedDataByRunIdDocument, options);
}
export type GetPhotoFeedDataByRunIdQueryHookResult = ReturnType<
  typeof useGetPhotoFeedDataByRunIdQuery
>;
export type GetPhotoFeedDataByRunIdLazyQueryHookResult = ReturnType<
  typeof useGetPhotoFeedDataByRunIdLazyQuery
>;
export type GetPhotoFeedDataByRunIdQueryResult = Apollo.QueryResult<
  GetPhotoFeedDataByRunIdQuery,
  GetPhotoFeedDataByRunIdQueryVariables
>;
export const GetMeasurementRunsBySystemIdDocument = gql`
  query getMeasurementRunsBySystemId(
    $system_id: Int
    $start: timestamptz = ""
    $end: timestamptz = ""
  ) {
    measurement_run(
      where: {
        system_id: { _eq: $system_id }
        start_time: { _gte: $start, _lte: $end }
      }
    ) {
      metadata
      system_id
      start_time
    }
  }
`;
export type GetMeasurementRunsBySystemIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetMeasurementRunsBySystemIdQuery,
    GetMeasurementRunsBySystemIdQueryVariables
  >,
  'query'
>;

export const GetMeasurementRunsBySystemIdComponent = (
  props: GetMeasurementRunsBySystemIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetMeasurementRunsBySystemIdQuery,
    GetMeasurementRunsBySystemIdQueryVariables
  >
    query={GetMeasurementRunsBySystemIdDocument}
    {...props}
  />
);

/**
 * __useGetMeasurementRunsBySystemIdQuery__
 *
 * To run a query within a React component, call `useGetMeasurementRunsBySystemIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeasurementRunsBySystemIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeasurementRunsBySystemIdQuery({
 *   variables: {
 *      system_id: // value for 'system_id'
 *      start: // value for 'from'
 *      end: // value for 'to'
 *   },
 * });
 */
export function useGetMeasurementRunsBySystemIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMeasurementRunsBySystemIdQuery,
    GetMeasurementRunsBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMeasurementRunsBySystemIdQuery,
    GetMeasurementRunsBySystemIdQueryVariables
  >(GetMeasurementRunsBySystemIdDocument, options);
}
export function useGetMeasurementRunsBySystemIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMeasurementRunsBySystemIdQuery,
    GetMeasurementRunsBySystemIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMeasurementRunsBySystemIdQuery,
    GetMeasurementRunsBySystemIdQueryVariables
  >(GetMeasurementRunsBySystemIdDocument, options);
}
export type GetMeasurementRunsBySystemIdQueryHookResult = ReturnType<
  typeof useGetMeasurementRunsBySystemIdQuery
>;
export type GetMeasurementRunsBySystemIdLazyQueryHookResult = ReturnType<
  typeof useGetMeasurementRunsBySystemIdLazyQuery
>;
export type GetMeasurementRunsBySystemIdQueryResult = Apollo.QueryResult<
  GetMeasurementRunsBySystemIdQuery,
  GetMeasurementRunsBySystemIdQueryVariables
>;
export const GetMeasurementsByIdsDocument = gql`
  query getMeasurementsByIds($ids: [bigint!] = []) {
    measurement(where: { id: { _in: $ids } }) {
      id
      type_id
      pose_id
      data
      time
      metadata
      measurement_run {
        metadata
      }
    }
  }
`;
export type GetMeasurementsByIdsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetMeasurementsByIdsQuery,
    GetMeasurementsByIdsQueryVariables
  >,
  'query'
>;

export const GetMeasurementsByIdsComponent = (
  props: GetMeasurementsByIdsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetMeasurementsByIdsQuery,
    GetMeasurementsByIdsQueryVariables
  >
    query={GetMeasurementsByIdsDocument}
    {...props}
  />
);

/**
 * __useGetMeasurementsByIdsQuery__
 *
 * To run a query within a React component, call `useGetMeasurementsByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeasurementsByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeasurementsByIdsQuery({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useGetMeasurementsByIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMeasurementsByIdsQuery,
    GetMeasurementsByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetMeasurementsByIdsQuery,
    GetMeasurementsByIdsQueryVariables
  >(GetMeasurementsByIdsDocument, options);
}
export function useGetMeasurementsByIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMeasurementsByIdsQuery,
    GetMeasurementsByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetMeasurementsByIdsQuery,
    GetMeasurementsByIdsQueryVariables
  >(GetMeasurementsByIdsDocument, options);
}
export type GetMeasurementsByIdsQueryHookResult = ReturnType<
  typeof useGetMeasurementsByIdsQuery
>;
export type GetMeasurementsByIdsLazyQueryHookResult = ReturnType<
  typeof useGetMeasurementsByIdsLazyQuery
>;
export type GetMeasurementsByIdsQueryResult = Apollo.QueryResult<
  GetMeasurementsByIdsQuery,
  GetMeasurementsByIdsQueryVariables
>;
export const GetSystemsByZoneIdDocument = gql`
  query getSystemsByZoneId($zone_id: Int) {
    system(where: { zone_id: { _eq: $zone_id } }, order_by: { id: asc }) {
      id
      organization_id
      zone_id
    }
  }
`;
export type GetSystemsByZoneIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetSystemsByZoneIdQuery,
    GetSystemsByZoneIdQueryVariables
  >,
  'query'
>;

export const GetSystemsByZoneIdComponent = (
  props: GetSystemsByZoneIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetSystemsByZoneIdQuery,
    GetSystemsByZoneIdQueryVariables
  >
    query={GetSystemsByZoneIdDocument}
    {...props}
  />
);

/**
 * __useGetSystemsByZoneIdQuery__
 *
 * To run a query within a React component, call `useGetSystemsByZoneIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSystemsByZoneIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSystemsByZoneIdQuery({
 *   variables: {
 *      zone_id: // value for 'zone_id'
 *   },
 * });
 */
export function useGetSystemsByZoneIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSystemsByZoneIdQuery,
    GetSystemsByZoneIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSystemsByZoneIdQuery,
    GetSystemsByZoneIdQueryVariables
  >(GetSystemsByZoneIdDocument, options);
}
export function useGetSystemsByZoneIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSystemsByZoneIdQuery,
    GetSystemsByZoneIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSystemsByZoneIdQuery,
    GetSystemsByZoneIdQueryVariables
  >(GetSystemsByZoneIdDocument, options);
}
export type GetSystemsByZoneIdQueryHookResult = ReturnType<
  typeof useGetSystemsByZoneIdQuery
>;
export type GetSystemsByZoneIdLazyQueryHookResult = ReturnType<
  typeof useGetSystemsByZoneIdLazyQuery
>;
export type GetSystemsByZoneIdQueryResult = Apollo.QueryResult<
  GetSystemsByZoneIdQuery,
  GetSystemsByZoneIdQueryVariables
>;
export const GetEnumerationByCodeAndTypeDocument = gql`
  query getEnumerationByCodeAndType($code: String = "", $type: String = "") {
    enumeration(where: { code: { _eq: $code }, type: { _eq: $type } }) {
      code
      description
      id
    }
  }
`;
export type GetEnumerationByCodeAndTypeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetEnumerationByCodeAndTypeQuery,
    GetEnumerationByCodeAndTypeQueryVariables
  >,
  'query'
>;

export const GetEnumerationByCodeAndTypeComponent = (
  props: GetEnumerationByCodeAndTypeComponentProps
) => (
  <ApolloReactComponents.Query<
    GetEnumerationByCodeAndTypeQuery,
    GetEnumerationByCodeAndTypeQueryVariables
  >
    query={GetEnumerationByCodeAndTypeDocument}
    {...props}
  />
);

/**
 * __useGetEnumerationByCodeAndTypeQuery__
 *
 * To run a query within a React component, call `useGetEnumerationByCodeAndTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEnumerationByCodeAndTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEnumerationByCodeAndTypeQuery({
 *   variables: {
 *      code: // value for 'code'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetEnumerationByCodeAndTypeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetEnumerationByCodeAndTypeQuery,
    GetEnumerationByCodeAndTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetEnumerationByCodeAndTypeQuery,
    GetEnumerationByCodeAndTypeQueryVariables
  >(GetEnumerationByCodeAndTypeDocument, options);
}
export function useGetEnumerationByCodeAndTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEnumerationByCodeAndTypeQuery,
    GetEnumerationByCodeAndTypeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEnumerationByCodeAndTypeQuery,
    GetEnumerationByCodeAndTypeQueryVariables
  >(GetEnumerationByCodeAndTypeDocument, options);
}
export type GetEnumerationByCodeAndTypeQueryHookResult = ReturnType<
  typeof useGetEnumerationByCodeAndTypeQuery
>;
export type GetEnumerationByCodeAndTypeLazyQueryHookResult = ReturnType<
  typeof useGetEnumerationByCodeAndTypeLazyQuery
>;
export type GetEnumerationByCodeAndTypeQueryResult = Apollo.QueryResult<
  GetEnumerationByCodeAndTypeQuery,
  GetEnumerationByCodeAndTypeQueryVariables
>;
export const GetZonesByOrganizationIdDocument = gql`
  query getZonesByOrganizationId($organization_id: Int_comparison_exp = {}) {
    zone(where: { location: { organization_id: $organization_id } }) {
      id
    }
  }
`;
export type GetZonesByOrganizationIdComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetZonesByOrganizationIdQuery,
    GetZonesByOrganizationIdQueryVariables
  >,
  'query'
>;

export const GetZonesByOrganizationIdComponent = (
  props: GetZonesByOrganizationIdComponentProps
) => (
  <ApolloReactComponents.Query<
    GetZonesByOrganizationIdQuery,
    GetZonesByOrganizationIdQueryVariables
  >
    query={GetZonesByOrganizationIdDocument}
    {...props}
  />
);

/**
 * __useGetZonesByOrganizationIdQuery__
 *
 * To run a query within a React component, call `useGetZonesByOrganizationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetZonesByOrganizationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetZonesByOrganizationIdQuery({
 *   variables: {
 *      organization_id: // value for 'organization_id'
 *   },
 * });
 */
export function useGetZonesByOrganizationIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetZonesByOrganizationIdQuery,
    GetZonesByOrganizationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetZonesByOrganizationIdQuery,
    GetZonesByOrganizationIdQueryVariables
  >(GetZonesByOrganizationIdDocument, options);
}
export function useGetZonesByOrganizationIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetZonesByOrganizationIdQuery,
    GetZonesByOrganizationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetZonesByOrganizationIdQuery,
    GetZonesByOrganizationIdQueryVariables
  >(GetZonesByOrganizationIdDocument, options);
}
export type GetZonesByOrganizationIdQueryHookResult = ReturnType<
  typeof useGetZonesByOrganizationIdQuery
>;
export type GetZonesByOrganizationIdLazyQueryHookResult = ReturnType<
  typeof useGetZonesByOrganizationIdLazyQuery
>;
export type GetZonesByOrganizationIdQueryResult = Apollo.QueryResult<
  GetZonesByOrganizationIdQuery,
  GetZonesByOrganizationIdQueryVariables
>;
export const GetZonesByOrganizationCodeDocument = gql`
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
`;
export type GetZonesByOrganizationCodeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetZonesByOrganizationCodeQuery,
    GetZonesByOrganizationCodeQueryVariables
  >,
  'query'
>;

export const GetZonesByOrganizationCodeComponent = (
  props: GetZonesByOrganizationCodeComponentProps
) => (
  <ApolloReactComponents.Query<
    GetZonesByOrganizationCodeQuery,
    GetZonesByOrganizationCodeQueryVariables
  >
    query={GetZonesByOrganizationCodeDocument}
    {...props}
  />
);

/**
 * __useGetZonesByOrganizationCodeQuery__
 *
 * To run a query within a React component, call `useGetZonesByOrganizationCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetZonesByOrganizationCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetZonesByOrganizationCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetZonesByOrganizationCodeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetZonesByOrganizationCodeQuery,
    GetZonesByOrganizationCodeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetZonesByOrganizationCodeQuery,
    GetZonesByOrganizationCodeQueryVariables
  >(GetZonesByOrganizationCodeDocument, options);
}
export function useGetZonesByOrganizationCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetZonesByOrganizationCodeQuery,
    GetZonesByOrganizationCodeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetZonesByOrganizationCodeQuery,
    GetZonesByOrganizationCodeQueryVariables
  >(GetZonesByOrganizationCodeDocument, options);
}
export type GetZonesByOrganizationCodeQueryHookResult = ReturnType<
  typeof useGetZonesByOrganizationCodeQuery
>;
export type GetZonesByOrganizationCodeLazyQueryHookResult = ReturnType<
  typeof useGetZonesByOrganizationCodeLazyQuery
>;
export type GetZonesByOrganizationCodeQueryResult = Apollo.QueryResult<
  GetZonesByOrganizationCodeQuery,
  GetZonesByOrganizationCodeQueryVariables
>;
