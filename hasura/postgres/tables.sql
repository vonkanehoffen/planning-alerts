-- See....
-- https://blog.hasura.io/graphql-schema-on-postgres-with-foreign-keys-and-without-foreign-keys-95f6b2715478/
-- Current status of planning apps
create table pa_status(
    id TEXT NOT NULL, -- planning app reference - foreign key on scrape tables

    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),

    proposal TEXT NOT NULL,
    location geography(Point),
    address TEXT NOT NULL,
    open BOOLEAN NOT NULL,
    url TEXT NOT NULL,
    application_validated TIMESTAMPTZ, -- i.e. opened time. from scrape tables or defaulted
    decision_issued_date TIMESTAMPTZ, -- i.e. closed time
    decision TEXT,
    PRIMARY KEY ("id")
);

-- Data from each scraped record in council "validated" lists
create table pa_scrape_validated(
    id SERIAL PRIMARY KEY,
    scraped_at TIMESTAMPTZ DEFAULT now(),
    url TEXT NOT NULL,
    scraper TEXT NOT NULL,

    -- Summary tab
    reference TEXT NOT NULL REFERENCES "pa_status" (id),
    alternative_reference TEXT,
    application_validated TIMESTAMPTZ,
    address TEXT NOT NULL,
    proposal TEXT NOT NULL,
    decision TEXT,
    decision_issued_date TIMESTAMPTZ,
    appeal_status TEXT,
    appeal_decision TEXT,
    application_received TIMESTAMPTZ,
    status TEXT,

    -- Other tabs
    further_information JSONB NOT NULL,
    important_dates JSONB NOT NULL,
    contacts JSONB NOT NULL
);

-- Data from each scraped record in council "decided" lists
create table pa_scrape_decided(
    id SERIAL PRIMARY KEY,
    scraped_at TIMESTAMPTZ DEFAULT now(),
    url TEXT NOT NULL,
    scraper TEXT NOT NULL,

    -- Summary tab
    reference TEXT NOT NULL REFERENCES "pa_status" (id),
    alternative_reference TEXT,
    application_validated TIMESTAMPTZ,
    address TEXT NOT NULL,
    proposal TEXT NOT NULL,
    decision TEXT,
    decision_issued_date TIMESTAMPTZ,
    appeal_status TEXT,
    appeal_decision TEXT,
    application_received TIMESTAMPTZ,
    status TEXT,

    -- Other tabs
    further_information JSONB NOT NULL,
    important_dates JSONB NOT NULL,
    contacts JSONB NOT NULL
);

-- Log of scrape actions. Start and finish times + meta data
create table scrape_log(
    id SERIAL PRIMARY KEY,
    scraper TEXT NOT NULL,
    event TEXT NOT NULL,
    meta JSONB NOT NULL,
    ts TIMESTAMPTZ DEFAULT now()
);

-- fed by "Add user to Hasura" rule in Auth0
create table users(
    id text primary key,
    name text,
    email text,
    location geography(Point)
);
