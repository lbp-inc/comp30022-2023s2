# Back-end API
## To Start The Server
> [!IMPORTANT]
> **Prerequisite**<br>
> Node.js<br>
> Node modules (`npm install`)

`node api.mjs`

## End Points
### GET `/helloworld`
|             |                           |
|-------------|---------------------------|
| Description | Get a HelloWorld message. |
| Arguments   | N/A                       |
| Return type | `string`                    |
### GET `/users`

|             |                           |
|-------------|---------------------------|
| Description | List all users. |
| Arguments   | N/A                       |
| Return type | [User](#user)[]                    |

### POST `/users`
|             |                           |
|-------------|---------------------------|
| Description | Add a user. |
| Arguments   | N/A              |
| Content type | [User](#user)
| Return type | `InsertOneResult<Document>`                      |

### GET `/users:id`
|             |                           |
|-------------|---------------------------|
| Description | Get the user with specified ID. |
| Arguments   | `string`: `id`                       |
| Return type | [User](#user)                      |

### PATCH `/users:id`
|             |                           |
|-------------|---------------------------|
| Description | Modify a user with specified ID. |
| Arguments   | `string`: `id`                       |
| Content type | [User](#user)
| Return type | `UpdateResult<Document>`                      |

### DELETE `/users:id`
|             |                           |
|-------------|---------------------------|
| Description | Remove a user with specified ID. |
| Arguments   | `string`: `id`                       |
| Return type | `DeleteResult`                      |

## Schemas
### User
Schema
```
{
  "type": "object",
  "properties": {
    "_id": {
      "type": "string"
    },
    "name": {
      "type": "string"
    },
    "ug": {
      "type": "array",
    },
    "age": {
      "type": "integer"
    }
  },
  "required": [
    "_id",
    "name",
    "ug",
    "age"
  ]
}
```
Example
```
{
  "_id": "64f04701463979358de77687",
  "name": "Ali",
  "ug": [
    "member",
    "tutor"
  ],
  "age": 30
}
```
