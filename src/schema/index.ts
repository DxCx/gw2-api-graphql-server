import {GraphQLSchema} from 'graphql';
import {makeExecutableSchema} from 'graphql-schema-tools';

/* tslint:disable:no-var-requires */
const modules = [
  require("./modules/item"),
];

const resolvers = modules.map((m) => m.resolver).filter((res) => !!res);
const typeDefs = modules.map((m) => m.typeDef).filter((res) => !!res);

const Schema: GraphQLSchema = makeExecutableSchema({
  resolvers: resolvers,
  typeDefs: typeDefs,
});

export {Schema};

export const defaultQuery = `query {
 items(itemIds: [43772, 12452, 67457]) {
    id
    name
    level
    type
    flags
    rarity
    game_types
    vendor_value
    details {
      ... on ItemConsumableDetails {
        name
        description
        color_id
      }
      ... on ItemArmorDetails {
        type
        defense
        infix_upgrade {
          attributes {
            modifier
            attribute
          }
          buff {
            skill_id
            description
          }
        }
        infusion_slots {
          item_id
        }
      }
    }
  }
}`;
