import { performance } from 'perf_hooks';
// import nodeFetch from 'node-fetch';
// import fetchCookie from 'fetch-cookie';
import request from 'request'

// const fetch = fetchCookie(nodeFetch);
request = request.defaults({jar: true});


/**
 * Fetch text/html content from a URL and persist any session ID set-cookie directives
 * @param url
 * @param opts
 * @returns {Promise<string|*>}
 */
export default async function fetchPage(url, opts) {
  const t0 = performance.now();
  try {
    const options = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
      },
      ...opts
    };
    console.log('opts: ', options);
    const response = await request(url, options); // TODO: Use request() instead. Better debugging
    const text =  await response.text();
    const t1 = performance.now()
    console.log(`fetchPage success: ${url} - ${(t1-t0)/1000}s`);
    return text;
  } catch(e) {
    const t1 = performance.now()
    console.error(`fetchPage failure: ${url} - ${(t1-t0)/1000}s`, e);
    return '';
  }
}
