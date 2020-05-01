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

export enum SubRaceEnum {
  any = 'any',
  hill = 'Hill',
  mountain = 'Mountain',
  forest = 'Forest',
  rock = 'Rock',
  stout = 'Stout',
  high = 'High',
  wood = 'Wood',
  lightfoot = 'Lightfoot',
}

export enum AlignmentEnum {
  lawfullGood = 'Lawfull good',
  nuetralGood = 'Nuetral good',
  chaoticGood = 'Chaotic good',
  lawfulNeutral = 'Lawful neutral',
  nuetral = 'Nuetral',
  chaoticNeutral = 'Chaotic neutral',
  lawfullEvil = 'Lawfull evil',
  nuetralEvil = 'Nuetral evil',
  chaoticEvil = 'Chaotic evil',
}

export const SubRaceMap: Partial<Record<RaceEnum, SubRaceEnum[]>> = {
  [RaceEnum.dwarf]: [SubRaceEnum.hill, SubRaceEnum.mountain],
  [RaceEnum.elf]: [SubRaceEnum.high, SubRaceEnum.wood],
  [RaceEnum.gnome]: [SubRaceEnum.forest, SubRaceEnum.rock],
  [RaceEnum.halfling]: [SubRaceEnum.lightfoot, SubRaceEnum.stout],
};

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

