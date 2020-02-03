import fetch from "node-fetch";
import cookie from 'cookie'
import { performance } from 'perf_hooks';

let sessionCookie = "";

/**
 * Fetch text/html content from a URL and persist any session ID set-cookie directives
 * @param url
 * @param opts
 * @returns {Promise<string|*>}
 */
export default async function fetchPage(url, opts) {
  const t0 = performance.now();
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
        Cookie: sessionCookie,
        ...opts
      }
    });
    const cookies = cookie.parse(response.headers.get("set-cookie") || '');
    if(cookies.JSESSIONID) {
      console.log('Setting session cookie: ', cookies.JSESSIONID);
      sessionCookie = cookie.serialize("JSESSIONID", cookies.JSESSIONID);
    }
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
