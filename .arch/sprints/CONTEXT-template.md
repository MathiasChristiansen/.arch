# Sprint N - Context Document

> **🚨 THIS IS A TEMPLATE - CUSTOMIZE FOR YOUR PROJECT 🚨**
>
> **How to use this template:**
> 1. **Replace placeholders** with YOUR actual project info (marked with `[REPLACE:...]`)
> 2. **Delete sections you don't use** (no Redis? Delete that section)
> 3. **Copy YOUR code** for examples (don't leave Go examples if you use Python!)
> 4. **See real example**: [../example-sprint/CONTEXT.md](../example-sprint/CONTEXT.md) (Go+PostgreSQL)
>
> **Current examples use Go + PostgreSQL** - these are PLACEHOLDERS. If you use:
> - **Node.js + MongoDB**: Replace with JavaScript/Mongoose examples
> - **Python + MySQL**: Replace with Python/SQLAlchemy examples
> - **Any other stack**: Replace with YOUR patterns in YOUR language
>
> The goal is to document **YOUR** project so parallel agents don't have to guess!

---

> **Purpose**: This document provides comprehensive context for all agents working on this sprint.
> **Usage**: Read this FIRST before claiming any RFC to ensure you understand the project state.
> **Updates**: Architects should update this as new ADRs are created or architecture changes.

**Last Updated**: [REPLACE: YYYY-MM-DD]
**Sprint Goal**: [REPLACE: High-level objective from sprint-N.md]

---

## Table of Contents
1. [Database Schema](#database-schema)
2. [Architecture Overview](#architecture-overview)
3. [Key Architectural Decisions](#key-architectural-decisions)
4. [API Contracts](#api-contracts)
5. [Testing Requirements](#testing-requirements)
6. [Code Patterns & Examples](#code-patterns--examples)
7. [Dependencies & Infrastructure](#dependencies--infrastructure)
8. [Common Gotchas](#common-gotchas)

---

## Database Schema

> **[REPLACE THIS SECTION]** with YOUR database information. Delete the SQL examples below if you use NoSQL!

### Overview
- **Database Type**: [REPLACE: PostgreSQL 15 | MongoDB 6 | MySQL 8 | etc.]
- **Schema Location**: [REPLACE: `migrations/` or `docs/schema/`]
- **ORM/Driver**: [REPLACE: GORM | Prisma | TypeORM | Mongoose | etc.]
- **Migration Tool**: [REPLACE: golang-migrate | Prisma Migrate | etc.]

### Tables/Collections

> **[REPLACE BELOW]** with YOUR tables. These are PostgreSQL examples - use YOUR database's format!

#### `users` [REPLACE: table name]
**Purpose**: [REPLACE: User accounts and authentication]

**Schema**:
```sql
[REPLACE THIS SQL with YOUR schema - or use JSON for NoSQL databases]

-- Example for PostgreSQL (REPLACE with your schema):
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_login TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

**Example Data**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "full_name": "John Doe",
  "created_at": "2025-11-20T10:00:00Z",
  "is_active": true
}
```

**Relationships**:
- Has many: `projects` (one-to-many)
- Has many: `sessions` (one-to-many)

---

#### `projects`
**Purpose**: User projects/workspaces

**Schema**:
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active', -- active, archived, deleted
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
```

**Relationships**:
- Belongs to: `users` (many-to-one)
- Has many: `tasks` (one-to-many)

---

#### Additional Tables
(Add all other critical tables following the same format)

### Entity Relationship Diagram

```mermaid
erDiagram
    users ||--o{ projects : owns
    users ||--o{ sessions : has
    projects ||--o{ tasks : contains
    tasks }o--|| users : assigned_to
```

---

## Architecture Overview

### Technology Stack

**Backend**:
- **Language**: Go 1.21+ | TypeScript 5+ | Python 3.11+ | etc.
- **Framework**: Chi | Express | FastAPI | Gin | etc.
- **Database**: PostgreSQL 15 | MongoDB 6 | etc.
- **Cache**: Redis 7
- **Message Queue**: RabbitMQ | Kafka | etc.

**Frontend**:
- **Language**: TypeScript 5+
- **Framework**: React 18 | Vue 3 | Svelte | Next.js 14 | etc.
- **State Management**: Zustand | Redux Toolkit | Pinia | etc.
- **UI Library**: Tailwind CSS | Material-UI | Shadcn/ui | etc.
- **Build Tool**: Vite | Next.js | etc.

**Infrastructure**:
- **Container**: Docker
- **Orchestration**: Docker Compose | Kubernetes | etc.
- **CI/CD**: GitHub Actions | GitLab CI | etc.
- **Hosting**: AWS | GCP | Azure | Vercel | etc.

### Project Structure

```
project-root/
├── backend/                # Backend application
│   ├── cmd/               # Main applications
│   │   └── api/          # API server entry point
│   ├── internal/          # Private application code
│   │   ├── domain/       # Domain models and interfaces
│   │   ├── service/      # Business logic
│   │   ├── repository/   # Data access layer
│   │   ├── handler/      # HTTP handlers
│   │   └── middleware/   # HTTP middleware
│   ├── pkg/              # Public libraries
│   └── migrations/       # Database migrations
├── frontend/              # Frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/     # API clients
│   │   └── stores/       # State management
│   └── public/           # Static assets
├── docs/                  # Documentation
└── .arch/                # Architecture artifacts
```

### Architectural Patterns

**Backend**:
- **Pattern**: Clean Architecture | Hexagonal | Layered | etc.
- **Layers**: Handler → Service → Repository → Database
- **Dependency Rule**: Inner layers don't depend on outer layers

**Frontend**:
- **Pattern**: Component-based with hooks
- **Data Flow**: Props down, events up
- **State Management**: Centralized store for global state, local state for UI

**API Design**:
- **Style**: RESTful | GraphQL | gRPC
- **Versioning**: `/api/v1`, `/api/v2`
- **Authentication**: JWT Bearer tokens
- **Error Format**: RFC 7807 Problem Details

---

## Key Architectural Decisions

> **[REPLACE BELOW]** with YOUR actual ADRs. Link to real ADR files in `.arch/decisions/`

### ADR-001: [REPLACE: Decision Title]
**File**: [REPLACE: .arch/decisions/001-your-decision.md](../decisions/001-your-decision.md)
**Decision**: [REPLACE: What was decided - e.g., "PostgreSQL for primary database"]
**Rationale**: [REPLACE: Why this decision - e.g., "ACID compliance, JSON support"]
**Impact**: [REPLACE: How it affects implementation - e.g., "All services use PostgreSQL"]

### ADR-002: API Design
**File**: [.arch/decisions/002-api-design.md](../decisions/002-api-design.md)
**Decision**: RESTful API with JSON
**Rationale**: Simplicity, wide tooling support
**Impact**: All endpoints follow REST conventions; use HTTP status codes correctly

### ADR-003: Authentication Strategy
**File**: [.arch/decisions/003-auth-strategy.md](../decisions/003-auth-strategy.md)
**Decision**: JWT tokens with refresh token rotation
**Rationale**: Stateless, scalable, secure
**Impact**: All protected endpoints require `Authorization: Bearer <token>` header

(Add all relevant ADRs that implementers need to know)

---

## API Contracts

### Authentication Endpoints

#### POST `/api/v1/auth/register`
**Purpose**: Register new user account

**Request**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "full_name": "John Doe"
}
```

**Response (201 Created)**:
```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe"
  },
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 3600
}
```

**Errors**:
- `400 Bad Request`: Invalid email format or weak password
- `409 Conflict`: Email already exists

---

#### POST `/api/v1/auth/login`
**Purpose**: Authenticate user and get tokens

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
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 3600
}
```

**Errors**:
- `401 Unauthorized`: Invalid credentials
- `403 Forbidden`: Account disabled

---

### Project Endpoints

#### GET `/api/v1/projects`
**Purpose**: List user's projects

**Headers**:
```
Authorization: Bearer <access_token>
```

**Query Parameters**:
- `status`: Filter by status (active, archived)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response (200 OK)**:
```json
{
  "projects": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "My Project",
      "description": "Project description",
      "status": "active",
      "created_at": "2025-11-20T10:00:00Z",
      "task_count": 5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42
  }
}
```

(Add all critical API endpoints)

---

## Testing Requirements

### Test Structure

**Backend Tests**:
```
backend/
├── internal/
│   ├── service/
│   │   ├── user_service.go
│   │   └── user_service_test.go    # Unit tests
│   ├── repository/
│   │   ├── user_repository.go
│   │   └── user_repository_test.go # Integration tests with testcontainers
│   └── handler/
│       ├── user_handler.go
│       └── user_handler_test.go    # Handler tests with mocks
└── test/
    └── e2e/
        └── user_flow_test.go        # E2E tests
```

**Frontend Tests**:
```
frontend/src/
├── components/
│   ├── UserProfile.tsx
│   └── UserProfile.test.tsx         # Component tests
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts             # Hook tests
└── services/
    ├── api.ts
    └── api.test.ts                 # Service tests with MSW
```

### Testing Patterns

**Unit Tests (Go)**:
```go
func TestUserService_CreateUser(t *testing.T) {
    // Arrange
    mockRepo := &mocks.UserRepository{}
    service := NewUserService(mockRepo)

    input := CreateUserInput{
        Email: "test@example.com",
        Password: "SecurePass123!",
    }

    mockRepo.On("Create", mock.Anything).Return(&User{ID: "123"}, nil)

    // Act
    user, err := service.CreateUser(context.Background(), input)

    // Assert
    assert.NoError(t, err)
    assert.Equal(t, "123", user.ID)
    mockRepo.AssertExpectations(t)
}
```

**Integration Tests (Go with Testcontainers)**:
```go
func TestUserRepository_Create(t *testing.T) {
    // Arrange - start PostgreSQL container
    ctx := context.Background()
    postgres, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
        ContainerRequest: testcontainers.ContainerRequest{
            Image: "postgres:15",
            // ... configuration
        },
    })
    require.NoError(t, err)
    defer postgres.Terminate(ctx)

    // Get connection string and run test
    // ...
}
```

**Component Tests (React with Testing Library)**:
```typescript
test('renders user profile with data', async () => {
  const user = { id: '1', name: 'John Doe', email: 'john@example.com' };

  render(<UserProfile user={user} />);

  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@example.com')).toBeInTheDocument();
});
```

### Coverage Requirements
- **Unit Tests**: 80%+ coverage
- **Integration Tests**: All critical paths
- **E2E Tests**: Happy paths and major error scenarios

---

## Code Patterns & Examples

> **⚠️ CRITICAL: REPLACE ALL CODE BELOW WITH YOUR LANGUAGE/FRAMEWORK ⚠️**
>
> Examples below are **Go code** - if you don't use Go, DELETE THESE and add YOUR patterns:
> - **Node.js/TypeScript**: Show your Express/Fastify patterns
> - **Python**: Show your Flask/FastAPI patterns
> - **Any language**: Show YOUR actual code from YOUR codebase
>
> **Why this matters**: Agents will copy these patterns. Make sure they're YOUR patterns in YOUR language!

### Error Handling [REPLACE: with YOUR language]

> **[REPLACE THIS Go CODE]** with your actual error handling pattern

```go
[This is Go code - REPLACE with YOUR language if not using Go]
// Use custom error types
type NotFoundError struct {
    Resource string
    ID       string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s with ID %s not found", e.Resource, e.ID)
}

// Check and wrap errors
user, err := repo.FindByID(ctx, userID)
if err != nil {
    if errors.Is(err, sql.ErrNoRows) {
        return nil, &NotFoundError{Resource: "User", ID: userID}
    }
    return nil, fmt.Errorf("failed to find user: %w", err)
}
```

### Repository Pattern (Go)

```go
// Interface in domain layer
type UserRepository interface {
    Create(ctx context.Context, user *User) error
    FindByID(ctx context.Context, id string) (*User, error)
    FindByEmail(ctx context.Context, email string) (*User, error)
    Update(ctx context.Context, user *User) error
    Delete(ctx context.Context, id string) error
}

// Implementation in repository layer
type userRepository struct {
    db *gorm.DB
}

func (r *userRepository) FindByID(ctx context.Context, id string) (*User, error) {
    var user User
    if err := r.db.WithContext(ctx).Where("id = ?", id).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}
```

### API Client (TypeScript)

```typescript
// Service with error handling
export class ApiClient {
  private baseURL = import.meta.env.VITE_API_URL;

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
      },
    });

    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }

    return response.json();
  }
}
```

### Custom Hooks (React)

```typescript
// Hook for data fetching with loading/error states
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    api.get<User>(`/users/${userId}`)
      .then(data => !cancelled && setUser(data))
      .catch(err => !cancelled && setError(err))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [userId]);

  return { user, loading, error };
}
```

---

## Dependencies & Infrastructure

### External Services

**Stripe** (Payment Processing)
- **API Version**: 2024-11-20
- **Keys**: In `.env` as `STRIPE_SECRET_KEY`
- **Webhooks**: `/api/v1/webhooks/stripe`
- **Documentation**: https://stripe.com/docs/api

**SendGrid** (Email)
- **API Key**: In `.env` as `SENDGRID_API_KEY`
- **Templates**: Defined in SendGrid dashboard
- **From Email**: noreply@yourapp.com

**AWS S3** (File Storage)
- **Bucket**: `yourapp-{env}-uploads`
- **Region**: us-east-1
- **Access**: Via IAM role or keys in `.env`

### Internal Services

**Redis** (Cache & Sessions)
- **Port**: 6379
- **Usage**: Session storage, rate limiting, caching
- **Key Patterns**:
  - `session:{token}` - User sessions
  - `cache:user:{id}` - User data cache
  - `ratelimit:{ip}:{endpoint}` - Rate limiting

**RabbitMQ** (Message Queue)
- **Port**: 5672
- **Exchanges**: `tasks`, `notifications`
- **Queues**: `email-queue`, `analytics-queue`

### Environment Variables

**Required**:
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=3600

# External Services
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG....
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
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
if err := db.First(&user, id).Error; err != nil {
    if errors.Is(err, gorm.ErrRecordNotFound) {
        return nil, &NotFoundError{...}
    }
    return nil, err
}
```

