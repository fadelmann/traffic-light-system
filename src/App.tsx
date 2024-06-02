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
import { TOTAL_TRAFFIC_LIGHT_PHASE_DURATION } from "./utils/constants";

export const App = () => {
  const {
    isPedestrianGreenPhaseActive,
    isPedestrianRequestPending,
    hasSimulationStarted,
  } = useTrafficLightsState();

  const runSideStreetGreenPhase = useRunSideStreetGreenPhase();
  const runPedestrianGreenPhase = useRunPedestrianGreenPhase();

  /*
    Creating a ref for the pedestrian traffic light state because otherwise it
    wouldn't update inside the setInterval. The callback passed into
    setInterval's closure only accesses the state in the first render.
  */
  const pedestrianTrafficLightState = useRef("idle");

  /*
    Using the useEffect hook, the ref gets updated depending on the context's state,
    which is in the dependency array so that the code runs again if one of these variables changes.
  */
  useEffect(() => {
    if (isPedestrianRequestPending) {
      pedestrianTrafficLightState.current = "requested";
      return;
    }

    if (isPedestrianGreenPhaseActive) {
      pedestrianTrafficLightState.current = "active";
      return;
    }

    if (hasSimulationStarted) {
      pedestrianTrafficLightState.current = "idle";
      return;
    }

    pedestrianTrafficLightState.current = "inactive";
  }, [
    isPedestrianRequestPending,
    isPedestrianGreenPhaseActive,
    hasSimulationStarted,
  ]);

  /*
    With this code also running again after the context state changes,
    we can inject the updated value of the ref inside the setInterval
    to stop it and trigger the pedestrian green phase when it is requested.
  */
  useEffect(() => {
    if (
      pedestrianTrafficLightState.current === "inactive" ||
      pedestrianTrafficLightState.current === "active"
    ) {
      return;
    }

    const runPhase = () => {
      if (pedestrianTrafficLightState.current === "requested") {
        clearInterval(interval);
        runPedestrianGreenPhase();
      } else {
        runSideStreetGreenPhase();
      }
    };

    runPhase();

    const interval = setInterval(runPhase, TOTAL_TRAFFIC_LIGHT_PHASE_DURATION);

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
