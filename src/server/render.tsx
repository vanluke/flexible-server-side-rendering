import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import * as express from 'express';
import {
  ThemeProvider,
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components';
import { renderToString } from 'react-dom/server';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { renderRoutes } from 'react-router-config';
import routes from '../client/routes';
import { skyBlue } from '../shared/theme';

const getClientStats = (
  prod: boolean,
  res: express.Response,
  assets?: Stats
) => {
  if (!prod) {
    return res.locals.webpackStats
      .toJson()
      .children.find((st: { name: string }) => st.name === 'client')
      .assetsByChunkName;
  }
  return assets ? assets.assetsByChunkName : {};
};

const renderApp = (prod: boolean) => (
  req: express.Request,
  res: express.Response,
  assets?: Stats
) => {
  const stats = getClientStats(prod, res, assets);
  const context = {};
  const { content } = render({ req, context });

  const scripts = Object.values(stats)
    .sort((a: string, b: string) => {
      if (a.indexOf('main') >= 0 || b.indexOf('main') >= 0) {
        return -1;
      }
      return 1;
    })
    .map((stat: string | Array<string>) => {
      if (Array.isArray(stat)) {
        return {
          css: stat.find((x: string) => x.indexOf('.css') >= 0),
          js: stat.find((x: string) => x.indexOf('.js') >= 0),
        };
      }
      return {
        js: stat,
      };
    });

  const styles = '';

  return res.render('index', {
    title: process.env.APP_TITLE,
    data: {},
    content,
    styles,
    stylesheets: scripts.map(item => item.css).filter(item => item),
    src: scripts.map(item => item.js).filter(item => item),
  });
};

type Stats = {
  assetsByChunkName: {
    [key: string]: Array<string> | string;
  };
};

const renderPage = (req: express.Request, res: express.Response) => {
  const assets = JSON.parse(
    fs.readFileSync(path.resolve('dist/stats.json'), 'utf-8')
  ) as Stats;

  renderApp(true)(req, res, assets);
};

type Render = {
  req: express.Request;
  context?: StaticRouterContext;
};

const render = ({ req, context }: Render) => {
  const sheet = new ServerStyleSheet();
  return {
    content: renderToString(
      <StyleSheetManager sheet={sheet.instance}>
        <ThemeProvider theme={skyBlue}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </ThemeProvider>
      </StyleSheetManager>
    ),
  };
};

export default (prod: boolean) => {
  if (prod) {
    return renderPage;
  }
  return renderApp(false);
};
