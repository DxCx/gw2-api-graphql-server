const rootTypeToType = {
  Consumable: 'ItemConsumableDetails',
	Armor: 'ItemArmorDetails',
	Back: 'ItemBackItemDetails',
	Bag: 'ItemBagDetails',
	Container: 'ItemContainerDetails',
	CraftingMaterial: null,
	Gathering: 'ItemGatheringDetails',
	Gizmo: 'ItemGizmoDetails',
	MiniPet: null,
	Tool: null,
  Trait: null,
  Trinket: 'ItemTrinketDetails',
  Trophy: null,
  UpgradeComponent: 'ItemUpgradeDetails',
  Weapon: 'ItemWeaponDetails',
}

export const typeDef = `
type InfusionSlot {
  # Infusion slot type of infusion upgrades. The array contains a maximum of one value. Possible values:
  # Enrichment - Item has an enrichment slot.
  # Infusion - Item has an infusion slot.
  flags: [String!]!

  # The infusion upgrade already in the armor piece. Only used for +5 Agony Infusions (id 49428)
  item_id: Int
}

type InfixUpgradeAttribute {
  # Attribute this bonus applies to. Possible values:
  # BoonDuration - Concentration
  # ConditionDamage - Condition Damage
  # ConditionDuration - Expertise
  # CritDamage - Ferocity
  # Healing - Healing Power
  # Power - Power
  # Precision - Precision
  # Toughness - Toughness
  # Vitality - Vitality
  attribute: String!

  # The modifier value.
  modifier: Int!
}

type InfixBuff {
  # The skill id of the effect.
  skill_id: Int!

  # The effect's description
  description: String!
}

type InfixUpgrade {
  # List of attribute bonuses. Each object contains the following properties:
  attributes: [InfixUpgradeAttribute]

  # Object containing an additional effect. This is used for Boon Duration, Condition Duration, or additional attribute bonuses for ascended trinkets or back items. It has the following properties:
  buff: InfixBuff
}

type ItemWeaponDetails {
	# The weapon type.
	# One-handed main hand: Axe, Dagger, Mace, Pistol, Scepter, Sword
	# One-handed off hand: Focus, Shield, Torch, Warhorn
	# Two-handed: Greatsword, Hammer, LongBow, Rifle, ShortBow, Staff
	# Aquatic: Harpoon, Speargun, Trident
	# Other: LargeBundle, SmallBundle, Toy, TwoHandedToy
	type: String!

	# The damage type.
	# Fire - Fire damage
	# Ice - Ice damage
	# Lightning - Lighting damage
	# Physical - Physical damage.
	# Choking - (not used)
	damage_type: String!

	# Minimum weapon strength.
	min_power: Int!

	# Maximum weapon strength.
	max_power: Int!

	# The defense value of the weapon (for shields).
	defense: Int!

	# Infusion slots of the weapon
	infusion_slots: [InfusionSlot!]!

	# The infix upgrade object
	infix_upgrade: [InfixUpgrade]

	# The suffix item id. This is usually a sigil.
	suffix_item_id: Int

	# The secondary suffix item id. Equals to an empty string for all currently discovered items.
	secondary_suffix_item_id: String!

  # A list of selectable stats IDs which are visible in API:2/itemstats
	stat_choices: [String!]
}

type ItemUpgradeDetails {
  # The type of the upgrade component. Possible values:
	# Default - Infusions and Jewels (and historical PvP runes/sigils)
	# Gem - Universal upgrades (Gemstones, Doubloons, and Marks/Crests/etc.)
	# Rune - Rune
	# Sigil - Sigil
	type: String!

	# The items that can be upgraded with the upgrade component. Possible values:
	# Weapons: Axe, Dagger, Focus,Greatsword, Hammer, Harpoon, LongBow, Mace, Pistol, Rifle, Scepter, Shield, ShortBow, Speargun, Staff, Sword, Torch, Trident, Warhorn
	# Armor: HeavyArmor, MediumArmor, LightArmor
	# Trinkets: Trinket
	flags: [String!]!
	# Applicable infusion slot for infusion upgrades. Possible values:
	# Defense - Defensive infusion
	# Offense - Offensive infusion
	# Utility - Utility infusion
	# Agony - Agony infusion
	infusion_upgrade_flags: [String!]!

	# The suffix appended to the item name when the component is applied.
	suffix: String!

	# Bonus the upgrade grants. Has the following properties:
	infix_upgrade: InfixUpgrade!

	# The bonuses from runes.
	bonuses: [String!]
}

type ItemTrinketDetails {
  # The trinket type. Possible values:
	# Accessory - Accessory
	# Amulet - Amulet
	# Ring - Ring
	type: String!

	# Infusion slots of the trinket
	infusion_slots: [InfusionSlot!]!

	# The infix upgrade object
	infix_upgrade: InfixUpgrade

	# The suffix item id. This is usually a jewel or gem.
	suffix_item_id: Int

	# The secondary suffix item id. Equals to an empty string for all currently discovered items.
	secondary_suffix_item_id: String!

  # A list of selectable stat IDs which are visible in API:2/itemstats
	stat_choices: [String!]
}

type ItemSalvageDetails {
  # The tool type. Always Salvage
	type: String!

	# Number of charges.
	charges: Int!
}

# TODO: ItemMinatureDetails

type ItemGizmoDetails {
  # The gizmo type. Possible values:
  # Default
  # ContainerKey - For Black Lion Chest Keys.
  # RentableContractNpc - For time-limited NPC services (e.g. Golem Banker, Personal Merchant Express)
  # UnlimitedConsumable - For Permanent Self-Style Hair Kit
  type: String!
}

type ItemGatheringDetails {
  # The tool type. Possible values:
  #	Foraging - For harvesting sickles
  #	Logging - For logging axes
  #	Mining - For mining picks
	type: String!
}

type ItemContainerDetails {
  # The container type. Possible values:
  #	Default
  #	GiftBox - For some presents and most dye kits
  #	OpenUI - For containers that have their own UI when opening (Black Lion Chest)
	type: String!
}

type ItemConsumableDetails {
  # Consumable type. Possible values:
	# AppearanceChange - For Total Makeover Kits, Self-Style Hair Kits, and Name Change Contracts
	# Booze - Alcohol consumables
	# ContractNpc - For Trading Post Express, Merchant Express, Golem Banker
	# Food - Food consumables
	# Generic - Various consumables
	# Halloween - Some boosters
	# Immediate - Consumables granting immediate effect (most boosters, Heavy Tome of Knowledge). Also used for currency items that are consumed immediately upon receipt.
	# Transmutation - Skin consumables
	# Unlock - Unlock consumables
	# UpgradeRemoval - For Upgrade Extractor
	# Utility - Utility boosts (Potions etc.)
	# TeleportToFriend - for Teleport to Friend
	type: String!

	# Effect description for consumables applying an effect.
	description: String

	# Effect duration in milliseconds.
	duration_ms: Int

	# Unlock type for unlock consumables. Possible values:
	# BagSlot - For Bag Slot Expansion
	# BankTab - For Bank Tab Expansion
	# CollectibleCapacity - For Storage Expander
	# Content - Finishers and Collection unlocks, and Commander's Compendium
	# CraftingRecipe - Crafting recipes
	# Dye - Dyes
	# Outfit - For Outfits
	# GliderSkin For Gliders
	# Champion for Mist Champions
	unlock_type: String

	# The dye id for dye unlocks.
	color_id: Int

	# The recipe id for recipe unlocks.
	recipe_id: Int

	# Unkown (TODO)
	apply_count: Int

  # The effect type name of the consumable.
	name: String
}

type ItemBagDetails {
  # The number of bag slots.
	size: Int!

	# Whether the bag is invisible/safe, and contained items won't show up at merchants etc.
	no_sell_or_sort: Boolean
}

type ItemBackItemDetails {
  # Infusion slots of the back item
  infusion_slots: [InfusionSlot!]!

	# The infix upgrade object
	infix_upgrade: [InfixUpgrade!]

	# The suffix item id. This is usually a jewel.
	suffix_item_id: Int

	# The secondary suffix item id. Equals to an empty string for all currently discovered items.
	secondary_suffix_item_id: String!

  # A list of selectable stat IDs which are visible in API:2/itemstats
	stat_choices: [String!]
}

type ItemArmorDetails {
  # The armor slot type.
  type: String!

  #  The weight class of the armor piece.
  weight_class:String!

  # The defense value of the armor piece.
  defense: Int!

  # Infusion slots of the armor piece
  infusion_slots: [InfusionSlot!]!

  # The infix upgrade object
  infix_upgrade: InfixUpgrade

  # The suffix item id. This is usually a rune.
  suffix_item_id: Int

  # The secondary suffix item id. Equals to an empty string for all currently discovered items.
  secondary_suffix_item_id:String!

  # A list of selectable stat IDs which are visible in API:2/itemstats
  stat_choices: [String!]
}

union ItemDetails = ItemWeaponDetails | ItemUpgradeDetails | ItemTrinketDetails | ItemSalvageDetails | ItemGizmoDetails | ItemGatheringDetails | ItemContainerDetails | ItemConsumableDetails | ItemBagDetails | ItemBackItemDetails | ItemArmorDetails

type Item {
  # The item id.
  id: ID!

	# The chat link.
	chat_link: String!

	# The item name.
	name: String!

	# The full icon URL.
	icon: String!

	# The item description.
	description: String

	# The item type - Possible values:
	# Armor - Armor
	# Back - Back item
	# Bag - Bags
	# Consumable - Consumables
	# Container - Containers
	# CraftingMaterial - Crafting materials
	# Gathering - Gathering tools
	# Gizmo - Gizmos
	# MiniPet - Miniatures
	# Tool - Salvage kits
	# Trait - Trait guides
	# Trinket - Trinkets
	# Trophy - Trophies
	# UpgradeComponent - Upgrade components
	# Weapon - Weapons
	type: String!

	# The item rarity. Possible values:
	# Junk
	# Basic
	# Fine
	# Masterwork
	# Rare
	# Exotic
	# Ascended
	# Legendary
	rarity: String!

	# The required level.
	level: Int!

	# The value in coins when selling to a vendor. (Can be non-zero even when the item has the NoSell flag.)
	vendor_value: Int!

	# The default skin id.
	default_skin: Int

	# Flags applying to the item. Possible values:
	# AccountBindOnUse - Account bound on use
	# AccountBound - Account bound on acquire
	# Attuned - If the item is Attuned
	# BulkConsume - If the item can be bulk consumed
	# DeleteWarning - If the item will prompt the player with a warning when deleting
	# HideSuffix - Hide the suffix of the upgrade component
	# Infused - If the item is infused
	# MonsterOnly
	# NoMysticForge - Not usable in the Mystic Forge
	# NoSalvage - Not salvageable
	# NoSell - Not sellable
	# NotUpgradeable - Not upgradeable
	# NoUnderwater - Not available underwater
	# SoulbindOnAcquire - Soulbound on acquire
	# SoulBindOnUse - Soulbound on use
	# Tonic - If the item is a tonic
	# Unique - Unique
	flags: [String!]!

  # The game types in which the item is usable. At least one game type is specified. Possible values:
	# Activity - Usable in activities
	# Dungeon - Usable in dungeons
	# Pve - Usable in general PvE
	# Pvp - Usable in PvP
	# PvpLobby - Usable in the Heart of the Mists
	# Wvw - Usable in World vs. World
	game_types: [String!]!

	# Restrictions applied to the item. Possible values:
	# Asura
	# Charr
	# Human
	# Norn
	# Sylvari
	# Elementalist
	# Engineer
	# Guardian
	# Mesmer
	# Necromancer
	# Ranger
	# Thief
	# Warrior
	restrictions: [String!]!

	# Additional item details if applicable, depending on the item type
	details: ItemDetails
}

# Root Query
type Query {
  item(itemId: ID!): Item
  items(itemIds: [ID!]): [Item!]!
}
`;

export const resolver = {
  ItemDetails: {
    __resolveType: (obj, context, info) => {
      if ( !rootTypeToType.hasOwnProperty(obj.root_type) ) {
        return null;
      }

      return rootTypeToType[obj.root_type];
    }
  },
  Query: {
    item: (root, args, ctx) => ctx.itemsLoader.load(args.itemId),
    items: (root, args, ctx) => ctx.itemsLoader.loadMany(args.itemIds),
  },
};

