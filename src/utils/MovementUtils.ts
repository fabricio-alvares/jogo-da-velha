import knex from '../database/connection';

interface Game {
    id: string,
    firstPlayer: string,
    turnPlayer: string,
};

interface Movement {
    game_id: string;
    player: string;
    position_x: string;
    position_y: string;
};

interface Board {
    game_id: string;
    player: string;
    position_x: string;
    position_y: string;
}


class MovementUtils {
    async doMovement(game: Game, movement: Movement) {
        const trx = await knex.transaction();

        // Gravar movimento
        await trx('movement').insert(movement);

        // Alterar jogador do próximo turno
        const modifyTurnPlayer = game.turnPlayer == 'X' ? 'O' : 'X'
        await trx('game')
            .where('id', '=', game.id)
            .update({ turnPlayer: modifyTurnPlayer });


        trx.commit();
    }

    checkWinner(board: Board[]) {
        /* 
                linha = x[0] y[0], x[1] y[0], x[2] y[0]
                linha = x[0] y[1], x[1] y[1], x[2] y[1]
                linha = x[0] y[2], x[1] y[2], x[2] y[2]

                coluna = x[0] y[0], x[0] y[1], x[0] y[2]
                coluna = x[1] y[0], x[1] y[1], x[1] y[2]
                coluna = x[2] y[0], x[2] y[1], x[2] y[2]

                diagonal = x[0] y[0], x[1] y[1], x[2] y[2]
                diagonal = x[2] y[0], x[1] y[1], x[0] y[2]
            */
        return checkRows(board) || checkColums(board) || checkDiagonal(board);

        function checkRows(board: Board[]) {
            return true;
        };
        function checkColums(board: Board[]) {
            return true;
        };
        function checkDiagonal(board: Board[]) {            
            return true;
        };

        function checkIsEqual(pos1: string, pos2: string, pos3: string) {
            return (!pos1 && pos1 === pos2 && pos2 === pos3)
        }
    };
};
export default MovementUtils;