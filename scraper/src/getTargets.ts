import { hasuraRequest } from "./lib/hasuraRequest";
import { sdk } from "./lib/hasuraSdk";

export async function getTargets(scraper) {
  const response = await sdk.get_scrape_targets_by_type({ scraper: "idox" });
  return response.council;
}
