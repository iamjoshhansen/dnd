import { pruneObj, keepTrue } from 'src/app/utility/prune-obj';

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

export enum Clss {
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

export enum Race {
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

export enum SubRace {
  all = 'all',
  hill = 'Hill',
  mountain = 'Mountain',
  forest = 'Forest',
  rock = 'Rock',
  stout = 'Stout',
  high = 'High',
  wood = 'Wood',
  lightfoot = 'Lightfoot',
  deep = 'Deep',
  dark = 'Dark',
}

export enum Alignment {
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

export const subRaceMap: Partial<Record<Race, SubRace[]>> = {
  [Race.dwarf]: [SubRace.hill, SubRace.mountain],
  [Race.elf]: [SubRace.high, SubRace.wood, SubRace.dark],
  [Race.gnome]: [SubRace.forest, SubRace.rock, SubRace.deep],
  [Race.halfling]: [SubRace.lightfoot, SubRace.stout],
};

export enum Skill {
  acrobatics = 'Acrobatics',
  animalHandling = 'Animal Handling',
  arcana = 'Arcana',
  athletics = 'Athltetics',
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
  survival = 'Suvival',
}

export enum Stat {
  strength = 'Strength',
  dexterity = 'Dexterity',
  constitution = 'Constitution',
  intelligence = 'Intelligence',
  wisdom = 'Wisdom',
  charisma = 'Charisma',
}

const skillStatMap: Record<Skill, Stat> = {
  [Skill.acrobatics]: Stat.dexterity,
  [Skill.animalHandling]: Stat.wisdom,
  [Skill.arcana]: Stat.intelligence,
  [Skill.athletics]: Stat.strength,
  [Skill.deception]: Stat.charisma,
  [Skill.history]: Stat.intelligence,
  [Skill.insight]: Stat.wisdom,
  [Skill.intimidation]: Stat.charisma,
  [Skill.investigation]: Stat.intelligence,
  [Skill.medicine]: Stat.wisdom,
  [Skill.nature]: Stat.intelligence,
  [Skill.perception]: Stat.wisdom,
  [Skill.performance]: Stat.charisma,
  [Skill.persuasion]: Stat.charisma,
  [Skill.religion]: Stat.intelligence,
  [Skill.sleightOfHand]: Stat.dexterity,
  [Skill.stealth]: Stat.dexterity,
  [Skill.survival]: Stat.wisdom,
};

export type StatsInterface = Record<Stat, number>;
export type SkillsInterface = Record<Skill, boolean>;
type SkillsList = Skill[];
type SavingThrowList = Stat[];

export enum Background {
  acolyte = 'Acolyte',
  criminalSpy = 'Criminal / Spy',
  folkHero = 'Folk Hero',
  noble = 'Noble',
  sage = 'Sage',
  soldier = 'Soldier',
}

export const backgroundProficiencyMap: Record<Background, Skill[]> = {
  [Background.acolyte]: [Skill.insight, Skill.religion],
  [Background.criminalSpy]: [Skill.deception, Skill.stealth],
  [Background.folkHero]: [Skill.animalHandling, Skill.survival],
  [Background.noble]: [Skill.history, Skill.persuasion],
  [Background.sage]: [Skill.arcana, Skill.history],
  [Background.soldier]: [Skill.athletics, Skill.intimidation],
};

interface ReasonedModifier {
  amount: number;
  reason: string;
  isBase?: boolean;
}

const raceStatModifiers: Record<
  Race,
  Partial<Record<SubRace, Partial<Record<Stat, number>>>>
> = {
  [Race.dragonborn]: {
    [SubRace.all]: {
      [Stat.strength]: 2,
      [Stat.charisma]: 1,
    },
  },
  [Race.dwarf]: {
    [SubRace.all]: {
      [Stat.constitution]: 2,
    },
    [SubRace.mountain]: {
      [Stat.strength]: 2,
    },
    [SubRace.hill]: {
      [Stat.wisdom]: 1,
    },
  },
  [Race.elf]: {
    [SubRace.all]: {
      [Stat.dexterity]: 2,
    },
    [SubRace.high]: {
      [Stat.intelligence]: 1,
    },
    [SubRace.wood]: {
      [Stat.wisdom]: 1,
    },
    [SubRace.dark]: {
      [Stat.charisma]: 1,
    },
  },
  [Race.gnome]: {
    [SubRace.all]: {
      [Stat.intelligence]: 2,
    },
    [SubRace.rock]: {
      [Stat.constitution]: 1,
    },
    [SubRace.forest]: {
      [Stat.dexterity]: 1,
    },
    [SubRace.deep]: {
      [Stat.strength]: 1,
    },
  },
  [Race.halfElf]: {
    [SubRace.all]: {
      [Stat.charisma]: 2,
      // two other Stat scores of my choice go up by 1
    },
  },
  [Race.halfOrc]: {
    [SubRace.all]: {
      [Stat.strength]: 2,
      [Stat.constitution]: 1,
    },
  },
  [Race.halfling]: {
    [SubRace.all]: {
      [Stat.dexterity]: 2,
    },
    [SubRace.stout]: {
      [Stat.constitution]: 1,
    },
    [SubRace.lightfoot]: {
      [Stat.charisma]: 1,
    },
  },
  [Race.human]: {
    [SubRace.all]: {
      [Stat.strength]: 1,
      [Stat.dexterity]: 1,
      [Stat.constitution]: 1,
      [Stat.intelligence]: 1,
      [Stat.wisdom]: 1,
      [Stat.charisma]: 1,
    },
  },
  [Race.tiefling]: {
    [SubRace.all]: {
      [Stat.intelligence]: 1,
      [Stat.charisma]: 2,
    },
  },
};

const hitDiceMap: Record<Clss, number> = {
  [Clss.wizard]: 6,
  [Clss.sorcerer]: 6,
  [Clss.bard]: 8,
  [Clss.cleric]: 8,
  [Clss.druid]: 8,
  [Clss.monk]: 8,
  [Clss.rogue]: 8,
  [Clss.warlock]: 8,
  [Clss.fighter]: 10,
  [Clss.paladin]: 10,
  [Clss.ranger]: 10,
  [Clss.barbarian]: 12,
};

const classStatModifiers: Record<Clss, Partial<Record<Stat, number>>> = {
  [Clss.barbarian]: {},
  [Clss.bard]: {},
  [Clss.cleric]: {},
  [Clss.druid]: {},
  [Clss.fighter]: {},
  [Clss.monk]: {},
  [Clss.paladin]: {},
  [Clss.ranger]: {},
  [Clss.rogue]: {},
  [Clss.sorcerer]: {},
  [Clss.warlock]: {},
  [Clss.wizard]: {},
};

export const stats: Stat[] = [
  Stat.strength,
  Stat.dexterity,
  Stat.constitution,
  Stat.intelligence,
  Stat.wisdom,
  Stat.charisma,
];

export const skills: Skill[] = [
  Skill.acrobatics,
  Skill.animalHandling,
  Skill.arcana,
  Skill.athletics,
  Skill.deception,
  Skill.history,
  Skill.insight,
  Skill.intimidation,
  Skill.investigation,
  Skill.medicine,
  Skill.nature,
  Skill.perception,
  Skill.performance,
  Skill.persuasion,
  Skill.religion,
  Skill.sleightOfHand,
  Skill.stealth,
  Skill.survival,
];

export interface AdventurerData {
  characterName: string;
  playerName: string;
  alignment: Alignment;
  background: Background;
  xp: number;
  clss: Clss;
  race: Race;
  subRace: SubRace;
  stats: StatsInterface;
  skills: SkillsList;
  savingThrows: SavingThrowList;
  initiative: number;
  inspiration: number;
  equipment: string;
}

function watcher(key: string, val: any) {
  console.log(`Watcher saw that ${key} changed to ${val}`);
}

export class Adventurer {
  public characterName: string;
  public playerName: string;
  public clss: Clss;
  public race: Race;
  public subRace: SubRace;
  public xp: number;
  public alignment?: Alignment;
  public background: Background;
  public initiative: number;
  public inspiration: number;
  private stats: StatsInterface;
  private skills: SkillsInterface;
  private savingThrows: Partial<Record<Stat, boolean>> = {};
  public equipment: string;

