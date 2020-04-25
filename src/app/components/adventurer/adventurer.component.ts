import { Component, OnInit, Input } from '@angular/core';
import {
  Adventurer,
  ClassEnum,
  RaceEnum,
  StatEnum,
  SkillEnum,
} from './adventurer';

@Component({
  selector: 'app-adventurer',
  templateUrl: './adventurer.component.html',
  styleUrls: ['./adventurer.component.scss'],
})
export class AdventurerComponent implements OnInit {
  @Input() adventurer = new Adventurer({
    characterName: 'Foobar',
    playerName: 'Josh Hansen',
    xp: 0,
    class: ClassEnum.wizard,
    race: RaceEnum.gnome,
    stats: {
      [StatEnum.strength]: 10,
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

  constructor() {}

  ngOnInit(): void {}
}
