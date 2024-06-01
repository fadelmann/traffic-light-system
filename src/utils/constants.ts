export const DELAY_BEFORE_YELLOW_MAIN_MS = 5000;
export const DELAY_BEFORE_YELLOW_RED_SIDE_MS = 1000;
export const DELAY_BEFORE_GREEN_SIDE_MS = 2000;
export const DELAY_GREEN_SIDE_MS = 5000;
export const DELAY_BEFORE_YELLOW_SIDE_MS = 1000;
export const DELAY_BEFORE_YELLOW_RED_MAIN_MS = 2000;

export const TOTAL_TRAFFIC_LIGHT_DURATION_MS =
  DELAY_BEFORE_YELLOW_MAIN_MS +
  DELAY_BEFORE_YELLOW_RED_SIDE_MS +
  DELAY_BEFORE_GREEN_SIDE_MS +
  DELAY_GREEN_SIDE_MS +
  DELAY_BEFORE_YELLOW_SIDE_MS +
  DELAY_BEFORE_YELLOW_RED_MAIN_MS;