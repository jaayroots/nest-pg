# NestJS Product API

A modern RESTful API built with **NestJS** and **Prisma ORM**, featuring:

- JWT Authentication
- Soft delete support (`deletedAt`)
- Blameable tracking (`deletedBy`)
- Prisma migrations
- Swagger documentation

---

## 📦 Features

- ✅ Register & login with JWT
- ✅ Create, retrieve, update, soft-delete products
- ✅ Automatically records who deletes each product (`deletedBy`)
- ✅ Prevents access to soft-deleted records
- ✅ Centralized response format (`ResponseDto`)
- ✅ Swagger UI integration
- ✅ `.env` driven configuration

---

## 🛠 Tech Stack

| Layer         | Tool                          |
|---------------|-------------------------------|
| Language      | TypeScript                    |
| Framework     | [NestJS](https://nestjs.com/) |
| ORM           | [Prisma](https://www.prisma.io/) |
| Database      | PostgreSQL                    |
| Auth          | JWT via Passport              |
| Docs          | Swagger/OpenAPI               |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/product-api.git
cd product-api
```


### 2. Setup Environment Variables

Create a `.env` file in the root directory of your project with the following content:

```env
# Database connection URL (adjust username, password, host, port, and database name)
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# JWT secret key used for signing tokens
JWT_SECRET=supersecret

# JWT expiration time (supports duration strings like '3d' for 3 days)
JWT_EXPIRES_IN=3d

# Application timezone (optional, defaults to UTC)
APP_TIMEZONE=Asia/Bangkok
```

### 3. Install Dependencies

Install all required packages using npm or yarn:

```bash
npm install
# or
yarn install
```
### 4. Run Migrations

Run the database migrations to create or update your schema:

```bash
npx prisma migrate deploy
```

### Run the App

Start the NestJS application locally with:

```bash
npm run start:dev
```

