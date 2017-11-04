import * as express from 'express';
import * as bodyParser from 'body-parser';
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express';
import {Schema, defaultQuery} from './schema';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

import * as DataLoader from 'dataloader';
import { default as gw2client } from 'gw2api-client';

// Default port or given one.
export const GRAPHQL_ROUTE = "/graphql";
export const GRAPHIQL_ROUTE = "/graphiql";

interface IMainOptions {
  enableCors: boolean;
  enableGraphiql: boolean;
  env: string;
  port: number;
  verbose?: boolean;
}

/* istanbul ignore next: no need to test verbose print */
function verbosePrint(port, enableGraphiql) {
  console.log(`GraphQL Server is now running on http://localhost:${port}${GRAPHQL_ROUTE}`);
  if (true === enableGraphiql) {
    console.log(`GraphiQL Server is now running on http://localhost:${port}${GRAPHIQL_ROUTE}`);
  }
}

const api = gw2client();
const itemsLoader = new DataLoader((itemIds) => {
  return api.items().many(itemIds)
  .then((items) => items.map((item) => {
    if ( !item.details ) {
      return item;
    }

    return {
      ...item,
      details: {
        root_type: item.type,
        ...item.details,
      },
    };
  }));
});

export function main(options: IMainOptions) {
  let app = express();

  app.use(helmet());

  app.use(morgan(options.env));

  if (true === options.enableCors) {
    app.use(GRAPHQL_ROUTE, cors());
  }

  app.use(GRAPHQL_ROUTE, bodyParser.json(), graphqlExpress({
    context: {
      itemsLoader,
    },
    schema: Schema,
  }));

  if (true === options.enableGraphiql) {
    app.use(GRAPHIQL_ROUTE, graphiqlExpress({
      endpointURL: GRAPHQL_ROUTE,
      query: defaultQuery,
    }));
  }

  return new Promise((resolve, reject) => {
    let server = app.listen(options.port, () => {
      /* istanbul ignore if: no need to test verbose print */
      if (options.verbose) {
        verbosePrint(options.port, options.enableGraphiql);
      }

      resolve(server);
    }).on("error", (err: Error) => {
      reject(err);
    });
  });
}

/* istanbul ignore if: main scope */
if (require.main === module) {
  const PORT = parseInt(process.env.PORT || '3000', 10);

  // Either to export GraphiQL (Debug Interface) or not.
  const NODE_ENV = process.env.NODE_ENV !== "production" ? "dev" : "production";

  const EXPORT_GRAPHIQL = NODE_ENV !== "production";

  // Enable cors (cross-origin HTTP request) or not.
  const ENABLE_CORS = NODE_ENV !== "production";

  main({
    enableCors: ENABLE_CORS,
    enableGraphiql: EXPORT_GRAPHIQL,
    env: NODE_ENV,
    port: PORT,
    verbose: true,
  });
}
