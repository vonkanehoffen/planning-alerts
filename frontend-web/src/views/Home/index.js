import React from "react";
import UserLocation from "./UserLocation";

/**
 * Home page for authenticated users
 * Showing planning apps near their location
 * @returns {*}
 * @constructor
 */
export default function Home() {
  return (
    <div>
      <UserLocation />
    </div>
  );
}
