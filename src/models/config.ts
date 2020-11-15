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

const root = fs.realpathSync('./');

export class Config {
    /**
     * Obtener configuración
     *
     * @returns Object
     * @memberof Config
     */
    get() {
        var data = fs.readFileSync(root + '/config.json', 'utf8');
        return JSON.parse(data);
    }
}