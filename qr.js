/* Copyright (C) 2020 Poyraz.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

MatesaWhatsapp - Poyraz
*/

const chalk = require('chalk');
const {WAConnection} = require('@adiwajshing/baileys');
const {StringSession} = require('./matesawhatsapp/');
const fs = require('fs');

async function MatesaWhatsapp () {
    const conn = new WAConnection();
    conn.version = [2,2119,6]
    const Session = new StringSession();  
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 30000;
    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Matesa')}
${chalk.white.italic('MatesaString Kodu Alıcı')}

${chalk.blue.italic('ℹ️  Whatsapp'a bağlanılıyor... Lütfen bekleyin.')}`);
    });
    

    conn.on('open', () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('Matesa String Kodunuz: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );
        
        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `MATESA_SESSION="${st}"`);
        }

        console.log(
            chalk.blue.bold('Locale kuruyorsanız node bot.js ile botu başlatabilirsiniz.')
        );
        process.exit(0);
    });

    await conn.connect();
}

MatesaWhatsapp ()
