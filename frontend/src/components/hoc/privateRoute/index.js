import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import { setJWT } from '../../../utils/axios';

const PrivateRoute = (props) => {
  const { component: MyComponent, ...rest } = props;

  if(props.authState.logged) {
    setJWT(props.authState.jwt);
  }
  else {
    <Redirect to={{pathname: "/login"}} />
  }

  return (
    <Route 
      {...rest}
      render={
        ((props2) => {
          return (props.authState.logged) ? (<MyComponent {...props} {...props2} />) : (<Redirect to={{ pathname: "/login"}} />)
        })
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    authState: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);