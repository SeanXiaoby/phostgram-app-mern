# API Documentations

---

<!-- ## Table of Contents

- [API Documentations](#api-documentations)
  - [Table of Contents](#table-of-contents)
  - [Authentication](#authentication)
    - [Login](#login)
    - [Register](#register)
    - [Logout](#logout) -->

## Data Schemas

#### User

```js
user: {
    id: String!,
    username: String!,
    email: String!,
    avatar: String,
    phost: [phost]!,
}
```

#### Author

```js
author:{
    id: String!,
    username: String!,
    avatar: String!,
}
```

#### Phost

```js
phost: {
    id: String!,
    author_id: String,
    img: String!,
    text: String!,
    created_at: ISOstring!,
    comments: [Comment]!,
}
```

#### Comment

```js
comment: {
    id: String!,
    author_id: String!,
    text: String!,
}
```

#### Error

```js
error: {
    message: string,
}
```

---

## Authentication

APIS for authentication.

---

### Login

- #### POST `/api/auth/login`

**Header** :
 `{ }`

**Query Parameters** :
 `{ }`

**Body Parameters** : 
```js
{
    username: String!,
    password: String!
}
```

**Response** :

- If success : Code: 200, Body: `{token: String}`
- If fail : Code: 401, Body: `{token: null, error: {Error}}`

**Descriptions** :

- `username` can be either username or email

---

### Register

- #### POST `/api/auth/register`

**Body Parameters** : 
```js
{
    email: String!, 
    username: String!, 
    password: String!
}
```

**Response** :
- If success : Code: 200, Body: `{user_id: String}`
- If fail, user not found : Code: 404, Body: `{user_id: null, error: {Error}}`
- If fail, other error : Code: 401, Body: `{user_id: null, error: {Error}}`

**Desciptions** :

1. Validation will be finished in frontend. No need to validate in backend.

---

### Logout

- #### POST `/api/auth/logout`

**Body Parameters** : 

```js
{session_id: String!}
```

**Response** :

- If success : Code: 200, Body: `{ }`
- If fail : Code: 401, Body: `{error: {Error}}`

---

## Phost

APIS for phosts CRUD operations.

### Get

- #### GET `/api/phost`

Get all phosts

**Body Parameters** : 

```js
{ } // Maybe some query filters can be added
```

**Response** :

- If success : Code: 200, Body: `{phosts: [phost]}`
- If fails: Code: 401, Body: `{error: {Error}}`

**Notes** :

  Return 200 with an empty array if there is no phost found.

---

- #### GET `/api/phost/:id`

Get a certain phost with its id.

**Path Parameters** : 

```js
{id: string! }
```

**Response** :

- If found: Code: 200, Body: `{phost: <phost>}`
- If not found: Code: 404, Body: `{phost: null, error: {Error}}`
- If fails: Code: 401, Body: `{phost: null, error: {Error}}`

---

### Create

- #### POST `/api/phost`

Create a new phost.

**Body Parameters** : 

```js
{
    author_id: String!,
    img: String!,
    text: String!,
}
```

**Respnose** :

- If success: Code 200 Body:`{id: string}`
- If fails with bad parameters: Code 400 Body: `{id: null, error: {Error}}`
- If fails with other reasons, Code 401 Body: `{id: null, error: {Error}}`

**Notes** :

Images should be stored on external servers. We only passes image urls between backend and frontend

---

### Comment

---

### Update

---

## User

### Get

---

### Create

---

### Update

