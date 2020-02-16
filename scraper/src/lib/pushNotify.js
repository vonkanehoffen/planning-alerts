const { hasuraRequest } = require("../lib/hasuraRequest");
const { getHostname } = require("./util");
const queries = require("../queries");

/**
 * Send push notifications to users for new and updated planning apps
 * from a selected council (following scrape finish)
 * @param rootURL
 * @returns {Promise<void>}
 */
async function pushNotify(rootURL) {
  const council = getHostname(rootURL);
  console.log("PUSH NOTIFY --------", council);

  const limit = 3;
  let offset = 0
  let users;

  do {
    console.log('GETTING USERS');
    users = await hasuraRequest({
      query: queries.GET_USERS,
      variables: {
        limit,
        offset
      }
    });
    offset += limit;
    // console.log("USERS>>>>", users);
  } while (users.data.users.length > 0);

  // const paNear = hasuraRequest({
  //   query: queries.GET_NEW_PLANNING_APPS_NEAR,
  //   variables: {
  //     point:
  //   }
  // })
}

pushNotify("https://publicaccess.glasgow.gov.uk/online-applications");
// exports.pushNotify = pushNotify;
