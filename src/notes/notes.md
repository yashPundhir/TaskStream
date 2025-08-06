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
