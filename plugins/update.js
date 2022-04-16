const simpleGit = require("simple-git")
const git = simpleGit()
const Matesa = require("../Utilis/events")
const Config = require("../config")
const Heroku = require("heroku-client")
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })
const sss = "```"
async function updateChecker() {
  await git.fetch()
  let commits = await git.log([Config.BRANCH + "..origin/" + Config.BRANCH])
  if (commits.total === 0) return false
  let newcommits = ""
  commits["all"].map((commit) => {
    newcommits += `🔹 *[ ${commit.date.substring(0, 10)} ] :* ${sss}${
      commit.message
    }${sss} <${commit.author_name}>\n`
  })
  return newcommits
}

Matesa.addCommand(
  { pattern: "update$", fromMe: true, desc: "Bot Güncellemesini Kontrol Et." },
  async (message, match) => {
    let isupdate = await updateChecker()
    if (!isupdate) return await message.sendMessage("*Bot güncel.*")
    return await message.sendMessage("*Yeni Güncellemeler*\n\n" + isupdate)
  }
)

Matesa.addCommand(
  {
    pattern: "update now$",
    fromMe: true,
    desc: "Güncel",
    dontAddCommandList: true,
  },
  async (message, match) => {
    let isupdate = await updateChecker()
    if (!isupdate)
      return await message.sendMessage(
        "*Bot güncel.*\n*Güncellenecek birşey yok.*"
      )
    if (Config.HEROKU.HEROKU) {
      await message.reply("```Güncelleniyor...```")
      try {
        var app = await heroku.get("/apps/" + Config.HEROKU.APP_NAME)
      } catch {
        await message.sendMessage(
          "*Geçersiz Heroku Ayrıntıları*\n*Heroku APP adını ve Heroku API anahtarını güncelleyin*"
        )
      }
      git.fetch("upstream", Config.BRANCH)
      git.reset("hard", ["FETCH_HEAD"])
      let git_url = app.git_url.replace(
        "https://",
        "https://api:" + Config.HEROKU.API_KEY + "@"
      )
      try {
        await git.addRemote("heroku", git_url)
      } catch {
        console.log("heroku remote ekli")
      }
      await git.push("heroku", Config.BRANCH)
      await message.sendMessage("*Güncellendi*")
    } else {
      git.pull(async (err, update) => {
        if (update && update.summary.changes) {
          await message.sendMessage("*Güncellendi*")
          exec("npm install").stderr.pipe(process.stderr)
        } else if (err) return await message.sendMessage(err)
      })
    }
  }
)

module.exports = { updateChecker }
