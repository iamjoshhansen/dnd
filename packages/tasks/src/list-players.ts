import { dndDB } from './dnd-mongo-db';
import { COLLECTION_PLAYERS } from '@dnd/env';
import { table } from 'table';

async function main() {
  console.log(`Listing Players...`);
  const { db, closeDb } = await dndDB;
  const playersCollection = db.collection(COLLECTION_PLAYERS);
  const players = await (await playersCollection.find({})).toArray();

  const playersWithHeadings = players.map((player) => Object.values(player));
  playersWithHeadings.unshift(Object.keys(players[0]));
  console.log(table(playersWithHeadings));

  await closeDb();

  console.log(`Done!`);
}

main();
