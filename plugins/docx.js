const toPDF = require("custom-soffice-to-pdf")
const Matesa = require("../Utilis/events")
const { MessageType, Mimetype } = require("@adiwajshing/baileys")
const {
  banner,
  checkBroadCast,
  stylishTextGen,
  apkMirror,
  isUrl,
  getSticker,
  parsedJid,
  ticTacToe,
  deleteTicTacToe,
  isGameActive,
  genButtons,
  fontType,
  textToStylist,
} = require("../Utilis/Misc")
const Language = require("../language")
const { forwardOrBroadCast } = require("../Utilis/groupmute")
const { readMore } = require("../Utilis/download")
const { sticker } = require("../Utilis/fFmpeg")
const Lang = Language.getString("docx")
Matesa.addCommand(
  {
    pattern: "topdf",
    fromMe: true,
    desc: Lang.TOPDF_DESC,
    usage: Lang.TOPDF_USAGE,
  },
  async (message, match) => {
    if (!message.reply_message) return await message.sendMessage(Lang.REPLY_MSG)
    if (
      message.reply_message.audio ||
      message.reply_message.video ||
      message.reply_message.sticker ||
      message.reply_message.pdf
    )
      return message.sendMessage(Lang.NOT_SUPPORTED)
    toPDF(await message.reply_message.downloadMediaMessage()).then(
      async (pdfBuffer) => {
        return await message.sendMessage(
          pdfBuffer,
          {
            filename: Math.floor(Math.random() * 999999) + ".pdf",
            mimetype: Mimetype.pdf,
          },
          MessageType.document
        )
      },
      (err) => console.log(`topdf : ${err}`)
    )
  }
)

Matesa.addCommand(
  {
    pattern: "wasted",
    fromMe: true,
    desc: Lang.WASTED_DESC,
    usage: Lang.WASTED_USAGE,
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.REPLY)
    return await message.sendMessage(
      await banner(
        await message.reply_message.downloadAndSaveMediaMessage(),
        "wasted"
      ),
      {},
      MessageType.image
    )
  }
)

Matesa.addCommand(
  {
    pattern: "mission",
    fromMe: true,
    desc: Lang.WASTED_DESC,
    usage: Lang.WASTED_USAGE,
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.REPLY)
    return await message.sendMessage(
      await banner(
        await message.reply_message.downloadAndSaveMediaMessage(),
        "passed"
      ),
      {},
      MessageType.image
    )
  }
)

Matesa.addCommand(
  {
    pattern: "jail",
    fromMe: true,
    desc: Lang.WASTED_DESC,
    usage: Lang.WASTED_USAGE,
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.REPLY)
    return await message.sendMessage(
      await banner(
        await message.reply_message.downloadAndSaveMediaMessage(),
        "jail"
      ),
      {},
      MessageType.image
    )
  }
)

Matesa.addCommand(
  {
    pattern: "trigged",
    fromMe: true,
    desc: Lang.TRIGGERED_DESC,
    usage: Lang.TRGGERED_USAGE,
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.REPLY)
    return await message.sendMessage(
      await banner(
        await message.reply_message.downloadAndSaveMediaMessage(),
        "triggered"
      ),
      { mimetype: Mimetype.webp },
      MessageType.sticker
    )
  }
)

Matesa.addCommand(
  {
    pattern: "readmore ?(.*)",
    fromMe: true,
    desc: Lang.READMORE_DESC,
  },
  async (message, match) => {
    if (match || message.reply_message.text)
      await message.sendMessage(readMore(match || message.reply_message.text))
  }
)

Matesa.addCommand(
  { pattern: "broadcast ?(.*)", fromMe: true, desc: Lang.BROADCAST_DESC },
  async (message, match) => {
    let { msg, result, broadcast, status } = await checkBroadCast(match)
    if (status == false)
      return await message.sendMessage(Lang.BROADCAST_EXAMPLE)
    if (msg) return await message.sendMessage(msg)
    if (result)
      return await message.sendMessage(
        Lang.BROADCAST_SET.format(result, result)
      )
    if (!message.reply_message) return await message.sendMessage(Lang.REPLY_MSG)
    await message.client.sendMessage(
      message.client.user.jid,
      Lang.BROADCASTING.format(broadcast),
      MessageType.text
    )
    for (const jid of parsedJid(broadcast)) {
      await forwardOrBroadCast(jid, message)
    }
  }
)

