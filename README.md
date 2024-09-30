


<p style="align:center">
<img src="./frontend/src/assets/images/logo.png" style="width:150px; vertical-align: middle;" ></img>
<span style="font-size: 2rem; font-weight: bold; vertical-align: middle;">Phourno</span>
</p>

# Description

Phourno is a self hosted photo journal application, designed to help you appreciate each and every day and be your own photo-journo. It is designed to be developer friendly, with a rich REST API to fully interact with your photo journal however you prefer.

# Getting Started

The easiest way to deploy `phourno` is with `docker compose`. See the examples in the `docker` directory to help get you started.

## Environment variables

Below is a list of all the environment variables available to configure `phourno`:

| Variable | Description |
| -- | -- |
| DB_HOST | Hostname or IP address of the postgresql instance |
| DB_USER | Username of the postgresql instance |
| DB_PASSWORD | Password of the postgresql instance |
| DB_NAME | Database name on the postgresql instance |
| DB_PORT | Database port of the postgresql instance |
| APP_SECRET_KEY | Application Secret Key |

