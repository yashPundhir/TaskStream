the public folder will contain those files which are nedded to be served directly (like favicon) => files which should be available directly in our code and should not be called from any 3rd party storage service provider.

---

no need of mongoDB atlas, run app using the following command:

`docker run —name mongo -d -p 27017:27017 mongo`

`docker run —name Postgres -d -p 5432: 5432 Postgres`

---

when importing dotenv, always specifying its path like this:

```javascript
dotenv.config({
  path: "./.env",
});
```

as shown in the above code snippet, always give the path value wrt root folder and not wrt relative path.

Ex: my file is inside the src folder, so relative path would be `../.env`, but it won't work. But if u give path wrt root folder like this: `./.env`, then it will work.

---

during the DB Schema, if for a field we specify that field to unique, then there is no need for that field to ne indexable => `verify this fact`

---

wrt mongoDB, here are the facts:

- Schema = defines the shape of each document (like a blueprint for a row in SQL).

- Model = the class + methods that let you create, read, update, delete documents in the collection.

more comparison between SQL and NoSQL DBs:

# 🗂 SQL vs. MongoDB Mapping

| **SQL (Relational DB)** | **MongoDB (Document DB)**                    | **Explanation**                                                                                                                                     |
| ----------------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Database**            | **Database**                                 | Same idea: a container for all your data.                                                                                                           |
| **Table**               | **Collection**                               | A group of records/documents of the same type.                                                                                                      |
| **Row / Record**        | **Document**                                 | One entry of data. In MongoDB it’s JSON-like (BSON under the hood).                                                                                 |
| **Column / Field**      | **Field (Key-Value Pair)**                   | Attributes inside a document.                                                                                                                       |
| **Schema (SQL)**        | **Schema (Mongoose ODM)**                    | In SQL: enforced by DB. In MongoDB: optional, but with Mongoose you define schemas for structure/validation.                                        |
| **Primary Key (PK)**    | **`_id` field**                              | Auto-generated unique identifier for each document.                                                                                                 |
| **Foreign Key (FK)**    | **Reference (`ref`) or Embedded Document**   | Relationships are handled either by referencing another collection or embedding sub-documents.                                                      |
| **Join**                | **`$lookup` (Aggregation) or manual refs**   | Joins exist, but aren’t as native/central as in SQL.                                                                                                |
| **Index**               | **Index**                                    | Both support indexes for faster queries.                                                                                                            |
| **View**                | **Aggregation Pipeline**                     | SQL views = saved queries. MongoDB aggregations transform/filter collections similarly.                                                             |
| **Row Constraints**     | **Validation in Schema / Application Logic** | SQL enforces types & constraints at DB level; MongoDB is more flexible unless you add schema validation (via Mongoose or MongoDB’s own validators). |

---

### In authentication, what is the use of access token and refresh token.

# Access token vs Refresh token

Think of an **access token** like a short-lived movie ticket you use to enter a cinema, and a **refresh token** like your ID card that proves who you are so the box office can give you another ticket when the first one expires.

Below is the same idea with the important details, in plain language.

---

## What each token does

**Access token**

- Short-lived credential you send with each API request to prove “I’m allowed to do this.”
- Example: `GET /api/profile` — you send the access token in the `Authorization: Bearer <token>` header.
- Lifetime: short (commonly **5–15 minutes**). Short lifetime limits damage if it’s stolen.

**Refresh token**

- Long-lived credential used only to get a new access token (and sometimes a new refresh token).
- Not sent on every API call — only to a special endpoint like `POST /auth/refresh`.
- Lifetime: longer (commonly **days to weeks**). It’s more sensitive than the access token.

---

## Typical flow (step-by-step)

1. User logs in with username/password.
2. Server authenticates user, then issues:

   - an **access token** (short expiry), and
   - a **refresh token** (longer expiry).

3. Client calls protected APIs using the access token.
4. When access token expires, client calls `/auth/refresh` with the refresh token.
5. Server validates the refresh token and returns a new access token (and often a new refresh token).
6. If the user logs out (or the refresh token is invalidated), the client discards tokens and can’t get new access tokens.

---

## Where to store tokens (security best-practices — simple version)

- **Web apps (browser)**:

  - Prefer **HTTP-only, Secure cookies** (with `SameSite` where appropriate) for refresh tokens. That prevents JavaScript from reading them (defends against XSS).
  - Access tokens can be kept in memory (not localStorage) so they’re lost on page reload — reduces attack surface.

- **Mobile apps**:

  - Use the platform’s secure storage (Keychain on iOS, Keystore on Android).

- **Never** store refresh tokens in plain localStorage or places accessible to JS if you can avoid it.

---

## Important security patterns & choices

- **Short access token lifetime** + **longer refresh token** = good balance of convenience and safety.
- **Rotate refresh tokens**: issue a new refresh token every time you use one and invalidate the old one. This helps detect reuse after theft.
- **Detect reuse**: if a rotated refresh token is used again, you can assume compromise and revoke the account’s tokens.
- **Revoke on logout or suspicious activity**: store refresh tokens server-side (or at least an identifier) so you can revoke them.
- **Opaque vs JWT refresh tokens**:

  - _Opaque (random ID)_: stored server-side — easy to revoke.
  - _JWT (self-contained)_: stateless validation, but harder to revoke unless you maintain a blacklist/store.

- **Protect refresh endpoint**: rate-limit and require valid client context; watch for replay attacks.

---

## When to use which design

- If you want simplicity and easy revoke → use **opaque refresh tokens stored in DB** and short-lived access JWTs.
- If you want fully stateless verification of access tokens → use **JWT for access tokens** and still manage refresh tokens server-side for revocation.

---

## Quick recap (one-liner)

- **Access token**: short-lived key you send on each request.
- **Refresh token**: long-lived key used only to get new access tokens — keep it extra safe.

---
