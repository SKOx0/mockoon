import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environmentReducer, ReducerActionType } from 'src/app/stores/environments.reducer';
import { EnvironmentsType, EnvironmentType } from 'src/app/types/environment.type';
import { RouteType } from 'src/app/types/route.type';

export type EnvironmentsStoreType = { activeEnvironmentUUID: string, activeRouteUUID: string, state: EnvironmentsType };

@Injectable({ providedIn: 'root' })
export class EnvironmentsStore {
  private store$ = new BehaviorSubject<EnvironmentsStoreType>({
    activeEnvironmentUUID: null,
    activeRouteUUID: null,
    state: []
  });

  constructor() { }

  /**
   * Set the store initial state and set an active environment
   */
  public setInitialState(environments: EnvironmentsType) {
    this.store$.next({ ...this.store$.value, state: environments });
    this.update({ type: 'SET_ACTIVE_ENVIRONMENT' });
  }

  /**
   * Select all environments observable
   */
  public selectEnvironments(): Observable<EnvironmentsStoreType> {
    return this.store$.asObservable();
  }

  /**
   * Get active environments
   */
  public getActiveEnvironments(): EnvironmentsStoreType {
    return this.store$.value;
  }

  /**
   * Select active environment observable
   */
  public selectActiveEnvironment(): Observable<EnvironmentType> {
    return this.store$.asObservable().pipe(
      map(environmentsStore => environmentsStore.state.find(environment => environment.uuid === this.store$.value.activeEnvironmentUUID))
    );
  }

  /**
   * Get active environment value
   */
  public getActiveEnvironment(): EnvironmentType {
    return this.store$.value.state.find(environment => environment.uuid === this.store$.value.activeEnvironmentUUID);
  }

  /**
   * Get active environment UUID
   */
  public getActiveEnvironmentUUID(): string {
    return this.store$.value.activeEnvironmentUUID;
  }

  /**
   * Select active route observable
   */
  public selectActiveRoute(): Observable<RouteType> {
    return this.store$.asObservable().pipe(
      map(environmentsStore => environmentsStore.state.find(environment => environment.uuid === this.store$.value.activeEnvironmentUUID)),
      map(environment => environment ? environment.routes.find(route => route.uuid === this.store$.value.activeRouteUUID) : null)
    );
  }

  /**
   * Get active route observable
   */
  public getActiveRoute(): RouteType {
    return this.store$.value.state
      .find(environment => environment.uuid === this.store$.value.activeEnvironmentUUID).routes
      .find(route => route.uuid === this.store$.value.activeRouteUUID);
  }

  /**
   * Get active route UUID
   */
  public getActiveRouteUUID(): string {
    return this.store$.value.activeRouteUUID;
  }

  /**
   * Update the store using the reducer
   */
  public update(action: ReducerActionType) {
    this.store$.next(environmentReducer(this.store$.value, action));
  }
}