const skillStatMap: Record<SkillEnum, StatEnum> = {
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
type SavingThrowList = StatEnum[];

interface ReasonedModifier {
  amount: number;
  reason: string;
  isBase?: boolean;
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

export interface AdventurerData {
  characterName?: string;
  playerName?: string;
  alignment?: AlignmentEnum;
  xp?: number;
  clss?: ClassEnum;
  race?: RaceEnum;
  stats?: StatsInterface;
  skills?: SkillsList;
  savingThrows?: SavingThrowList;
}

export class Adventurer {
  public characterName: string;
  public playerName: string;
  public clss: ClassEnum;
  public race: RaceEnum;
  public xp: number;
  public alignment?: AlignmentEnum;

  private stats: StatsInterface;
  private skills: SkillsInterface;
  private savingThrows: Partial<Record<StatEnum, boolean>> = {};

  // Stats
  // get strength() {
  //   return this.stats[StatEnum.strength];
  // }
  // set strength(val: number) {
  //   this.stats[StatEnum.strength] = val;
  // }

  // get dexterity() {
  //   return this.stats[StatEnum.dexterity];
  // }
  // set dexterity(val: number) {
  //   this.stats[StatEnum.dexterity] = val;
  // }

  // get constitution() {
  //   return this.stats[StatEnum.constitution];
  // }
  // set constitution(val: number) {
  //   this.stats[StatEnum.constitution] = val;
  // }

  // get intelligence() {
  //   return this.stats[StatEnum.intelligence];
  // }
  // set intelligence(val: number) {
  //   this.stats[StatEnum.intelligence] = val;
  // }

  // get wisdom() {
  //   return this.stats[StatEnum.wisdom];
  // }
  // set wisdom(val: number) {
  //   this.stats[StatEnum.wisdom] = val;
  // }

  // get charisma() {
  //   return this.stats[StatEnum.charisma];
  // }
  // set charisma(val: number) {
  //   this.stats[StatEnum.charisma] = val;
  // }

  constructor({
    clss,
    race,
    alignment,
    stats,
    xp = 0,
    characterName = '',
    playerName = '',
    skills = [],
    savingThrows = [],
  }: AdventurerData) {
    this.characterName = characterName;
    this.playerName = playerName;
    this.clss = clss;
    this.race = race;
    this.xp = xp;
    this.alignment = alignment;
    this.stats = stats;

    this.savingThrows = {
      [StatEnum.strength]: savingThrows.includes(StatEnum.strength),
      [StatEnum.dexterity]: savingThrows.includes(StatEnum.dexterity),
      [StatEnum.constitution]: savingThrows.includes(StatEnum.constitution),
      [StatEnum.intelligence]: savingThrows.includes(StatEnum.intelligence),
      [StatEnum.wisdom]: savingThrows.includes(StatEnum.wisdom),
      [StatEnum.charisma]: savingThrows.includes(StatEnum.charisma),
    };

    this.skills = {
      [SkillEnum.acrobatics]: skills.includes(SkillEnum.acrobatics),
      [SkillEnum.animalHandling]: skills.includes(SkillEnum.animalHandling),
      [SkillEnum.arcana]: skills.includes(SkillEnum.arcana),
      [SkillEnum.athltetics]: skills.includes(SkillEnum.athltetics),
      [SkillEnum.deception]: skills.includes(SkillEnum.deception),
      [SkillEnum.history]: skills.includes(SkillEnum.history),
      [SkillEnum.insight]: skills.includes(SkillEnum.insight),
      [SkillEnum.intimidation]: skills.includes(SkillEnum.intimidation),
      [SkillEnum.investigation]: skills.includes(SkillEnum.investigation),
      [SkillEnum.medicine]: skills.includes(SkillEnum.medicine),
      [SkillEnum.nature]: skills.includes(SkillEnum.nature),
      [SkillEnum.perception]: skills.includes(SkillEnum.perception),
      [SkillEnum.performance]: skills.includes(SkillEnum.performance),
      [SkillEnum.persuasion]: skills.includes(SkillEnum.persuasion),
      [SkillEnum.religion]: skills.includes(SkillEnum.religion),
      [SkillEnum.sleightOfHand]: skills.includes(SkillEnum.sleightOfHand),
      [SkillEnum.stealth]: skills.includes(SkillEnum.stealth),
      [SkillEnum.suvival]: skills.includes(SkillEnum.suvival),
    };
  }

  addXP(xp: number) {
    this.xp += xp;
  }

  get levelExplanation(): string {
    if (this.level === 20) {
      return `You maxed out at level 20 with ${
        xpLevelValues[xpLevelValues.length - 1]
      }xp!`;
    }

    const nextXp = xpLevelValues[this.level];
    const delta = nextXp - this.xp;

    return `You will get to level ${
      this.level + 1
    } when you have ${nextXp}xp.\nOnly ${delta} more to go!`;
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

  getBaseStat(stat: StatEnum): number {
    return this.stats[stat];
  }

  setBaseStat(stat: StatEnum, val: number) {
    this.stats[stat] = val;
  }

  getStat(stat: StatEnum): number {
    return this.statExplanation(stat).reduce((a, b) => a + b.amount, 0);
  }

  statExplanation(stat: StatEnum): ReasonedModifier[] {
    // base
    const base: ReasonedModifier[] = [
      {
        reason: 'Base',
        amount: this.getBaseStat(stat),
        isBase: true,
      },
    ];

    // race
    const race: ReasonedModifier[] = [
      {
        reason: this.race,
        amount: raceStatModifier(this.race, stat),
      },
    ];

    const clss: ReasonedModifier[] = [
      {
        reason: this.clss,
        amount: classStatModifier(this.clss, stat),
      },
    ];

    // send back the list, filtering out "zero" amounts
    return [].concat(base, race, clss).filter((x) => x.amount !== 0);
  }

  statModifier(stat: StatEnum): number {
    return this.statModifierExplanation(stat).reduce((a, b) => a + b.amount, 0);
  }

  statModifierExplanation(stat: StatEnum): ReasonedModifier[] {
    const delta = this.getStat(stat) - 10;
    const isNeg = delta < 0;
    const amount = Math.floor(Math.abs(delta) / 2) * (isNeg ? -1 : 1);

    return [
      {
        reason: `(10 - ${this.getStat(stat)}) / 2 ... rounded down`,
        amount,
      },
    ];
  }

  hasSkill(skill: SkillEnum): boolean {
    return this.skills[skill];
  }

  setSkill(skill: SkillEnum, has: boolean) {
    this.skills[skill] = has;
  }

  // modifiedSkill(skill: SkillEnum): number {
  //   const stat = skillMap[skill];
  //   return (
  //     this.statModifier(stat) +
  //     (this.hasSkill(skill) ? this.proficiencyBonus : 0)
  //   );
  // }

  skillStat(skill: SkillEnum): StatEnum {
    return skillStatMap[skill];
  }

  skillExplanation(skill: SkillEnum): ReasonedModifier[] {
    // stat
    const base: ReasonedModifier[] = [
      {
        reason: this.skillStat(skill),
        amount: this.statModifier(this.skillStat(skill)),
      },
    ];

    // proficiency
    const proficiency: ReasonedModifier[] = [
      {
        reason: 'Proficiency',
        amount: this.hasSkill(skill) ? this.proficiencyBonus : 0,
      },
    ];

    // send back the list, filtering out "zero" amounts
    return [].concat(base, proficiency).filter((x) => x.amount !== 0);
  }

  skillModifier(skill: SkillEnum): number {
    return this.skillExplanation(skill).reduce((a, b) => a + b.amount, 0);
  }

  // Saving Throws
  hasSavingThrow(stat: StatEnum): boolean {
    return !!this.savingThrows[stat];
  }

  setSavingThrow(stat: StatEnum, val: boolean): this {
    if (val) {
      this.savingThrows[stat] = true;
    } else {
      delete this.savingThrows[stat];
    }
    return this;
  }

  savingThrowExplanation(stat: StatEnum): ReasonedModifier[] {
    const reasons: ReasonedModifier[] = [
      {
        reason: stat,
        amount: this.statModifier(stat),
      },
    ];

    if (this.hasSavingThrow(stat)) {
      reasons.push({
        reason: 'Proficiency',
        amount: this.proficiencyBonus,
      });
    }

    return reasons;
  }

  savingThrowModifier(stat: StatEnum): number {
    return this.savingThrowExplanation(stat).reduce((a, b) => a + b.amount, 0);
  }
}
