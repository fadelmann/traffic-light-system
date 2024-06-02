import { Dispatch } from "react";

export enum Streets {
  MAIN = "main",
  SIDE = "side",
}

export type TrafficLightState = {
  mainStreetTrafficLightColor: TrafficLightColors;
  sideStreetTrafficLightColor: TrafficLightColors;
  pedestrianTrafficLightColor: PedestrianTrafficLightColors;
  hasSimulationStarted: boolean;
  isPedestrianRequestPending: boolean;
  isPedestrianGreenPhaseActive: boolean;
};

export enum TrafficLightColors {
  GREEN = "green",
  YELLOW = "yellow",
  YELLOW_AND_RED = "yellowAndRed",
  RED = "red",
  GREY = "#222222",
}

export enum PedestrianTrafficLightColors {
  GREEN = "green",
  RED = "red",
  GREY = "#222222",
}
