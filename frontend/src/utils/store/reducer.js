import { combineReducers } from 'redux';

import authReducer from './reducers/auth';
import brandsReducer from './reducers/brands';
import yearsReducer from './reducers/years';
import modelsReducer from './reducers/models';
import enginesReducer from './reducers/engine';
import componentsReducer from './reducers/components';
import partReducer from './reducers/part';

const reducer = combineReducers({
    brands: brandsReducer,
    years: yearsReducer,
    models: modelsReducer,
    engines: enginesReducer,
    components: componentsReducer,
    auth: authReducer,
    part: partReducer,
});

export default reducer;