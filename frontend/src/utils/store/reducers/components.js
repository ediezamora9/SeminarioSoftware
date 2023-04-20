export const STORE_COMPONENTS = 'STORE_COMPONENTS';

const initialState = {
    components: [],
    route: {
      brand:"",
      year:"",
      model:"",
      engine:""
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case STORE_COMPONENTS:
            return {
                ...initialState,
                components: action.payload.components,
                route: {
                  ...initialState.route,
                  brand:action.payload.brand,
                  year:action.payload.year,
                  model:action.payload.model,
                  engine:action.payload.engine
                }
            }
        default:
            break;
    }
    return state;
};

export default reducer; 