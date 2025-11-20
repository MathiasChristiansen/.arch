# Example Sprint - E-Commerce MVP Context

> **Purpose**: Complete project context for e-commerce MVP sprint
> **Usage**: Read this FIRST before claiming any RFC
> **Updates**: Last updated 2025-11-17 (sprint completed)

**Sprint Goal**: Build core e-commerce features with user management, product catalog, and shopping cart

---

## Database Schema

### Overview
- **Database Type**: PostgreSQL 15
- **Schema Location**: `migrations/`
- **ORM/Driver**: GORM v2
- **Migration Tool**: golang-migrate

### Tables

#### `users`
**Purpose**: User accounts and authentication

**Schema**:
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,  -- bcrypt hashed
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = true;
```

**Example Data**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "password_hash": "$2a$10$...",
  "created_at": "2025-11-15T10:00:00Z",
  "is_active": true,
  "email_verified": true
}
```

**Relationships**:
- Has one: `user_profiles` (one-to-one)
- Has many: `cart_items` (one-to-many)

---

#### `user_profiles`
**Purpose**: Extended user information

**Schema**:
```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'US',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
```

**Relationships**:
- Belongs to: `users` (one-to-one)

---

#### `products`
**Purpose**: Product catalog

**Schema**:
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  inventory_count INTEGER NOT NULL DEFAULT 0 CHECK (inventory_count >= 0),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_products_price ON products(price);
```

**Example Data**:
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "sku": "WIDGET-001",
  "name": "Premium Widget",
  "description": "High-quality widget for all your needs",
  "price": 29.99,
  "inventory_count": 150,
  "is_active": true
}
```

**Relationships**:
- Has many: `cart_items` (one-to-many)

---

#### `cart_items`
**Purpose**: Shopping cart contents

