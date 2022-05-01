set -a && . example.env  && set +a

docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down
docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
