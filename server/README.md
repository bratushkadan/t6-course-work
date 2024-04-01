# Node.js Dumplings server

## Commands

### build

```sh
docker build --platform linux/amd64 --progress=plain -t server:0.1.0 .
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

#### Install docker

```sh
export VM_ADDRESS=""; ssh "$VM_ADDRESS" <install-docker.sh
```

### Deploy to cloud

1. Login into docker registry (https://yandex.cloud/ru/docs/container-registry/operations/authentication?from=int-console-help-center-or-nav#method)
2. Populate *.env* file with production values
3. Replace "image" field in docker-compose.yml files with current images pushed to registry
4. Run *deploy.sh*

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