**Schema**:
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
```

**Relationships**:
- Belongs to: `users` (many-to-one)
- Belongs to: `products` (many-to-one)

---

### Entity Relationship Diagram

```mermaid
erDiagram
    users ||--o| user_profiles : has
    users ||--o{ cart_items : has
    products ||--o{ cart_items : "added to"
```

---

## Architecture Overview

### Technology Stack

**Backend**:
- **Language**: Go 1.21
- **Framework**: Chi v5 (HTTP router)
- **Database**: PostgreSQL 15
- **ORM**: GORM v2
- **Cache**: Redis 7 (sessions, cart)
- **Password Hashing**: bcrypt
- **JWT**: golang-jwt/jwt v5

**Infrastructure**:
- **Container**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions (planned for Sprint 2)

### Project Structure

```
ecommerce-mvp/
├── cmd/
│   └── api/
│       └── main.go           # Application entry point
├── internal/
│   ├── domain/              # Domain models and interfaces
│   │   ├── user.go
│   │   ├── product.go
│   │   └── cart.go
│   ├── service/             # Business logic
│   │   ├── auth_service.go
│   │   ├── user_service.go
│   │   ├── product_service.go
│   │   └── cart_service.go
│   ├── repository/          # Data access layer
│   │   ├── user_repository.go
│   │   ├── product_repository.go
│   │   └── cart_repository.go
│   ├── handler/             # HTTP handlers
│   │   ├── auth_handler.go
│   │   ├── user_handler.go
│   │   ├── product_handler.go
│   │   └── cart_handler.go
│   └── middleware/          # HTTP middleware
│       ├── auth.go
│       └── logging.go
├── migrations/              # Database migrations
│   ├── 001_create_users.up.sql
│   ├── 002_create_user_profiles.up.sql
│   └── ...
├── pkg/                     # Public libraries (if any)
└── docker-compose.yml       # Local development setup
```

### Architectural Patterns

**Clean Architecture**:
- **Domain layer**: Core business entities and interfaces
- **Service layer**: Business logic, no HTTP or database details
- **Repository layer**: Database operations, implements domain interfaces
- **Handler layer**: HTTP concerns, calls services

**Dependency Rule**: Inner layers don't depend on outer layers
- Domain → No dependencies
- Service → Depends on Domain
- Repository → Depends on Domain
- Handler → Depends on Domain, Service

---

## Key Architectural Decisions

### ADR-001: PostgreSQL for Primary Database
**Decision**: Use PostgreSQL 15 as primary database
**Rationale**:
- ACID compliance for transactional operations
- Rich indexing for product search
- JSON support for future extensibility
- Strong Go ecosystem (GORM)
**Impact**: All services use PostgreSQL; use GORM for database operations

### ADR-002: Clean Architecture Pattern
**Decision**: Structure code using Clean Architecture
**Rationale**:
- Clear separation of concerns
- Testable business logic
- Flexible for future changes (swap database, add GraphQL)
**Impact**: Follow layering: domain → service → repository/handler

### ADR-003: JWT for Authentication
**Decision**: Use JWT tokens with 1-hour expiry
**Rationale**:
- Stateless authentication
- Scales horizontally
- Standard Bearer token format
**Impact**: All protected endpoints require `Authorization: Bearer <token>` header

---

## API Contracts

### Authentication Endpoints

#### POST `/api/v1/auth/register`
**Purpose**: Register new user account

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Validation**:
- Email: Valid email format
- Password: Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number

**Response (201 Created)**:
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 3600
}
```

**Errors**:
- `400 Bad Request`: Validation failed
  ```json
  {
    "error": "validation_failed",
    "message": "Invalid email format",
    "details": ["email must be valid email address"]
  }
  ```
- `409 Conflict`: Email already exists
  ```json
  {
    "error": "email_exists",
    "message": "Email already registered"
  }
  ```

---

#### POST `/api/v1/auth/login`
**Purpose**: Authenticate user and get token

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200 OK)**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 3600
}
```

**Errors**:
- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Account not active or not verified

---

### Product Endpoints

#### GET `/api/v1/products`
**Purpose**: List products

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `active_only`: true/false (default: true)

**Response (200 OK)**:
```json
{
  "products": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "sku": "WIDGET-001",
      "name": "Premium Widget",
      "description": "High-quality widget",
      "price": 29.99,
      "inventory_count": 150,
      "is_active": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150
  }
}
```

---

#### POST `/api/v1/products`
**Purpose**: Create new product (admin only, not in this sprint)

---

### Cart Endpoints

#### GET `/api/v1/cart`
**Purpose**: Get current user's cart

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response (200 OK)**:
```json
{
  "items": [
    {
      "id": "770e8400-e29b-41d4-a716-446655440000",
      "product": {
        "id": "660e8400-e29b-41d4-a716-446655440000",
        "sku": "WIDGET-001",
        "name": "Premium Widget",
        "price": 29.99
      },
      "quantity": 2,
      "subtotal": 59.98
    }
  ],
  "total": 59.98,
  "item_count": 2
}
```

---

#### POST `/api/v1/cart/items`
**Purpose**: Add item to cart

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request**:
```json
{
  "product_id": "660e8400-e29b-41d4-a716-446655440000",
  "quantity": 2
}
```

**Response (201 Created)**:
```json
{
  "item": {
    "id": "770e8400-e29b-41d4-a716-446655440000",
    "product_id": "660e8400-e29b-41d4-a716-446655440000",
    "quantity": 2
  }
}
```

**Errors**:
- `400 Bad Request`: Invalid quantity or product_id
- `404 Not Found`: Product doesn't exist
- `409 Conflict`: Insufficient inventory

---

## Testing Requirements

### Test Structure

```
internal/
├── service/
│   ├── auth_service_test.go      # Unit tests with mocks
│   ├── user_service_test.go
│   └── ...
├── repository/
│   ├── user_repository_test.go   # Integration tests with testcontainers
│   └── ...
└── handler/
    ├── auth_handler_test.go      # Handler tests with httptest
    └── ...
