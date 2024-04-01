#!/usr/bin/env bash

set -e

VM_ADDRESS="84.252.136.16"

scp .env "${VM_ADDRESS}":.env
scp docker-compose.yml "${VM_ADDRESS}":docker-compose.yml

ssh "${VM_ADDRESS}" 'sudo docker compose up -d'

