# 🎓 TaskPulse - Enterprise Student Task Management System
> Full-Stack Academic Task Management Platform built with **Spring Boot 3.2 (Java 21)**, **React 19 (Vite)**, and **Aiven Cloud MySQL 8.0**.

---

## 🌟 Key Engineering & Architectural Features

### 1. Hybrid Security Architecture (JJWT + Stateful Active Sessions)
- **Dual Token Engine**: Short-lived JJWT Access Tokens (15 min) + Revocable Refresh Tokens stored in MySQL.
- **Stateful Active Session Tracking**: Every login generates a `UserSession` entry recording device details, IP address, and last active timestamp.
- **Remote Session Revocation**: Users can view all active devices and terminate individual remote sessions on demand.

### 2. Dual-Layer Validation & Data Integrity
- **Backend Validation**: Jakarta Bean Validation (`@NotBlank`, `@NotNull`, `@Size`, `@Email`, `@FutureOrPresent`) annotated on DTOs with `@Valid` controllers and `@ControllerAdvice` (`GlobalExceptionHandler`) delivering structured error maps.
- **Frontend Validation**: Instant UI field-level validation, reactive error states, and toast notifications.

### 3. Comprehensive Feature Suite
- **Interactive Kanban Board**: Drag & drop or status quick-switches (`TODO`, `IN_PROGRESS`, `COMPLETED`).
- **Structured Task Directory**: Searchable, filterable tabular list with priority badges, course tags, and **CSV Report Export**.
- **Course & Subject Organizer**: Color-coded academic course tags with instructor metadata.
- **Subtask Checklist Builder**: Nested subtask items with dynamic progress tracking.
- **Focus Pomodoro Timer**: Integrated study timer with customizable intervals and completion celebrations.

---

## 🛠️ Technology Stack

- **Backend**: Java 21, Spring Boot 3.2.5, Spring Security 6, Spring Data JPA, Hibernate, JJWT 0.12.5, Springdoc OpenAPI 3 (Swagger UI)
- **Frontend**: React 19, Vite, Tailwind CSS, Framer Motion, Lucide React Icons, Axios
- **Database**: Aiven Cloud MySQL 8.0 / Local MySQL 8.0
- **Deployment Ready**: Dockerfile (Render) & vercel.json (Vercel SPA routing)

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new student/user | No |
| `POST` | `/api/auth/login` | Authenticate user & issue tokens | No |
| `POST` | `/api/auth/refresh-token` | Renew expired access token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes |
| `GET` | `/api/auth/sessions` | Fetch active device login sessions | Yes |
| `POST` | `/api/auth/sessions/revoke/{id}` | Terminate specific remote session | Yes |
| `GET` | `/api/tasks` | Get filtered list of user tasks | Yes |
| `POST` | `/api/tasks` | Create new academic task | Yes |
| `PUT` | `/api/tasks/{id}` | Update task details & subtasks | Yes |
| `PATCH` | `/api/tasks/{id}/status` | Quick update task lifecycle status | Yes |
| `DELETE` | `/api/tasks/{id}` | Delete task | Yes |
| `GET` | `/api/tasks/export/csv` | Download tasks CSV report | Yes |
| `GET` | `/api/courses` | Fetch user course tags | Yes |
| `POST` | `/api/courses` | Create new course tag | Yes |
| `GET` | `/api/analytics/dashboard` | Fetch dashboard analytics metrics | Yes |

---

## 🚀 Deployment Instructions

### Render Deployment (Backend)
1. Point Render Web Service to the `backend/` directory.
2. Render automatically builds the Maven package using the included `Dockerfile`.
3. Set environment variables (`SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `JWT_SECRET`).

### Vercel Deployment (Frontend)
1. Point Vercel project root to the `frontend/` directory.
2. Vercel builds using Vite (`npm run build`).
3. Set `VITE_API_BASE_URL` environment variable pointing to your deployed Render service (`https://your-backend.onrender.com/api`).
4. Client-side routing rewrites are pre-configured in `frontend/vercel.json`.