Matesa.addCommand(
  { pattern: "apk ?(.*)", fromMe: true, desc: "apkmirror'dan apk indir" },
  async (message, match) => {
    let { type, buffer, name } = await apkMirror(match)
    if (type == "list")
      return await message.sendMessage(buffer, {}, MessageType.listMessage)
    else if (type == "button")
      return await message.sendMessage(buffer, {}, MessageType.buttonsMessage)
    else if (type == "text") return await message.sendMessage(buffer)
    else if (buffer != false)
      return await message.sendMessage(
        buffer,
        { filename: name, mimetype: type, quoted: message.data },
        MessageType.document
      )
    else return await message.sendMessage("*Bulunamadı!*")
  }
)

Matesa.addCommand(
  {
    pattern: "strs ?(.*)",
    fromMe: true,
    desc: "Download stickers.",
  },
  async (message, match) => {
    let url = isUrl(match)
    if (!url)
      return await message.sendMessage(
        "```Bana çıkartma paketi url'sini ver\nÖrnek``` https://getstickerpack.com/stickers/quby-pack-1"
      )
    let stickers = await getSticker(url)
    if (!stickers) return await message.sendMessage("*Not found!*")
    await message.sendMessage(
      "```" + `Downloading ${stickers.length} stickers` + "```"
    )
    for (let data of stickers) {
      await message.sendMessage(
        await sticker("str", data.url, data.type == "gif" ? 2 : 1),
        {},
        MessageType.sticker
      )
    }
  }
)

Matesa.addCommand(
  {
    pattern: "tictactoe ?(.*)",
    fromMe: true,
    desc: "TicTacToe Game.",
  },
  async (message, match) => {
    if (match == "end") {
      await deleteTicTacToe()
      return await message.sendMessage("*Oyun sona erdi*")
    }
    let isGame = await isGameActive()
    if (isGame.state)
      return await message.sendMessage(
        genButtons(["END"], isGame.msg, ""),
        { contextInfo: { mentionedJid: isGame.mentionedJid } },
        MessageType.buttonsMessage
      )
    let opponent =
      message.reply_message != false
        ? message.reply_message.jid
        : message.mention != false
        ? message.mention[0]
        : parsedJid(match)[0]
    if (!opponent || opponent == message.data.participant)
      return await message.sendMessage(
        "*Bir mesaja yanıt vererek veya bahsederek Rakibi seçin*"
      )
    let { msg, mentionedJid } = await ticTacToe(
      match,
      message.jid,
      message.data.participant,
      opponent
    )
    return await message.sendMessage(msg, { contextInfo: { mentionedJid } })
  }
)

Matesa.addCommand(
  {
    pattern: "fancy ?(.*)",
    fromMe: true,
    desc: "Verilen metinden süslü metinler oluşturur",
  },
  async (message, match) => {
    if (message.reply_message.text) {
      if (!match || isNaN(match) || match < 1 || match > 38)
        return await message.sendMessage("Yazı tipini seçin\n örn: fancy 7")
      return await message.sendMessage(
        textToStylist(message.reply_message.text, fontType(match))
      )
    }
    if (match)
      return await message.sendMessage("```" + stylishTextGen(match) + "```")
  }
)
/*
bold
sans-italic
bold-italic
sans
boldSans
boldItalic
script
cursive
oldEnglish
medieval
doubleStruck
mono
round
round-b
squares
invertedSquares
wideText
superscript
subscript
small-caps
coptic
wavy
flag
bentText
china
cyrilic-to-latin
upside-down
futureAlien
squiggle6
squiggle3
asianStyle
squiggle4
neon
currency
symbols
squiggle
upperAngles
taiViet
*/
