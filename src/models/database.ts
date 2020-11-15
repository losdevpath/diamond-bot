/*
* 
*            ____ _                                  ________      __   
*           |  _ \_)                                | | ___ \     | |  
*          | | | |_  __ _ _ __ ___   ___  _ __   __| | |_/ / ___ | |_ 
*         | | | | |/ _` | '_ ` _ \ / _ \| '_ \ / _` | ___ \/ _ \| __|
*        | |/ /| | (_| | | | | | | (_) | | | | (_| | |_/ / (_) | |_ 
*       |___/ |_|\__,_|_| |_| |_|\___/|_| |_|\__,_\____/ \___/ \__|
*
*        Name          Diamond Bot
*        Author        Lucas O.S.
*        Contact       losdevpath@gmail.com
*        Github        https://github.com/losdevpath
*        Copyright     2020 (c) LOSDEV
*        License       MIT License
*
*/

import mysql from 'mysql';
import { Bot } from "../models/bot";
import { Logger } from "../models/logger";
import { Config } from "../models/config";

const bot = new Bot();
const log = new Logger();
const config = new Config();

/* Crear poll de mysql */
const pool = mysql.createPool({
    host: config.get().MYSQL_HOST,
    user: config.get().MYSQL_USER,
    port: config.get().MYSQL_PORT,
    password: config.get().MYSQL_PASSWORD,
    database: config.get().MYSQL_DATABASE,
    acquireTimeout: 40000,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});

export class Database {
    /**
     * Conectar con la base de datos
     *
     * @memberof Database
     */
    start() {
        pool.getConnection((error:any, connection:any) => {
            if(error) {
                switch(error.code) {
                    case "ER_CON_COUNT_ERROR":
                        log.error(`[MySQL] [ER_CON_COUNT_ERROR] La base de datos tiene demasiadas conexiones.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                    case "PROTOCOL_CONNECTION_LOST":
                        log.error(`[MySQL] [PROTOCOL_CONNECTION_LOST] La conexión ha sido cerrada.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                    case "ECONNREFUSED":
                        log.error(`[MySQL] [ECONNREFUSED] No se puede conecta a la base de datos. Comprueba los detalles de conexión.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                    case "ER_BAD_DB_ERROR":
                        log.error(`[MySQL] [ER_BAD_DB_ERROR] La base de datos que has introducido no existe.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                    case "ER_ACCESS_DENIED_ERROR":
                        log.error(`[MySQL] [ER_ACCESS_DENIED_ERROR] Comprueba los datos de usuario de MySQL.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                    case "ENOENT":
                        log.error(`[MySQL] [ENOENT] No hay conexión a internet.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                    case "ETIMEDOUT":
                        log.error(`[MySQL] [ETIMEDOUT] Tiempo de conexión terminado.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                    default:
                        log.error(`[MySQL] [NO_CODE] Error no identificado.`);
                        log.debug(`[MySQL-ERROR] ${JSON.stringify(error)}`);
                        process.exit(1);
                }
            } else {
                if(connection) { connection.release(); }
                log.info('');
                log.info('[MySQL] Base de datos conectada!');
                bot.login();
            }
        });
    }
    /**
     * Muestra los datos de una tabla
     *
     * @param {*} table
     * @param {*} where
     * @param {*} values
     * @returns Array[boolean, result] / reject: error
     * @memberof DB
     */
    select(table:string , where:any, values:any) {
        return new Promise((resolve, reject) => {
            if(where == null) {
                pool.query(`SELECT * FROM ${table}`, (error, results, fields) => {
                    if(error) { log.error("[DB/Select] " + error); reject(error); }
                    if(results[0]) {
                        resolve([true, results]);
                    } else {
                        resolve([false, null]);
                    }
                });
            } else {
                pool.query(`SELECT * FROM ${table} WHERE ${where}`, values, (error, results, fields) => {
                    if(error) { log.error("[DB/Select] " + error); reject(error); }
                    if(results[0]) {
                        resolve([true, results]);
                    } else {
                        resolve([false, null]);
                    }
                });
            }
        });
    }
    /**
     * Inserta datos en una tabla
     *
     * @param {string} table
     * @param {*} values
     * @returns resolve: true / reject: error
     * @memberof DB
     */
    insert(table:string, values:any) {
        return new Promise((resolve, reject) => {
            pool.query(`INSERT INTO ${table} SET ?`, values, (error, result, fields) => {
                if(error) { log.error("[DB/Insert] " + error); reject(error); }
                resolve(true);
            });
        });
    }
    /**
     * Actualiza los datos de una tabla
     *
     * @param {string} table
     * @param {string} where
     * @param {*} values
     * @returns resolve: true / reject: error
     * @memberof DB
     */
    update(table:string, columns:string, where:string) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE ${table} SET ${columns} WHERE ${where}`, (error, result, fields) => {
                if(error) { log.error("[DB/Update] " + error); reject(error); }
                resolve(true);
            });
        });
    }
    /**
     * Elimina datos de una tabla
     *
     * @param {string} table
     * @param {string} where
     * @param {*} values
     * @returns resolve: true / reject: error
     * @memberof DB
     */
    remove(table:string, where:string, values:any) {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM ${table} WHERE ${where}`, values, (error, result, fields) => {
                if(error) { log.error("[DB/Remove] " + error); reject(error); }
                resolve(true);
            });
        });
    }
}