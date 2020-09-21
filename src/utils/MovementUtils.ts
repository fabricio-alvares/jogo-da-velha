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
    position_x: number;
    position_y: number;
}

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

    checkDraw(board: Board[]) {
        var boardGame = this.createMatrix(board);

        var isDraw = true;

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (typeof boardGame[i][j] === "undefined") {
                    isDraw = false;
                }
            }
        }
        return isDraw;
    }

    checkWinner(board: Board[]) {

        var boardGame = this.createMatrix(board);
        console.log(boardGame);
        return (checkRows(boardGame) || checkColums(boardGame) || checkDiagonal(boardGame));


        function checkRows(board: string[][]) {
            for (var i = 0; i < 3; i++) {
                if (checkIsEqual(board[i][0], board[i][1], board[i][2])) {
                    return true;
                }
            }
            return false;
        };

        function checkColums(board: string[][]) {
            for (var i = 0; i < 3; i++) {
                if (checkIsEqual(board[0][i], board[1][i], board[2][i])) {
                    return true;
                }
            }
            return false;
        };
        
        function checkDiagonal(board: string[][]) {
            return (
                (checkIsEqual(board[0][0], board[1][1], board[2][2]))
                || (checkIsEqual(board[0][2], board[1][1], board[2][0])));
        };

        function checkIsEqual(pos1: string, pos2: string, pos3: string) {
            return (typeof pos1 !== "undefined" && pos1 === pos2 && pos2 === pos3)
        }


    };

    createMatrix(board: Board[]) {
        var boardGame: string[][] = [];
        for (var i = 0; i < 3; i++) {
            boardGame[i] = new Array(3);
        }

        board.map((cell: Board) => {
            boardGame[cell.position_x][cell.position_y] = cell.player;
        });

        return boardGame;
    }
};
export default MovementUtils;