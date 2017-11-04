export const typeDef = `
type Trait {
# The trait id.
  id: ID!

  # The trait name.
  name: String!

  # The trait's icon URL.
  icon: String!

  # The trait description.
  description: String!

  # The id of the specialization this trait belongs to.
  specialization: Specialization

  # The trait's tier (Adept, Master, Grandmaster) as a value from 1-3. Elite specializations also contain a tier 0 minor trait, describing which weapon the elite specialization gains access to.
  tier: Int!

  # Either Major or Minor depending on the trait's slot. Minor traits are the ones given immediately when choosing a specialization.
  slot: String!

  # A list of tooltip facts associated with the trait itself.
  facts: [Fact!]

  # A list of additions or changes to tooltip facts where there is interplay between traits. (See below.)
  traited_facts: [Fact!]

  # A list of skills which may be triggered by the trait.
  skills: [BaseSkill!]
}

# Root Query
type Query {
  trait(traitId: ID!): Trait
  traits(traitIds: [ID!]): [Trait!]!
}
`;

export const resolver = {
  Trait: {
    specialization: (root, args, ctx) => ctx.specializationsLoader.load(root.specialization),
    skills: (root, args, ctx) => root.skills && ctx.skillsLoader.load(root.skills),
  },
  Query: {
    trait: (root, args, ctx) => ctx.traitsLoader.load(args.traitId),
    traits: (root, args, ctx) => ctx.traitsLoader.loadMany(args.traitIds),
  },
};


