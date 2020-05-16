/**
 * Convert a string to an ISO date if possible
 * @param s
 * @returns {string|undefined}
 */
export function stringToISODate(s) {
  if (s) {
    try {
      const d = new Date(s);
      return d.toISOString();
    } catch (e) {
      return undefined;
    }
  } else {
    return undefined;
  }
}

/**
 * Get hostname
 * (council domain name used to identify in pa_status.council)
 * @param url
 * @returns {string}
 */
export function getHostname(url) {
  return new URL(url).hostname;
}
