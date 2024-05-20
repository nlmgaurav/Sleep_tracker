# Sleep Tracker API

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following content:
4. Start the server: `node server.js`

## API Endpoints

### POST /sleep

- Adds a new sleep record.
- Request body:

```json
{
  "userId": "user123",
  "hours": 7,
  "timestamp": "2023-05-19T00:00:00.000Z"
}
```
