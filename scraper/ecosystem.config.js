module.exports = {
  apps: [
    {
      name: "planning-alerts-scraper",
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
      cron_restart: "0 7 * * TUE",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
