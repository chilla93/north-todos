import React from 'react';
import {Home, Details} from './pages';
import { Switch, Route, Redirect, BrowserRouter, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { Box } from '@material-ui/core';

 
function Routes() {
  const location = useLocation();

  const transitions = useTransition(location, (location) => {
    // console.log(location);
    return location.pathname
  }, {
    from: { opacity: 0, position: "absolute", width: "100%", transform: 'translate3d(10vw, 0, 0)' },
    enter: { opacity: 1, position: "absolute", width: "100%", transform: 'translate3d(0, 0, 0)'},
    leave: { opacity: 0, position: "absolute", width: "100%", transform: 'translate3d(-5vw, 0, 0)' },
    // config: {
    //   duration: 100
    // }
  });
  
  return (
    <>
      {
        transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route exact={true} path={"/"} component={Home} />
              <Route path={"/details/:id"} component={Details} />
              <Route path="/not-found" render={() => <div>Not Found</div>} />;
              {/* <Redirect from="/" to="/home" exact={true} /> */}
              <Redirect to="/not-found" />
            </Switch>
          </animated.div>
        ))
      }
    </>
  );
}

export default Routes;
