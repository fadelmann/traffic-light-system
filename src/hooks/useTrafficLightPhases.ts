import { useCallback } from "react";
import {
  useTrafficLightDispatch,
  actions,
} from "../contexts/trafficLightContext";
import { delay } from "../utils/helpers";
import {
  PedestrianTrafficLightColors,
  Streets,
  TrafficLightColors,
} from "../utils/types";
import {
  DELAY_BEFORE_GREEN_SIDE,
  DELAY_BEFORE_YELLOW_MAIN,
  DELAY_BEFORE_YELLOW_RED_MAIN,
  DELAY_BEFORE_YELLOW_RED_SIDE,
  DELAY_GREEN_SIDE,
} from "../utils/constants";

export const useRunPedestrianGreenPhase = () => {
  const dispatch = useTrafficLightDispatch();

  return useCallback(async () => {
    dispatch(actions.clearPedestrianRequest());
    dispatch(actions.setPedestrianPhaseActive());

    await delay(DELAY_BEFORE_YELLOW_MAIN);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.YELLOW)
    );

    await delay(DELAY_BEFORE_YELLOW_RED_SIDE);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.RED)
    );

    await delay(DELAY_BEFORE_GREEN_SIDE);

    dispatch(actions.setPedestrianColor(PedestrianTrafficLightColors.GREEN));

    await delay(5000);

    dispatch(actions.setPedestrianColor(PedestrianTrafficLightColors.RED));

    await delay(DELAY_BEFORE_YELLOW_RED_SIDE);

    dispatch(
      actions.setTrafficLightColor(
        Streets.MAIN,
        TrafficLightColors.YELLOW_AND_RED
      )
    );

    await delay(DELAY_BEFORE_YELLOW_MAIN);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.GREEN)
    );

    dispatch(actions.setPedestrianPhaseInactive());
  }, [dispatch]);
};

export const useRunSideStreetGreenPhase = () => {
  const dispatch = useTrafficLightDispatch();

  return useCallback(async () => {
    await delay(DELAY_BEFORE_YELLOW_MAIN);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.YELLOW)
    );

    await delay(DELAY_BEFORE_YELLOW_RED_SIDE);

    dispatch(
      actions.setTrafficLightColor(
        Streets.SIDE,
        TrafficLightColors.YELLOW_AND_RED
      )
    );
    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.RED)
    );

    await delay(DELAY_BEFORE_GREEN_SIDE);

    dispatch(
      actions.setTrafficLightColor(Streets.SIDE, TrafficLightColors.GREEN)
    );

    await delay(DELAY_GREEN_SIDE);

    dispatch(
      actions.setTrafficLightColor(Streets.SIDE, TrafficLightColors.YELLOW)
    );

    await delay(DELAY_BEFORE_YELLOW_RED_SIDE);

    dispatch(
      actions.setTrafficLightColor(
        Streets.MAIN,
        TrafficLightColors.YELLOW_AND_RED
      )
    );
    dispatch(
      actions.setTrafficLightColor(Streets.SIDE, TrafficLightColors.RED)
    );

    await delay(DELAY_BEFORE_YELLOW_RED_MAIN);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.GREEN)
    );
  }, [dispatch]);
};
