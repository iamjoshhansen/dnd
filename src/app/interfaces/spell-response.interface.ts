export interface SpellResponse {
  _id: string;
  index: string;
  name: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: ('V' | 'S' | 'M')[];
  material: string;
  ritual: false;
  duration: string;
  concentration: false;
  casting_time: string;
  level: number;
  school: {
    name: string;
    url: string;
  };
  classes: {
    name: string;
    url: string;
  }[];
  subclasses: {
    name: string;
    url: string;
  }[];
  url: string;
}
