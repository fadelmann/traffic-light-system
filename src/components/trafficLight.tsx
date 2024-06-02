import React from "react";
import { Stack } from "@mui/material";

import { TrafficLightCircle } from "./trafficLightCircle";
import { TrafficLightColors } from "../utils/types";

type TrafficLightProps = {
  activeColor: TrafficLightColors;
  displayHorizontal?: boolean;
};

export const TrafficLight = ({
  activeColor = TrafficLightColors.OFF,
  displayHorizontal = false,
}: TrafficLightProps) => (
  <Stack>
    <Stack
      bgcolor="black"
      padding={0.5}
      borderRadius={1}
      direction={displayHorizontal ? "row-reverse" : "column"}
      gap={0.5}
    >
      <TrafficLightCircle
        trafficLightColor={
          activeColor === TrafficLightColors.RED ||
          activeColor === TrafficLightColors.YELLOW_AND_RED
            ? TrafficLightColors.RED
            : TrafficLightColors.OFF
        }
      />

      <TrafficLightCircle
        trafficLightColor={
          activeColor === TrafficLightColors.YELLOW ||
          activeColor === TrafficLightColors.YELLOW_AND_RED
            ? TrafficLightColors.YELLOW
            : TrafficLightColors.OFF
        }
      />

      <TrafficLightCircle
        trafficLightColor={
          activeColor === TrafficLightColors.GREEN
            ? TrafficLightColors.GREEN
            : TrafficLightColors.OFF
        }
      />
    </Stack>
  </Stack>
);
