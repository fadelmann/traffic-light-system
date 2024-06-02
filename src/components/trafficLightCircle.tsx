import React from "react";
import { Box } from "@mui/material";

import {
  PedestrianTrafficLightColors,
  TrafficLightColors,
  mapTrafficLightColorsToHex,
} from "../utils/types";

type TrafficLightCircleProps = {
  trafficLightColor: TrafficLightColors | PedestrianTrafficLightColors;
};

export const TrafficLightCircle = ({
  trafficLightColor,
}: TrafficLightCircleProps) => (
  <Box
    width={15}
    height={15}
    borderRadius="50%"
    bgcolor={mapTrafficLightColorsToHex[trafficLightColor]}
    sx={{
      transition: "background-color 0.3s ease",
    }}
  />
);
