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
  isPedestrianRequestPending: false,
  isPedestrianGreenPhaseActive: false,
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

    case "SET_TRAFFIC_LIGHT_COLOR":
      return action.street === Streets.MAIN
        ? {
            ...state,
            mainStreetTrafficLightColor: action.trafficLightColor,
          }
        : {
            ...state,
            sideStreetTrafficLightColor: action.trafficLightColor,
          };

    case "REQUEST_PEDESTRIAN_GREEN":
      return { ...state, isPedestrianRequestPending: true };

    case "CLEAR_PEDESTRIAN_REQUEST":
      return { ...state, isPedestrianRequestPending: false };

    case "SET_PEDESTRIAN_TRAFFIC_LIGHT_COLOR":
      return {
        ...state,
        pedestrianTrafficLightColor: action.pedestrianTrafficLightColor,
      };

    case "SET_PEDESTRIAN_PHASE_ACTIVE":
      return { ...state, isPedestrianGreenPhaseActive: true };

    case "SET_PEDESTRIAN_PHASE_INACTIVE":
      return { ...state, isPedestrianGreenPhaseActive: false };

    default:
      return state;
  }
};

export const actions = {
  startSystem: () => ({ type: "START_SYSTEM" }),

  setTrafficLightColor: (
    street: Streets,
    trafficLightColor: TrafficLightColors
  ) => ({
    type: "SET_TRAFFIC_LIGHT_COLOR",
    trafficLightColor,
    street,
  }),

  setPedestrianColor: (
    pedestrianTrafficLightColor: PedestrianTrafficLightColors
  ) => ({
    type: "SET_PEDESTRIAN_TRAFFIC_LIGHT_COLOR",
    pedestrianTrafficLightColor,
  }),

  requestPedestrianGreen: () => ({ type: "REQUEST_PEDESTRIAN_GREEN" }),

  clearPedestrianRequest: () => ({ type: "CLEAR_PEDESTRIAN_REQUEST" }),

  setPedestrianPhaseActive: () => ({ type: "SET_PEDESTRIAN_PHASE_ACTIVE" }),

  setPedestrianPhaseInactive: () => ({ type: "SET_PEDESTRIAN_PHASE_INACTIVE" }),
};
