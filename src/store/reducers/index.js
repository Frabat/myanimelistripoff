import { combineReducers } from '@reduxjs/toolkit';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers = {}) {
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    return combineReducers({
      ...injectedReducers,
    });
  }
}