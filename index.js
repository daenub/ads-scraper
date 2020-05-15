import scrapers from "./scrapers"
import {getSearchQueries} from "./google"
import {sendResults} from "./mail"

(async () => {
  const searchQueries = await getSearchQueries()

  const scrapeRequests = searchQueries.reduce((acc, query) => {
    return acc.concat(query.reduce((acc, keyword) => {
      return acc.concat(scrapers.map(scraper => scraper(keyword)))
    }, []))
  }, [])

  const scrapeResults = await Promise.all(scrapeRequests)
  const resultsMarkup = scrapeResults.filter(r => r !== null).reduce((acc, r) => acc + r.join("")).join("")

  try {
    await sendResults(resultsMarkup)
    console.log("Success !")
  } catch (error) {
    console.error(error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
})()