```

### Testing Patterns

**Unit Tests (Services)**:
```go
func TestAuthService_Register(t *testing.T) {
    // Arrange
    mockRepo := &mocks.UserRepository{}
    service := NewAuthService(mockRepo)

    input := RegisterInput{
        Email:    "test@example.com",
        Password: "SecurePass123!",
    }

    mockUser := &domain.User{
        ID:    "test-id",
        Email: input.Email,
    }
    mockRepo.On("Create", mock.Anything, mock.AnythingOfType("*domain.User")).
        Return(nil).
        Run(func(args mock.Arguments) {
            user := args.Get(1).(*domain.User)
            user.ID = mockUser.ID
        })

    // Act
    user, token, err := service.Register(context.Background(), input)

    // Assert
    assert.NoError(t, err)
    assert.Equal(t, mockUser.ID, user.ID)
    assert.NotEmpty(t, token)
    mockRepo.AssertExpectations(t)
}
```

**Integration Tests (Repositories)**:
```go
func TestUserRepository_Create(t *testing.T) {
    // Arrange - start PostgreSQL container
    ctx := context.Background()

    postgres, err := testcontainers.GenericContainer(ctx,
        testcontainers.GenericContainerRequest{
            ContainerRequest: testcontainers.ContainerRequest{
                Image: "postgres:15",
                Env: map[string]string{
                    "POSTGRES_PASSWORD": "test",
                    "POSTGRES_DB":       "test",
                },
                ExposedPorts: []string{"5432/tcp"},
                WaitingFor:   wait.ForLog("database system is ready"),
            },
            Started: true,
        })
    require.NoError(t, err)
    defer postgres.Terminate(ctx)

    // Get connection string and create repository
    connStr := getConnectionString(t, postgres)
    db := setupDB(t, connStr)
    repo := repository.NewUserRepository(db)

    // Act
    user := &domain.User{
        Email:        "test@example.com",
        PasswordHash: "hashed",
    }
    err = repo.Create(ctx, user)

    // Assert
    assert.NoError(t, err)
    assert.NotEmpty(t, user.ID)
}
```

**Handler Tests**:
```go
func TestAuthHandler_Register(t *testing.T) {
    // Arrange
    mockService := &mocks.AuthService{}
    handler := NewAuthHandler(mockService)

    reqBody := `{"email":"test@example.com","password":"SecurePass123!"}`
    req := httptest.NewRequest(http.MethodPost, "/api/v1/auth/register",
        strings.NewReader(reqBody))
    req.Header.Set("Content-Type", "application/json")
    w := httptest.NewRecorder()

    mockUser := &domain.User{ID: "test-id", Email: "test@example.com"}
    mockService.On("Register", mock.Anything, mock.Anything).
        Return(mockUser, "token123", nil)

    // Act
    handler.Register(w, req)

    // Assert
    assert.Equal(t, http.StatusCreated, w.Code)

    var response map[string]interface{}
    json.NewDecoder(w.Body).Decode(&response)
    assert.Equal(t, "token123", response["access_token"])
}
```

### Coverage Requirements
- **Unit Tests**: 85%+ coverage
- **Integration Tests**: All repository methods
- **Handler Tests**: All endpoints (happy path + major errors)

---

## Code Patterns & Examples

### Error Handling

**Custom Error Types**:
```go
package domain

type NotFoundError struct {
    Resource string
    ID       string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s with ID %s not found", e.Resource, e.ID)
}

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}
```

**Error Handling in Services**:
```go
func (s *userService) GetByID(ctx context.Context, id string) (*domain.User, error) {
    user, err := s.repo.FindByID(ctx, id)
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, &domain.NotFoundError{Resource: "User", ID: id}
        }
        return nil, fmt.Errorf("failed to find user: %w", err)
    }
    return user, nil
}
```

**Error Responses in Handlers**:
```go
func respondError(w http.ResponseWriter, statusCode int, errType, message string) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteStatus(statusCode)
    json.NewEncoder(w).Encode(map[string]string{
        "error":   errType,
        "message": message,
    })
}

