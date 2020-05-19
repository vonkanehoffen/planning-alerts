import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  geography: any;
  geometry: any;
  jsonb: any;
  timestamptz: any;
};

/** columns and relationships of "council" */
export type Council = {
   __typename?: 'council';
  council_type: Scalars['String'];
  id: Scalars['Int'];
  /** An array relationship */
  pa_scrapes: Array<Pa_Scrape>;
  /** An aggregated array relationship */
  pa_scrapes_aggregate: Pa_Scrape_Aggregate;
  /** An array relationship */
  pa_statuses: Array<Pa_Status>;
  /** An aggregated array relationship */
  pa_statuses_aggregate: Pa_Status_Aggregate;
  portal_url?: Maybe<Scalars['String']>;
  /** An array relationship */
  scrape_logs: Array<Scrape_Log>;
  /** An aggregated array relationship */
  scrape_logs_aggregate: Scrape_Log_Aggregate;
  scraper?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};


/** columns and relationships of "council" */
export type CouncilPa_ScrapesArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};


/** columns and relationships of "council" */
export type CouncilPa_Scrapes_AggregateArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};


/** columns and relationships of "council" */
export type CouncilPa_StatusesArgs = {
  distinct_on?: Maybe<Array<Pa_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Status_Order_By>>;
  where?: Maybe<Pa_Status_Bool_Exp>;
};


/** columns and relationships of "council" */
export type CouncilPa_Statuses_AggregateArgs = {
  distinct_on?: Maybe<Array<Pa_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Status_Order_By>>;
  where?: Maybe<Pa_Status_Bool_Exp>;
};


/** columns and relationships of "council" */
export type CouncilScrape_LogsArgs = {
  distinct_on?: Maybe<Array<Scrape_Log_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scrape_Log_Order_By>>;
  where?: Maybe<Scrape_Log_Bool_Exp>;
};


/** columns and relationships of "council" */
export type CouncilScrape_Logs_AggregateArgs = {
  distinct_on?: Maybe<Array<Scrape_Log_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scrape_Log_Order_By>>;
  where?: Maybe<Scrape_Log_Bool_Exp>;
};

/** aggregated selection of "council" */
export type Council_Aggregate = {
   __typename?: 'council_aggregate';
  aggregate?: Maybe<Council_Aggregate_Fields>;
  nodes: Array<Council>;
};

/** aggregate fields of "council" */
export type Council_Aggregate_Fields = {
   __typename?: 'council_aggregate_fields';
  avg?: Maybe<Council_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Council_Max_Fields>;
  min?: Maybe<Council_Min_Fields>;
  stddev?: Maybe<Council_Stddev_Fields>;
  stddev_pop?: Maybe<Council_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Council_Stddev_Samp_Fields>;
  sum?: Maybe<Council_Sum_Fields>;
  var_pop?: Maybe<Council_Var_Pop_Fields>;
  var_samp?: Maybe<Council_Var_Samp_Fields>;
  variance?: Maybe<Council_Variance_Fields>;
};


