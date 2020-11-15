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

import * as bot from '../utils/bot';
import { Logger } from "../models/logger";
import { Config } from "../models/config";

const log = new Logger();
const config = new Config();

export class Bot {
    login() {
        return new Promise(function(resolve) {
            bot.client.login(config.get().DISCORD_TOKEN).then(() => {
                if(bot.client.guilds.cache.size > 0) {
                    log.info('[Discord] Bot conectado!');
                    resolve(true);
                } else {
                    log.info('[Discord] El bot no se ha podido conectar.');
                    resolve(false);
                }
            }).catch((error) => {
                log.error('[Discord] '+error);
            });
        });
    }
}