  constructor({
    clss,
    race,
    subRace = SubRace.all,
    alignment,
    background,
    stats = {
      [Stat.strength]: 10,
      [Stat.dexterity]: 10,
      [Stat.wisdom]: 10,
      [Stat.intelligence]: 10,
      [Stat.constitution]: 10,
      [Stat.charisma]: 10,
    },
    xp = 0,
    characterName = '',
    playerName = '',
    skills = [],
    savingThrows = [],
    initiative,
    inspiration,
    equipment,
  }: Partial<AdventurerData>) {
    this.characterName = characterName;
    this.playerName = playerName;
    this.clss = clss;
    this.race = race;
    this.subRace = subRace;
    this.xp = xp;
    this.alignment = alignment;
    this.stats = stats;
    this.background = background;
    this.initiative = initiative;
    this.inspiration = inspiration;
    this.equipment = equipment;

    this.savingThrows = {
      [Stat.strength]: savingThrows.includes(Stat.strength),
      [Stat.dexterity]: savingThrows.includes(Stat.dexterity),
      [Stat.constitution]: savingThrows.includes(Stat.constitution),
      [Stat.intelligence]: savingThrows.includes(Stat.intelligence),
      [Stat.wisdom]: savingThrows.includes(Stat.wisdom),
      [Stat.charisma]: savingThrows.includes(Stat.charisma),
    };

    keepTrue(this.savingThrows);

    this.skills = {
      [Skill.acrobatics]: skills.includes(Skill.acrobatics),
      [Skill.animalHandling]: skills.includes(Skill.animalHandling),
      [Skill.arcana]: skills.includes(Skill.arcana),
      [Skill.athletics]: skills.includes(Skill.athletics),
      [Skill.deception]: skills.includes(Skill.deception),
      [Skill.history]: skills.includes(Skill.history),
      [Skill.insight]: skills.includes(Skill.insight),
      [Skill.intimidation]: skills.includes(Skill.intimidation),
      [Skill.investigation]: skills.includes(Skill.investigation),
      [Skill.medicine]: skills.includes(Skill.medicine),
      [Skill.nature]: skills.includes(Skill.nature),
      [Skill.perception]: skills.includes(Skill.perception),
      [Skill.performance]: skills.includes(Skill.performance),
      [Skill.persuasion]: skills.includes(Skill.persuasion),
      [Skill.religion]: skills.includes(Skill.religion),
      [Skill.sleightOfHand]: skills.includes(Skill.sleightOfHand),
      [Skill.stealth]: skills.includes(Skill.stealth),
      [Skill.survival]: skills.includes(Skill.survival),
    };

    keepTrue(this.skills);
  }

