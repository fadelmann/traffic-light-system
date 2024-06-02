import React, { createContext, useReducer, useContext, Dispatch } from "react";
import { noOp } from "../utils/helpers";
import {
  TrafficLightState,
  TrafficLightColors,
  PedestrianTrafficLightColors,
  Streets,
} from "../utils/types";

const initialState: TrafficLightState = {
  mainStreetTrafficLightColor: TrafficLightColors.OFF,
  sideStreetTrafficLightColor: TrafficLightColors.OFF,
  pedestrianTrafficLightColor: PedestrianTrafficLightColors.OFF,
  hasSimulationStarted: false,
  isPedestrianRequestPending: false,
  isPedestrianGreenPhaseActive: false,
};

const TrafficLightContext = createContext<TrafficLightState>(initialState);
const TrafficLightDispatchContext = createContext<Dispatch<any>>(noOp);

/*
  Wrap the app inside two contexts to provide access to the state and dispatch actions
  from all nested components, avoiding prop drilling.
*/
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

/*
  Use a reducer function to leverage the flux pattern to to reduce the complexity
  and keep all logic in one easy-to-access place.
 */
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

    case "START_PEDESTRIAN_GREEN_PHASE":
      return {
        ...state,
        isPedestrianGreenPhaseActive: true,
        isPedestrianRequestPending: false,
      };

    case "STOP_PEDESTRIAN_GREEN_PHASE":
      return { ...state, isPedestrianGreenPhaseActive: false };

    default:
      return state;
  }
};

/*
 Action creators for dispatching actions from components.
*/
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

  startPedestrianGreenPhase: () => ({ type: "START_PEDESTRIAN_GREEN_PHASE" }),

  stopPedestrianPhase: () => ({ type: "STOP_PEDESTRIAN_GREEN_PHASE" }),
};
