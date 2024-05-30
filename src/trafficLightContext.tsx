import React, { createContext, useReducer, useContext } from "react";

import { actionTypes } from "./constants";
import {
  DispatchType,
  PedestrianTrafficLightColors,
  Streets,
  TrafficLightColors,
  TrafficLightState,
} from "./types";
import { noOp } from "./helpers";

const initialState: TrafficLightState = {
  mainStreetTrafficLightColor: TrafficLightColors.GREY,
  sideStreetTrafficLightColor: TrafficLightColors.GREY,
  pedestrianTrafficLightColor: PedestrianTrafficLightColors.GREY,
  isSystemActive: false,
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

const trafficLightReducer = (state, action): TrafficLightState => {
  switch (action.type) {
    case actionTypes.START_SYSTEM:
      return {
        ...state,
        mainStreetTrafficLightColor: TrafficLightColors.GREEN,
        sideStreetTrafficLightColor: TrafficLightColors.RED,
        pedestrianTrafficLightColor: PedestrianTrafficLightColors.RED,
        isSystemActive: true,
      };

    case actionTypes.SET_TRAFFIC_LIGHT_COLOR:
      return action.street === Streets.MAIN
        ? { ...state, mainStreetTrafficLightColor: action.trafficLightColor }
        : { ...state, sideStreetTrafficLightColor: action.trafficLightColor };

    case actionTypes.PEDESTRIAN_REQUEST_GREEN:
      return { ...state, isPedestrianInQueue: true };

    case actionTypes.REMOVE_PEDESTRIAN_FROM_QUEUE:
      return { ...state, isPedestrianInQueue: false };

    case actionTypes.SET_PEDESTRIAN_LIGHT_RED:
      return {
        ...state,
        pedestrianTrafficLightColor: PedestrianTrafficLightColors.RED,
      };

    case actionTypes.SET_PEDESTRIAN_LIGHT_GREEN:
      return {
        ...state,
        pedestrianTrafficLightColor: PedestrianTrafficLightColors.GREEN,
      };

    case actionTypes.SET_PEDESTRIAN_PHASE_ACTIVE:
      return { ...state, isPedestrianPhaseActive: true };

    case actionTypes.SET_PEDESTRIAN_PHASE_INACTIVE:
      return { ...state, isPedestrianPhaseActive: false };

    default:
      return state;
  }
};

export const actions = {
  startSystem: () => ({ type: actionTypes.START_SYSTEM }),

  changeTrafficLightColor: (
    street: Streets,
    trafficLightColor: TrafficLightColors
  ) => ({
    type: actionTypes.SET_TRAFFIC_LIGHT_COLOR,
    street,
    trafficLightColor,
  }),

  stopPedestrianPhaseRunning: () => ({
    type: actionTypes.SET_PEDESTRIAN_PHASE_INACTIVE,
  }),

  startPedestrianPhaseRunning: () => ({
    type: actionTypes.SET_PEDESTRIAN_PHASE_ACTIVE,
  }),

  removePedestrianFromQueue: () => ({
    type: actionTypes.REMOVE_PEDESTRIAN_FROM_QUEUE,
  }),

  handlePedestrianClick: () => ({ type: actionTypes.PEDESTRIAN_REQUEST_GREEN }),

  pedestrianGoesRed: () => ({ type: actionTypes.SET_PEDESTRIAN_LIGHT_RED }),

  pedestrianGoesGreen: () => ({ type: actionTypes.SET_PEDESTRIAN_LIGHT_GREEN }),
};
