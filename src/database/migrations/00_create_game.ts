import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('game', table => {
        table.string('id').primary();
        table.string('firstPlayer').notNullable();
        table.string('turnPlayer').notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('game');
}