// Usage
var notFoundErr *domain.NotFoundError
if errors.As(err, &notFoundErr) {
    respondError(w, http.StatusNotFound, "not_found", err.Error())
    return
}
```

---

### Repository Pattern

**Domain Interface**:
```go
// internal/domain/user_repository.go
package domain

type UserRepository interface {
    Create(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id string) (*User, error)
    FindByEmail(ctx context.Context, email string) (*User, error)
    Update(ctx context.Context, user *User) error
    Delete(ctx context.Context, id string) error
}
```

**Repository Implementation**:
```go
// internal/repository/user_repository.go
package repository

type userRepository struct {
    db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
    return &userRepository{db: db}
}

func (r *userRepository) FindByID(ctx context.Context, id string) (*domain.User, error) {
    var user domain.User
    if err := r.db.WithContext(ctx).Where("id = ?", id).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

func (r *userRepository) Create(ctx context.Context, user *domain.User) error {
    return r.db.WithContext(ctx).Create(user).Error
}
```

---

### Service Pattern

```go
// internal/service/auth_service.go
package service

type AuthService interface {
    Register(ctx context.Context, input RegisterInput) (*domain.User, string, error)
    Login(ctx context.Context, input LoginInput) (string, error)
}

type authService struct {
    userRepo domain.UserRepository
    jwtSecret string
}

func NewAuthService(userRepo domain.UserRepository, jwtSecret string) AuthService {
    return &authService{
        userRepo: userRepo,
        jwtSecret: jwtSecret,
    }
}

func (s *authService) Register(ctx context.Context, input RegisterInput) (*domain.User, string, error) {
    // Validate input
    if err := input.Validate(); err != nil {
        return nil, "", err
    }

    // Check if email exists
    existing, _ := s.userRepo.FindByEmail(ctx, input.Email)
    if existing != nil {
        return nil, "", &domain.ValidationError{
            Field: "email",
            Message: "email already registered",
        }
    }

    // Hash password
    hashedPassword, err := bcrypt.GenerateFromPassword(
        []byte(input.Password),
        bcrypt.DefaultCost,
    )
    if err != nil {
        return nil, "", fmt.Errorf("failed to hash password: %w", err)
    }

    // Create user
    user := &domain.User{
        Email:        input.Email,
        PasswordHash: string(hashedPassword),
        IsActive:     true,
    }

    if err := s.userRepo.Create(ctx, user); err != nil {
        return nil, "", fmt.Errorf("failed to create user: %w", err)
    }

    // Generate JWT
    token, err := s.generateJWT(user.ID)
    if err != nil {
        return nil, "", fmt.Errorf("failed to generate token: %w", err)
    }

    return user, token, nil
}
```

---

### Handler Pattern

```go
// internal/handler/auth_handler.go
package handler

type AuthHandler struct {
    service service.AuthService
}

func NewAuthHandler(service service.AuthService) *AuthHandler {
    return &AuthHandler{service: service}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
    var input service.RegisterInput
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        respondError(w, http.StatusBadRequest, "invalid_request", "Invalid JSON")
        return
    }

    user, token, err := h.service.Register(r.Context(), input)
    if err != nil {
        var validationErr *domain.ValidationError
        if errors.As(err, &validationErr) {
            respondError(w, http.StatusBadRequest, "validation_failed", err.Error())
            return
        }
        respondError(w, http.StatusInternalServerError, "internal_error", "Internal server error")
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]interface{}{
        "user": map[string]interface{}{
            "id":    user.ID,
            "email": user.Email,
        },
        "access_token": token,
        "expires_in":   3600,
    })
}
```

---

## Dependencies & Infrastructure

### External Services
**None in MVP** - All functionality is self-contained

### Internal Services

**PostgreSQL 15**:
- **Port**: 5432
- **Database**: `ecommerce`
- **Usage**: Primary data store
- **Connection**: Via GORM with connection pooling (max 20 connections)

**Redis 7**:
- **Port**: 6379
- **Usage**: Session storage, cart caching
- **Key Patterns**:
  - `session:{token}` - User sessions (1h TTL)
  - `cart:{user_id}` - Cached cart data (24h TTL)

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=3600

# Server
PORT=8080
ENV=development
```

