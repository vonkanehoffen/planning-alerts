-- create type planning_decision as enum (
--     '',
--     'Agreed',
--     'Application Withdrawn',
--     'Approve with Conditions',
--     'Approve',
--     'Approved Part A and Refuse Part B',
--     'Approved Unconditionally',
--     'Approved and Refused',
--     'Approved extension - GPD',
--     'Approved with Conditions',
--     'Approved', -- see above.
--     'Closed',
--     'Condition Discharge - Part',
--     'Conditional extension - GPD',
--     'Decline to Determine Application',
--     'Declined To Determine',
--     'Deemed Approval',
--     'Details Required',
--     'Determined (DOC Applications)',
--     'Discharge Of Conditions',
--     'Full discharge of conditions',
--     'GPD Approval',
--     'GPD Conditional Approval (No Objections)',
--     'GPD Prior Approval NOT Required',
--     'GPD Prior Approval Required and GRANTED',
--     'GPD Refusal',
--     'Gen Permitted Development (Conditional)',
--     'Grant subject to conditions',
--     'Grant',
--     'Granted LUC Proposed Use or Development',
--     'Granted Permission',
--     'Granted'
--     )
-- hasura table for planning app data
create table planning_app(
    ref text primary key, -- reference
    alternative_ref text, -- alternativeReference
    proposal text not null, -- proposal
    url text not null, -- url
    address text not null, -- address
    location geography(Point), -- coordinates (parent)
    geocode_ok bool, -- geocodeStatus
    validated_date date, -- applicationValidated
    decision_date date, -- decisionIssuedDate
    decision_status text, -- decision
    appeal_status text, -- appealStatus
    appeal_decision text, -- appealDecision
    created_at timestamptz not null -- createdAt.seconds (parent)
        default now(),
    updated_at timestamptz -- updatedAt.seconds (parent)
);
