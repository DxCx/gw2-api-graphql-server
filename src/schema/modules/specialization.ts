export const typeDef = `
type Specialization {
  # The specialization's ID.
  id: ID!

  # The name of the specialization.
  name: String!

  # The profession that this specialization belongs to.
  profession: String!

  # true if this specialization is an Elite specialization, false otherwise.
  elite: Boolean!

  # A URL to an icon of the specialization.
  icon: String!

  # A URL to the background image of the specialization.
  background: String!

  # Contains a list of IDs specifying the minor traits in the specialization.
  minor_traits: [Trait!]!

  # Contains a list of IDs specifying the major traits in the specialization.
  major_traits: [Trait!]!
}

# Root Query
type Query {
  specialization(specId: ID!): Specialization
  specializations(specIds: [ID!]): [Specialization!]!
}
`;

export const resolver = {
  Specialization: {
    minor_traits: (root, args, ctx) => ctx.traitsLoader.load(root.minor_traits),
    major_traits: (root, args, ctx) => ctx.traitsLoader.load(root.major_traits),
  },
  Query: {
    specialization: (root, args, ctx) => ctx.specializationsLoader.load(args.specId),
    specializations: (root, args, ctx) => ctx.specializationsLoader.loadMany(args.specIds),
  },
};



