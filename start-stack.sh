set -a && . .env  && set +a

docker stack deploy -c docker-compose.yaml --with-registry-auth loans
