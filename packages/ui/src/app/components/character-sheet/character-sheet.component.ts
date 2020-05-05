import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  Adventurer,
  Clss,
  Race,
  SubRace,
  Stat,
  Skill,
  Alignment,
  Background,
} from './adventurer';

// const adventurer = new Adventurer({
//   characterName: 'Kelryn',
//   alignment: Alignment.nuetralGood,
//   playerName: 'Josh Hansen',
//   xp: 0,
//   clss: Clss.wizard,
//   race: Race.gnome,
//   subRace: SubRace.deep,
//   stats: {
//     [Stat.strength]: 13,
//     [Stat.dexterity]: 15,
//     [Stat.constitution]: 14,
//     [Stat.intelligence]: 19,
//     [Stat.wisdom]: 13,
//     [Stat.charisma]: 8,
//   },
//   skills: [Skill.insight, Skill.investigation, Skill.arcana, Skill.history],
//   savingThrows: [Stat.intelligence, Stat.wisdom],
//   background: Background.sage,
// });

// console.log(JSON.stringify(adventurer, null, 2));

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss'],
})
export class CharacterSheetComponent {
  @Input() adventurer: Adventurer = new Adventurer({});

  Stat = Stat;
  Race = Race;
  SubRace = SubRace;
  Alignment = Alignment;
  Background = Background;

  stats: Stat[] = [
    Stat.strength,
    Stat.dexterity,
    Stat.constitution,
    Stat.intelligence,
    Stat.wisdom,
    Stat.charisma,
  ];

  skills: Skill[] = [
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
}
