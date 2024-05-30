import React from "react";
import { Container, Box } from "@mui/material";

import { MainStreetTrafficLight } from "./components/mainStreetTrafficLight";
import { SideStreetTrafficLight } from "./components/sideStreetTrafficLight";
import { PedestrianTrafficLight } from "./components/pedestrianTrafficLight";
import { TrafficLightProvider } from "./trafficLightContext";
import { TrafficLightButtons } from "./components/trafficLightButtons";
import TrafficImage from "./assets/Traffic_Lights_Background.png";

const App = () => (
  <TrafficLightProvider>
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
      <TrafficLightButtons />
    </Container>
  </TrafficLightProvider>
);

export default App;
