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

## have a custom domain and host your project using that domain and it will give extra edge over others

## most common port number for mongoDB database: `27017`

---

## Ques: what does ports in a computer actually means and what does they do, what problem do they solve and it is said that when any service runs in our computer it is served at a route: what does this mean?

## ans: What are ports in a computer?

- Think of your **computer like a big apartment building** (the machine).
- Inside it, many different "services" (programs/servers) can be running at the same time.
- A **port** is like an **apartment number** that helps identify which service inside the building you want to talk to.

👉 Example:

- The building = Your computer (IP address identifies it).
- Apartment 80 = The web server (HTTP).
- Apartment 443 = The secure web server (HTTPS).
- Apartment 3306 = MySQL database.

Without ports, if someone tried to contact your computer, the system wouldn’t know _which program_ should handle the request.

---

## 🔹 What do ports actually do?

Ports solve the **problem of multiple services running on one machine**.
They make sure incoming network traffic is directed to the correct process/program.

- If you open your browser and visit `http://example.com`, by default it talks to **port 80** on that server (the web server process listens there).
- If you connect to `example.com:3306`, you’re asking to connect to the database service running on that port.

So, **ports = addressing system for services**.

---

## 🔹 What does “a service runs at a route” mean?

When we say _“a service runs at a route”_, it usually refers to **web applications**.

- **Port** tells which service you want to reach (like "which apartment").
- **Route (or path)** tells what specific function or resource you want inside that service (like "which room inside the apartment").

👉 Example:

- You run an Express.js server on **port 8000**.
- The server defines routes like:

  - `/api/v1/health` → Health check route
  - `/api/v1/users` → Users list route

If you visit:

- `http://localhost:8000/api/v1/health`

  - Computer checks **port 8000** → finds your server → server checks the **route `/api/v1/health`** → returns the health status.

---

## 🔹 Why is this needed?

- Without **ports**, you couldn’t run multiple services on the same computer. (Web server, database, chat server, all need unique ports).
- Without **routes**, your server would only have one single response for all requests. Routes let you organize and access different parts of your service.

---

✅ **Summary:**

- **Ports** = Numbers that identify which service on a computer should handle a request.
- **Routes** = Paths inside a web server that tell _what specific function/data_ to serve.
- Together, they allow many services to run on the same computer and expose multiple functionalities.

---

## Ques: it is said that when any service runs in our computer it is served at a specific port: what does this mean? explain with the analogy of a restaurant?

## Ans: Services and Ports as a Restaurant

Imagine your **computer is like a big restaurant building**.

- The **restaurant** = your computer (the machine).
- The **customers** = people (other computers) who want to use your services.
- The **counters (service windows)** = ports.
- The **chefs/kitchen behind each counter** = the specific program/service running (like a web server, database, etc.).

---

## 🔹 What does "a service runs at a specific port" mean?

When a customer walks into the restaurant, they don’t just shout their order to the whole building.
Instead, they go to a **specific counter** that serves a specific purpose.

👉 Examples:

- Counter **80** → Only serves normal food (HTTP web pages).
- Counter **443** → Only serves secure food (HTTPS).
- Counter **3306** → Only serves database queries.
- Counter **22** → Only serves remote login requests (SSH).

Each counter (port) is dedicated to a **particular service**.
If a service (like your web server) is said to “run at port 8000,” that means:

- The web server is **waiting at counter 8000**, ready to take and serve customer requests.

---

## 🔹 Why do we need ports?

Imagine a restaurant without counters.
Customers come in, but they wouldn’t know **where to go** for pizza, where for coffee, or where to pay bills. It would be chaos!

Similarly, without ports:

- Your computer wouldn’t know whether incoming data is for the **web server**, the **database**, or some other service.

---

✅ **Summary with analogy**:

- **Computer** = Restaurant building.
- **Port** = Service counter/window inside the restaurant.
- **Service running on a port** = A chef behind that counter cooking specific food.
- Customers (other computers) know exactly **which counter (port number)** to go to for the service they want.

---

## Ques: in my express middleware, if i use const errors = validationResult(req); with express-validator, what will be the value and datatype of errors?

## Ans: When using `const errors = validationResult(req);` with `express-validator`, the `errors` variable will be an instance of a `Result` object.

- Datatype: Result object (a custom object provided by express-validator).
- Value: The Result object contains methods to inspect the validation results. It does not directly contain an array of errors, but rather provides methods to extract them.

> Key methods of the Result object:

- isEmpty(): Returns a boolean indicating whether there are any validation errors.
- array(): Returns an array of validation errors. Each error in the array is an object with properties like msg (error message), param (the name of the field that caused the error), value (the value of the field), and location (where the parameter originated, e.g., body, query, params).
- mapped(): Returns an object where keys are the parameter names and values are the first error associated with that parameter.

> Example usage:

```javascript
const { validationResult } = require("express-validator");

// ... in your middleware
const errors = validationResult(req);

if (!errors.isEmpty()) {
  // There are validation errors
  const extractedErrors = errors.array(); // Get an array of errors
  // Or, for a mapped object:
  // const mappedErrors = errors.mapped();

  // You can then send these errors back to the client
  return res.status(400).json({ errors: extractedErrors });
}

// No validation errors, proceed with the request
next();
```
