import { Fragment } from 'react';

import Header from '../../commons/Header/index';

const withLayout = (WrappedComponent) => props => {
    return (
        <Fragment>
            <Header role={props.authState.role} />
            <WrappedComponent {...props} />
        </Fragment>
    );
};

export default withLayout;