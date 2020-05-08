export interface SpellDetailsResponse {
  index: string;
  name: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: ('V' | 'S' | 'M')[];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: string;
  classes: string[];
}

export interface SpellListItemResponse {
  index: string;
  name: string;
  range: string;
  components: ('V' | 'S' | 'M')[];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  school: string;
  classes: string[];
}
