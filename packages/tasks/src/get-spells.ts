import { dndDB } from './dnd-mongo-db';
import { COLLECTION_RAW_SPELLS } from '@dnd/env';
// import { table } from 'table';
// import { logObj } from './obj-log';
import axios from 'axios';
// import { ObjectId } from 'mongodb';

async function main() {
  console.log(`Getting Spells...`);

  const { data } = await axios.get<{
    count: number;
    results: {
      index: string;
      name: string;
      url: string;
    }[];
  }>('http://dnd5eapi.co/api/spells/');

  const apiSpells = data.results;

  const { db, closeDb } = await dndDB;
  const spellsCollection = db.collection(COLLECTION_RAW_SPELLS);

  for (let i = 0; i < apiSpells.length; i++) {
    const spell = apiSpells[i];
    console.log(
      `Loading [${(i + 1).toString().padStart(3, ' ')} of ${
        apiSpells.length
      }]: ${spell.name}`
    );

    const detailsRequest = await axios.get<{ _id: string; [key: string]: any }>(
      `http://dnd5eapi.co/api/spells/${spell.index}`
    );
    const details = detailsRequest.data;
    delete details._id;

    const _id = spell.index;

    await spellsCollection.replaceOne(
      {
        _id,
      },
      {
        _id,
        ...details,
      },
      {
        upsert: true,
      }
    );
  }

  // const players = await (await playersCollection.find({})).toArray();

  // const playersWithHeadings = players.map((player) => Object.values(player));
  // playersWithHeadings.unshift(Object.keys(players[0]));
  // console.log(table(playersWithHeadings));

  await closeDb();

  console.log(`Done!`);
}

main();
