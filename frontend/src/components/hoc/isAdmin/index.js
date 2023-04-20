import { useHistory } from 'react-router-dom';

import { BASIC } from '../../../utils/roles';

const isAdmin = (WrappedComponent) => props => {

    const role = props.authState.role;

    const history = useHistory();

    if(role === BASIC) {
      history.replace('/');
    } 

    return (
      <WrappedComponent {...props} />
    );
};

export default isAdmin;