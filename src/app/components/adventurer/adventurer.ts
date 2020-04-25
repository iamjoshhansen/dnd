const xpLevelValues = [
  0,
  300,
  900,
  2700,
  6500,
  14000,
  23000,
  34000,
  48000,
  64000,
  85000,
  100000,
  120000,
  140000,
  165000,
  195000,
  225000,
  265000,
  305000,
  355000,
];

const profBonusValues = [0, 5, 9, 13, 17];

export enum ClassEnum {
  barbarian = 'Barbarian',
  bard = 'Bard',
  cleric = 'Cleric',
  druid = 'Druid',
  fighter = 'Fighter',
  monk = 'Monk',
  paladin = 'Paladin',
  ranger = 'Ranger',
  rogue = 'Rogue',
  sorcerer = 'Sorcerer',
  warlock = 'Warlock',
  wizard = 'Wizard',
}

export enum RaceEnum {
  dragonborn = 'Dragonborn',
  dwarf = 'Dwarf',
  elf = 'Elf',
  gnome = 'Gnome',
  halfElf = 'Half-Elf',
  halfOrc = 'Half-Orc',
  halfling = 'Halfling',
  human = 'Human',
  tiefling = 'Tiefling',
}

export enum SkillEnum {
  acrobatics = 'Acrobatics',
  animalHandling = 'Animal Handling',
  arcana = 'Arcana',
  athltetics = 'Athltetics',
  deception = 'Deception',
  history = 'History',
  insight = 'Insight',
  intimidation = 'Intimidation',
  investigation = 'Investigation',
  medicine = 'Medicine',
  nature = 'Nature',
  perception = 'Perception',
  performance = 'Performance',
  persuasion = 'Persuasion',
  religion = 'Religion',
  sleightOfHand = 'Sleight of Hand',
  stealth = 'Stealth',
  suvival = 'Suvival',
}

export enum StatEnum {
  strength = 'Strength',
  dexterity = 'Dexterity',
  constitution = 'Constitution',
  intelligence = 'Intelligence',
  wisdom = 'Wisdom',
  charisma = 'Charisma',
}

const skillMap: Record<SkillEnum, StatEnum> = {
  [SkillEnum.acrobatics]: StatEnum.dexterity,
  [SkillEnum.animalHandling]: StatEnum.wisdom,
  [SkillEnum.arcana]: StatEnum.intelligence,
  [SkillEnum.athltetics]: StatEnum.strength,
  [SkillEnum.deception]: StatEnum.charisma,
  [SkillEnum.history]: StatEnum.intelligence,
  [SkillEnum.insight]: StatEnum.wisdom,
  [SkillEnum.intimidation]: StatEnum.charisma,
  [SkillEnum.investigation]: StatEnum.intelligence,
  [SkillEnum.medicine]: StatEnum.wisdom,
  [SkillEnum.nature]: StatEnum.intelligence,
  [SkillEnum.perception]: StatEnum.wisdom,
  [SkillEnum.performance]: StatEnum.charisma,
  [SkillEnum.persuasion]: StatEnum.charisma,
  [SkillEnum.religion]: StatEnum.intelligence,
  [SkillEnum.sleightOfHand]: StatEnum.dexterity,
  [SkillEnum.stealth]: StatEnum.dexterity,
  [SkillEnum.suvival]: StatEnum.wisdom,
};

export type StatsInterface = Record<StatEnum, number>;
export type SkillsInterface = Record<SkillEnum, boolean>;
type SkillsList = SkillEnum[];

function baseStatModifer(stat: number): number {
  const delta = stat - 10;
  const isNeg = delta < 0;
  return Math.floor(Math.abs(delta) / 2) * (isNeg ? -1 : 1);
}

const raceStatModifiers: Record<RaceEnum, Partial<Record<StatEnum, number>>> = {
  [RaceEnum.dragonborn]: {},
  [RaceEnum.dwarf]: {},
  [RaceEnum.elf]: {},
  [RaceEnum.gnome]: {
    [StatEnum.constitution]: 1,
  },
  [RaceEnum.halfElf]: {},
  [RaceEnum.halfOrc]: {},
  [RaceEnum.halfling]: {},
  [RaceEnum.human]: {},
  [RaceEnum.tiefling]: {},
};

function raceStatModifier(race: RaceEnum, stat: StatEnum) {
  return raceStatModifiers[race][stat] || 0;
}

const classStatModifiers: Record<
  ClassEnum,
  Partial<Record<StatEnum, number>>
> = {
  [ClassEnum.barbarian]: {},
  [ClassEnum.bard]: {},
  [ClassEnum.cleric]: {},
  [ClassEnum.druid]: {},
  [ClassEnum.fighter]: {},
  [ClassEnum.monk]: {},
  [ClassEnum.paladin]: {},
  [ClassEnum.ranger]: {},
  [ClassEnum.rogue]: {},
  [ClassEnum.sorcerer]: {},
  [ClassEnum.warlock]: {},
  [ClassEnum.wizard]: {},
};

function classStatModifier(clss: ClassEnum, stat: StatEnum) {
  return classStatModifiers[clss][stat] || 0;
}

export class Adventurer {
  public characterName: string;
  public playerName: string;
  public class: ClassEnum;
  public race: RaceEnum;
  public xp: number;

