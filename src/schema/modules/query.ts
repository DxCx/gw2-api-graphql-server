export const typeDef = `
# Root Query
type Query {
    testString: String
}
`;

export const resolver = {
  Query: {
    testString() {
      return "it Works!";
    },
  },
};
