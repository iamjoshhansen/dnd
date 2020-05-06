import * as IO from 'socket.io';
import { db } from './dnd-mongo-db';
import { ObjectId } from 'mongodb';

export const io = IO();

async function main() {
  const { db: dndDB } = await db;
  console.log(`✓ Connected to DB`);

  const charactersCollection = dndDB.collection<{
    _id: ObjectId;
    name: string;
  }>('characters');

  io.on('connection', (client) => {
    const clientId = client.id;
    console.log(`client ${clientId} has connected`);

    client.on('get-character', async (id: string, cb: Function) => {
      const character = await charactersCollection.findOne({
        _id: new ObjectId(id),
      });

      cb(character);
    });

    client.on(
      'save-character',
      async ({ id, data }: { id: string; data: any }, cb: Function) => {
        console.log(`Saving ${id}`, data);
        await charactersCollection.findOneAndReplace(
          {
            _id: new ObjectId(id),
          },
          data
        );
        cb();
      }
    );

    client.on('disconnect', () => {
      console.log(`client ${clientId} has disconnected`);
    });
  });

  const port = process.env.websocketPort || 4145;
  io.listen(port);
  console.log(`✓ Webockets listening on port ${port}`);
}

main();
