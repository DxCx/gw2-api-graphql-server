import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-schema-tools';

/* tslint:disable:no-var-requires */
const modules = [
  require("./modules/item"),
  require("./modules/skill"),
  require("./modules/trait"),
  require("./modules/fact"),
  require("./modules/specialization"),
];

const resolvers = modules.map((m) => m.resolver).filter((res) => !!res);
const typeDefs = modules.map((m) => m.typeDef).filter((res) => !!res);

const Schema: GraphQLSchema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export {Schema};

const defaultQuery = require('./defaultQuery.graphql');
export {defaultQuery};
