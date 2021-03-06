import rp from "request-promise";
import cheerio from "cheerio"; // Basically jQuery for node.js
import config from "../config";

if (config.debug) {
  // require('request-debug')(rp);
  rp.debug = true;
}

const j = rp.jar();
export const request = rp.defaults({
  transform: function(body) {
    return cheerio.load(body);
  },
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36"
  },
  jar: j,
  followAllRedirects: true // follow non-GET HTTP 3xx responses as redirects
});
