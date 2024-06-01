import React from "react";
import { Box } from "@mui/material";

import { TrafficLightCircle } from "./trafficLightCircle";
import { TrafficLightColors } from "../utils/types";

type TrafficLightProps = {
  activeColor: TrafficLightColors;
  displayHorizontal?: boolean;
};

export const TrafficLight = ({
  activeColor = TrafficLightColors.GREY,
  displayHorizontal = false,
}: TrafficLightProps) => (
  <Box>
    <Box
      bgcolor="black"
      padding={0.5}
      borderRadius={1}
      display="flex"
      flexDirection={displayHorizontal ? "row-reverse" : "column"}
      alignItems="center"
      gap={0.5}
    >
      <TrafficLightCircle
        bgColor={
          activeColor === TrafficLightColors.RED ||
          activeColor === TrafficLightColors.YELLOW_AND_RED
            ? TrafficLightColors.RED
            : TrafficLightColors.GREY
        }
      />

      <TrafficLightCircle
        bgColor={
          activeColor === TrafficLightColors.YELLOW ||
          activeColor === TrafficLightColors.YELLOW_AND_RED
            ? TrafficLightColors.YELLOW
            : TrafficLightColors.GREY
        }
      />

      <TrafficLightCircle
        bgColor={
          activeColor === TrafficLightColors.GREEN
            ? TrafficLightColors.GREEN
            : TrafficLightColors.GREY
        }
      />
    </Box>
  </Box>
);
