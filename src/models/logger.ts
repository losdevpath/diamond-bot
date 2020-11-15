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
import dateFormat from 'dateformat';
import { DiamondEvents } from "../utils/events";

const root = fs.realpathSync('./');
const diamond = new DiamondEvents();

var debug:boolean = false;
var discord:boolean = false;
var numLog:number = 0;

export class Logger {
	/**
	 * Cargar configuración
	 *
	 * @memberof Logger
	 */
	load() {
		return new Promise((resolve) => {
			this.createFolder(root + '/logs/info');
			this.createFolder(root + '/logs/debug');
			this.createFolder(root + '/logs/error');
			this.logNumber(root + '/logs/info');
			this.logNumber(root + '/logs/debug');
			this.logNumber(root + '/logs/error');
			this.createFile('info');
			this.createFile('debug');
			this.createFile('error');
			resolve();
		});
	}
	/**
	 * Log de información
	 *
	 * @param {string} message
	 * @memberof Logger
	 */
	info(message:any) {
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		let time = dateFormat(new Date(), "HH:MM:ss");
		var file = root + `/logs/info/${date}_${numLog}.log`;
		var message_formated = `[${time}] [INFO] ${message}`;
		fs.appendFile(file, message_formated + '\n', (error) => {
			if(error) { console.log(error); return; }
			console.log(message_formated);
		});
	}
	/**
	 * Log de debug
	 *
	 * @param {string} message
	 * @memberof Logger
	 */
	debug(message:any) {
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		let time = dateFormat(new Date(), "HH:MM:ss");
		var file = root + `/logs/debug/${date}_${numLog}.log`;
		var message_formated = `[${time}] [DEBUG] ${message}`;
		fs.appendFile(file, message_formated + '\n', (error) => {
			if(error) { console.log(error); return; }
			console.log(message_formated);
		});
	}
	/**
	 * Log de error
	 *
	 * @param {string} message
	 * @memberof Logger
	 */
	error(message:any) {
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		let time = dateFormat(new Date(), "HH:MM:ss");
		var file = root + `/logs/error/${date}_${numLog}.log`;
		var message_formated = `[${time}] [ERROR] ${message}`;
		fs.appendFile(file, message_formated + '\n', (error) => {
			if(error) { console.log(error); return; }
			console.log(message_formated);
		});
	}
	/**
	 * Crear carpeta si no existe
	 *
	 * @param {string} folder
	 * @memberof Logger
	 */
	createFolder(folder:string) {
		fs.mkdir(folder, { recursive: true }, e => {
			if(e) { console.error(e); }
		});
	}
	/**
	 * Establecer número de log
	 *
	 * @param {string} path
	 * @memberof Logger
	 */
	logNumber(path:string) {
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		fs.readdir(path, function(error, files) {
			let count = 0;
			if(files) {
				files.forEach(file => {
					if(file.includes(date)) {
						count++;
					}
				});
			}
			numLog = count;
		});
	}
	/**
	 *
	 *
	 * @memberof Logger
	 */
	createFile(file:any) {
		let date = dateFormat(new Date(), "yyyy-mm-dd");
		var createFile = root + `/logs/${file}/${date}_${numLog}.log`;
		fs.writeFile(createFile, '', function (error) {
			if(error) { console.log(error); }
		});
	}
}