import { Request, Response } from 'express';
import knex from '../database/connection';

class MovementController{
    async create(request: Request, response:Response) {
        const {
            game_id,
            player,
            position
        } = request.body;
    
        await knex('movements').insert({
            player,
            position
        });
    
        return response.json({ sucess: true });
    }
}

export default MovementController;