import { Request, Response } from 'express';
import knex from '../database/connection';

class GameController {
    async create(request: Request, response: Response) {
        const firstPlayer = 'x';
        const turnPlayer = 'x';

        const game = await knex('game').insert({
            firstPlayer: firstPlayer,
            turnPlayer: turnPlayer
        });

        return response.json({
            id: game[0],
            firstPlayer
        });
    }
}

export default GameController;