  private stats: StatsInterface;
  private skills: SkillsInterface;

  // Stats
  get strength() {
    return this.stats[StatEnum.strength];
  }
  set strength(val: number) {
    this.stats[StatEnum.strength] = val;
  }

  get dexterity() {
    return this.stats[StatEnum.dexterity];
  }
  set dexterity(val: number) {
    this.stats[StatEnum.dexterity] = val;
  }

  get constitution() {
    return this.stats[StatEnum.constitution];
  }
  set constitution(val: number) {
    this.stats[StatEnum.constitution] = val;
  }

  get intelligence() {
    return this.stats[StatEnum.intelligence];
  }
  set intelligence(val: number) {
    this.stats[StatEnum.intelligence] = val;
  }

  get wisdom() {
    return this.stats[StatEnum.wisdom];
  }
  set wisdom(val: number) {
    this.stats[StatEnum.wisdom] = val;
  }

  get charisma() {
    return this.stats[StatEnum.charisma];
  }
  set charisma(val: number) {
    this.stats[StatEnum.charisma] = val;
  }

  constructor(params: {
    characterName?: string;
    playerName?: string;
    xp?: number;
    class: ClassEnum;
    race: RaceEnum;
    stats: StatsInterface;
    skills: SkillsList;
  }) {
    this.characterName = params.characterName || '';
    this.playerName = params.playerName || '';
    this.class = params.class;
    this.race = params.race;
    this.xp = params.xp || 0;

    this.stats = params.stats;

    // this.strength = params.stats[StatEnum.strength];
    // this.dexterity = params.stats[StatEnum.dexterity];
    // this.constitution = params.stats[StatEnum.constitution];
    // this.intelligence = params.stats[StatEnum.intelligence];
    // this.wisdom = params.stats[StatEnum.wisdom];
    // this.charisma = params.stats[StatEnum.charisma];

    this.skills = {
      [SkillEnum.acrobatics]: params.skills.includes(SkillEnum.acrobatics),
      [SkillEnum.animalHandling]: params.skills.includes(
        SkillEnum.animalHandling
      ),
      [SkillEnum.arcana]: params.skills.includes(SkillEnum.arcana),
      [SkillEnum.athltetics]: params.skills.includes(SkillEnum.athltetics),
      [SkillEnum.deception]: params.skills.includes(SkillEnum.deception),
      [SkillEnum.history]: params.skills.includes(SkillEnum.history),
      [SkillEnum.insight]: params.skills.includes(SkillEnum.insight),
      [SkillEnum.intimidation]: params.skills.includes(SkillEnum.intimidation),
      [SkillEnum.investigation]: params.skills.includes(
        SkillEnum.investigation
      ),
      [SkillEnum.medicine]: params.skills.includes(SkillEnum.medicine),
      [SkillEnum.nature]: params.skills.includes(SkillEnum.nature),
      [SkillEnum.perception]: params.skills.includes(SkillEnum.perception),
      [SkillEnum.performance]: params.skills.includes(SkillEnum.performance),
      [SkillEnum.persuasion]: params.skills.includes(SkillEnum.persuasion),
      [SkillEnum.religion]: params.skills.includes(SkillEnum.religion),
      [SkillEnum.sleightOfHand]: params.skills.includes(
        SkillEnum.sleightOfHand
      ),
      [SkillEnum.stealth]: params.skills.includes(SkillEnum.stealth),
      [SkillEnum.suvival]: params.skills.includes(SkillEnum.suvival),
    };
  }

  addXP(xp: number) {
    this.xp += xp;
  }

  get levelExplanation(): string {
    return `what??`;
  }

  get level(): number {
    let level = 0;
    while (this.xp >= xpLevelValues[++level]) {}
    return level;
  }

  get proficiencyBonus(): number {
    let bonus = 0;
    const level = this.level;
    while (level >= profBonusValues[++bonus]) {}
    return bonus + 1;
  }

  // get strengthModifier(): number {
  //   return statModifer(this.strength);
  // }

  // get dexterityModifier(): number {
  //   return statModifer(this.dexterity);
  // }

  // get constitutionModifier(): number {
  //   return (
  //     statModifer(this.constitution) + (this.race === RaceEnum.gnome ? 1 : 0)
  //   );
  // }

  // get intelligenceModifier(): number {
  //   return statModifer(this.intelligence);
  // }

  // get wisdomModifier(): number {
  //   return statModifer(this.wisdom);
  // }

  // get charismaModifier(): number {
  //   return statModifer(this.charisma);
  // }

  getStat(stat: StatEnum): number {
    return this.stats[stat];
  }

  statModifier(stat: StatEnum): number {
    const base = baseStatModifer(this.stats[stat]);
    const race = raceStatModifier(this.race, stat);
    const clss = classStatModifier(this.class, stat);
    return base + race + clss;
  }

  hasSkill(skill: SkillEnum): boolean {
    return this.skills[skill];
  }

  skillModifier(skill: SkillEnum): number {
    const stat = skillMap[skill];
    return (
      this.statModifier(stat) +
      (this.hasSkill(skill) ? this.proficiencyBonus : 0)
    );
  }
}
