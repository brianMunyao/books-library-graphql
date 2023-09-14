import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const PORT = process.env.PORT ?? 4000;

const app = express();
const httpServer = http.createServer(app);

interface MyContext {
	// token?: string;
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(() => {
	app.use(
		'/graphql',
		cors<cors.CorsRequest>(),
		express.json(),
		expressMiddleware(server, {})
	);
});

httpServer.listen({ port: PORT }, () => console.log(`Listening at ${PORT}`));
