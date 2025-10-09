/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import * as path from 'path';
import { initializeDatabase, Atributo, AtributoService, postgresConfig } from '@jogov2/typeorm';

async function bootstrap() {
  // Inicializa a conexão com o banco antes de usar os serviços
  const config = {
    ...postgresConfig,
    // Garante que as entidades sejam registradas via classe diretamente
    entities: [Atributo],
  };

  await initializeDatabase(config);

  const app = express();
  
  // Habilita CORS para qualquer origem
  app.use(cors());
  
  app.use('/assets', express.static(path.join(__dirname, 'assets')));

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to express!' });
  });

  app.get('/api/atributos', async (req, res) => {
    
    const atributoService = new AtributoService();
    const atributos = await atributoService.getAllAtributos();
    res.json( atributos );
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, async () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
// No-op
