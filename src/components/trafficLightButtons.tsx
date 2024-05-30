import React, { useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";

import {
  actions,
  useTrafficLightDispatch,
  useTrafficLightsState,
} from "../trafficLightContext";
import {
  useRunPedestrianGreenPhase,
  useRunSideStreetGreenPhase,
} from "../useTrafficLightPhases";
import { TOTAL_TRAFFIC_LIGHT_DURATION } from "../constants";

export const TrafficLightButtons = () => {
  const { isSystemActive, isPedestrianInQueue, isPedestrianPhaseActive } =
    useTrafficLightsState();
  const dispatch = useTrafficLightDispatch();
  const runSideStreetGreenPhase = useRunSideStreetGreenPhase();
  const runPedestrianGreenPhase = useRunPedestrianGreenPhase();

  const pedestrianInQueueRef = useRef(isPedestrianInQueue);
  const pedestrianPhaseActiveRef = useRef(isPedestrianPhaseActive);

  useEffect(() => {
    pedestrianInQueueRef.current = isPedestrianInQueue;
  }, [isPedestrianInQueue]);

  useEffect(() => {
    pedestrianPhaseActiveRef.current = isPedestrianPhaseActive;
  }, [isPedestrianPhaseActive]);

  useEffect(() => {
    if (!isSystemActive || pedestrianPhaseActiveRef.current) {
      return;
    }

    const runPhase = () => {
      if (pedestrianInQueueRef.current) {
        clearInterval(interval);
        runPedestrianGreenPhase();
      } else {
        runSideStreetGreenPhase();
      }
    };

    runPhase();

    const interval = setInterval(runPhase, TOTAL_TRAFFIC_LIGHT_DURATION);

    return () => clearInterval(interval);
  }, [
    isSystemActive,
    isPedestrianPhaseActive,
    runPedestrianGreenPhase,
    runSideStreetGreenPhase,
  ]);

  const handleStartSystem = () => {
    dispatch(actions.startSystem());
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartSystem}
        disabled={isSystemActive}
      >
        Start
      </Button>
    </Box>
  );
};