### Docker Compose Setup

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

---

## Common Gotchas

### 1. Always use context.Context
**Problem**: Database queries without context don't support timeouts/cancellation
**Solution**: Always pass `ctx context.Context` and use `WithContext(ctx)`

```go
// ❌ Bad
db.Where("id = ?", id).First(&user)

// ✅ Good
db.WithContext(ctx).Where("id = ?", id).First(&user)
```

### 2. Handle GORM ErrRecordNotFound
**Problem**: GORM returns specific error for not found
**Solution**: Check with `errors.Is(err, gorm.ErrRecordNotFound)`

```go
if err := db.WithContext(ctx).First(&user, id).Error; err != nil {
    if errors.Is(err, gorm.ErrRecordNotFound) {
        return nil, &domain.NotFoundError{Resource: "User", ID: id}
    }
    return nil, fmt.Errorf("database error: %w", err)
}
```

### 3. Password Hashing is Expensive
**Problem**: bcrypt is CPU-intensive
**Solution**: Use appropriate cost (default is 10, suitable for most cases)

```go
// Default cost (10) is fine for registration (happens rarely)
hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
```

### 4. JWT Token Expiry
**Problem**: Tokens never expire if not checked
**Solution**: Always validate expiry in JWT middleware

```go
claims := &Claims{}
token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
    return []byte(jwtSecret), nil
})

if err != nil || !token.Valid {
    return nil, fmt.Errorf("invalid token")
}

// Claims.ExpiresAt is automatically validated by jwt library
```

### 5. Unique Constraint Violations
**Problem**: Database returns cryptic error for duplicate emails
**Solution**: Check for unique constraint error and return friendly message

```go
if err := db.Create(&user).Error; err != nil {
    if strings.Contains(err.Error(), "unique constraint") {
        return &domain.ValidationError{
            Field: "email",
            Message: "email already registered",
        }
    }
    return fmt.Errorf("failed to create user: %w", err)
}
```

### 6. Cart Items with Zero Quantity
**Problem**: Users might try to add 0 or negative quantity
**Solution**: Validate in service layer before repository

```go
if input.Quantity <= 0 {
    return &domain.ValidationError{
        Field: "quantity",
        Message: "quantity must be positive",
    }
}
```

### 7. Product Inventory Race Condition
**Problem**: Multiple carts might try to add last item
**Solution**: Use database transaction and check inventory

```go
err := db.Transaction(func(tx *gorm.DB) error {
    var product domain.Product
    if err := tx.Where("id = ?", productID).First(&product).Error; err != nil {
        return err
    }

    if product.InventoryCount < quantity {
        return &domain.ValidationError{
            Field: "quantity",
            Message: "insufficient inventory",
        }
    }

    // Continue with cart item creation...
    return nil
})
```

---

## Quick Reference

### Run Commands
```bash
# Start all services
docker-compose up -d

# Run API server
go run cmd/api/main.go

# Run tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run specific test
go test -v ./internal/service -run TestAuthService_Register

# Run migrations
migrate -path migrations -database $DATABASE_URL up
```

### Useful Files
- Database migrations: `migrations/`
- Environment config: `.env`
- Docker setup: `docker-compose.yml`

---

**Sprint completed successfully with 100% RFC completion and 35% time savings through parallelization!**
