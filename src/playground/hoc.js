import React from 'react';
import ReactDOM from 'react-dom';

//reuse code, render hijacking, props manipulation, abstract state

const Info = () => {
    <div>
        <h1>Info></h1>
        <p>The info is on screen</p>
    </div>
};

const withAdminWarning = (WrappedComponent) => {
    return(props) => (
        <div>
            {props.isAdmin && <p> This is private info. Please don't share</p>}
            <WrappedComponent {...props}/>
        </div>
    )
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <WrappedComponent {...props} />
            ) : (
                <p>Please login to view info</p>
            )}
        </div>
    )
}

const AdminInfo= withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={false} info="this is the details" />, document.getElementById('app'));