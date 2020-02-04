var rp = require('request-promise');
var cheerio = require('cheerio'); // Basically jQuery for node.js

// require('request-debug')(rp);

const j = rp.jar()
var request = rp.defaults({
  transform: function (body) {
    return cheerio.load(body);
  },
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
  },
  jar: j
})

const FORM_URL = 'https://publicaccess.glasgow.gov.uk/online-applications/search.do?action=weeklyList';
const FIRST_PAGE_URL = 'https://publicaccess.glasgow.gov.uk/online-applications/weeklyListResults.do?action=firstPage';

async function stuff() {
  try {
    const $res = await request({
      uri: FORM_URL,
    });
    console.log($res('h1').first().text());
    const body = $res('form[name=searchCriteriaForm]').serialize();
    console.log(body);
    // console.log(j.getCookies(FIRST_PAGE_URL));
    const $resb = await request({
      uri: FIRST_PAGE_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });
    // console.log(j.getCookies(FIRST_PAGE_URL));

    console.log($resb('h1').first().text());
  } catch(err) {
    console.error("ooops", err.message);
  }


}
stuff();
