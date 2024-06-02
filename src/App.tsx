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
import { useTrafficLightsState } from "./contexts/trafficLightContext";
import { TOTAL_TRAFFIC_LIGHT_PHASE_DURATION } from "./utils/constants";
import { useInterval } from "./hooks/useSetIntervall";
import { useEffect } from "react";

export const App = () => {
  const { isPedestrianRequestPending } = useTrafficLightsState();

  const runSideStreetGreenPhase = useRunSideStreetGreenPhase();
  const runPedestrianGreenPhase = useRunPedestrianGreenPhase();

  const runPhase = () => {
    if (isPedestrianRequestPending) {
      runPedestrianGreenPhase();
      return;
    }

    runSideStreetGreenPhase();
  };

  useEffect(() => {
    runPhase();
  }, []);

  /*
    Creating a ref for the callback otherwise it
    wouldn't update inside the setInterval. The callback passed into
    setInterval's closure otherwise gets set on first render and stays that way.
    Setting the total duration of the sideStreetGreenphase as the interval duration.
    After it's finished, it checks if the user hit the pedestrian requests crossing button.
  */
  useInterval(runPhase, TOTAL_TRAFFIC_LIGHT_PHASE_DURATION);

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
