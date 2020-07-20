# venue-app

We've noticed that there was no venue booking app in Indonesia. Some big companies, like bridestory implement the similiar idea, but we have to manually ask the rentee for the availabilty and booking. So I decided to create this app.

Built within 10 workdays, this app by no mean to be used for production (think of it as hackaton style app), but this app demonstrate how to build an app from scratch, from front to back, from a business model to database design and code. 

## Features


## Installation
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

### limitation a.k.a TODO
- db integrity, venue bisa dimiliki user with role !renter
- ...
- ...
- comment model
- add package image
