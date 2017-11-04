const rootTypeToType = {
  AttributeAdjust: 'FactAttributeAdjust',
  Buff: 'FactBuff',
  BuffConversion: 'FactBuffConversion',
  ComboField: 'FactComboField',
  ComboFinisher: 'FactComboFinisher',
  Damage: 'FactDamage',
  Distance: 'FactDistance',
  NoData: 'FactNoData',
  Number: 'FactNumber',
  Percent: 'FactPercent',
  PrefixedBuff: 'FactPrefixedBuff',
  Radius: 'FactRadius',
  Range: 'FactRange',
  Recharge: 'FactRecharge',
  Time: 'FactDuration',
  Unblockable: 'FactUnblockable',
  Duration: 'FactDuration',
  Heal: 'FactHeal',
  HealingAdjust: 'FactHeal',
}

export const typeDef = `
interface Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain, and what type of fact it is. Can be one of the following:
  # AttributeAdjust
  # Buff
  # BuffConversion
  # ComboField
  # ComboFinisher
  # Damage
  # Distance
  # NoData
  # Number
  # Percent
  # PrefixedBuff
  # Radius
  # Range
  # Recharge
  # Time
  # Unblockable
  # Duration
  # Heal
  # HealingAdjust
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override, if the trait specified in requires_trait is selected. If this field is omitted, then the fact contained within this object is to be appended to the existing facts array.
  overrides: Int
}

type FactAttributeAdjust implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The amount target gets adjusted, based on a level 80 character at base stats.
  value: Int!

  # The attribute this fact adjusts. Note that a value of Healing indicates the fact is a heal, and Ferocity is encoded at CritDamage.
  target: String!
}

type FactBuff implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The boon, condition, or effect referred to by the fact.
  status: String!

  # The description of the status effect.
  description: String

  # The number of stacks applied.
  apply_count: Int

  # The duration of the effect in seconds. Note that some facts of this type are just used to display the buff icon with text; in this case, duration is usually 0, or omitted entirely.
  duration: Int
}

type FactBuffConversion implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The attribute that is used to calculate the attribute gain.
  source: String!

  # How much of the source attribute is added to target.
  percent: Int!

  # The attribute that gets added to.
  target: String!
}

type FactComboField implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The type of field. One of: Air, Dark, Fire, Ice, Light, Lightning, Poison, Smoke, Ethereal, Water.
  field_type: String!
}

type FactComboFinisher implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The type of finisher. One of: Blast, Leap, Projectile, Whirl.
  finisher_type: String!

  # The percent chance that the finisher will trigger.
  percent: Int!
}

type FactDamage implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The amount of times the damage hits.
  hit_count: Int!
}

type FactDistance implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The distance value
  distance: Int!
}

type FactNoData implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int
}

type FactNumber implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The number value as referenced by text.
  value: Int!
}

type FactPercent implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The percentage value as referenced by text.
  percent: Int!
}

type PrefixedBuff {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # The boon, condition, or effect referred to by the fact.
  status: String

  # The description of the prefix
  description: String
}

type FactPrefixedBuff implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The boon, condition, or effect referred to by the fact.
  status: String!

  # The description of the status effect.
  description: String

  # The number of stacks applied.
  apply_count: Int

  # The duration of the effect in seconds. Note that some facts of this type are just used to display the buff icon with text; in this case, duration is usually 0, or omitted entirely.
  duration: Int

  prefix: PrefixedBuff
}

type FactRadius implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The radius value.
  distance: Int!
}

type FactRange implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The range of the trait/skill.
  value: Int!
}

type FactRecharge implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The recharge time in seconds.
  value: Int!
}

type FactUnblockable implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # Always true.
  value: Boolean!
}

type FactDuration implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The duration in seconds.
  duration: Int
}

type FactHeal implements Fact {
  # An arbitrary localized string describing the fact. Not included with all facts.
  text: String

  # A URL to the icon shown with the fact. Not included with all facts.
  icon: String

  # Defines what additional fields the object will contain
  type: String!

  # Specifies which trait has to be selected in order for this fact to take effect.
  requires_trait: Trait

  # This specifies the array index of the facts object it will override
  overrides: Int

  # The number of times the heal is applied.
  hit_count: Int!
}
`;

const sharedResolvers = {
  requires_trait: (root, args, ctx) =>
    root.requires_trait && ctx.traitsLoader.load(root.requires_trait),
};

export const resolver = {
  FactAttributeAdjust: {
    ...sharedResolvers,
  },
  FactBuff: {
    ...sharedResolvers,
  },
  FactBuffConversion: {
    ...sharedResolvers,
  },
  FactComboField: {
    ...sharedResolvers,
  },
  FactComboFinisher: {
    ...sharedResolvers,
  },
  FactDamage: {
    ...sharedResolvers,
  },
  FactDistance: {
    ...sharedResolvers,
  },
  FactNoData: {
    ...sharedResolvers,
  },
  FactNumber: {
    ...sharedResolvers,
  },
  FactPercent: {
    ...sharedResolvers,
  },
  FactPrefixedBuff: {
    ...sharedResolvers,
  },
  FactRadius: {
    ...sharedResolvers,
  },
  FactRange: {
    ...sharedResolvers,
  },
  FactRecharge: {
    ...sharedResolvers,
  },
  FactUnblockable: {
    ...sharedResolvers,
  },
  FactDuration: {
    ...sharedResolvers,
  },
  FactHeal: {
    ...sharedResolvers,
  },
  Fact: {
    __resolveType: (obj, context, info) => {
      if ( !rootTypeToType.hasOwnProperty(obj.type) ) {
        return null;
      }

      return rootTypeToType[obj.type];
    }
  }
};


