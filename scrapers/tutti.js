import https from "https"
import jsdom from "jsdom"
const {JSDOM} = jsdom

const SERVICE_URL = "https://www.tutti.ch/de/li/ganze-schweiz"
const SERIVCE_QUERY_KEY = "q"

export default function(query) {
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
        const ads = Array.from(dom.window.document.querySelectorAll("[data-automation='component-ad']"))

        results = ads.map(ad => {
          return {
            title: ad.querySelector("[class^='Ad__title']").textContent,
            price: ad.querySelector("[class^='Ad__price']").textContent,
            location: ad.querySelector("[class^='Ad__location_info']").textContent,
            date: ad.querySelector("[class^='Ad__date']").textContent,
            link: "https://tutti.ch" + ad.querySelector("[class^='Ad__link']").href,
          }
        })

        resolve(results)
      })
    })
  })
}