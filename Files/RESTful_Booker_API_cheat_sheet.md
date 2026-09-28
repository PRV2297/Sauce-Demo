# 🏨 RESTful Booker API 

### Base URL :https://restful-booker.herokuapp.com/


---

## 📚 Table of Contents
1. [What is RESTful Booker API?](#-what-is-restful-booker-api)
2. [API Workflow Overview](#-api-workflow-overview)
3. [Authentication](#-authentication)
4. [GET Operations](#-get-operations)
5. [POST Operations](#-post-operations)
6. [PUT Operations](#-put-operations)
7. [PATCH Operations](#-patch-operations)
8. [DELETE Operations](#-delete-operations)
9. [Complete CRUD Flow](#-complete-crud-flow)
10. [Quick Reference](#-quick-reference)


---

## 🏨 What is RESTful Booker API?

The **RESTful Booker API** is a sample Hotel Booking API designed for learning API testing. It allows you to:

| ✅ **Create** bookings | 🔍 **View** bookings | ✏️ **Update** bookings | ❌ **Delete** bookings | 🔐 **Practice** Authentication |
|-----------------------|---------------------|----------------------|----------------------|-------------------------------|

---

## 📋 API Endpoints Overview

| 🌐 Method | 📍 Endpoint | 🎯 Purpose | 🔐 Auth Required |
|-----------|------------|------------|------------------|
| **POST** | `/auth` | Generate Token | ❌ No |
| **GET** | `/booking` | Get All Booking IDs | ❌ No |
| **GET** | `/booking/{id}` | Get Booking Details | ❌ No |
| **POST** | `/booking` | Create Booking | ❌ No |
| **PUT** | `/booking/{id}` | Update Complete Booking | ✅ Yes |
| **PATCH** | `/booking/{id}` | Partial Update | ✅ Yes |
| **DELETE** | `/booking/{id}` | Delete Booking | ✅ Yes |

---

## 🔐 1. Authentication

### 🎯 Purpose
Generate a security token required for **PUT**, **PATCH**, and **DELETE** operations.

### 📍 Endpoint
```
POST /auth
```

### 📨 Headers
```http
Content-Type: application/json
```

### 📦 Request Body
```json
{
  "username": "admin",
  "password": "password123"
}
```

### ✅ Success Response
```json
{
  "token": "abc123"
}
```

### 🔄 Authentication Flow

```mermaid
sequenceDiagram
    participant C as 👤 Client
    participant A as 🔐 API
    C->>A: POST /auth (username+password)
    A-->>C: 🎫 { "token": "abc123" }
    Note over C: Store token for later
    C->>A: PUT/PATCH/DELETE with Cookie: token=abc123
    A-->>C: ✅ Success
```

#### ⚡ Quick Tip
> **Always generate a token before updating or deleting bookings!** The token is valid for the entire session.

---

## 📖 2. GET Operations

### 📌 2.1 Get All Booking IDs

**Purpose:** Retrieve all available booking IDs.

**Endpoint:**
```http
GET /booking
```

**✅ Optional Filters:**
| Parameter | Format | Example |
|-----------|--------|---------|
| firstname | string | `?firstname=Jim` |
| lastname | string | `?lastname=Brown` |
| checkin | YYYY-MM-DD | `?checkin=2018-01-01` |
| checkout | YYYY-MM-DD | `?checkout=2019-01-01` |

**Example:**
```http
GET /booking?firstname=Jim&lastname=Brown
```

**✅ Response:**
```json
[
  { "bookingid": 1 },
  { "bookingid": 2 },
  { "bookingid": 3 }
]
```

---

### 📌 2.2 Get Booking by ID

**Purpose:** Retrieve complete booking details for a specific ID.

**Endpoint:**
```http
GET /booking/{id}
```

**Example:**
```http
GET /booking/10
```

**📨 Header:**
```http
Accept: application/json
```

**✅ Response:**
```json
{
  "firstname": "Sally",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2013-02-23",
    "checkout": "2014-10-23"
  },
  "additionalneeds": "Breakfast"
}
```

---

## ➕ 3. POST Operations

### 📌 Create Booking

**Purpose:** Create a new hotel booking.

**Endpoint:**
```http
POST /booking
```

**📨 Headers:**
```http
Content-Type: application/json
Accept: application/json
```

**📦 Request Body:**
```json
{
  "firstname": "Jim",
  "lastname": "Brown",
  "totalprice": 111,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2018-01-01",
    "checkout": "2019-01-01"
  },
  "additionalneeds": "Breakfast"
}
```

**✅ Response:**
```json
{
  "bookingid": 1,
  "booking": {
    "firstname": "Jim",
    "lastname": "Brown",
    "totalprice": 111,
    "depositpaid": true,
    "bookingdates": {
      "checkin": "2018-01-01",
      "checkout": "2019-01-01"
    },
    "additionalneeds": "Breakfast"
  }
}
```

---

## ✏️ 4. PUT Operations

### 📌 Update Complete Booking

**Purpose:** Replace the entire booking with new data.

**Endpoint:**
```http
PUT /booking/{id}
```

**📨 Headers:**
```http
Content-Type: application/json
Accept: application/json
Cookie: token=abc123
```

**📦 Request Body:**
```json
{
  "firstname": "James",
  "lastname": "Smith",
  "totalprice": 222,
  "depositpaid": false,
  "bookingdates": {
    "checkin": "2020-01-01",
    "checkout": "2021-01-01"
  },
  "additionalneeds": "Dinner"
}
```

**✅ Response:** Updated booking JSON

## 🛠️ 5. PATCH Operations

### 📌 Partial Update

**Purpose:** Modify only selected fields while keeping others unchanged.

**Endpoint:**
```http
PATCH /booking/{id}
```

**📨 Headers:**
```http
Content-Type: application/json
Accept: application/json
Cookie: token=abc123
```

**📦 Request Body:**
```json
{
  "firstname": "James",
  "lastname": "Brown"
}
```

**✅ Response:** Updated fields + existing booking data



**💡 Tip:** PATCH is perfect when you only need to update specific fields like firstname or lastname without rewriting the entire booking.

---

## ❌ 6. DELETE Operations

### 📌 Delete Booking

**Purpose:** Remove an existing booking from the system.

**Endpoint:**
```http
DELETE /booking/{id}
```

**📨 Authentication Methods:**

**Method 1 - Cookie:**
```http
Cookie: token=abc123
```

**Method 2 - Basic Auth:**
```http
Authorization: Basic YWRtaW46cGFzc3dvcmQxMjM=
```

**How Basic Auth works:**
```text
admin:password123
       ↓ (Base64 encode)
YWRtaW46cGFzc3dvcmQxMjM=
```

**✅ Response:**
```http
HTTP/1.1 201 Created
```

---

## 🎯 Complete CRUD Flow

```mermaid
graph TD
    A[🔐 Authentication] --> B[➕ POST - Create]
    B --> C[🔍 GET - Read]
    C --> D[✏️ PUT/PATCH - Update]
    D --> E[❌ DELETE - Remove]
    
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#4CAF50,stroke:#333,stroke-width:2px
    style C fill:#2196F3,stroke:#333,stroke-width:2px
    style D fill:#FF9800,stroke:#333,stroke-width:2px
    style E fill:#f44336,stroke:#333,stroke-width:2px
```

### 📝 CRUD Operations Summary

| Operation | Action | HTTP Method | Auth Required |
|-----------|--------|-------------|---------------|
| **C**reate | New Booking | POST /booking | ❌ No |
| **R**ead | View Booking | GET /booking/{id} | ❌ No |
| **U**pdate | Full Update | PUT /booking/{id} | ✅ Yes |
| **U**pdate | Partial Update | PATCH /booking/{id} | ✅ Yes |
| **D**elete | Remove Booking | DELETE /booking/{id} | ✅ Yes |

---

## 🧠 Authentication Summary

| Operation | Endpoint | Auth Required |
|-----------|----------|---------------|
| Generate Token | POST /auth | ❌ No |
| Get All Bookings | GET /booking | ❌ No |
| Get Booking by ID | GET /booking/{id} | ❌ No |
| Create Booking | POST /booking | ❌ No |
| **Update Booking** | **PUT /booking/{id}** | **✅ Yes** |
| **Partial Update** | **PATCH /booking/{id}** | **✅ Yes** |
| **Delete Booking** | **DELETE /booking/{id}** | **✅ Yes** |

---

## 🚀 Quick Reference

### Base URL
```
https://restful-booker.herokuapp.com
```

### Authentication Credentials
```json
{
  "username": "admin",
  "password": "password123"
}
```

### Common Headers
```http
Content-Type: application/json
Accept: application/json
Cookie: token=abc123
```

### Date Format
```
YYYY-MM-DD
Example: 2025-07-05
```

### Sample Booking JSON Structure
```json
{
  "firstname": "John",
  "lastname": "Doe",
  "totalprice": 150,
  "depositpaid": true,
  "bookingdates": {
    "checkin": "2025-01-01",
    "checkout": "2025-01-10"
  },
  "additionalneeds": "Breakfast"
}
```

---
