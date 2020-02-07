# MyPlanningAlerts Scraper

## Data acquisition for MyPlanningAlerts app.

Scrapes data from local councils' weekly planning lists.

You'd have thought here would be an API already, but apparently not... except this one: https://www.landinsight.io/api that costs £45 a month.

Hence this.

Create `config.js` using the format in `config.example.js` and you're good to go.

Tested on Node v12.13.0.

### Getting started

Deploy with [PM2](https://pm2.io/), configured in `ecosystem.config.js`. to set a cron job up to run things weekly.

```bash
npm install pm2@latest -g
npm install # this repos dependencies
pm2 start ecosystem.config.js
```

then to update:

```bash
git pull
npm i
pm2 reload ecosystem.config.js
```

Run a manual scrape for a specific council:

```bash
node scrape-single.js https://publicaccess.glasgow.gov.uk/online-applications
```
