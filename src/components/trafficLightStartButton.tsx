import React from "react";
import { Box, Button, Stack } from "@mui/material";
import {
  useTrafficLightsState,
  useTrafficLightDispatch,
  actions,
} from "../contexts/trafficLightContext";

export const TrafficLightButton = () => {
  const { hasSimulationStarted } = useTrafficLightsState();
  const dispatch = useTrafficLightDispatch();

  const handleStartSystem = () => {
    dispatch(actions.startSystem());
  };

  return (
    <Box mt={5} display="flex" justifyContent="center">
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
