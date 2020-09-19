import { Request, Response } from 'express';
import knex from '../database/connection';


interface Positions{
    x: string,
    y: string
}

class MovementController{
    async create(request: Request, response:Response) {
        const { id } = request.params;
        
        const game = await knex('game').where('id', id).first();

        if(!game) {
            return response.status(400).json({ msg: 'Partida não encontrada' });
        }

        const position: Positions = request.body.position;
        const { player } = request.body;

        if(player != game.turnPlayer){
            return response.status(400).json({ msg: 'Não é turno do jogador' });
        }

        const movement = {
            game_id: id,
            player,
            position_x: position.x,
            position_y: position.y
        }
    
        await knex('movement').insert(movement);
    
        return response.json({ player, position });
    }
}

export default MovementController;