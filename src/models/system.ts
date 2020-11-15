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

import fs from 'fs';
import path from 'path';
import { Logger } from "../models/logger";

const log = new Logger();
const root = fs.realpathSync('./dist');

export class System {
    start() {
        log.info('');
        log.info('Iniciando módulos del bot...');
        const files = fs.readdirSync(path.join(root, `/modules`));
        const filterFiles = files.filter(x => x.includes('.js'));
        let modulesLoaded = 0;
        for(let f = 0; f < filterFiles.length; f++) {
            const newPath = `../modules/${filterFiles[f]}`;
            import(newPath).then(res => {
                if(res) {
                    log.debug(`[Module] ${filterFiles[f]} (Cargado)`);
                }
            }).catch(error => {
                log.error(`Algo no funciona en el módulo ${filterFiles[f]}`);
                log.error(error);
            });
            modulesLoaded++;
            if(modulesLoaded == filterFiles.length) {
                log.info(``);
                log.info(`Módulos iniciados correctamente!`);
            }
        }
    }
}