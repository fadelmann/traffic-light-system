import { useCallback } from "react";
import { actions, useTrafficLightDispatch } from "./trafficLightContext";
import {
  DELAY_BEFORE_GREEN_SIDE,
  DELAY_BEFORE_YELLOW_MAIN,
  DELAY_BEFORE_YELLOW_RED_MAIN,
  DELAY_BEFORE_YELLOW_RED_SIDE,
  DELAY_BEFORE_YELLOW_SIDE,
  DELAY_GREEN_SIDE,
} from "./constants";
import { Streets, TrafficLightColors } from "./types";
import { delay } from "./helpers";

export const useRunPedestrianGreenPhase = () => {
  const dispatch = useTrafficLightDispatch();

  return useCallback(async () => {
    dispatch(actions.removePedestrianFromQueue());

    dispatch(actions.startPedestrianPhaseRunning());

    await delay(DELAY_BEFORE_YELLOW_MAIN);

    dispatch(
      actions.changeTrafficLightColor(Streets.MAIN, TrafficLightColors.YELLOW)
    );

    await delay(DELAY_BEFORE_YELLOW_RED_SIDE);

    dispatch(
      actions.changeTrafficLightColor(Streets.MAIN, TrafficLightColors.RED)
    );

    await delay(DELAY_BEFORE_GREEN_SIDE);

    dispatch(actions.pedestrianGoesGreen());

    await delay(5000);

    dispatch(actions.pedestrianGoesRed());

    await delay(DELAY_BEFORE_YELLOW_SIDE);

    dispatch(
      actions.changeTrafficLightColor(
        Streets.MAIN,
        TrafficLightColors.YELLOW_AND_RED
      )
    );

    await delay(DELAY_BEFORE_YELLOW_RED_MAIN);

    dispatch(
      actions.changeTrafficLightColor(Streets.MAIN, TrafficLightColors.GREEN)
    );

    dispatch(actions.stopPedestrianPhaseRunning());
  }, [dispatch]);
};

export const useRunSideStreetGreenPhase = () => {
  const dispatch = useTrafficLightDispatch();

  return useCallback(async () => {
    await delay(DELAY_BEFORE_YELLOW_MAIN);

    dispatch(
      actions.changeTrafficLightColor(Streets.MAIN, TrafficLightColors.YELLOW)
    );

    await delay(DELAY_BEFORE_YELLOW_RED_SIDE);

    dispatch(
      actions.changeTrafficLightColor(
        Streets.SIDE,
        TrafficLightColors.YELLOW_AND_RED
      )
    );
    dispatch(
      actions.changeTrafficLightColor(Streets.MAIN, TrafficLightColors.RED)
    );

    await delay(DELAY_BEFORE_GREEN_SIDE);

    dispatch(
      actions.changeTrafficLightColor(Streets.SIDE, TrafficLightColors.GREEN)
    );

    await delay(DELAY_GREEN_SIDE);

    dispatch(
      actions.changeTrafficLightColor(Streets.SIDE, TrafficLightColors.YELLOW)
    );

    await delay(DELAY_BEFORE_YELLOW_SIDE);

    dispatch(
      actions.changeTrafficLightColor(
        Streets.MAIN,
        TrafficLightColors.YELLOW_AND_RED
      )
    );
    dispatch(
      actions.changeTrafficLightColor(Streets.SIDE, TrafficLightColors.RED)
    );

    await delay(DELAY_BEFORE_YELLOW_RED_MAIN);

    dispatch(
      actions.changeTrafficLightColor(Streets.MAIN, TrafficLightColors.GREEN)
    );
  }, [dispatch]);
};
