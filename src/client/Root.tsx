import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { ThemeProvider } from 'styled-components';
import { skyBlue } from '../shared/theme';

type RootProps = {
  route: {
    routes: RouteConfig[];
  };
};

const Root: React.FunctionComponent<RootProps> = props => (
  <ThemeProvider theme={skyBlue}>
    <main>{renderRoutes(props.route.routes)}</main>
  </ThemeProvider>
);

export default Root;
