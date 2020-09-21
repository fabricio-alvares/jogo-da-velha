import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';

chai.use(chaiHttp);

describe('Testes de requisição', () => {

    var id: string;
    var player: string;

    it('New Game', (done) => {
        chai.request(server)
            .post('/game')
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).have.property('id');
                chai.expect(res.body).have.property('firstPlayer');

                id = res.body.id;
                player = res.body.firstPlayer;

                done();
            })
    });

    it("New Movement", (done) => {
        var newMovement = {
            player: player,
            position: {
                "x": 2,
                "y": 2
            }
        }

        chai.request(server)
            .post(`/game/${id}/movement`)
            .send(newMovement)
            .end((err, res) => {
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).have.property('player');
                chai.expect(res.body).have.property('position');
                done();
            })
    });
});