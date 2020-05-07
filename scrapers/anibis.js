const https = require("https")
const jsdom = require("jsdom")
const {JSDOM} = jsdom

const SERVICE_URL = "https://www.anibis.ch/de/advertlist.aspx"
const SERIVCE_QUERY_KEY = "fts"

module.exports = function(query) {
  return new Promise((resolve, reject) => {
    if (!query) {
      reject("Please define a search query")
      return
    }

    let url =
      `${SERVICE_URL}?${SERIVCE_QUERY_KEY}=${encodeURIComponent(query)}`

    https.get(url, res => {
      let body = ""

      res.on("data", data => body += data)
      res.on("error", reject)
      res.on("end", () => {
        const dom = new JSDOM(body)
        const ads = Array.from(dom.window.document.querySelectorAll("article[class^='sc-10awqyf-0']"))

        results = ads.map(ad => {
          return {
            title: ad.querySelector("h2[class^='sc-']").textContent,
            price: ad.querySelector(".sc-1hmmkgo-0").textContent,
            meta: ad.querySelector(".sc-1aka2ao-0").textContent,
            link: "https://anibis.ch" + ad.children[0].href,
          }
        })

        resolve(results)
      })
    })
  })
}