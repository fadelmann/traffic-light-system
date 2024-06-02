import React from "react";
import { Box, IconButton } from "@mui/material";
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
    <Box display="flex" gap={1} alignItems="center">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
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
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={0.5}
        bgcolor="black"
        padding={0.5}
        borderRadius={1}
      >
        <TrafficLightCircle
          bgColor={
            pedestrianTrafficLightColor === PedestrianTrafficLightColors.RED
              ? PedestrianTrafficLightColors.RED
              : PedestrianTrafficLightColors.GREY
          }
        />

        <TrafficLightCircle
          bgColor={
            pedestrianTrafficLightColor === PedestrianTrafficLightColors.GREEN
              ? PedestrianTrafficLightColors.GREEN
              : PedestrianTrafficLightColors.GREY
          }
        />
      </Box>
    </Box>
  );
};
