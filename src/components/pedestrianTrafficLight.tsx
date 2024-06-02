import React from "react";
import { Stack } from "@mui/material";

import { TrafficLightCircle } from "./trafficLightCircle";
import { useTrafficLightsState } from "../contexts/trafficLightContext";
import { PedestrianTrafficLightColors } from "../utils/types";
import { PedestrianTrafficLightButton } from "./pedestiranTrafficLightButton";

export const PedestrianTrafficLight = () => {
  const { pedestrianTrafficLightColor } = useTrafficLightsState();

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <PedestrianTrafficLightButton />

      <Stack gap={0.5} bgcolor="black" padding={0.5} borderRadius={1}>
        <TrafficLightCircle
          trafficLightColor={
            pedestrianTrafficLightColor === PedestrianTrafficLightColors.RED
              ? PedestrianTrafficLightColors.RED
              : PedestrianTrafficLightColors.OFF
          }
        />

        <TrafficLightCircle
          trafficLightColor={
            pedestrianTrafficLightColor === PedestrianTrafficLightColors.GREEN
              ? PedestrianTrafficLightColors.GREEN
              : PedestrianTrafficLightColors.OFF
          }
        />
      </Stack>
    </Stack>
  );
};
