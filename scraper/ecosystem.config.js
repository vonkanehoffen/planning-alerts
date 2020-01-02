module.exports = {
  apps: [
    {
      name: "MyPlanningAlerts-Scraper",
      script: "dist/index.js",

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: "",
      instances: 1,
      autorestart: false,
      /**
       * unix cron format: http://man7.org/linux/man-pages/man5/crontab.5.html
       * field          allowed values
       -----          --------------
       minute         0-59
       hour           0-23
       day of month   1-31
       month          1-12 (or names, see below)
       day of week    0-7 (0 or 7 is Sunday, or use names)
       */
      cron_restart: "0 9 * * TUE",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      user: "node",
      host: "212.83.163.1",
      ref: "origin/master",
      repo: "https://github.com/vonkanehoffen/MyPlanningAlerts-Scraper",
      path: "/var/www/MyPlanningAlerts-Scraper",
      "post-deploy":
        "npm install && && npm run build && pm2 reload ecosystem.config.js --env production"
    }
  }
};
