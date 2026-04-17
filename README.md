# Backend Programming Template (2025)

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

## Add New API Endpoints

1. Create a new database schema in `./src/models`.
2. Create a new folder in `./src/api/components` (if needed). Remember to separate your codes to repositories, services, controllers, and routes.
3. Add the new route in `./src/api/routes.js`.
4. Test your new endpoints in the API client app.

## Cara akses Gacha Endpoints

membuat sistem gacha dan daapat meminta histori,sisa kuota ahdiah, dan daftar pemenang

1. Melakukan Roll Gacha
   Endpoint: `POST: localhost:5000/api/gacha/roll`
   Input (Body JSON)raw :
   { "email": "user@gmail.com" }
   ```
   Fungsi : Melakukan undian gacha, memotong kuota harian, serta memberikan hadiah secara acak sesuai probabilitas.

2. Minta History Gacha User
   Endpoint: `GET: localhost:5000/api/gacha/history?email=user@gmail.com`
   Parameter berupa URL: `?email=user@gmail.com`
   Fungsi: Menampilkan riwayat gacha dari user yang bersangkutan (sesuai dengan email)

3. Meminta Sisa Kuota Hadiah
   Endpoint: `GET: localhost:5000/api/gacha/prizes`
   Fungsi: Menampilkan jumlah stok daftar hadiah yang belum di dapat user(sisa kuota hadiah)

4. Meminta List Daftar Pemenang Acak Dengan Sensor Nama
   Endpoint:`GET: localhost:5000/api/gacha/winners`
   Fungsi: Menampilkan daftar user yang memenangkan hadiah dengan nama yang disamarkan secara acak
