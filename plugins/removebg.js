/* Copyright (C) 2020 Poyraz.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

MatesaWhatsapp - Poyraz
*/

const Matesa = require("../Utilis/events")
const { MessageType, Mimetype } = require("@adiwajshing/baileys")
const Language = require("../language")
const config = require("../config")
const { removeBg } = require("../Utilis/download")
const Lang = Language.getString("removebg")
let fm = true

Matesa.addCommand(
  { pattern: "removebg", fromMe: fm, desc: Lang.REMOVEBG_DESC },
  async (message, match) => {
    if (config.REMOVEBG == "null" || config.REMOVEBG == "false")
      return await message.sendMessage('```' +
      `1. Remove.bg'de bir hesap oluşturun
2. Hesabınızı doğrulayın.
3. Anahtarınızı kopyalayın.
4. .setvar REMOVEBG_KEY:copied_key
.......................

Örnek => .setvar REMOVEBG_KEY:GWQ6jVy9MBpfYF9SnyG8jz8P
      
Bu adımları kolaylaştırmak için
KAYDOL BAĞLANTISI'na tıklayın ve Google a/c'yi seçin
kayıt işlemini tamamladıktan sonra
ANAHTAR BAĞLANTISI'na tıklayın ve ANAHTARI kopyalayın.(Göster DÜĞMESİNE basın)

KAYIT BAĞLANTISI : https://accounts.kaleido.ai/users/sign_up 

ANAHTAR BAĞLANTISI : https://www.remove.bg/dashboard#api-key` + '```')
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_PHOTO)
    let location = await message.reply_message.downloadMediaMessage()
    let buffer = await removeBg(location, config.REMOVEBG)
    if (typeof buffer == "string") {
      if (buffer.includes("403")) return await message.sendMessage(Lang.RBGING)
      else if (buffer.includes("402"))
        return await message.sendMessage(Lang.LIMIT)
      else return await message.sendMessage(buffer)
    }
    return await message.sendMessage(
      buffer,
      { quoted: message.quoted, mimetype: Mimetype.png },
      MessageType.image
    )
  }
)