  toJSON(): Partial<AdventurerData> {
    const data: AdventurerData = {
      characterName: this.characterName,
      playerName: this.playerName,
      alignment: this.alignment,
      background: this.background,
      xp: this.xp,
      clss: this.clss,
      race: this.race,
      subRace: this.subRace,
      stats: this.stats,
      skills: Object.keys(this.skills).map((x) => x as Skill),
      savingThrows: Object.keys(this.savingThrows).map((x) => x as Stat),
      initiative: this.initiative,
      inspiration: this.inspiration,
      equipment: this.equipment,
    };

    pruneObj(data);

    return data;
  }

  addXP(xp: number) {
    this.xp += xp;
  }

  get subRaceOptions(): SubRace[] {
    return subRaceMap[this.race] || [];
  }

  get hasSubRaceOptions(): boolean {
    return this.subRaceOptions.length > 0;
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

  getBaseStat(stat: Stat): number {
    return this.stats[stat];
  }

  setBaseStat(stat: Stat, val: number) {
    this.stats[stat] = val;
  }

  getStat(stat: Stat): number {
    return this.statExplanation(stat).reduce((a, b) => a + b.amount, 0);
  }

  statExplanation(stat: Stat): ReasonedModifier[] {
    const reasons: ReasonedModifier[] = [];

    // base
    reasons.push({
      reason: 'Die roll',
      amount: this.getBaseStat(stat),
      isBase: true,
    });

    // race
    if (this.race) {
      reasons.push({
        reason: this.race,
        amount: raceStatModifiers[this.race][SubRace.all]
          ? raceStatModifiers[this.race][SubRace.all][stat] || 0
          : 0,
      });
    }

    // subRace
    if (this.subRace !== SubRace.all) {
      reasons.push({
        reason: `${this.subRace} ${this.race}`,
        amount: raceStatModifiers[this.race][this.subRace]
          ? raceStatModifiers[this.race][this.subRace][stat] || 0
          : 0,
      });
    }

    // class
    if (this.clss) {
      reasons.push({
        reason: this.clss,
        amount: classStatModifiers[this.clss][stat] || 0,
      });
    }

    // send back the list, filtering out "zero" amounts
    return reasons.filter((x) => x.amount !== 0);
  }

  statModifier(stat: Stat): number {
    return this.statModifierExplanation(stat).reduce((a, b) => a + b.amount, 0);
  }

  statModifierExplanation(stat: Stat): ReasonedModifier[] {
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

  hasSkill(skill: Skill): boolean {
    return !!this.skills[skill];
  }

  setSkill(skill: Skill, has: boolean) {
    if (has) {
      this.skills[skill] = true;
    } else {
      delete this.skills[skill];
    }
  }

  // modifiedSkill(skill: SkillEnum): number {
  //   const stat = skillMap[skill];
  //   return (
  //     this.statModifier(stat) +
  //     (this.hasSkill(skill) ? this.proficiencyBonus : 0)
  //   );
  // }

  skillStat(skill: Skill): Stat {
    return skillStatMap[skill];
  }

  skillExplanation(skill: Skill): ReasonedModifier[] {
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

  skillModifier(skill: Skill): number {
    return this.skillExplanation(skill).reduce((a, b) => a + b.amount, 0);
  }

  // Saving Throws
  hasSavingThrow(stat: Stat): boolean {
    return !!this.savingThrows[stat];
  }

  setSavingThrow(stat: Stat, val: boolean): this {
    if (val) {
      this.savingThrows[stat] = true;
    } else {
      delete this.savingThrows[stat];
    }
    return this;
  }

  savingThrowExplanation(stat: Stat): ReasonedModifier[] {
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

  savingThrowModifier(stat: Stat): number {
    return this.savingThrowExplanation(stat).reduce((a, b) => a + b.amount, 0);
  }

  get armorClass(): number {
    return 10 + this.statModifier(Stat.dexterity);
  }

  get speed(): number {
    switch (this.race) {
      case Race.dwarf:
      case Race.gnome:
        return 25;
      default:
        return 30;
    }
  }

  get currentHitPoints(): number {
    return 10 + this.statModifier(Stat.constitution);
  }

  get hitDice(): string {
    if (this.clss) {
      return `${this.level}d${hitDiceMap[this.clss]}`;
    }
    return '';
  }
}
