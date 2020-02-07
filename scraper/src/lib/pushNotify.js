const { getHostname } = require("./util");

/**
 * Send push notifications to users for new and updated planning apps
 * from a selected council (following scrape finish)
 * @param rootURL
 * @returns {Promise<void>}
 */
async function pushNotify(rootURL) {
  const council = getHostname(rootURL);
  console.log("PUSH NOTIFY --------", council);
  // TODO: This stuff....
  return false;
}

exports.pushNotify = pushNotify;
