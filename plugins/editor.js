const Matesa = require("../Utilis/events")
const { photoEditor, menu } = require("../Utilis/editors")
const { getBuffer } = require("../Utilis/download")
const { MessageType } = require("@adiwajshing/baileys")
const Language = require("../language")
const Lang = Language.getString("ocr")
const fm = true

Matesa.addCommand(
  {
    pattern: "skull",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Kafatası Fotoğraf düzenleyicisi.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "skull"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)
Matesa.addCommand(
  {
    pattern: "sketch",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Fotoğraf düzenleyicisi eskiz.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "sketch"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "pencil",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "kalem Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "pencil"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "color",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "renkli Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "color"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "kiss",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "fotoğraf düzenleyiciyi öp.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "kiss"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "bokeh",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "bokeh Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "bokeh"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "wanted",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Aranıyor Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "wanted"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "look",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatik Görünümlü Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "look"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "gandm",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatik Görünümlü Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "gandm"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "dark",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatik Görünümlü Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "dark"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "makeup",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatik Görünümlü Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "makeup"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)

Matesa.addCommand(
  {
    pattern: "cartoon",
    fromMe: fm,
    dontAddCommandList: true,
    desc: "Dramatik Görünümlü Fotoğraf düzenleyici.",
  },
  async (message, match) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(Lang.NEED_REPLY)
    const { status, result } = await photoEditor(
      await message.reply_message.downloadAndSaveMediaMessage(),
      "cartoon"
    )
    if (!status) return await message.sendMessage(`*${result}*`)
    const { buffer } = await getBuffer(result)
    return await message.sendMessage(buffer, {}, MessageType.image)
  }
)
Matesa.addCommand(
  { pattern: "editor", fromMe: fm, desc: Lang.EDITOR },
  async (message, match) => {
    return await message.sendMessage(menu(), {}, MessageType.listMessage)
  }
)
