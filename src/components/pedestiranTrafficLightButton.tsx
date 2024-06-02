import React from "react";
import { IconButton, Stack } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

import {
  actions,
  useTrafficLightDispatch,
  useTrafficLightsState,
} from "../contexts/trafficLightContext";

export const PedestrianTrafficLightButton = () => {
  const {
    isPedestrianRequestPending,
    isPedestrianGreenPhaseActive,
    hasSimulationStarted,
  } = useTrafficLightsState();
  const dispatch = useTrafficLightDispatch();

  /*
    State to disable the pedestrian request button when:
    - The button has been pressed and the pedestrian green phase is pending or active.
    - The entire traffic system hasn't been started yet by the user.
  */
  const isPedestrianWalkButtonDisabled =
    isPedestrianRequestPending ||
    isPedestrianGreenPhaseActive ||
    !hasSimulationStarted;

  return (
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
  );
};
