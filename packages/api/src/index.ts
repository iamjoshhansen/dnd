import * as IO from 'socket.io';
import { db } from './dnd-mongo-db';
import { ObjectId } from 'mongodb';
import * as express from 'express';
import * as cors from 'cors';
import { Request, Response } from 'express';
import { COLLECTION_SPELLS, COLLECTION_CHARACTERS } from '@dnd/env/dist';

interface Spell {
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
  school: string;
  classes: string[];
}

const app = express();

app.use(cors());

export const io = IO();

async function main() {
  const { db: dndDB } = await db;
  console.log(`✓ Connected to DB`);

  const charactersCollection = dndDB.collection<{
    _id: ObjectId;
    name: string;
  }>(COLLECTION_CHARACTERS);

  const spellsCollection = dndDB.collection<Spell>(COLLECTION_SPELLS);

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

  app.get('/spells/', async (_req: Request, res: Response) => {
    const spells = await (
      await spellsCollection.find(
        {},
        {
          projection: {
            _id: 0,
            index: 1,
            name: 1,
            range: 1,
            ritual: 1,
            duration: 1,
            concentration: 1,
            casting_time: 1,
            level: 1,
            classes: 1,
          },
        }
      )
    ).toArray();
    res.send(spells);
  });

  app.get('/spell-detail/:index', async (req: Request, res: Response) => {
    const { index } = req.params as { index: string };

    const spell = await spellsCollection.findOne({
      index,
    });

    if (spell) {
      delete spell._id;
      res.send(spell);
    } else {
      console.warn(`Spell 404 - '${index}'`);
      res.status(404);
      res.send();
    }
  });

  const expressPort = process.env.expressPort || 4143;
  app.listen(expressPort);
  console.log(`✓ Express is listening on port ${expressPort}`);

  const ioPort = process.env.websocketPort || 4145;
  io.listen(ioPort);
  console.log(`✓ Webocket is listening on port ${ioPort}`);
}

main();
