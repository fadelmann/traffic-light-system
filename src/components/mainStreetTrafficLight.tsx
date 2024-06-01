import React from "react";

import { TrafficLight } from "./trafficLight";
import { useTrafficLightsState } from "../contexts/trafficLightContext";

export const MainStreetTrafficLight = ({ displayHorizontal = false }) => {
  const trafficLightState = useTrafficLightsState();

  return (
    <TrafficLight
      displayHorizontal={displayHorizontal}
      activeColor={trafficLightState.mainStreetTrafficLightColor}
    />
  );
};
