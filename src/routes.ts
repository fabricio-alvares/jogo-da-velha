import express from 'express';

import GameController from './controllers/GameController';
import MovementController from './controllers/MovementController';

const routes = express.Router();
const gameController = new GameController();
const movementController = new MovementController();

routes.post('/game', gameController.create);
routes.post('/game/:id/movement', movementController.create);

export default routes;