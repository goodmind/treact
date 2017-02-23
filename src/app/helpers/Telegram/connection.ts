/*
import { Telegram, network } from 'telegram-mtproto';

import { addPublicKeys } from './publickeys';
import { config, SERVER } from './config';

const schema = require('./api-tlschema-57.json');
const telegram = new Telegram(schema);
addPublicKeys(telegram);

interface IServer {
  host: string;
  port: string;
}

const apiConnect = async (server: IServer = SERVER, apiConfig = config) => {
  const connection = new network.http(server);
  const setupClient = telegram.createClient();
  setupClient.setConnection(connection);
  await connection.connect();
  const client = await setupClient.setup(apiConfig);

  console.log(`Connected to Telegram on ${server.host}`);
  console.log(`Client config:\n`, client.schema, client);

  return client;
};

export default apiConnect;
*/
