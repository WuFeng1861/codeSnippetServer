# 代码片段管理系统API文档

## 用户注册

- **路径**: /api/auth/register
- **方法**: POST
- **描述**: 注册新用户并返回访问令牌

### 请求体

| 名称 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- |
| username | string | 是 | 用户名 |
| email | string | 是 | 电子邮箱 |
| password | string | 是 | 密码 |

### 响应

**状态码**: 201

**描述**: 创建成功

**响应示例**:

```json
{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJzdWIiOjEsImlhdCI6MTc0ODcxOTA4MCwiZXhwIjoxNzQ4ODA1NDgwfQ.uNu91c5zQxNn6R379q-vv_vb6PgV46pvfxBAA5JNMj4",
    "user": {
      "username": "johndoe",
      "email": "john@example.com",
      "id": 1,
      "createdAt": "2025-05-31T19:18:00.926Z",
      "updatedAt": "2025-05-31T19:18:00.926Z"
    }
  },
  "code": 0,
  "message": "请求成功"
}
```

---

## 用户登录

- **路径**: /api/auth/login
- **方法**: POST
- **描述**: 用户登录并返回访问令牌

### 请求体

| 名称 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- |
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |

### 响应

**状态码**: 200

**描述**: 登录成功

**响应示例**:

```json
{
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJzdWIiOjEsImlhdCI6MTc0ODcxOTEzMywiZXhwIjoxNzQ4ODA1NTMzfQ.myqVKF6JL8WNMTBrGSWzRc8TpZGOCoEwdwMl1bdBNEM",
    "user": {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com"
    }
  },
  "code": 0,
  "message": "请求成功"
}
```

---

## 获取当前用户信息

- **路径**: /api/users/profile
- **方法**: GET
- **描述**: 获取当前已登录用户的详细信息

### 响应

**状态码**: 200

**描述**: 请求成功

**响应示例**:

```json
{
  "data": {
    "id": 0,
    "username": "string",
    "email": "string",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  },
  "code": 0,
  "message": "请求成功"
}
```

---

## 创建标签

- **路径**: /api/tags
- **方法**: POST
- **描述**: 用户创建新的代码片段标签

### 请求体

| 名称 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- |
| name | string | 是 | 标签名称 |

### 响应

**状态码**: 201

**描述**: 创建成功

**响应示例**:

```json
{
  "data": {
    "id": 0,
    "name": "string",
    "userId": 0,
    "isHidden": false,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "code": 0,
  "message": "请求成功"
}
```

---

## 获取所有可见标签

- **路径**: /api/tags
- **方法**: GET
- **描述**: 获取所有未被隐藏的标签

### 响应

**状态码**: 200

**描述**: 请求成功

**响应示例**:

```json

{
  "data": [
    {
      "id": 0,
      "name": "string",
      "userId": 0,
      "isHidden": false,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "code": 0,
  "message": "请求成功"
}
```

---

## 获取我的标签

- **路径**: /api/tags/my-tags
- **方法**: GET
- **描述**: 获取当前用户创建的所有标签

### 响应

**状态码**: 200

**描述**: 请求成功

**响应示例**:

```json
{
  "data": [
    {
      "id": 0,
      "name": "string",
      "userId": 0,
      "isHidden": false,
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "code": 0,
  "message": "请求成功"
}
```

---

## 更新标签可见性

- **路径**: /api/tags/{id}/visibility
- **方法**: PATCH
- **描述**: 更新标签在全局列表中的可见性

### 请求参数

| 名称 | 位置 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| id | path | string | 是 | 标签ID |

### 请求体

| 名称 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- |
| isHidden | boolean | 是 | 是否隐藏标签 |

### 响应

**状态码**: 200

**描述**: 更新成功

**响应示例**:

```json
{
  "data": {
    "id": 0,
    "name": "string",
    "userId": 0,
    "isHidden": true,
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "code": 0,
  "message": "请求成功"
}
```

---

## 创建代码片段

- **路径**: /api/snippets
- **方法**: POST
- **描述**: 用户创建新的代码片段

### 请求体

| 名称 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- |
| title | string | 是 | 代码片段标题 |
| content | string | 是 | 代码片段内容 |
| description | string | 否 | 代码片段简介 |
| language | string | 是 | 编程语言 |
| tagIds | array | 否 | 标签ID列表 |

### 响应

**状态码**: 201

**描述**: 创建成功

**响应示例**:

```json
{
  "data": {
    "id": 0,
    "title": "string",
    "content": "string",
    "description": "string",
    "language": "string",
    "userId": 0,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "tagIds": [0],
    "tags": [
      {
        "id": 0,
        "name": "string",
        "userId": 0,
        "isHidden": false,
        "createdAt": "2025-01-01T00:00:00.000Z"
      }
    ]
  },
  "code": 0,
  "message": "请求成功"
}
```

---

## 获取我的代码片段

- **路径**: /api/snippets
- **方法**: GET
- **描述**: 获取当前用户的所有代码片段

### 响应

**状态码**: 200

**描述**: 请求成功

**响应示例**:

```json
{
  "data": [
    {
      "id": 0,
      "title": "string",
      "content": "string",
      "description": "string",
      "language": "string",
      "userId": 0,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z",
      "tagIds": [0],
      "tags": [
        {
          "id": 0,
          "name": "string",
          "userId": 0,
          "isHidden": false,
          "createdAt": "2025-01-01T00:00:00.000Z"
        }
      ]
    }
  ],
  "code": 0,
  "message": "请求成功"
}
```

---

## 获取单个代码片段

- **路径**: /api/snippets/{id}
- **方法**: GET
- **描述**: 获取当前用户的特定代码片段

### 请求参数

| 名称 | 位置 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| id | path | string | 是 | 代码片段ID |

### 响应

**状态码**: 200

**描述**: 请求成功

**响应示例**:

```json
{
  "data": {
    "id": 0,
    "title": "string",
    "content": "string",
    "description": "string",
    "language": "string",
    "userId": 0,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z",
    "tagIds": [0],
    "tags": [
      {
        "id": 0,
        "name": "string",
        "userId": 0,
        "isHidden": false,
        "createdAt": "2025-01-01T00:00:00.000Z"
      }
    ]
  },
  "code": 0,
  "message": "请求成功"
}
```

---

## 删除代码片段

- **路径**: /api/snippets/{id}
- **方法**: DELETE
- **描述**: 删除当前用户的特定代码片段

### 请求参数

| 名称 | 位置 | 类型 | 必填 | 描述 |
| ---- | ---- | ---- | ---- | ---- |
| id | path | string | 是 | 代码片段ID |

### 响应

**状态码**: 200

**描述**: 删除成功

**响应示例**:

```json
{
  "data": null,
  "code": 0,
  "message": "请求成功"
}
```
