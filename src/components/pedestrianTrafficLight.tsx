import React from "react";
import { IconButton, Stack } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

import { TrafficLightCircle } from "./trafficLightCircle";
import {
  actions,
  useTrafficLightDispatch,
  useTrafficLightsState,
} from "../contexts/trafficLightContext";
import { PedestrianTrafficLightColors } from "../utils/types";

export const PedestrianTrafficLight = () => {
  const {
    isPedestrianRequestPending,
    isPedestrianGreenPhaseActive,
    hasSimulationStarted,
    pedestrianTrafficLightColor,
  } = useTrafficLightsState();
  const dispatch = useTrafficLightDispatch();

  const isPedestrianWalkButtonDisabled =
    isPedestrianRequestPending ||
    isPedestrianGreenPhaseActive ||
    !hasSimulationStarted;

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Stack
        bgcolor={isPedestrianWalkButtonDisabled ? "grey" : "white"}
        borderRadius={8}
        height={30}
        width={30}
      >
        <IconButton
          disabled={isPedestrianWalkButtonDisabled}
          onClick={() => dispatch(actions.requestPedestrianGreen())}
          aria-label="request crossing road"
          size="small"
          color="primary"
        >
          <DirectionsWalkIcon fontSize="inherit" />
        </IconButton>
      </Stack>

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
