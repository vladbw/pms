## Deployed demo
https://pms-nu-orpin.vercel.app

## Project Structure
```
pms/
  frontend/    # React + TypeScript client
  backend/     # .NET 9 REST API
  populateDb.js  # Helper script to populate the db with entries
```

## Dependencies
- Node.js v18 or higher
- .NET 9 SDK

## Running Locally

**Backend:**
```bash
cd backend/Pms.Api
dotnet restore
dotnet run
```
The Api is running on `http://localhost:5104`. The db is created automatically on the first run.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
App will be available at `http://localhost:5173`.

**Seed the database (optional):**
```bash
node populateDb.js
```