import React from "react";
import { Box } from "@mui/material";

import { TrafficLight } from "./trafficLight";
import { useTrafficLightsState } from "../trafficLightContext";

export const SideStreetTrafficLight = () => {
  const { sideStreetTrafficLightColor } = useTrafficLightsState();

  return (
    <Box>
      <TrafficLight activeColor={sideStreetTrafficLightColor} />
    </Box>
  );
};
