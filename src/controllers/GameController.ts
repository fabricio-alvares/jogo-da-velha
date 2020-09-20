import { Request, Response } from 'express';
import knex from '../database/connection';

class GameController {
    async create(request: Request, response: Response) {

        const firstPlayer = getRandomInt(0, 2) == 0 ? 'O' : 'X';
        const turnPlayer = firstPlayer;

        const id = create_UUID();

        await knex('game').insert({
            id: id,
            firstPlayer: firstPlayer,
            turnPlayer: turnPlayer
        });

        return response.json({
            id: id,
            firstPlayer
        });

        function getRandomInt(min: number, max: number) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }

        function create_UUID(){
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c=='x' ? r :(r&0x3|0x8)).toString(16);
            });
            return uuid;
        }
    }
}

export default GameController;