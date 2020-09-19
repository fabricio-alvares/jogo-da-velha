import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('movement', table => {

        table.increments('id').primary();

        table.string('game_id')
            .notNullable()
            .references('id')
            .inTable('game');

        table.string('player').notNullable();

        table.string('position').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('movement');
}