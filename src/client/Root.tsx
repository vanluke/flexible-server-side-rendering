import * as React from 'react';
import { renderRoutes, RouteConfig } from 'react-router-config';

type RootProps = {
  route: {
    routes: RouteConfig[];
  };
};

const Root: React.FunctionComponent<RootProps> = props => (
  <main>{renderRoutes(props.route.routes)}</main>
);

export default Root;
