# Resource application

A resource application build with [Expressjs](https://expressjs.com/) + [typescript](https://www.typescriptlang.org/) + [mongodb](https://www.mongodb.com/)

## Prerequisites

- Node.js
- npm (or yarn)
- MongoDB

## Setup and run project

1. Go to [mongodb](https://www.mongodb.com/) to register, create a database and copy the `connect URL` of the database

2. Create a `.env` file in your root directory, add your MongoDB URI and the port you want to host:

```
PORT=your-port
MONGO_URI=your-mongodb-uri(Ex: mongodb+srv://....)
```

2. Install all dependencies:

   ```bash
   npm i
   ```

3. Run
   ```bash
   npm start
   ```
   to run your application at `PORT`

## API Reference

#### Update a resource

```http
  POST /api/v1/resource
```

| body          | Type     | Description                             |
| :------------ | :------- | :-------------------------------------- |
| `name`        | `string` | **Required**. `name` of resource        |
| `email`       | `string` | **Required**. `email` of resource       |
| `age`         | `number` | **Required**. `age` of resource         |
| `description` | `string` | **Required**. `description` of resource |

#### Get all Resources

```http
  GET /api/v1/resource
```

| Query     | Type                                            | Description                                                                                                  |
| :-------- | :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `page`    | `number`                                        | **Optional** page to fetch                                                                                   |
| `perPage` | `number`                                        | **Optional** number of items to fetch in a page                                                              |
| `filter`  | `{email?: string, name?: string, age?: number}` | **Optional** this filter get many resources with keyword of `name` or `email` or limit in `age` of resources |
| `sort`    | `[key: string]: 1 \| -1`                        | **Optional** to get list resources in sort with any field like `email`, `name` or `age`                      |

#### Get one resource

```http
  GET /api/resource/${id}
```

| Parameter | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `id`      | `string` | **Required**. Id of resource to fetch |

#### Update a resource

```http
  PUT /api/resource/${id}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of iresourcetem update |

| body          | Type     | Description                                    |
| :------------ | :------- | :--------------------------------------------- |
| `name`        | `string` | **Optional**. Update `name` of resource        |
| `email`       | `string` | **Optional**. Update `email` of resource       |
| `age`         | `number` | **Optional**. Update `age` of resource         |
| `description` | `string` | **Optional**. Update `description` of resource |

#### Delete a resource

```http
  DELETE /api/resource/${id}
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of resource to delete |
