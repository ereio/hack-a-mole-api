#!/bin/bash
# swap to create and run
# docker run -d \

# will map the vm to its own local ip (192.168.99.100) in windows + macos
# double check with docker-machine ip default

psql -h 192.168.99.100 -p 5432 -U moleman -W

docker exec -it postgres-mole psql -U moleman

docker logs -f postgres-mole