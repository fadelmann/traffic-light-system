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
  PEDESTRIAN_GREEN_PHASE,
  TRAFFIC_GREEN_PHASE,
  TRAFFIC_YELLOW_AND_RED_PHASE,
  TRAFFIC_YELLOW_PHASE,
  TRANSITION_PERIOD,
} from "../utils/constants";

/*
  Created two hooks to run both existing greenphases in the application
  in order to abstract away the details of how the phases actually run from our component that define the UI
  and also make it possible to call the functions from every component in the entire app.
*/
export const useRunPedestrianGreenPhase = () => {
  const dispatch = useTrafficLightDispatch();

  return useCallback(async () => {
    dispatch(actions.startPedestrianGreenPhase());

    await delay(TRAFFIC_GREEN_PHASE);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.YELLOW)
    );

    await delay(TRAFFIC_YELLOW_PHASE);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.RED)
    );

    await delay(TRANSITION_PERIOD);

    dispatch(actions.setPedestrianColor(PedestrianTrafficLightColors.GREEN));

    await delay(PEDESTRIAN_GREEN_PHASE);

    dispatch(actions.setPedestrianColor(PedestrianTrafficLightColors.RED));

    await delay(TRANSITION_PERIOD);

    dispatch(
      actions.setTrafficLightColor(
        Streets.MAIN,
        TrafficLightColors.YELLOW_AND_RED
      )
    );

    await delay(TRAFFIC_YELLOW_AND_RED_PHASE);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.GREEN)
    );

    dispatch(actions.stopPedestrianPhase());
  }, [dispatch]);
};

export const useRunSideStreetGreenPhase = () => {
  const dispatch = useTrafficLightDispatch();

  return useCallback(async () => {
    await delay(TRAFFIC_GREEN_PHASE);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.YELLOW)
    );

    await delay(TRAFFIC_YELLOW_PHASE);

    dispatch(
      actions.setTrafficLightColor(
        Streets.SIDE,
        TrafficLightColors.YELLOW_AND_RED
      )
    );
    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.RED)
    );

    await delay(TRAFFIC_YELLOW_AND_RED_PHASE);

    dispatch(
      actions.setTrafficLightColor(Streets.SIDE, TrafficLightColors.GREEN)
    );

    await delay(TRAFFIC_GREEN_PHASE);

    dispatch(
      actions.setTrafficLightColor(Streets.SIDE, TrafficLightColors.YELLOW)
    );

    await delay(TRAFFIC_YELLOW_PHASE);

    dispatch(
      actions.setTrafficLightColor(
        Streets.MAIN,
        TrafficLightColors.YELLOW_AND_RED
      )
    );
    dispatch(
      actions.setTrafficLightColor(Streets.SIDE, TrafficLightColors.RED)
    );

    await delay(TRAFFIC_YELLOW_AND_RED_PHASE);

    dispatch(
      actions.setTrafficLightColor(Streets.MAIN, TrafficLightColors.GREEN)
    );
  }, [dispatch]);
};
