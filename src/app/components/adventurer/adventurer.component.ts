import { Component, OnInit, Input } from '@angular/core';
import {
  Adventurer,
  ClassEnum,
  RaceEnum,
  StatEnum,
  SkillEnum,
  AlignmentEnum,
} from './adventurer';

@Component({
  selector: 'app-adventurer',
  templateUrl: './adventurer.component.html',
  styleUrls: ['./adventurer.component.scss'],
})
export class AdventurerComponent implements OnInit {
  @Input() adventurer = new Adventurer({
    characterName: 'Kelryn',
    alignment: AlignmentEnum.nuetralGood,
    playerName: 'Josh Hansen',
    xp: 0,
    class: ClassEnum.wizard,
    race: RaceEnum.gnome,
    stats: {
      [StatEnum.strength]: 8,
      [StatEnum.dexterity]: 15,
      [StatEnum.constitution]: 14,
      [StatEnum.intelligence]: 19,
      [StatEnum.wisdom]: 13,
      [StatEnum.charisma]: 13,
    },
    skills: [SkillEnum.investigation, SkillEnum.arcana],
  });

  StatEnum = StatEnum;
  RaceEnum = RaceEnum;
  AlignmentEnum = AlignmentEnum;

  stats: StatEnum[] = [
    StatEnum.strength,
    StatEnum.dexterity,
    StatEnum.constitution,
    StatEnum.intelligence,
    StatEnum.wisdom,
    StatEnum.charisma,
  ];

  skills: SkillEnum[] = [
    SkillEnum.acrobatics,
    SkillEnum.animalHandling,
    SkillEnum.arcana,
    SkillEnum.athltetics,
    SkillEnum.deception,
    SkillEnum.history,
    SkillEnum.insight,
    SkillEnum.intimidation,
    SkillEnum.investigation,
    SkillEnum.medicine,
    SkillEnum.nature,
    SkillEnum.perception,
    SkillEnum.performance,
    SkillEnum.persuasion,
    SkillEnum.religion,
    SkillEnum.sleightOfHand,
    SkillEnum.stealth,
    SkillEnum.suvival,
  ];

  constructor() {}

  ngOnInit(): void {}
}
