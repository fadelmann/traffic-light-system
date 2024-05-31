import React from "react";
import { Box, Button } from "@mui/material";

import {
  actions,
  useTrafficLightDispatch,
  useTrafficLightsState,
} from "../trafficLightContext";

export const TrafficLightButton = () => {
  const { hasSimulationStarted } = useTrafficLightsState();
  const dispatch = useTrafficLightDispatch();

  const handleStartSystem = () => {
    dispatch(actions.startSystem());
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartSystem}
        disabled={hasSimulationStarted}
      >
        Start
      </Button>
    </Box>
  );
};
