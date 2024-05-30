import React from "react";

import { Box } from "@mui/material";
import { PedestrianTrafficLightColors, TrafficLightColors } from "../types";

type TrafficLightCircleProps = {
  bgColor: TrafficLightColors | PedestrianTrafficLightColors;
};

export const TrafficLightCircle = ({ bgColor }: TrafficLightCircleProps) => (
  <Box
    width={15}
    height={15}
    borderRadius="50%"
    bgcolor={bgColor}
    sx={{
      transition: "background-color 0.3s ease",
    }}
  />
);
