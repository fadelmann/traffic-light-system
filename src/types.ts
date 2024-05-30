import { Dispatch } from "react";
import { actionTypes } from "./constants";

export enum Streets {
  MAIN = "main",
  SIDE = "side",
}

export type TrafficLightState = {
  mainStreetTrafficLightColor: TrafficLightColors;
  sideStreetTrafficLightColor: TrafficLightColors;
  pedestrianTrafficLightColor: PedestrianTrafficLightColors;
  isSystemActive: boolean;
  isPedestrianInQueue: boolean;
  isPedestrianPhaseActive: boolean;
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

export type DispatchType = Dispatch<TrafficLightAction>;

export type TrafficLightAction =
  | { type: typeof actionTypes.START_SYSTEM }
  | {
      type: typeof actionTypes.CHANGE_TRAFFIC_LIGHT_COLOR;
      trafficLightType: string;
    }
  | { type: typeof actionTypes.PEDESTRIAN_CLICK }
  | { type: typeof actionTypes.REMOVE_PEDESTRIAN_FROM_QUEUE }
  | { type: typeof actionTypes.PEDESTRIAN_GOES_RED }
  | { type: typeof actionTypes.PEDESTRIAN_GOES_GREEN }
  | { type: typeof actionTypes.SET_PEDESTRIAN_PHASE_ACTIVE }
  | { type: typeof actionTypes.SET_PEDESTRIAN_PHASE_INACTIVE };
