# venue-app

## installasi
`npm install`

## penggunaan
### development
- ganti .env dengan konfigurasi lokal
- `npm run dev:server`
- cek file `example.http`, gunakan postman atau extensi vscode "REST CLIENT" untuk membuat request langsung dari file (highly recomended)
- menggunakan sequelize, tidak perlu buat tabel manual
### produksi
`npm start`

### limitation
- db integrity, venue bisa dimiliki user with role !renter