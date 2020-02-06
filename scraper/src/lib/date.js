function stringToISODate(s) {
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

exports.stringToISODate = stringToISODate;
