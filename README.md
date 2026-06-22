# TuNguyen Beauty

Hệ thống bán mỹ phẩm gồm:

- Backend API (NestJS + PostgreSQL + Prisma)
- Admin Dashboard (React + Vite)
- Mobile App (React Native + Expo)

---

## Công nghệ sử dụng

### Backend

- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Firebase Admin SDK
- Cloudinary

### Admin Dashboard

- React
- TypeScript
- Vite
- Ant Design

### Mobile App

- React Native
- Expo
- TypeScript

---

# Cấu trúc dự án

```text
TuNguyen-Beauty-E/

├── admin-api/
├── admin-fe/
└── fe/
```

---

# Yêu cầu môi trường

- Node.js >= 20
- PostgreSQL >= 15
- npm >= 10

---

# Backend Setup

## 1. Cài đặt package

```bash
cd admin-api
npm install
```

## 2. Tạo file .env

Tạo file dựa vào file .env.example có sẵn

```text
backend/.env
```

## 3. Firebase Admin SDK

Truy cập Firebase Console:

Project Settings → Service Accounts → Generate New Private Key

Tải file JSON và đặt tại:

```text
backend/src/config/firebase-adminsdk.json
```

Ví dụ:

```text
backend
└── src
    └── config
        └── firebase-adminsdk.json
```

Lưu ý:

- Không commit file này lên GitHub.
- File này bắt buộc để xác thực Firebase Admin SDK.

## 4. Chạy backend

```bash
npm run start:dev
```

Backend mặc định:

```text
http://localhost:3000
```

---

# Admin Dashboard Setup

## 1. Cài package

```bash
cd admin-fe
npm install
```

## 2. Tạo file .env dựa vào file .env.example có sẵn

## 3. Chạy project

```bash
npm run dev
```

Mặc định:

```text
http://localhost:5173
```

---

# Mobile App Setup

## 1. Cài package

```bash
cd fe
npm install
```

## 2. Tạo file .env dựa vào file .env.example có sẵn

Ví dụ:

```env
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000
```

Lưu ý:

- Điện thoại và máy tính phải cùng mạng WiFi.
- Backend phải đang chạy.

## 3. Chạy Expo

```bash
npx expo start
```

Quét QR Code bằng Expo Go.

---

# Build

## Backend

```bash
npm run build
```

## Admin Dashboard

```bash
npm run build
```

## Mobile

```bash
eas build
```

---

# Tài khoản quản trị

Tạo trực tiếp trong database hoặc seed dữ liệu.

---

# Lưu ý bảo mật

Không commit:

```text
.env
firebase-adminsdk.json
```

Các file trên đã được thêm vào .gitignore.

---

# Tác giả

Trinh Tran

Backend Developer | Full-stack Developer
