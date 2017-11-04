export const typeDef = `
type Skill {
	# The skill id.
	id: ID!

	# The skill name.
	name: String!

	# The skill description.
	description: String

	# A URL to an icon of the skill.
	icon: String!

	# The chat link.
	chat_link: String!

	# The skill type (see below). Possible values:
	# Bundle - Used for Engineer kits or weapons picked up in-world.
	# Elite - Elite skill.
	# Heal - Heal skill.
	# Profession - Profession-specific skill, such as Elementalist attunements or Engineer toolbelt skills.
	# Utility - Utility skill.
	# Weapon - Weapon skill or downed skill.
	type: String

	# Indicates what weapon the skill is on. Can also be None if not applicable.
	weapon_type: String!

	# An array of strings indicating which profession(s) can use this skill.
	professions: [String]!

	# A string indicating where this skill fits into. Possible values:
	# Downed_[1-4] - Downed skills 1-4.
	# Pet - Used for Ranger pet skills.
	# Profession_[1-5] - Profession skills 1-5.
	# Utility - Utility skill.
	# Weapon_[1-5] - Weapon skills 1-5.
	slot: String!

	# An array of skill fact objects describing the skill's effect. (See below.)
	# facts: [Fact!]

	# An array of skill fact objects that may apply to the skill, dependent on the player's trait choices.
	# traited_facts: [Fact!]

	# An array of categories the skill falls under. Mostly used for organizational purposes, with some exceptions:
	# DualWield - Indicates the skill is a dual-wield skill for thieves. The necessary off-hand weapon is indicated in dual_wield.
	# StealthAttack - Indicates the skill can only be used by a thief in stealth.
	# All other values of this field simply indicate which group of skills it belongs to. (i.e. Signet, Cantrip, etc.)
	categories: [String!]

	# Used for Elementalist weapon skills, indicates what attunement this skill falls under. One of: Fire, Water, Air, Earth.
	attunement: String

	# Used for Revenant, Warrior, and Druid skills to indicate their energy cost.
	cost: Int

	# Indicates what off-hand must be equipped for this dual-wield skill to appear.
	dual_wield: String

	# Used for skills that "flip over" into a new skill in the same slot to indicate what skill they flip to, such as Engineer toolkits or Herald facets.
	flip_skill: Skill

	# Indicates the Initiative cost for thief skills.
	initiative: Int

	# Indicates the next skill in the chain, if applicable.
	next_chain: Skill

	# Indicates the previous skill in the chain, if applicable.
	prev_chain: Skill

	# Used to indicate that the skill will transform the player, replacing their skills with the skills listed in the array.
	transform_skills: [Skill!]

	# Used to indicate that the skill will replace the player's skills with the skills listed in the array.
	bundle_skills: [Skill!]

	# Used for Engineer utility skills to indicate their associated toolbelt skill.
	toolbelt_skill: Skill
}

# Root Query
type Query {
  skill(skillId: ID!): Skill
  skills(skillIds: [ID!]): [Skill!]!
}
`;

export const resolver = {
	Skill: {
		flip_skill: (root, args, ctx) => root.flip_skill && ctx.skillsLoader.load(root.flip_skill),
		next_chain: (root, args, ctx) => root.next_chain && ctx.skillsLoader.load(root.next_chain),
		prev_chain: (root, args, ctx) => root.prev_chain && ctx.skillsLoader.load(root.prev_chain),
		toolbelt_skill: (root, args, ctx) => root.toolbelt_skill && ctx.skillsLoader.load(root.toolbelt_skill),
		bundle_skills: (root, args, ctx) => root.bundle_skills && ctx.skillsLoader.loadMany(root.bundle_skills),
		transform_skills: (root, args, ctx) => root.transform_skills && ctx.skillsLoader.loadMany(root.transform_skills),
	},
  Query: {
    skill: (root, args, ctx) => ctx.skillsLoader.load(args.skillId),
    skills: (root, args, ctx) => ctx.skillsLoader.loadMany(args.skillIds),
  },
};

