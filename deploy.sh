#!/usr/bin/env bash

set -e

VM_ADDRESS="158.160.83.41"

scp .env "${VM_ADDRESS}":.env
scp docker-compose.yml "${VM_ADDRESS}":docker-compose.yml

ssh "${VM_ADDRESS}" 'sudo docker compose up -d'

