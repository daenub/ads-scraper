# 🕵🏻‍♂️ ads-scraper

This scraper fetches search queries from a google spreadsheet, scrapes tutti.ch and anibis.ch and sends the results via e-mail.

## Installation
```
git clone git@github.com:daenub/ads-scraper
yarn
```

## Configuration
Before you can use the scraper you have to create e `.env` File in the root directory with the following values.
```
SPREADSHEET_ID= # id of the google spreadsheet
SPREADSHEET_RANGE="Gear!A2:B" # Range of the spreadsheeet that contains all the search queries
SENDGRID_API_KEY= # Sendgrid API key
MAIL_RECIPIENTS=mail@example.com or "mail@example.com,mail+2@example.com"
MAIL_SENDER=from@example.com
```

## Authentication
To authenticate this app with your google account you have to run the follwing yarn script. This will store all the credentials in the `/credentials.json` file. So this only needs to be called once.
```
 yarn run auth
```

## Spreadsheet
Every cell of the defined range inside the spreadsheet will be used as a search query.
You can also use a semicolon `;` as a delimiter inside a cell to split the text into separate queries.

## Run the scraper

```
yarn run start
```