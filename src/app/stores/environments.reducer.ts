import { EnvironmentsStoreType } from 'src/app/stores/environments.store';

export type ReducerActionType = { type: 'SET_ACTIVE_ENVIRONMENT' | 'ADD_ENVIRONMENT' | 'REMOVE_ENVIRONMENT' | 'SET_ACTIVE_ROUTE' | 'ADD_ROUTE', uuid?: string, item?: any };

export function environmentReducer(
  environmentsState: EnvironmentsStoreType,
  action: ReducerActionType
): EnvironmentsStoreType {
  switch (action.type) {
    case 'SET_ACTIVE_ENVIRONMENT':
      const activeEnvironment = action.uuid ? environmentsState.state.find(environment => environment.uuid === action.uuid) : environmentsState.state[0];
      return {
        ...environmentsState,
        activeEnvironmentUUID: action.uuid ? action.uuid : activeEnvironment.uuid,
        activeRouteUUID: (activeEnvironment.routes.length) ? activeEnvironment.routes[0].uuid : null,
        state: environmentsState.state
      };

    case 'SET_ACTIVE_ROUTE':
      return {
        ...environmentsState,
        activeRouteUUID: action.uuid,
        state: environmentsState.state
      };

    case 'ADD_ENVIRONMENT':
      return {
        ...environmentsState,
        activeEnvironmentUUID: action.item.uuid,
        activeRouteUUID: action.item.routes[0].uuid,
        state: [
          ...environmentsState.state,
          action.item
        ]
      };

    case 'REMOVE_ENVIRONMENT':
      const newState = environmentsState.state.filter(environment => environment.uuid !== action.uuid);

      if (environmentsState.activeEnvironmentUUID === action.uuid) {
        if (newState.length) {
          return {
            ...environmentsState,
            activeEnvironmentUUID: newState[0].uuid,
            activeRouteUUID: (newState[0].routes.length) ? newState[0].routes[0].uuid : null,
            state: newState
          };
        } else {
          return {
            ...environmentsState,
            activeEnvironmentUUID: null,
            activeRouteUUID: null,
            state: newState
          };
        }
      } else {
        return {
          ...environmentsState,
          state: newState
        };
      }

    case 'ADD_ROUTE':
      return {
        ...environmentsState,
        activeRouteUUID: action.item.uuid,
        state: environmentsState.state.map(environment => {
          if (environment.uuid === environmentsState.activeEnvironmentUUID) {
            return {
              ...environment,
              routes: [...environment.routes, action.item]
            };
          }
          return environment;
        })
      };

    default:
      return environmentsState;
  }
}
