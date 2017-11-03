import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-schema-tools';

/* tslint:disable:no-var-requires */
const modules = [
  require("./modules/query"),
];

const resolvers = modules.map((m) => m.resolver).filter((res) => !!res);
const typeDefs = modules.map((m) => m.typeDef).filter((res) => !!res);

const Schema: GraphQLSchema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export {Schema};