### 3. Use proper HTTP status codes
**Problem**: Returning 200 OK for errors
**Solution**: Follow REST conventions

- `200 OK` - Success with body
- `201 Created` - Resource created
- `204 No Content` - Success without body
- `400 Bad Request` - Client error (validation)
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource doesn't exist
- `409 Conflict` - Resource conflict (duplicate)
- `500 Internal Server Error` - Server error

### 4. Validate input at API boundary
**Problem**: Invalid data reaches business logic
**Solution**: Validate in handlers before calling services

```go
type CreateUserRequest struct {
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=8"`
}

func (h *UserHandler) Create(w http.ResponseWriter, r *http.Request) {
    var req CreateUserRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        respondError(w, http.StatusBadRequest, "invalid request")
        return
    }

    if err := validate.Struct(req); err != nil {
        respondError(w, http.StatusBadRequest, err.Error())
        return
    }

    // Now safe to call service
    user, err := h.service.CreateUser(r.Context(), req)
    // ...
}
```

### 5. Avoid SQL injection
**Problem**: String concatenation for queries
**Solution**: Use parameterized queries (GORM handles this)

```go
// ❌ Bad (don't do this)
db.Where(fmt.Sprintf("email = '%s'", email))

// ✅ Good
db.Where("email = ?", email)
```

---

## Quick Reference

### Run Commands
```bash
# Start all services
docker-compose up -d

# Run backend
cd backend && go run cmd/api/main.go

# Run frontend
cd frontend && npm run dev

# Run tests
cd backend && go test ./...
cd frontend && npm test
```

### Useful Files
- Database schema: `backend/migrations/`
- API documentation: `docs/api.md`
- Architecture diagrams: `docs/architecture/`
- Environment setup: `docs/development.md`

---

**Remember**: This document is your source of truth. If something is unclear or missing, update this document so future agents have better context!