/** aggregate fields of "council" */
export type Council_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Council_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Council_Avg_Fields = {
   __typename?: 'council_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type Council_Max_Fields = {
   __typename?: 'council_max_fields';
  council_type?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  portal_url?: Maybe<Scalars['String']>;
  scraper?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Council_Min_Fields = {
   __typename?: 'council_min_fields';
  council_type?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  portal_url?: Maybe<Scalars['String']>;
  scraper?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "council" */
export type Council_Mutation_Response = {
   __typename?: 'council_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Council>;
};

/** aggregate stddev on columns */
export type Council_Stddev_Fields = {
   __typename?: 'council_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Council_Stddev_Pop_Fields = {
   __typename?: 'council_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Council_Stddev_Samp_Fields = {
   __typename?: 'council_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Council_Sum_Fields = {
   __typename?: 'council_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Council_Var_Pop_Fields = {
   __typename?: 'council_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Council_Var_Samp_Fields = {
   __typename?: 'council_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Council_Variance_Fields = {
   __typename?: 'council_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/**
 * FCM device tokens for users
 * 
 * 
 * columns and relationships of \"fcm_token\"
 */
export type Fcm_Token = {
   __typename?: 'fcm_token';
  created_at?: Maybe<Scalars['timestamptz']>;
  device_id: Scalars['String'];
  token: Scalars['String'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "fcm_token" */
export type Fcm_Token_Aggregate = {
   __typename?: 'fcm_token_aggregate';
  aggregate?: Maybe<Fcm_Token_Aggregate_Fields>;
  nodes: Array<Fcm_Token>;
};

/** aggregate fields of "fcm_token" */
export type Fcm_Token_Aggregate_Fields = {
   __typename?: 'fcm_token_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Fcm_Token_Max_Fields>;
  min?: Maybe<Fcm_Token_Min_Fields>;
};


/** aggregate fields of "fcm_token" */
export type Fcm_Token_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Fcm_Token_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Fcm_Token_Max_Fields = {
   __typename?: 'fcm_token_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Fcm_Token_Min_Fields = {
   __typename?: 'fcm_token_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "fcm_token" */
export type Fcm_Token_Mutation_Response = {
   __typename?: 'fcm_token_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Fcm_Token>;
};

/** mutation root */
export type Mutation_Root = {
   __typename?: 'mutation_root';
  /** delete data from the table: "council" */
  delete_council?: Maybe<Council_Mutation_Response>;
  /** delete single row from the table: "council" */
  delete_council_by_pk?: Maybe<Council>;
  /** delete data from the table: "fcm_token" */
  delete_fcm_token?: Maybe<Fcm_Token_Mutation_Response>;
  /** delete single row from the table: "fcm_token" */
  delete_fcm_token_by_pk?: Maybe<Fcm_Token>;
  /** delete data from the table: "pa_scrape" */
  delete_pa_scrape?: Maybe<Pa_Scrape_Mutation_Response>;
  /** delete single row from the table: "pa_scrape" */
  delete_pa_scrape_by_pk?: Maybe<Pa_Scrape>;
  /** delete data from the table: "pa_status" */
  delete_pa_status?: Maybe<Pa_Status_Mutation_Response>;
  /** delete single row from the table: "pa_status" */
  delete_pa_status_by_pk?: Maybe<Pa_Status>;
  /** delete data from the table: "scrape_log" */
  delete_scrape_log?: Maybe<Scrape_Log_Mutation_Response>;
  /** delete single row from the table: "scrape_log" */
  delete_scrape_log_by_pk?: Maybe<Scrape_Log>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "council" */
  insert_council?: Maybe<Council_Mutation_Response>;
  /** insert a single row into the table: "council" */
  insert_council_one?: Maybe<Council>;
  /** insert data into the table: "fcm_token" */
  insert_fcm_token?: Maybe<Fcm_Token_Mutation_Response>;
  /** insert a single row into the table: "fcm_token" */
  insert_fcm_token_one?: Maybe<Fcm_Token>;
  /** insert data into the table: "pa_scrape" */
  insert_pa_scrape?: Maybe<Pa_Scrape_Mutation_Response>;
  /** insert a single row into the table: "pa_scrape" */
  insert_pa_scrape_one?: Maybe<Pa_Scrape>;
  /** insert data into the table: "pa_status" */
  insert_pa_status?: Maybe<Pa_Status_Mutation_Response>;
  /** insert a single row into the table: "pa_status" */
  insert_pa_status_one?: Maybe<Pa_Status>;
  /** insert data into the table: "scrape_log" */
  insert_scrape_log?: Maybe<Scrape_Log_Mutation_Response>;
  /** insert a single row into the table: "scrape_log" */
  insert_scrape_log_one?: Maybe<Scrape_Log>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "council" */
  update_council?: Maybe<Council_Mutation_Response>;
  /** update single row of the table: "council" */
  update_council_by_pk?: Maybe<Council>;
  /** update data of the table: "fcm_token" */
  update_fcm_token?: Maybe<Fcm_Token_Mutation_Response>;
  /** update single row of the table: "fcm_token" */
  update_fcm_token_by_pk?: Maybe<Fcm_Token>;
  /** update data of the table: "pa_scrape" */
  update_pa_scrape?: Maybe<Pa_Scrape_Mutation_Response>;
  /** update single row of the table: "pa_scrape" */
  update_pa_scrape_by_pk?: Maybe<Pa_Scrape>;
  /** update data of the table: "pa_status" */
  update_pa_status?: Maybe<Pa_Status_Mutation_Response>;
  /** update single row of the table: "pa_status" */
  update_pa_status_by_pk?: Maybe<Pa_Status>;
  /** update data of the table: "scrape_log" */
  update_scrape_log?: Maybe<Scrape_Log_Mutation_Response>;
  /** update single row of the table: "scrape_log" */
  update_scrape_log_by_pk?: Maybe<Scrape_Log>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_CouncilArgs = {
  where: Council_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Council_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Fcm_TokenArgs = {
  where: Fcm_Token_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Fcm_Token_By_PkArgs = {
  device_id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Pa_ScrapeArgs = {
  where: Pa_Scrape_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pa_Scrape_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Pa_StatusArgs = {
  where: Pa_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Pa_Status_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDelete_Scrape_LogArgs = {
  where: Scrape_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scrape_Log_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_CouncilArgs = {
  objects: Array<Council_Insert_Input>;
  on_conflict?: Maybe<Council_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Council_OneArgs = {
  object: Council_Insert_Input;
  on_conflict?: Maybe<Council_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Fcm_TokenArgs = {
  objects: Array<Fcm_Token_Insert_Input>;
  on_conflict?: Maybe<Fcm_Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Fcm_Token_OneArgs = {
  object: Fcm_Token_Insert_Input;
  on_conflict?: Maybe<Fcm_Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pa_ScrapeArgs = {
  objects: Array<Pa_Scrape_Insert_Input>;
  on_conflict?: Maybe<Pa_Scrape_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pa_Scrape_OneArgs = {
  object: Pa_Scrape_Insert_Input;
  on_conflict?: Maybe<Pa_Scrape_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pa_StatusArgs = {
  objects: Array<Pa_Status_Insert_Input>;
  on_conflict?: Maybe<Pa_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Pa_Status_OneArgs = {
  object: Pa_Status_Insert_Input;
  on_conflict?: Maybe<Pa_Status_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scrape_LogArgs = {
  objects: Array<Scrape_Log_Insert_Input>;
  on_conflict?: Maybe<Scrape_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scrape_Log_OneArgs = {
  object: Scrape_Log_Insert_Input;
  on_conflict?: Maybe<Scrape_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CouncilArgs = {
  _inc?: Maybe<Council_Inc_Input>;
  _set?: Maybe<Council_Set_Input>;
  where: Council_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Council_By_PkArgs = {
  _inc?: Maybe<Council_Inc_Input>;
  _set?: Maybe<Council_Set_Input>;
  pk_columns: Council_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Fcm_TokenArgs = {
  _set?: Maybe<Fcm_Token_Set_Input>;
  where: Fcm_Token_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Fcm_Token_By_PkArgs = {
  _set?: Maybe<Fcm_Token_Set_Input>;
  pk_columns: Fcm_Token_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Pa_ScrapeArgs = {
  _append?: Maybe<Pa_Scrape_Append_Input>;
  _delete_at_path?: Maybe<Pa_Scrape_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Pa_Scrape_Delete_Elem_Input>;
  _delete_key?: Maybe<Pa_Scrape_Delete_Key_Input>;
  _inc?: Maybe<Pa_Scrape_Inc_Input>;
  _prepend?: Maybe<Pa_Scrape_Prepend_Input>;
  _set?: Maybe<Pa_Scrape_Set_Input>;
  where: Pa_Scrape_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pa_Scrape_By_PkArgs = {
  _append?: Maybe<Pa_Scrape_Append_Input>;
  _delete_at_path?: Maybe<Pa_Scrape_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Pa_Scrape_Delete_Elem_Input>;
  _delete_key?: Maybe<Pa_Scrape_Delete_Key_Input>;
  _inc?: Maybe<Pa_Scrape_Inc_Input>;
  _prepend?: Maybe<Pa_Scrape_Prepend_Input>;
  _set?: Maybe<Pa_Scrape_Set_Input>;
  pk_columns: Pa_Scrape_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Pa_StatusArgs = {
  _inc?: Maybe<Pa_Status_Inc_Input>;
  _set?: Maybe<Pa_Status_Set_Input>;
  where: Pa_Status_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Pa_Status_By_PkArgs = {
  _inc?: Maybe<Pa_Status_Inc_Input>;
  _set?: Maybe<Pa_Status_Set_Input>;
  pk_columns: Pa_Status_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Scrape_LogArgs = {
  _append?: Maybe<Scrape_Log_Append_Input>;
  _delete_at_path?: Maybe<Scrape_Log_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Scrape_Log_Delete_Elem_Input>;
  _delete_key?: Maybe<Scrape_Log_Delete_Key_Input>;
  _inc?: Maybe<Scrape_Log_Inc_Input>;
  _prepend?: Maybe<Scrape_Log_Prepend_Input>;
  _set?: Maybe<Scrape_Log_Set_Input>;
  where: Scrape_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scrape_Log_By_PkArgs = {
  _append?: Maybe<Scrape_Log_Append_Input>;
  _delete_at_path?: Maybe<Scrape_Log_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Scrape_Log_Delete_Elem_Input>;
  _delete_key?: Maybe<Scrape_Log_Delete_Key_Input>;
  _inc?: Maybe<Scrape_Log_Inc_Input>;
  _prepend?: Maybe<Scrape_Log_Prepend_Input>;
  _set?: Maybe<Scrape_Log_Set_Input>;
  pk_columns: Scrape_Log_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** columns and relationships of "pa_scrape" */
export type Pa_Scrape = {
   __typename?: 'pa_scrape';
  contacts?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  council?: Maybe<Council>;
  council_id?: Maybe<Scalars['Int']>;
  further_information?: Maybe<Scalars['jsonb']>;
  id: Scalars['Int'];
  important_dates?: Maybe<Scalars['jsonb']>;
  list_type: Scalars['String'];
  /** An object relationship */
  pa_status: Pa_Status;
  reference: Scalars['String'];
  scraped_at: Scalars['timestamptz'];
  scraper: Scalars['String'];
  summary?: Maybe<Scalars['jsonb']>;
  url: Scalars['String'];
};


/** columns and relationships of "pa_scrape" */
export type Pa_ScrapeContactsArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "pa_scrape" */
export type Pa_ScrapeFurther_InformationArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "pa_scrape" */
export type Pa_ScrapeImportant_DatesArgs = {
  path?: Maybe<Scalars['String']>;
};


/** columns and relationships of "pa_scrape" */
export type Pa_ScrapeSummaryArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "pa_scrape" */
export type Pa_Scrape_Aggregate = {
   __typename?: 'pa_scrape_aggregate';
  aggregate?: Maybe<Pa_Scrape_Aggregate_Fields>;
  nodes: Array<Pa_Scrape>;
};

/** aggregate fields of "pa_scrape" */
export type Pa_Scrape_Aggregate_Fields = {
   __typename?: 'pa_scrape_aggregate_fields';
  avg?: Maybe<Pa_Scrape_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Pa_Scrape_Max_Fields>;
  min?: Maybe<Pa_Scrape_Min_Fields>;
  stddev?: Maybe<Pa_Scrape_Stddev_Fields>;
  stddev_pop?: Maybe<Pa_Scrape_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Pa_Scrape_Stddev_Samp_Fields>;
  sum?: Maybe<Pa_Scrape_Sum_Fields>;
  var_pop?: Maybe<Pa_Scrape_Var_Pop_Fields>;
  var_samp?: Maybe<Pa_Scrape_Var_Samp_Fields>;
  variance?: Maybe<Pa_Scrape_Variance_Fields>;
};


/** aggregate fields of "pa_scrape" */
export type Pa_Scrape_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Pa_Scrape_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Pa_Scrape_Avg_Fields = {
   __typename?: 'pa_scrape_avg_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type Pa_Scrape_Max_Fields = {
   __typename?: 'pa_scrape_max_fields';
  council_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  list_type?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  scraped_at?: Maybe<Scalars['timestamptz']>;
  scraper?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Pa_Scrape_Min_Fields = {
   __typename?: 'pa_scrape_min_fields';
  council_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  list_type?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  scraped_at?: Maybe<Scalars['timestamptz']>;
  scraper?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "pa_scrape" */
export type Pa_Scrape_Mutation_Response = {
   __typename?: 'pa_scrape_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Pa_Scrape>;
};

/** aggregate stddev on columns */
export type Pa_Scrape_Stddev_Fields = {
   __typename?: 'pa_scrape_stddev_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Pa_Scrape_Stddev_Pop_Fields = {
   __typename?: 'pa_scrape_stddev_pop_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Pa_Scrape_Stddev_Samp_Fields = {
   __typename?: 'pa_scrape_stddev_samp_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Pa_Scrape_Sum_Fields = {
   __typename?: 'pa_scrape_sum_fields';
  council_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Pa_Scrape_Var_Pop_Fields = {
   __typename?: 'pa_scrape_var_pop_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Pa_Scrape_Var_Samp_Fields = {
   __typename?: 'pa_scrape_var_samp_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Pa_Scrape_Variance_Fields = {
   __typename?: 'pa_scrape_variance_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "pa_status" */
export type Pa_Status = {
   __typename?: 'pa_status';
  address: Scalars['String'];
  application_validated?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  council?: Maybe<Council>;
  council_id?: Maybe<Scalars['Int']>;
  /** depreciated */
  council_name?: Maybe<Scalars['String']>;
  created_at: Scalars['timestamptz'];
  decision?: Maybe<Scalars['String']>;
  decision_issued_date?: Maybe<Scalars['timestamptz']>;
  id: Scalars['String'];
  location?: Maybe<Scalars['geography']>;
  open: Scalars['Boolean'];
  /** An array relationship */
  pa_scrapes: Array<Pa_Scrape>;
  /** An aggregated array relationship */
  pa_scrapes_aggregate: Pa_Scrape_Aggregate;
  proposal: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  updated_at: Scalars['timestamptz'];
  url: Scalars['String'];
};


/** columns and relationships of "pa_status" */
export type Pa_StatusPa_ScrapesArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};


/** columns and relationships of "pa_status" */
export type Pa_StatusPa_Scrapes_AggregateArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};

/** aggregated selection of "pa_status" */
export type Pa_Status_Aggregate = {
   __typename?: 'pa_status_aggregate';
  aggregate?: Maybe<Pa_Status_Aggregate_Fields>;
  nodes: Array<Pa_Status>;
};

/** aggregate fields of "pa_status" */
export type Pa_Status_Aggregate_Fields = {
   __typename?: 'pa_status_aggregate_fields';
  avg?: Maybe<Pa_Status_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Pa_Status_Max_Fields>;
  min?: Maybe<Pa_Status_Min_Fields>;
  stddev?: Maybe<Pa_Status_Stddev_Fields>;
  stddev_pop?: Maybe<Pa_Status_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Pa_Status_Stddev_Samp_Fields>;
  sum?: Maybe<Pa_Status_Sum_Fields>;
  var_pop?: Maybe<Pa_Status_Var_Pop_Fields>;
  var_samp?: Maybe<Pa_Status_Var_Samp_Fields>;
  variance?: Maybe<Pa_Status_Variance_Fields>;
};


/** aggregate fields of "pa_status" */
export type Pa_Status_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Pa_Status_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Pa_Status_Avg_Fields = {
   __typename?: 'pa_status_avg_fields';
  council_id?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type Pa_Status_Max_Fields = {
   __typename?: 'pa_status_max_fields';
  address?: Maybe<Scalars['String']>;
  application_validated?: Maybe<Scalars['timestamptz']>;
  council_id?: Maybe<Scalars['Int']>;
  council_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  decision?: Maybe<Scalars['String']>;
  decision_issued_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  proposal?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Pa_Status_Min_Fields = {
   __typename?: 'pa_status_min_fields';
  address?: Maybe<Scalars['String']>;
  application_validated?: Maybe<Scalars['timestamptz']>;
  council_id?: Maybe<Scalars['Int']>;
  council_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  decision?: Maybe<Scalars['String']>;
  decision_issued_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  proposal?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "pa_status" */
export type Pa_Status_Mutation_Response = {
   __typename?: 'pa_status_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Pa_Status>;
};

/** aggregate stddev on columns */
export type Pa_Status_Stddev_Fields = {
   __typename?: 'pa_status_stddev_fields';
  council_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Pa_Status_Stddev_Pop_Fields = {
   __typename?: 'pa_status_stddev_pop_fields';
  council_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Pa_Status_Stddev_Samp_Fields = {
   __typename?: 'pa_status_stddev_samp_fields';
  council_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Pa_Status_Sum_Fields = {
   __typename?: 'pa_status_sum_fields';
  council_id?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Pa_Status_Var_Pop_Fields = {
   __typename?: 'pa_status_var_pop_fields';
  council_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Pa_Status_Var_Samp_Fields = {
   __typename?: 'pa_status_var_samp_fields';
  council_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Pa_Status_Variance_Fields = {
   __typename?: 'pa_status_variance_fields';
  council_id?: Maybe<Scalars['Float']>;
};

/** query root */
export type Query_Root = {
   __typename?: 'query_root';
  /** fetch data from the table: "council" */
  council: Array<Council>;
  /** fetch aggregated fields from the table: "council" */
  council_aggregate: Council_Aggregate;
  /** fetch data from the table: "council" using primary key columns */
  council_by_pk?: Maybe<Council>;
  /** fetch data from the table: "fcm_token" */
  fcm_token: Array<Fcm_Token>;
  /** fetch aggregated fields from the table: "fcm_token" */
  fcm_token_aggregate: Fcm_Token_Aggregate;
  /** fetch data from the table: "fcm_token" using primary key columns */
  fcm_token_by_pk?: Maybe<Fcm_Token>;
  /** fetch data from the table: "pa_scrape" */
  pa_scrape: Array<Pa_Scrape>;
  /** fetch aggregated fields from the table: "pa_scrape" */
  pa_scrape_aggregate: Pa_Scrape_Aggregate;
  /** fetch data from the table: "pa_scrape" using primary key columns */
  pa_scrape_by_pk?: Maybe<Pa_Scrape>;
  /** fetch data from the table: "pa_status" */
  pa_status: Array<Pa_Status>;
  /** fetch aggregated fields from the table: "pa_status" */
  pa_status_aggregate: Pa_Status_Aggregate;
  /** fetch data from the table: "pa_status" using primary key columns */
  pa_status_by_pk?: Maybe<Pa_Status>;
  /** fetch data from the table: "scrape_log" */
  scrape_log: Array<Scrape_Log>;
  /** fetch aggregated fields from the table: "scrape_log" */
  scrape_log_aggregate: Scrape_Log_Aggregate;
  /** fetch data from the table: "scrape_log" using primary key columns */
  scrape_log_by_pk?: Maybe<Scrape_Log>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootCouncilArgs = {
  distinct_on?: Maybe<Array<Council_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Council_Order_By>>;
  where?: Maybe<Council_Bool_Exp>;
};


/** query root */
export type Query_RootCouncil_AggregateArgs = {
  distinct_on?: Maybe<Array<Council_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Council_Order_By>>;
  where?: Maybe<Council_Bool_Exp>;
};


/** query root */
export type Query_RootCouncil_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootFcm_TokenArgs = {
  distinct_on?: Maybe<Array<Fcm_Token_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Fcm_Token_Order_By>>;
  where?: Maybe<Fcm_Token_Bool_Exp>;
};


/** query root */
export type Query_RootFcm_Token_AggregateArgs = {
  distinct_on?: Maybe<Array<Fcm_Token_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Fcm_Token_Order_By>>;
  where?: Maybe<Fcm_Token_Bool_Exp>;
};


/** query root */
export type Query_RootFcm_Token_By_PkArgs = {
  device_id: Scalars['String'];
};


/** query root */
export type Query_RootPa_ScrapeArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};


/** query root */
export type Query_RootPa_Scrape_AggregateArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};


/** query root */
export type Query_RootPa_Scrape_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootPa_StatusArgs = {
  distinct_on?: Maybe<Array<Pa_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Status_Order_By>>;
  where?: Maybe<Pa_Status_Bool_Exp>;
};


/** query root */
export type Query_RootPa_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Pa_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Status_Order_By>>;
  where?: Maybe<Pa_Status_Bool_Exp>;
};


/** query root */
export type Query_RootPa_Status_By_PkArgs = {
  id: Scalars['String'];
};


/** query root */
export type Query_RootScrape_LogArgs = {
  distinct_on?: Maybe<Array<Scrape_Log_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scrape_Log_Order_By>>;
  where?: Maybe<Scrape_Log_Bool_Exp>;
};


/** query root */
export type Query_RootScrape_Log_AggregateArgs = {
  distinct_on?: Maybe<Array<Scrape_Log_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scrape_Log_Order_By>>;
  where?: Maybe<Scrape_Log_Bool_Exp>;
};


/** query root */
export type Query_RootScrape_Log_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "scrape_log" */
export type Scrape_Log = {
   __typename?: 'scrape_log';
  /** An object relationship */
  council?: Maybe<Council>;
  council_id?: Maybe<Scalars['Int']>;
  event: Scalars['String'];
  id: Scalars['Int'];
  meta: Scalars['jsonb'];
  scraper: Scalars['String'];
  ts?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "scrape_log" */
export type Scrape_LogMetaArgs = {
  path?: Maybe<Scalars['String']>;
};

/** aggregated selection of "scrape_log" */
export type Scrape_Log_Aggregate = {
   __typename?: 'scrape_log_aggregate';
  aggregate?: Maybe<Scrape_Log_Aggregate_Fields>;
  nodes: Array<Scrape_Log>;
};

/** aggregate fields of "scrape_log" */
export type Scrape_Log_Aggregate_Fields = {
   __typename?: 'scrape_log_aggregate_fields';
  avg?: Maybe<Scrape_Log_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Scrape_Log_Max_Fields>;
  min?: Maybe<Scrape_Log_Min_Fields>;
  stddev?: Maybe<Scrape_Log_Stddev_Fields>;
  stddev_pop?: Maybe<Scrape_Log_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Scrape_Log_Stddev_Samp_Fields>;
  sum?: Maybe<Scrape_Log_Sum_Fields>;
  var_pop?: Maybe<Scrape_Log_Var_Pop_Fields>;
  var_samp?: Maybe<Scrape_Log_Var_Samp_Fields>;
  variance?: Maybe<Scrape_Log_Variance_Fields>;
};


/** aggregate fields of "scrape_log" */
export type Scrape_Log_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Scrape_Log_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Scrape_Log_Avg_Fields = {
   __typename?: 'scrape_log_avg_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate max on columns */
export type Scrape_Log_Max_Fields = {
   __typename?: 'scrape_log_max_fields';
  council_id?: Maybe<Scalars['Int']>;
  event?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  scraper?: Maybe<Scalars['String']>;
  ts?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Scrape_Log_Min_Fields = {
   __typename?: 'scrape_log_min_fields';
  council_id?: Maybe<Scalars['Int']>;
  event?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  scraper?: Maybe<Scalars['String']>;
  ts?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "scrape_log" */
export type Scrape_Log_Mutation_Response = {
   __typename?: 'scrape_log_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Scrape_Log>;
};

/** aggregate stddev on columns */
export type Scrape_Log_Stddev_Fields = {
   __typename?: 'scrape_log_stddev_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Scrape_Log_Stddev_Pop_Fields = {
   __typename?: 'scrape_log_stddev_pop_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Scrape_Log_Stddev_Samp_Fields = {
   __typename?: 'scrape_log_stddev_samp_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Scrape_Log_Sum_Fields = {
   __typename?: 'scrape_log_sum_fields';
  council_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Scrape_Log_Var_Pop_Fields = {
   __typename?: 'scrape_log_var_pop_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Scrape_Log_Var_Samp_Fields = {
   __typename?: 'scrape_log_var_samp_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Scrape_Log_Variance_Fields = {
   __typename?: 'scrape_log_variance_fields';
  council_id?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** subscription root */
export type Subscription_Root = {
   __typename?: 'subscription_root';
  /** fetch data from the table: "council" */
  council: Array<Council>;
  /** fetch aggregated fields from the table: "council" */
  council_aggregate: Council_Aggregate;
  /** fetch data from the table: "council" using primary key columns */
  council_by_pk?: Maybe<Council>;
  /** fetch data from the table: "fcm_token" */
  fcm_token: Array<Fcm_Token>;
  /** fetch aggregated fields from the table: "fcm_token" */
  fcm_token_aggregate: Fcm_Token_Aggregate;
  /** fetch data from the table: "fcm_token" using primary key columns */
  fcm_token_by_pk?: Maybe<Fcm_Token>;
  /** fetch data from the table: "pa_scrape" */
  pa_scrape: Array<Pa_Scrape>;
  /** fetch aggregated fields from the table: "pa_scrape" */
  pa_scrape_aggregate: Pa_Scrape_Aggregate;
  /** fetch data from the table: "pa_scrape" using primary key columns */
  pa_scrape_by_pk?: Maybe<Pa_Scrape>;
  /** fetch data from the table: "pa_status" */
  pa_status: Array<Pa_Status>;
  /** fetch aggregated fields from the table: "pa_status" */
  pa_status_aggregate: Pa_Status_Aggregate;
  /** fetch data from the table: "pa_status" using primary key columns */
  pa_status_by_pk?: Maybe<Pa_Status>;
  /** fetch data from the table: "scrape_log" */
  scrape_log: Array<Scrape_Log>;
  /** fetch aggregated fields from the table: "scrape_log" */
  scrape_log_aggregate: Scrape_Log_Aggregate;
  /** fetch data from the table: "scrape_log" using primary key columns */
  scrape_log_by_pk?: Maybe<Scrape_Log>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootCouncilArgs = {
  distinct_on?: Maybe<Array<Council_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Council_Order_By>>;
  where?: Maybe<Council_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCouncil_AggregateArgs = {
  distinct_on?: Maybe<Array<Council_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Council_Order_By>>;
  where?: Maybe<Council_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCouncil_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootFcm_TokenArgs = {
  distinct_on?: Maybe<Array<Fcm_Token_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Fcm_Token_Order_By>>;
  where?: Maybe<Fcm_Token_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFcm_Token_AggregateArgs = {
  distinct_on?: Maybe<Array<Fcm_Token_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Fcm_Token_Order_By>>;
  where?: Maybe<Fcm_Token_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootFcm_Token_By_PkArgs = {
  device_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPa_ScrapeArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPa_Scrape_AggregateArgs = {
  distinct_on?: Maybe<Array<Pa_Scrape_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Scrape_Order_By>>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPa_Scrape_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootPa_StatusArgs = {
  distinct_on?: Maybe<Array<Pa_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Status_Order_By>>;
  where?: Maybe<Pa_Status_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPa_Status_AggregateArgs = {
  distinct_on?: Maybe<Array<Pa_Status_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Pa_Status_Order_By>>;
  where?: Maybe<Pa_Status_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPa_Status_By_PkArgs = {
  id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootScrape_LogArgs = {
  distinct_on?: Maybe<Array<Scrape_Log_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scrape_Log_Order_By>>;
  where?: Maybe<Scrape_Log_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootScrape_Log_AggregateArgs = {
  distinct_on?: Maybe<Array<Scrape_Log_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Scrape_Log_Order_By>>;
  where?: Maybe<Scrape_Log_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootScrape_Log_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "users" */
export type Users = {
   __typename?: 'users';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  /** An array relationship */
  fcm_tokens: Array<Fcm_Token>;
  /** An aggregated array relationship */
  fcm_tokens_aggregate: Fcm_Token_Aggregate;
  id: Scalars['String'];
  location?: Maybe<Scalars['geography']>;
  name?: Maybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersFcm_TokensArgs = {
  distinct_on?: Maybe<Array<Fcm_Token_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Fcm_Token_Order_By>>;
  where?: Maybe<Fcm_Token_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersFcm_Tokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Fcm_Token_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Fcm_Token_Order_By>>;
  where?: Maybe<Fcm_Token_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
   __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
   __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
   __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
   __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
   __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** unique or primary key constraints on table "council" */
export enum Council_Constraint {
  /** unique or primary key constraint */
  CouncilPkey = 'council_pkey',
  /** unique or primary key constraint */
  CouncilPortalUrlKey = 'council_portal_url_key',
  /** unique or primary key constraint */
  CouncilTitleKey = 'council_title_key'
}

/** select columns of table "council" */
export enum Council_Select_Column {
  /** column name */
  CouncilType = 'council_type',
  /** column name */
  Id = 'id',
  /** column name */
  PortalUrl = 'portal_url',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Title = 'title'
}

/** update columns of table "council" */
export enum Council_Update_Column {
  /** column name */
  CouncilType = 'council_type',
  /** column name */
  Id = 'id',
  /** column name */
  PortalUrl = 'portal_url',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Title = 'title'
}

/** unique or primary key constraints on table "fcm_token" */
export enum Fcm_Token_Constraint {
  /** unique or primary key constraint */
  FcmTokenDeviceIdKey = 'fcm_token_device_id_key',
  /** unique or primary key constraint */
  FcmTokenPkey = 'fcm_token_pkey'
}

/** select columns of table "fcm_token" */
export enum Fcm_Token_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  Token = 'token',
  /** column name */
  UserId = 'user_id'
}

/** update columns of table "fcm_token" */
export enum Fcm_Token_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DeviceId = 'device_id',
  /** column name */
  Token = 'token',
  /** column name */
  UserId = 'user_id'
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** unique or primary key constraints on table "pa_scrape" */
export enum Pa_Scrape_Constraint {
  /** unique or primary key constraint */
  PaScrapeDecidedPkey = 'pa_scrape_decided_pkey'
}

/** select columns of table "pa_scrape" */
export enum Pa_Scrape_Select_Column {
  /** column name */
  Contacts = 'contacts',
  /** column name */
  CouncilId = 'council_id',
  /** column name */
  FurtherInformation = 'further_information',
  /** column name */
  Id = 'id',
  /** column name */
  ImportantDates = 'important_dates',
  /** column name */
  ListType = 'list_type',
  /** column name */
  Reference = 'reference',
  /** column name */
  ScrapedAt = 'scraped_at',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Summary = 'summary',
  /** column name */
  Url = 'url'
}

/** update columns of table "pa_scrape" */
export enum Pa_Scrape_Update_Column {
  /** column name */
  Contacts = 'contacts',
  /** column name */
  CouncilId = 'council_id',
  /** column name */
  FurtherInformation = 'further_information',
  /** column name */
  Id = 'id',
  /** column name */
  ImportantDates = 'important_dates',
  /** column name */
  ListType = 'list_type',
  /** column name */
  Reference = 'reference',
  /** column name */
  ScrapedAt = 'scraped_at',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Summary = 'summary',
  /** column name */
  Url = 'url'
}

/** unique or primary key constraints on table "pa_status" */
export enum Pa_Status_Constraint {
  /** unique or primary key constraint */
  PaStatusPkey = 'pa_status_pkey'
}

/** select columns of table "pa_status" */
export enum Pa_Status_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ApplicationValidated = 'application_validated',
  /** column name */
  CouncilId = 'council_id',
  /** column name */
  CouncilName = 'council_name',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Decision = 'decision',
  /** column name */
  DecisionIssuedDate = 'decision_issued_date',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Open = 'open',
  /** column name */
  Proposal = 'proposal',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}

/** update columns of table "pa_status" */
export enum Pa_Status_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ApplicationValidated = 'application_validated',
  /** column name */
  CouncilId = 'council_id',
  /** column name */
  CouncilName = 'council_name',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Decision = 'decision',
  /** column name */
  DecisionIssuedDate = 'decision_issued_date',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Open = 'open',
  /** column name */
  Proposal = 'proposal',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Url = 'url'
}

/** unique or primary key constraints on table "scrape_log" */
export enum Scrape_Log_Constraint {
  /** unique or primary key constraint */
  ScrapeLogPkey = 'scrape_log_pkey'
}

/** select columns of table "scrape_log" */
export enum Scrape_Log_Select_Column {
  /** column name */
  CouncilId = 'council_id',
  /** column name */
  Event = 'event',
  /** column name */
  Id = 'id',
  /** column name */
  Meta = 'meta',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Ts = 'ts'
}

/** update columns of table "scrape_log" */
export enum Scrape_Log_Update_Column {
  /** column name */
  CouncilId = 'council_id',
  /** column name */
  Event = 'event',
  /** column name */
  Id = 'id',
  /** column name */
  Meta = 'meta',
  /** column name */
  Scraper = 'scraper',
  /** column name */
  Ts = 'ts'
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name'
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name'
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
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

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
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

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** order by aggregate values of table "council" */
export type Council_Aggregate_Order_By = {
  avg?: Maybe<Council_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Council_Max_Order_By>;
  min?: Maybe<Council_Min_Order_By>;
  stddev?: Maybe<Council_Stddev_Order_By>;
  stddev_pop?: Maybe<Council_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Council_Stddev_Samp_Order_By>;
  sum?: Maybe<Council_Sum_Order_By>;
  var_pop?: Maybe<Council_Var_Pop_Order_By>;
  var_samp?: Maybe<Council_Var_Samp_Order_By>;
  variance?: Maybe<Council_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "council" */
export type Council_Arr_Rel_Insert_Input = {
  data: Array<Council_Insert_Input>;
  on_conflict?: Maybe<Council_On_Conflict>;
};

/** order by avg() on columns of table "council" */
export type Council_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "council". All fields are combined with a logical 'AND'. */
export type Council_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Council_Bool_Exp>>>;
  _not?: Maybe<Council_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Council_Bool_Exp>>>;
  council_type?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  pa_scrapes?: Maybe<Pa_Scrape_Bool_Exp>;
  pa_statuses?: Maybe<Pa_Status_Bool_Exp>;
  portal_url?: Maybe<String_Comparison_Exp>;
  scrape_logs?: Maybe<Scrape_Log_Bool_Exp>;
  scraper?: Maybe<String_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
};

/** input type for incrementing integer column in table "council" */
export type Council_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "council" */
export type Council_Insert_Input = {
  council_type?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  pa_scrapes?: Maybe<Pa_Scrape_Arr_Rel_Insert_Input>;
  pa_statuses?: Maybe<Pa_Status_Arr_Rel_Insert_Input>;
  portal_url?: Maybe<Scalars['String']>;
  scrape_logs?: Maybe<Scrape_Log_Arr_Rel_Insert_Input>;
  scraper?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "council" */
export type Council_Max_Order_By = {
  council_type?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  portal_url?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** order by min() on columns of table "council" */
export type Council_Min_Order_By = {
  council_type?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  portal_url?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** input type for inserting object relation for remote table "council" */
export type Council_Obj_Rel_Insert_Input = {
  data: Council_Insert_Input;
  on_conflict?: Maybe<Council_On_Conflict>;
};

/** on conflict condition type for table "council" */
export type Council_On_Conflict = {
  constraint: Council_Constraint;
  update_columns: Array<Council_Update_Column>;
  where?: Maybe<Council_Bool_Exp>;
};

/** ordering options when selecting data from "council" */
export type Council_Order_By = {
  council_type?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  pa_scrapes_aggregate?: Maybe<Pa_Scrape_Aggregate_Order_By>;
  pa_statuses_aggregate?: Maybe<Pa_Status_Aggregate_Order_By>;
  portal_url?: Maybe<Order_By>;
  scrape_logs_aggregate?: Maybe<Scrape_Log_Aggregate_Order_By>;
  scraper?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** primary key columns input for table: "council" */
export type Council_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** input type for updating data in table "council" */
export type Council_Set_Input = {
  council_type?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  portal_url?: Maybe<Scalars['String']>;
  scraper?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by stddev() on columns of table "council" */
export type Council_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "council" */
export type Council_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "council" */
export type Council_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "council" */
export type Council_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "council" */
export type Council_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "council" */
export type Council_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "council" */
export type Council_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** order by aggregate values of table "fcm_token" */
export type Fcm_Token_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Fcm_Token_Max_Order_By>;
  min?: Maybe<Fcm_Token_Min_Order_By>;
};

/** input type for inserting array relation for remote table "fcm_token" */
export type Fcm_Token_Arr_Rel_Insert_Input = {
  data: Array<Fcm_Token_Insert_Input>;
  on_conflict?: Maybe<Fcm_Token_On_Conflict>;
};

/** Boolean expression to filter rows from the table "fcm_token". All fields are combined with a logical 'AND'. */
export type Fcm_Token_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Fcm_Token_Bool_Exp>>>;
  _not?: Maybe<Fcm_Token_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Fcm_Token_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  device_id?: Maybe<String_Comparison_Exp>;
  token?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "fcm_token" */
export type Fcm_Token_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "fcm_token" */
export type Fcm_Token_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  device_id?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** order by min() on columns of table "fcm_token" */
export type Fcm_Token_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  device_id?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** input type for inserting object relation for remote table "fcm_token" */
export type Fcm_Token_Obj_Rel_Insert_Input = {
  data: Fcm_Token_Insert_Input;
  on_conflict?: Maybe<Fcm_Token_On_Conflict>;
};

/** on conflict condition type for table "fcm_token" */
export type Fcm_Token_On_Conflict = {
  constraint: Fcm_Token_Constraint;
  update_columns: Array<Fcm_Token_Update_Column>;
  where?: Maybe<Fcm_Token_Bool_Exp>;
};

/** ordering options when selecting data from "fcm_token" */
export type Fcm_Token_Order_By = {
  created_at?: Maybe<Order_By>;
  device_id?: Maybe<Order_By>;
  token?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "fcm_token" */
export type Fcm_Token_Pk_Columns_Input = {
  device_id: Scalars['String'];
};

/** input type for updating data in table "fcm_token" */
export type Fcm_Token_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  device_id?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** Expression to compare the result of casting a column of type geography. Multiple cast targets are combined with logical 'AND'. */
export type Geography_Cast_Exp = {
  geometry?: Maybe<Geometry_Comparison_Exp>;
};

/** expression to compare columns of type geography. All fields are combined with logical 'AND'. */
export type Geography_Comparison_Exp = {
  _cast?: Maybe<Geography_Cast_Exp>;
  _eq?: Maybe<Scalars['geography']>;
  _gt?: Maybe<Scalars['geography']>;
  _gte?: Maybe<Scalars['geography']>;
  _in?: Maybe<Array<Scalars['geography']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geography']>;
  _lte?: Maybe<Scalars['geography']>;
  _neq?: Maybe<Scalars['geography']>;
  _nin?: Maybe<Array<Scalars['geography']>>;
  /** is the column within a distance from a geography value */
  _st_d_within?: Maybe<St_D_Within_Geography_Input>;
  /** does the column spatially intersect the given geography value */
  _st_intersects?: Maybe<Scalars['geography']>;
};

/** Expression to compare the result of casting a column of type geometry. Multiple cast targets are combined with logical 'AND'. */
export type Geometry_Cast_Exp = {
  geography?: Maybe<Geography_Comparison_Exp>;
};

/** expression to compare columns of type geometry. All fields are combined with logical 'AND'. */
export type Geometry_Comparison_Exp = {
  _cast?: Maybe<Geometry_Cast_Exp>;
  _eq?: Maybe<Scalars['geometry']>;
  _gt?: Maybe<Scalars['geometry']>;
  _gte?: Maybe<Scalars['geometry']>;
  _in?: Maybe<Array<Scalars['geometry']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['geometry']>;
  _lte?: Maybe<Scalars['geometry']>;
  _neq?: Maybe<Scalars['geometry']>;
  _nin?: Maybe<Array<Scalars['geometry']>>;
  /** does the column contain the given geometry value */
  _st_contains?: Maybe<Scalars['geometry']>;
  /** does the column crosses the given geometry value */
  _st_crosses?: Maybe<Scalars['geometry']>;
  /** is the column within a distance from a geometry value */
  _st_d_within?: Maybe<St_D_Within_Input>;
  /** is the column equal to given geometry value. Directionality is ignored */
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

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
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

/** order by aggregate values of table "pa_scrape" */
export type Pa_Scrape_Aggregate_Order_By = {
  avg?: Maybe<Pa_Scrape_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Pa_Scrape_Max_Order_By>;
  min?: Maybe<Pa_Scrape_Min_Order_By>;
  stddev?: Maybe<Pa_Scrape_Stddev_Order_By>;
  stddev_pop?: Maybe<Pa_Scrape_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Pa_Scrape_Stddev_Samp_Order_By>;
  sum?: Maybe<Pa_Scrape_Sum_Order_By>;
  var_pop?: Maybe<Pa_Scrape_Var_Pop_Order_By>;
  var_samp?: Maybe<Pa_Scrape_Var_Samp_Order_By>;
  variance?: Maybe<Pa_Scrape_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Pa_Scrape_Append_Input = {
  contacts?: Maybe<Scalars['jsonb']>;
  further_information?: Maybe<Scalars['jsonb']>;
  important_dates?: Maybe<Scalars['jsonb']>;
  summary?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "pa_scrape" */
export type Pa_Scrape_Arr_Rel_Insert_Input = {
  data: Array<Pa_Scrape_Insert_Input>;
  on_conflict?: Maybe<Pa_Scrape_On_Conflict>;
};

/** order by avg() on columns of table "pa_scrape" */
export type Pa_Scrape_Avg_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "pa_scrape". All fields are combined with a logical 'AND'. */
export type Pa_Scrape_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Pa_Scrape_Bool_Exp>>>;
  _not?: Maybe<Pa_Scrape_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Pa_Scrape_Bool_Exp>>>;
  contacts?: Maybe<Jsonb_Comparison_Exp>;
  council?: Maybe<Council_Bool_Exp>;
  council_id?: Maybe<Int_Comparison_Exp>;
  further_information?: Maybe<Jsonb_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  important_dates?: Maybe<Jsonb_Comparison_Exp>;
  list_type?: Maybe<String_Comparison_Exp>;
  pa_status?: Maybe<Pa_Status_Bool_Exp>;
  reference?: Maybe<String_Comparison_Exp>;
  scraped_at?: Maybe<Timestamptz_Comparison_Exp>;
  scraper?: Maybe<String_Comparison_Exp>;
  summary?: Maybe<Jsonb_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Pa_Scrape_Delete_At_Path_Input = {
  contacts?: Maybe<Array<Maybe<Scalars['String']>>>;
  further_information?: Maybe<Array<Maybe<Scalars['String']>>>;
  important_dates?: Maybe<Array<Maybe<Scalars['String']>>>;
  summary?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Pa_Scrape_Delete_Elem_Input = {
  contacts?: Maybe<Scalars['Int']>;
  further_information?: Maybe<Scalars['Int']>;
  important_dates?: Maybe<Scalars['Int']>;
  summary?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Pa_Scrape_Delete_Key_Input = {
  contacts?: Maybe<Scalars['String']>;
  further_information?: Maybe<Scalars['String']>;
  important_dates?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "pa_scrape" */
export type Pa_Scrape_Inc_Input = {
  council_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "pa_scrape" */
export type Pa_Scrape_Insert_Input = {
  contacts?: Maybe<Scalars['jsonb']>;
  council?: Maybe<Council_Obj_Rel_Insert_Input>;
  council_id?: Maybe<Scalars['Int']>;
  further_information?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['Int']>;
  important_dates?: Maybe<Scalars['jsonb']>;
  list_type?: Maybe<Scalars['String']>;
  pa_status?: Maybe<Pa_Status_Obj_Rel_Insert_Input>;
  reference?: Maybe<Scalars['String']>;
  scraped_at?: Maybe<Scalars['timestamptz']>;
  scraper?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['jsonb']>;
  url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "pa_scrape" */
export type Pa_Scrape_Max_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  list_type?: Maybe<Order_By>;
  reference?: Maybe<Order_By>;
  scraped_at?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** order by min() on columns of table "pa_scrape" */
export type Pa_Scrape_Min_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  list_type?: Maybe<Order_By>;
  reference?: Maybe<Order_By>;
  scraped_at?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** input type for inserting object relation for remote table "pa_scrape" */
export type Pa_Scrape_Obj_Rel_Insert_Input = {
  data: Pa_Scrape_Insert_Input;
  on_conflict?: Maybe<Pa_Scrape_On_Conflict>;
};

/** on conflict condition type for table "pa_scrape" */
export type Pa_Scrape_On_Conflict = {
  constraint: Pa_Scrape_Constraint;
  update_columns: Array<Pa_Scrape_Update_Column>;
  where?: Maybe<Pa_Scrape_Bool_Exp>;
};

/** ordering options when selecting data from "pa_scrape" */
export type Pa_Scrape_Order_By = {
  contacts?: Maybe<Order_By>;
  council?: Maybe<Council_Order_By>;
  council_id?: Maybe<Order_By>;
  further_information?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  important_dates?: Maybe<Order_By>;
  list_type?: Maybe<Order_By>;
  pa_status?: Maybe<Pa_Status_Order_By>;
  reference?: Maybe<Order_By>;
  scraped_at?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  summary?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** primary key columns input for table: "pa_scrape" */
export type Pa_Scrape_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Pa_Scrape_Prepend_Input = {
  contacts?: Maybe<Scalars['jsonb']>;
  further_information?: Maybe<Scalars['jsonb']>;
  important_dates?: Maybe<Scalars['jsonb']>;
  summary?: Maybe<Scalars['jsonb']>;
};

/** input type for updating data in table "pa_scrape" */
export type Pa_Scrape_Set_Input = {
  contacts?: Maybe<Scalars['jsonb']>;
  council_id?: Maybe<Scalars['Int']>;
  further_information?: Maybe<Scalars['jsonb']>;
  id?: Maybe<Scalars['Int']>;
  important_dates?: Maybe<Scalars['jsonb']>;
  list_type?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  scraped_at?: Maybe<Scalars['timestamptz']>;
  scraper?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['jsonb']>;
  url?: Maybe<Scalars['String']>;
};

/** order by stddev() on columns of table "pa_scrape" */
export type Pa_Scrape_Stddev_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "pa_scrape" */
export type Pa_Scrape_Stddev_Pop_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "pa_scrape" */
export type Pa_Scrape_Stddev_Samp_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "pa_scrape" */
export type Pa_Scrape_Sum_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "pa_scrape" */
export type Pa_Scrape_Var_Pop_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "pa_scrape" */
export type Pa_Scrape_Var_Samp_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "pa_scrape" */
export type Pa_Scrape_Variance_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by aggregate values of table "pa_status" */
export type Pa_Status_Aggregate_Order_By = {
  avg?: Maybe<Pa_Status_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Pa_Status_Max_Order_By>;
  min?: Maybe<Pa_Status_Min_Order_By>;
  stddev?: Maybe<Pa_Status_Stddev_Order_By>;
  stddev_pop?: Maybe<Pa_Status_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Pa_Status_Stddev_Samp_Order_By>;
  sum?: Maybe<Pa_Status_Sum_Order_By>;
  var_pop?: Maybe<Pa_Status_Var_Pop_Order_By>;
  var_samp?: Maybe<Pa_Status_Var_Samp_Order_By>;
  variance?: Maybe<Pa_Status_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "pa_status" */
export type Pa_Status_Arr_Rel_Insert_Input = {
  data: Array<Pa_Status_Insert_Input>;
  on_conflict?: Maybe<Pa_Status_On_Conflict>;
};

/** order by avg() on columns of table "pa_status" */
export type Pa_Status_Avg_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "pa_status". All fields are combined with a logical 'AND'. */
export type Pa_Status_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Pa_Status_Bool_Exp>>>;
  _not?: Maybe<Pa_Status_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Pa_Status_Bool_Exp>>>;
  address?: Maybe<String_Comparison_Exp>;
  application_validated?: Maybe<Timestamptz_Comparison_Exp>;
  council?: Maybe<Council_Bool_Exp>;
  council_id?: Maybe<Int_Comparison_Exp>;
  council_name?: Maybe<String_Comparison_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  decision?: Maybe<String_Comparison_Exp>;
  decision_issued_date?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  location?: Maybe<Geography_Comparison_Exp>;
  open?: Maybe<Boolean_Comparison_Exp>;
  pa_scrapes?: Maybe<Pa_Scrape_Bool_Exp>;
  proposal?: Maybe<String_Comparison_Exp>;
  status?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
};

/** input type for incrementing integer column in table "pa_status" */
export type Pa_Status_Inc_Input = {
  council_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "pa_status" */
export type Pa_Status_Insert_Input = {
  address?: Maybe<Scalars['String']>;
  application_validated?: Maybe<Scalars['timestamptz']>;
  council?: Maybe<Council_Obj_Rel_Insert_Input>;
  council_id?: Maybe<Scalars['Int']>;
  council_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  decision?: Maybe<Scalars['String']>;
  decision_issued_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['geography']>;
  open?: Maybe<Scalars['Boolean']>;
  pa_scrapes?: Maybe<Pa_Scrape_Arr_Rel_Insert_Input>;
  proposal?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "pa_status" */
export type Pa_Status_Max_Order_By = {
  address?: Maybe<Order_By>;
  application_validated?: Maybe<Order_By>;
  council_id?: Maybe<Order_By>;
  council_name?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  decision?: Maybe<Order_By>;
  decision_issued_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  proposal?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** order by min() on columns of table "pa_status" */
export type Pa_Status_Min_Order_By = {
  address?: Maybe<Order_By>;
  application_validated?: Maybe<Order_By>;
  council_id?: Maybe<Order_By>;
  council_name?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  decision?: Maybe<Order_By>;
  decision_issued_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  proposal?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** input type for inserting object relation for remote table "pa_status" */
export type Pa_Status_Obj_Rel_Insert_Input = {
  data: Pa_Status_Insert_Input;
  on_conflict?: Maybe<Pa_Status_On_Conflict>;
};

/** on conflict condition type for table "pa_status" */
export type Pa_Status_On_Conflict = {
  constraint: Pa_Status_Constraint;
  update_columns: Array<Pa_Status_Update_Column>;
  where?: Maybe<Pa_Status_Bool_Exp>;
};

/** ordering options when selecting data from "pa_status" */
export type Pa_Status_Order_By = {
  address?: Maybe<Order_By>;
  application_validated?: Maybe<Order_By>;
  council?: Maybe<Council_Order_By>;
  council_id?: Maybe<Order_By>;
  council_name?: Maybe<Order_By>;
  created_at?: Maybe<Order_By>;
  decision?: Maybe<Order_By>;
  decision_issued_date?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  open?: Maybe<Order_By>;
  pa_scrapes_aggregate?: Maybe<Pa_Scrape_Aggregate_Order_By>;
  proposal?: Maybe<Order_By>;
  status?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

/** primary key columns input for table: "pa_status" */
export type Pa_Status_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** input type for updating data in table "pa_status" */
export type Pa_Status_Set_Input = {
  address?: Maybe<Scalars['String']>;
  application_validated?: Maybe<Scalars['timestamptz']>;
  council_id?: Maybe<Scalars['Int']>;
  council_name?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  decision?: Maybe<Scalars['String']>;
  decision_issued_date?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['geography']>;
  open?: Maybe<Scalars['Boolean']>;
  proposal?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** order by stddev() on columns of table "pa_status" */
export type Pa_Status_Stddev_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "pa_status" */
export type Pa_Status_Stddev_Pop_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "pa_status" */
export type Pa_Status_Stddev_Samp_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "pa_status" */
export type Pa_Status_Sum_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "pa_status" */
export type Pa_Status_Var_Pop_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "pa_status" */
export type Pa_Status_Var_Samp_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "pa_status" */
export type Pa_Status_Variance_Order_By = {
  council_id?: Maybe<Order_By>;
};

/** order by aggregate values of table "scrape_log" */
export type Scrape_Log_Aggregate_Order_By = {
  avg?: Maybe<Scrape_Log_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Scrape_Log_Max_Order_By>;
  min?: Maybe<Scrape_Log_Min_Order_By>;
  stddev?: Maybe<Scrape_Log_Stddev_Order_By>;
  stddev_pop?: Maybe<Scrape_Log_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Scrape_Log_Stddev_Samp_Order_By>;
  sum?: Maybe<Scrape_Log_Sum_Order_By>;
  var_pop?: Maybe<Scrape_Log_Var_Pop_Order_By>;
  var_samp?: Maybe<Scrape_Log_Var_Samp_Order_By>;
  variance?: Maybe<Scrape_Log_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Scrape_Log_Append_Input = {
  meta?: Maybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "scrape_log" */
export type Scrape_Log_Arr_Rel_Insert_Input = {
  data: Array<Scrape_Log_Insert_Input>;
  on_conflict?: Maybe<Scrape_Log_On_Conflict>;
};

/** order by avg() on columns of table "scrape_log" */
export type Scrape_Log_Avg_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "scrape_log". All fields are combined with a logical 'AND'. */
export type Scrape_Log_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Scrape_Log_Bool_Exp>>>;
  _not?: Maybe<Scrape_Log_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Scrape_Log_Bool_Exp>>>;
  council?: Maybe<Council_Bool_Exp>;
  council_id?: Maybe<Int_Comparison_Exp>;
  event?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  meta?: Maybe<Jsonb_Comparison_Exp>;
  scraper?: Maybe<String_Comparison_Exp>;
  ts?: Maybe<Timestamptz_Comparison_Exp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Scrape_Log_Delete_At_Path_Input = {
  meta?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Scrape_Log_Delete_Elem_Input = {
  meta?: Maybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Scrape_Log_Delete_Key_Input = {
  meta?: Maybe<Scalars['String']>;
};

/** input type for incrementing integer column in table "scrape_log" */
export type Scrape_Log_Inc_Input = {
  council_id?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "scrape_log" */
export type Scrape_Log_Insert_Input = {
  council?: Maybe<Council_Obj_Rel_Insert_Input>;
  council_id?: Maybe<Scalars['Int']>;
  event?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  meta?: Maybe<Scalars['jsonb']>;
  scraper?: Maybe<Scalars['String']>;
  ts?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "scrape_log" */
export type Scrape_Log_Max_Order_By = {
  council_id?: Maybe<Order_By>;
  event?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  ts?: Maybe<Order_By>;
};

/** order by min() on columns of table "scrape_log" */
export type Scrape_Log_Min_Order_By = {
  council_id?: Maybe<Order_By>;
  event?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  ts?: Maybe<Order_By>;
};

/** input type for inserting object relation for remote table "scrape_log" */
export type Scrape_Log_Obj_Rel_Insert_Input = {
  data: Scrape_Log_Insert_Input;
  on_conflict?: Maybe<Scrape_Log_On_Conflict>;
};

/** on conflict condition type for table "scrape_log" */
export type Scrape_Log_On_Conflict = {
  constraint: Scrape_Log_Constraint;
  update_columns: Array<Scrape_Log_Update_Column>;
  where?: Maybe<Scrape_Log_Bool_Exp>;
};

/** ordering options when selecting data from "scrape_log" */
export type Scrape_Log_Order_By = {
  council?: Maybe<Council_Order_By>;
  council_id?: Maybe<Order_By>;
  event?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  meta?: Maybe<Order_By>;
  scraper?: Maybe<Order_By>;
  ts?: Maybe<Order_By>;
};

/** primary key columns input for table: "scrape_log" */
export type Scrape_Log_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Scrape_Log_Prepend_Input = {
  meta?: Maybe<Scalars['jsonb']>;
};

/** input type for updating data in table "scrape_log" */
export type Scrape_Log_Set_Input = {
  council_id?: Maybe<Scalars['Int']>;
  event?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  meta?: Maybe<Scalars['jsonb']>;
  scraper?: Maybe<Scalars['String']>;
  ts?: Maybe<Scalars['timestamptz']>;
};

/** order by stddev() on columns of table "scrape_log" */
export type Scrape_Log_Stddev_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by stddev_pop() on columns of table "scrape_log" */
export type Scrape_Log_Stddev_Pop_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by stddev_samp() on columns of table "scrape_log" */
export type Scrape_Log_Stddev_Samp_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by sum() on columns of table "scrape_log" */
export type Scrape_Log_Sum_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by var_pop() on columns of table "scrape_log" */
export type Scrape_Log_Var_Pop_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by var_samp() on columns of table "scrape_log" */
export type Scrape_Log_Var_Samp_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** order by variance() on columns of table "scrape_log" */
export type Scrape_Log_Variance_Order_By = {
  council_id?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

export type St_D_Within_Geography_Input = {
  distance: Scalars['Float'];
  from: Scalars['geography'];
  use_spheroid?: Maybe<Scalars['Boolean']>;
};

export type St_D_Within_Input = {
  distance: Scalars['Float'];
  from: Scalars['geometry'];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
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

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  fcm_tokens?: Maybe<Fcm_Token_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  location?: Maybe<Geography_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  fcm_tokens?: Maybe<Fcm_Token_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['geography']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  fcm_tokens_aggregate?: Maybe<Fcm_Token_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  location?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['geography']>;
  name?: Maybe<Scalars['String']>;
};





export type Get_Scrape_LogQueryVariables = {
  offset?: Maybe<Scalars['Int']>;
};


export type Get_Scrape_LogQuery = (
  { __typename?: 'query_root' }
  & { scrape_log: Array<(
    { __typename?: 'scrape_log' }
    & Pick<Scrape_Log, 'event' | 'meta' | 'ts' | 'scraper'>
    & { council?: Maybe<(
      { __typename?: 'council' }
      & Pick<Council, 'title'>
    )> }
  )> }
);

export type Get_User_LocationQueryVariables = {
  id: Scalars['String'];
};


export type Get_User_LocationQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & Pick<Users, 'id' | 'location'>
  )> }
);

export type Update_User_LocationMutationVariables = {
  id: Scalars['String'];
  location: Scalars['geography'];
};


export type Update_User_LocationMutation = (
  { __typename?: 'mutation_root' }
  & { update_users?: Maybe<(
    { __typename?: 'users_mutation_response' }
    & Pick<Users_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'users' }
      & Pick<Users, 'id' | 'location'>
    )> }
  )> }
);

export type Get_Pa_Status_ExistsQueryVariables = {
  id: Scalars['String'];
};


export type Get_Pa_Status_ExistsQuery = (
  { __typename?: 'query_root' }
  & { pa_status_by_pk?: Maybe<(
    { __typename?: 'pa_status' }
    & Pick<Pa_Status, 'id'>
  )> }
);

export type Get_Existing_LocationQueryVariables = {
  address: Scalars['String'];
};


export type Get_Existing_LocationQuery = (
  { __typename?: 'query_root' }
  & { pa_status: Array<(
    { __typename?: 'pa_status' }
    & Pick<Pa_Status, 'id' | 'location'>
  )> }
);

export type Get_Scrape_Targets_By_TypeQueryVariables = {
  scraper?: Maybe<Scalars['String']>;
};


export type Get_Scrape_Targets_By_TypeQuery = (
  { __typename?: 'query_root' }
  & { council: Array<(
    { __typename?: 'council' }
    & Pick<Council, 'id' | 'portal_url' | 'title'>
  )> }
);

export type Insert_Scrape_LogMutationVariables = {
  objects: Array<Scrape_Log_Insert_Input>;
};


export type Insert_Scrape_LogMutation = (
  { __typename?: 'mutation_root' }
  & { insert_scrape_log?: Maybe<(
    { __typename?: 'scrape_log_mutation_response' }
    & { returning: Array<(
      { __typename?: 'scrape_log' }
      & Pick<Scrape_Log, 'id' | 'ts'>
    )> }
  )> }
);

export type Update_Pa_StatusMutationVariables = {
  id: Scalars['String'];
  set: Pa_Status_Set_Input;
};


export type Update_Pa_StatusMutation = (
  { __typename?: 'mutation_root' }
  & { update_pa_status?: Maybe<(
    { __typename?: 'pa_status_mutation_response' }
    & { returning: Array<(
      { __typename?: 'pa_status' }
      & Pick<Pa_Status, 'id' | 'created_at' | 'updated_at'>
    )> }
  )> }
);

export type Insert_Pa_StatusMutationVariables = {
  objects: Array<Pa_Status_Insert_Input>;
};


export type Insert_Pa_StatusMutation = (
  { __typename?: 'mutation_root' }
  & { insert_pa_status?: Maybe<(
    { __typename?: 'pa_status_mutation_response' }
    & { returning: Array<(
      { __typename?: 'pa_status' }
      & Pick<Pa_Status, 'id' | 'created_at'>
    )> }
  )> }
);

export type Insert_Pa_ScrapeMutationVariables = {
  objects: Array<Pa_Scrape_Insert_Input>;
};


export type Insert_Pa_ScrapeMutation = (
  { __typename?: 'mutation_root' }
  & { insert_pa_scrape?: Maybe<(
    { __typename?: 'pa_scrape_mutation_response' }
    & { returning: Array<(
      { __typename?: 'pa_scrape' }
      & Pick<Pa_Scrape, 'id' | 'scraped_at'>
    )> }
  )> }
);

export type Get_New_Planning_Apps_NearQueryVariables = {
  point: Scalars['geography'];
  distance: Scalars['Float'];
  date: Scalars['timestamptz'];
  council_id: Scalars['Int'];
};


export type Get_New_Planning_Apps_NearQuery = (
  { __typename?: 'query_root' }
  & { pa_status: Array<(
    { __typename?: 'pa_status' }
    & Pick<Pa_Status, 'id'>
  )> }
);

export type Get_UsersQueryVariables = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type Get_UsersQuery = (
  { __typename?: 'query_root' }
  & { users: Array<(
    { __typename?: 'users' }
    & Pick<Users, 'id' | 'name' | 'location'>
    & { fcm_tokens: Array<(
      { __typename?: 'fcm_token' }
      & Pick<Fcm_Token, 'token'>
    )> }
  )> }
);


export const Get_Scrape_LogDocument = gql`
    query get_scrape_log($offset: Int) {
  scrape_log(limit: 50, offset: $offset, order_by: {ts: desc}) {
    council {
      title
    }
    event
    meta
    ts
    scraper
  }
}
    `;
export const Get_User_LocationDocument = gql`
    query get_user_location($id: String!) {
  users(where: {id: {_eq: $id}}) {
    id
    location
  }
}
    `;
export const Update_User_LocationDocument = gql`
    mutation update_user_location($id: String!, $location: geography!) {
  update_users(where: {id: {_eq: $id}}, _set: {location: $location}) {
    affected_rows
    returning {
      id
      location
    }
  }
}
    `;
export const Get_Pa_Status_ExistsDocument = gql`
    query get_pa_status_exists($id: String!) {
  pa_status_by_pk(id: $id) {
    id
  }
}
    `;
export const Get_Existing_LocationDocument = gql`
    query get_existing_location($address: String!) {
  pa_status(where: {address: {_eq: $address}}) {
    id
    location
  }
}
    `;
export const Get_Scrape_Targets_By_TypeDocument = gql`
    query get_scrape_targets_by_type($scraper: String) {
  council(where: {scraper: {_eq: $scraper}}) {
    id
    portal_url
    title
  }
}
    `;
export const Insert_Scrape_LogDocument = gql`
    mutation insert_scrape_log($objects: [scrape_log_insert_input!]!) {
  insert_scrape_log(objects: $objects) {
    returning {
      id
      ts
    }
  }
}
    `;
export const Update_Pa_StatusDocument = gql`
    mutation update_pa_status($id: String!, $set: pa_status_set_input!) {
  update_pa_status(where: {id: {_eq: $id}}, _set: $set) {
    returning {
      id
      created_at
      updated_at
    }
  }
}
    `;
export const Insert_Pa_StatusDocument = gql`
    mutation insert_pa_status($objects: [pa_status_insert_input!]!) {
  insert_pa_status(objects: $objects) {
    returning {
      id
      created_at
    }
  }
}
    `;
export const Insert_Pa_ScrapeDocument = gql`
    mutation insert_pa_scrape($objects: [pa_scrape_insert_input!]!) {
  insert_pa_scrape(objects: $objects) {
    returning {
      id
      scraped_at
    }
  }
}
    `;
export const Get_New_Planning_Apps_NearDocument = gql`
    query get_new_planning_apps_near($point: geography!, $distance: Float!, $date: timestamptz!, $council_id: Int!) {
  pa_status(where: {location: {_st_d_within: {distance: $distance, from: $point}}, created_at: {_gte: $date}, council_id: {_eq: $council_id}}) {
    id
  }
}
    `;
export const Get_UsersDocument = gql`
    query get_users($limit: Int!, $offset: Int!) {
  users(limit: $limit, offset: $offset) {
    id
    name
    location
    fcm_tokens {
      token
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    get_scrape_log(variables?: Get_Scrape_LogQueryVariables): Promise<Get_Scrape_LogQuery> {
      return withWrapper(() => client.request<Get_Scrape_LogQuery>(print(Get_Scrape_LogDocument), variables));
    },
    get_user_location(variables: Get_User_LocationQueryVariables): Promise<Get_User_LocationQuery> {
      return withWrapper(() => client.request<Get_User_LocationQuery>(print(Get_User_LocationDocument), variables));
    },
    update_user_location(variables: Update_User_LocationMutationVariables): Promise<Update_User_LocationMutation> {
      return withWrapper(() => client.request<Update_User_LocationMutation>(print(Update_User_LocationDocument), variables));
    },
    get_pa_status_exists(variables: Get_Pa_Status_ExistsQueryVariables): Promise<Get_Pa_Status_ExistsQuery> {
      return withWrapper(() => client.request<Get_Pa_Status_ExistsQuery>(print(Get_Pa_Status_ExistsDocument), variables));
    },
    get_existing_location(variables: Get_Existing_LocationQueryVariables): Promise<Get_Existing_LocationQuery> {
      return withWrapper(() => client.request<Get_Existing_LocationQuery>(print(Get_Existing_LocationDocument), variables));
    },
    get_scrape_targets_by_type(variables?: Get_Scrape_Targets_By_TypeQueryVariables): Promise<Get_Scrape_Targets_By_TypeQuery> {
      return withWrapper(() => client.request<Get_Scrape_Targets_By_TypeQuery>(print(Get_Scrape_Targets_By_TypeDocument), variables));
    },
    insert_scrape_log(variables: Insert_Scrape_LogMutationVariables): Promise<Insert_Scrape_LogMutation> {
      return withWrapper(() => client.request<Insert_Scrape_LogMutation>(print(Insert_Scrape_LogDocument), variables));
    },
    update_pa_status(variables: Update_Pa_StatusMutationVariables): Promise<Update_Pa_StatusMutation> {
      return withWrapper(() => client.request<Update_Pa_StatusMutation>(print(Update_Pa_StatusDocument), variables));
    },
    insert_pa_status(variables: Insert_Pa_StatusMutationVariables): Promise<Insert_Pa_StatusMutation> {
      return withWrapper(() => client.request<Insert_Pa_StatusMutation>(print(Insert_Pa_StatusDocument), variables));
    },
    insert_pa_scrape(variables: Insert_Pa_ScrapeMutationVariables): Promise<Insert_Pa_ScrapeMutation> {
      return withWrapper(() => client.request<Insert_Pa_ScrapeMutation>(print(Insert_Pa_ScrapeDocument), variables));
    },
    get_new_planning_apps_near(variables: Get_New_Planning_Apps_NearQueryVariables): Promise<Get_New_Planning_Apps_NearQuery> {
      return withWrapper(() => client.request<Get_New_Planning_Apps_NearQuery>(print(Get_New_Planning_Apps_NearDocument), variables));
    },
    get_users(variables: Get_UsersQueryVariables): Promise<Get_UsersQuery> {
      return withWrapper(() => client.request<Get_UsersQuery>(print(Get_UsersDocument), variables));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;