import { Request, Response } from 'express';
import knex from '../database/connection';

import MovementUtils from '../utils/MovementUtils';


interface Positions{
    x: string,
    y: string
}

interface Game{
    id: string,
    firstPlayer: string,
    turnPlayer: string,
}

interface Board{
    game_id: string;
    player: string;
    position_x: string;
    position_y: string;
}

class MovementController{
    async create(request: Request, response:Response) {
        const { id } = request.params;
        
        const game: Game = await knex('game').where('id', id).first();

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
        const movementUtils = new MovementUtils;

        movementUtils.doMovement(game, movement);

        const board: Board[] = await knex('movement')
            .where('game_id', game.id);

        if(movementUtils.checkWinner(board)){
            console.log()
        };
    
        return response.json({ player, position });
    }
}

export default MovementController;