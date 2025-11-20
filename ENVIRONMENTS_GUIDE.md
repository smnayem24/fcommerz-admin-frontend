# ENVIRONMENT Variable Setup GUIDE

### 1. **bicitra-frontend/.env** (Customer Site)
```plaintext
NEXT_PUBLIC_SERVER=http://localhost:7000
USER_ID=unique-customer-id-here  # Different for each customer site
NEXTAUTH_SECRET=frontend-secret-key-123  # Same for all customer sites
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_JWT_SECRET=shared-jwt-secret-key  # Same for all customer sites
```

### 2. **bicitra-admin-template/.env** (Your Admin Panel)
```plaintext
NEXT_PUBLIC_SERVER=http://localhost:7000
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=admin-secret-key-789  # Different from frontend
NEXTAUTH_JWT_SECRET=shared-jwt-secret-key  # Same as frontend
```

### 3. **ekhone-backend/.env** (Backend)
```plaintext
MONGODB_CONNECTION_STRING=mongodb+srv://...
JWT_SECRET=shared-jwt-secret-key  # Same as frontend and admin
PORT=7000
```

### Key Points:
1. **Same JWT Secret**: Frontend, Admin, and Backend share the same `JWT_SECRET` for token verification.
2. **Unique NEXTAUTH_SECRET**: Each frontend and admin panel has its own `NEXTAUTH_SECRET`.
3. **Unique USER_ID**: Each customer site has a different `USER_ID` to identify the business.

### Workflow:
1. Customer logs in via frontend
2. Backend verifies credentials and issues a JWT
3. Frontend stores the JWT
4. Admin panel can verify the JWT using the shared secret

This setup ensures secure authentication across all components.