import React from "react";

import { TrafficLight } from "./trafficLight";
import { useTrafficLightsState } from "../contexts/trafficLightContext";

export const MainStreetTrafficLight = ({ displayHorizontal = false }) => {
  const { mainStreetTrafficLightColor } = useTrafficLightsState();

  return (
    <TrafficLight
      displayHorizontal={displayHorizontal}
      activeColor={mainStreetTrafficLightColor}
    />
  );
};
