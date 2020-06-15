# venue-app

## installasi
- `npm install`
- PENTING!! konfigurasi MySQL 8.x
jika menggunakan mysql 8.x keatas
ke `node_modules > sequelize > lib > data-types.js` ganti variable `GeomFromText` ke `ST_GeomFromText`

## penggunaan
### development
- ganti .env dengan konfigurasi lokal
- `npm run dev:server`
- cek file `example.http` dan `test.http`, gunakan postman atau extensi vscode "REST CLIENT" untuk membuat request langsung dari file (highly recomended)
- menggunakan sequelize, tidak perlu buat tabel manual
### produksi
`npm start`

## Installasi client
- `npm install`
- `expo run android`
- change `BASE_URL` di folder `utils`

### limitation
- db integrity, venue bisa dimiliki user with role !renter
- ...
- ...