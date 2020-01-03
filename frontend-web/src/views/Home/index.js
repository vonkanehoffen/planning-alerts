import React from "react";
import PlanningMap from "./PlanningMap";

/**
 * Home page for authenticated users
 * Showing planning apps near their location
 * @returns {*}
 * @constructor
 */
export default function Home() {
  return (
    <div>
      <PlanningMap />
    </div>
  );
}
