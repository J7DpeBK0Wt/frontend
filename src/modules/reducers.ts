/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import statsReducer from './stats/reducers';

const rootReducer = combineReducers({
    stats: statsReducer,
});

export default rootReducer;
