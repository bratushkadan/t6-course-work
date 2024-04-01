# Node.js Dumplings server

## Commands

### build

```sh
docker build --progress=plain -t server:0.0.2 .
```

### Run container

For host network:

```sh
docker run --rm -d --network host server:0.0.2
```

For bridge network:

```sh
docker run --rm -d --network my_bridge_network -p 8080:8080 server:0.0.2
```

### VM address

```
84.252.136.16
```

### Cloud prerequisites

FS of at least 10GB is mounted to "/mongo_data" directory.

### development

Start Mongo:

```sh
docker-compose up db
```

Install deps:

```sh
npm ci
```

Start server:

```
npm run dev
```

