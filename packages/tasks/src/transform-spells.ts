import { dndDB } from './dnd-mongo-db';
import { COLLECTION_RAW_SPELLS, COLLECTION_SPELLS } from '@dnd/env';
import { ObjectId } from 'mongodb';

interface RawSpell {
  _id: ObjectId;
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

interface Spell {
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

async function main() {
  console.log(`Getting Spells...`);

  const { db, closeDb } = await dndDB;
  const rawSpellsCollection = db.collection<RawSpell>(COLLECTION_RAW_SPELLS);
  const spellsCollection = db.collection<Spell>(COLLECTION_SPELLS);

  const rawSpellsCursor = await rawSpellsCollection.find({});

  let i = 0;
  while (await rawSpellsCursor.hasNext()) {
    const rawSpell = await rawSpellsCursor.next();
    if (rawSpell) {
      console.log(
        `Loading ${(++i).toString().padStart(3, ' ')}: ${rawSpell.name}`
      );
      const newSpell: Spell = {
        index: `${rawSpell._id}`,
        name: rawSpell.name,
        desc: rawSpell.desc,
        higher_level: rawSpell.higher_level,
        range: rawSpell.range,
        components: rawSpell.components,
        material: rawSpell.material,
        ritual: rawSpell.ritual,
        duration: rawSpell.duration,
        concentration: rawSpell.concentration,
        casting_time: rawSpell.casting_time,
        level: rawSpell.level,
        school: rawSpell.school.name,
        classes: rawSpell.classes.map((clss) => clss.name),
      };

      // await spellsCollection.replaceOne(
      //   {
      //     _id: newSpell._id,
      //   },
      //   newSpell,
      //   {
      //     upsert: true,
      //   }
      // );

      await spellsCollection.insertOne(newSpell);
    }
  }

  await closeDb();

  console.log(`Done!`);
}

main();
