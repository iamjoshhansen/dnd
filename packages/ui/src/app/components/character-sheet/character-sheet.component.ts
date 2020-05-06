import { Component, Input } from '@angular/core';
import {
  Adventurer,
  Race,
  SubRace,
  Stat,
  Alignment,
  Background,
  stats,
  skills,
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

  stats = stats;
  skills = skills;
}
