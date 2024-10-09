# Phourno Backend

The backend REST API for the phourno photo journal.

# Login

Login can be achieved with the following example bash command:

```sh
curl -X POST http://localhost:8080/login \
     -H "Content-Type: application/json" \
     -d '{
           "username": "<username>",
           "password": "<password>"
         }'
```

# Photo upload

Uploading a new photo is behind a protected endpoint. After a successful login, and retrieval of a JWT token, upload can be
achieved with the following example bash command:

```sh
curl -X POST http://localhost:8080/upload \
     -H "Authorization: Bearer <your-jwt-token>" \
     -F "photo=@<photo-location>" \
     -F "photo_date=2024-09-17"
```

# Photo Retrieval

Retrieving an uploaded photo is behind a protected endpoint. After a successful login, and retrieval of a JWT token, retrieval can be
achieved with the following example bash command:

```sh
curl -X GET http://localhost:8080/photo/20240913 \
     -H "Authorization: Bearer <your-jwt-token>" 
```

Thumbnails can be retrieved with a very similar API call:

```sh
```sh
curl -X GET http://localhost:8080/thumbnail/20240913 \
     -H "Authorization: Bearer <your-jwt-token>" 
```

# Photo Deletion

You may want to remove a photo from a specific day, and you can delete photos straight from the API:

```sh
curl -X DELETE http://localhost:8080/delete/20240913 \
     -H "Authorization: Bearer <your-jwt-token>" 
```
