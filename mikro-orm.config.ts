import { db } from './config';

export default {
  entities: [],
  dbName: db.database,
  type: 'postgresql',
  discovery: { warnWhenNoEntities: false },
};
