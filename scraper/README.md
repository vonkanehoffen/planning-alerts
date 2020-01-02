# MyPlanningAlerts Scraper
## Data acquisition for MyPlanningAlerts app.

Scrapes data from local councils' weekly planning lists.

You'd have thought here would be an API already, but apparently not... except this one: https://www.landinsight.io/api that costs £45 a month.

Hence this.

Create `config.js` using the format in `config.example.js` and you're good to go.

Tested on Node v12.13.0.

### Getting started

`npm run scrape` for local dev. `npm run build` for production. 

Deploy with [PM2](https://pm2.io/), configured in `ecosystem.config.js`. `pm2 start` sets a cron job up to run things weekly.

Logs stored in `log/` with winston. JSON format. Best viewed with something like [json-log-viewer](https://www.npmjs.com/package/json-log-viewer) I think. `jv logs/combined.log`

Also posts warn level log messages to Slack channel. See hook in config.
 
## Data Structure

### Council Websites (idox)

### Firebase
Three tables:

 - geoPlanningAppsLive - GeoFirestore
    Current planning apps + those decided in last 2 (?) weeks 
    Shown in app on map
 - geoPlanningAppsArchive - GeoFirestore
    Old planning apps. Decided 2+ weeks ago. Not currently used. Live data gets moved here on expiry.
    We'll use later for whatever historical things we might want to find out.
 - planningAppsScrapeErrors
    Scrape problems. Un-geocodable addresses that need manual intervention
    Stores html & log info
 - manualGeocodes
    Resolutions to geocode scrape error above. Use to search against future non-codable addresses
 - users
    Location and search radius pref for each user
    Notification history


#### geoPlanningAppsLive

Location: {
    apps:{
        [appId]: {
            [scrape_date/id]: {
                appName
                expiryDate
                ... - Look at idox vs tameside (and others) for definitive list...
            },
            [scrape_date/id]: {
                appName
                expiryDate
                ...
            },
            ...
        }
    },
    address
}


#### geoPlanningAppsArchive

Location: {
    apps: {
        [appId]: moved from above
    },
   address
}

#### planningAppsScrapeErrors

```
[auto ID with firestore add()]: {
    timestamp,
    url,
    html,
    js error,
    scraped fields: {
        (if there were any)
    }
}
```
    
archiveOld()

searches all locations for expired planning apps more than 2 weeks out of date
  - moves them from current to archive
  - removes empty locations from current.

planningAppsArchive 


### Alerts

We need to tell users:
 - New planning apps near them
 - Updated planning app status
 
User: {
    location: {
        latitude: 12.34
        longitude: 45.67
        ...
    },
    searchRadius: 5,
    notifiedApps: [
        <appId>,
        <appId>,
        <appId>, 
    ],
    watchedApps: [ (future?)
        <appId>,
        <appId>,
        <appId>,        
    ]
}

# Problems
 - Alerts need to go out when we've manually geocoded things (after initial scrape process)
 - How do we show update vs new?
 
Should we store manual geocode strings for subsequent apps on same properties?

### Solutions....

Status data is unreliable so 
1. Scrape
2. Have we seen that reference before?
   No: Store & notify
   Yes: Find users who are watching it and only notify them
   
