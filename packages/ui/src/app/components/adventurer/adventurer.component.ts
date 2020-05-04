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
import { ConnectedService } from 'src/app/services/connected/connected.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-adventurer',
  templateUrl: './adventurer.component.html',
  styleUrls: ['./adventurer.component.scss'],
})
export class AdventurerComponent implements OnInit, OnDestroy {
  @Input() adventurer = new Adventurer({
    characterName: 'Kelryn',
    alignment: Alignment.nuetralGood,
    playerName: 'Josh Hansen',
    xp: 0,
    clss: Clss.wizard,
    race: Race.gnome,
    subRace: SubRace.deep,
    stats: {
      [Stat.strength]: 13,
      [Stat.dexterity]: 15,
      [Stat.constitution]: 14,
      [Stat.intelligence]: 19,
      [Stat.wisdom]: 13,
      [Stat.charisma]: 8,
    },
    skills: [Skill.insight, Skill.investigation, Skill.arcana, Skill.history],
    savingThrows: [Stat.intelligence, Stat.wisdom],
    background: Background.sage,
  });

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

  private destroyed = new Subject<void>();

  private socket = this.connectedService.socket;

  constructor(private connectedService: ConnectedService) {}

  ngOnInit(): void {
    this.connectedService.whenConnected
      .pipe(takeUntil(this.destroyed))
      .subscribe(() => {
        console.log(`Getting character...`);
        this.getCharacter('5eaf7d46e366b9c0a86767e6');
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
  }

  getCharacter(id: string) {
    this.socket.emit('get-character', id, (character: any) => {
      console.log(`Character recieved!`, character);
    });
  }
}
