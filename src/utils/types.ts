export enum Streets {
  MAIN = "main",
  SIDE = "side",
}

//Type of the reducer state
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
  OFF = "off",
}

export enum PedestrianTrafficLightColors {
  GREEN = "green",
  RED = "red",
  OFF = "off",
}

// Map to convert traffic light colors to the matching hex codes
export const mapTrafficLightColorsToHex = {
  [TrafficLightColors.GREEN]: "#00FF00",
  [TrafficLightColors.YELLOW]: "#FFFF00",
  [TrafficLightColors.RED]: "#FF0000",
  [TrafficLightColors.OFF]: "#222222",
};
