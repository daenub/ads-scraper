import {loadCredentials} from "./index"

async function authorizeApp() {
  try {
    await loadCredentials()
    console.log("Success!")
  } catch (err) {
    console.error("There went something wrong with authorizing the app", err)
  }
}

authorizeApp()
