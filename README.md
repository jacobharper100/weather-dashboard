# 🌧️ Weather Dashboard 🌤️

A dashboard web-app for displaying weather API data.

## Instructions

0. Download and install the following tools:
    - [Node.js](https://nodejs.org/en/download/): the JavaScript runtime *(consider using the version manager [nvm](https://github.com/nvm-sh/nvm))*.
    - [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm): the Node package manager.
    - [mongodb](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/): the database system. *Make sure that you start the `mongod` service as well.*
1. Clone project and run `npm install`
2. Launch development client and server with `npm run dev`
3. Navigate to `localhost:8080`

### Adding a Service
*Note: only openweathermap.org is currently supported.*

Each station specifies an API to hook into. In order to fetch data from the specified API, a Service object must be registered in the database. This object holds all of the necessary information to interact with a web API. See [Database Management](#database-management) for object structure.

## Configuration

Server configurations are made via the `.env` file in the top-level directory. *You must create this file yourself.* The following settings are available:

| Key              | Value            | Example          |
| ---------------- | ---------------- | ---------------- |
| `DB_HOST`        | Database connection host address | `127.0.0.1` |
| `DB_PORT`        | Database connection port | `27017` |
| `DB_USER`        | Username for database authentication | `server` |
| `DB_PASS`        | Password for database authentication | `p4ssW0rd!` |

## Database Management

The server uses the `weather-dashboard` database for storing the following collections:

**stations**
```
Station {
    station_name: String,       // station name
    station_api: String,        // API service domain (must match a Service.domain)
    station_location: String,   // query location
    station_online: Boolean     // online flag
}
```

**services**
```
Service {
    domain: String,     // web service domain name
    api_url: String,    // API endpoint
    access_key: String, // API access key
    cron_time: String   // scheduling time. See: https://github.com/kelektiv/node-cron#available-cron-patterns
}
```
