import React from "react";
import { Container, Box } from "@mui/material";

import { MainStreetTrafficLight } from "./components/mainStreetTrafficLight";
import { SideStreetTrafficLight } from "./components/sideStreetTrafficLight";
import { PedestrianTrafficLight } from "./components/pedestrianTrafficLight";
import { TrafficLightButton } from "./components/trafficLightStartButton";
import TrafficImage from "./assets/Traffic_Lights_Background.png";
import {
  useRunPedestrianGreenPhase,
  useRunSideStreetGreenPhase,
} from "./hooks/useTrafficLightPhases";
import { useRef } from "react";
import { useEffect } from "react";
import { useTrafficLightsState } from "./contexts/trafficLightContext";
import { TOTAL_TRAFFIC_LIGHT_DURATION } from "./utils/constants";

export const App = () => {
  const {
    isPedestrianGreenPhaseActive,
    isPedestrianRequestPending,
    hasSimulationStarted,
  } = useTrafficLightsState();

  const runSideStreetGreenPhase = useRunSideStreetGreenPhase();
  const runPedestrianGreenPhase = useRunPedestrianGreenPhase();

  const pedestrianRequestPending = useRef(isPedestrianRequestPending);
  const pedestrianPhaseActiveRef = useRef(isPedestrianGreenPhaseActive);

  useEffect(() => {
    pedestrianRequestPending.current = isPedestrianRequestPending;
  }, [isPedestrianRequestPending]);

  useEffect(() => {
    pedestrianPhaseActiveRef.current = isPedestrianGreenPhaseActive;
  }, [isPedestrianGreenPhaseActive]);

  useEffect(() => {
    if (!hasSimulationStarted || pedestrianPhaseActiveRef.current) {
      return;
    }

    const runPhase = () => {
      if (pedestrianRequestPending.current) {
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
    hasSimulationStarted,
    isPedestrianGreenPhaseActive,
    runPedestrianGreenPhase,
    runSideStreetGreenPhase,
  ]);

  return (
    <Container>
      <Box position="relative" mt={5} width={600} marginX="auto">
        <img
          src={TrafficImage}
          alt="Traffic Intersection"
          style={{ width: "100%", height: "auto" }}
        />

        <Box position="absolute" top="65%" left="29%">
          <MainStreetTrafficLight displayHorizontal />
        </Box>

        <Box position="absolute" top="65%" left="61%">
          <SideStreetTrafficLight />
        </Box>

        <Box position="absolute" top="23%" left="66%">
          <PedestrianTrafficLight />
        </Box>
      </Box>

      <TrafficLightButton />
    </Container>
  );
};
