import React, { createContext, useReducer, useContext } from "react";
import { noOp } from "../utils/helpers";
import {
  TrafficLightState,
  TrafficLightColors,
  PedestrianTrafficLightColors,
  Streets,
} from "../utils/types";

const initialState: TrafficLightState = {
  mainStreetTrafficLightColor: TrafficLightColors.GREY,
  sideStreetTrafficLightColor: TrafficLightColors.GREY,
  pedestrianTrafficLightColor: PedestrianTrafficLightColors.GREY,
  hasSimulationStarted: false,
  isPedestrianInQueue: false,
  isPedestrianPhaseActive: false,
};

const TrafficLightContext = createContext<TrafficLightState>(initialState);
const TrafficLightDispatchContext = createContext<DispatchType>(noOp);

export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  return (
    <TrafficLightContext.Provider value={state}>
      <TrafficLightDispatchContext.Provider value={dispatch}>
        {children}
      </TrafficLightDispatchContext.Provider>
    </TrafficLightContext.Provider>
  );
};

export const useTrafficLightsState = () => useContext(TrafficLightContext);
export const useTrafficLightDispatch = () =>
  useContext(TrafficLightDispatchContext);

const trafficLightReducer = (
  state: TrafficLightState,
  action
): TrafficLightState => {
  switch (action.type) {
    case "START_SYSTEM":
      return {
        ...state,
        mainStreetTrafficLightColor: TrafficLightColors.GREEN,
        sideStreetTrafficLightColor: TrafficLightColors.RED,
        pedestrianTrafficLightColor: PedestrianTrafficLightColors.RED,
        hasSimulationStarted: true,
      };

    case "SET_MAIN_STREET_LIGHT_COLOR":
      return {
        ...state,
        mainStreetTrafficLightColor: action.trafficLightColor,
      };

    case "SET_SIDE_STREET_LIGHT_COLOR":
      return {
        ...state,
        sideStreetTrafficLightColor: action.trafficLightColor,
      };

    case "REQUEST_PEDESTRIAN_GREEN":
      return { ...state, isPedestrianInQueue: true };

    case "REMOVE_PEDESTRIAN_FROM_QUEUE":
      return { ...state, isPedestrianInQueue: false };

    case "SET_PEDESTRIAN_LIGHT_RED":
      return {
        ...state,
        pedestrianTrafficLightColor: PedestrianTrafficLightColors.RED,
      };

    case "SET_PEDESTRIAN_LIGHT_GREEN":
      return {
        ...state,
        pedestrianTrafficLightColor: PedestrianTrafficLightColors.GREEN,
      };

    case "SET_PEDESTRIAN_PHASE_ACTIVE":
      return { ...state, isPedestrianPhaseActive: true };

    case "SET_PEDESTRIAN_PHASE_INACTIVE":
      return { ...state, isPedestrianPhaseActive: false };

    default:
      return state;
  }
};

export const actions = {
  startSystem: () => ({ type: "START_SYSTEM" }),
  // fix setting right color
  setTrafficLightColor: (
    trafficLightColor: TrafficLightColors,
    street: Streets
  ) => ({
    type: "SET_TRAFFIC_LIGHT_COLOR",
    trafficLightColor,
    street,
  }),

  requestPedestrianGreen: () => ({ type: "REQUEST_PEDESTRIAN_GREEN" }),

  removePedestrianFromQueue: () => ({ type: "REMOVE_PEDESTRIAN_FROM_QUEUE" }),

  setPedestrianLightRed: () => ({ type: "SET_PEDESTRIAN_LIGHT_RED" }),

  setPedestrianLightGreen: () => ({ type: "SET_PEDESTRIAN_LIGHT_GREEN" }),

  setPedestrianPhaseActive: () => ({ type: "SET_PEDESTRIAN_PHASE_ACTIVE" }),

  setPedestrianPhaseInactive: () => ({ type: "SET_PEDESTRIAN_PHASE_INACTIVE" }),
};
