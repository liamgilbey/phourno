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
     -F "photo=@<photo-location>"
     -F "photo_date=2024-09-17"
```