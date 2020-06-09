#!/bin/bash
# swap to create and run
# docker run -d --rm \
# docker create \

# At the moment it's not easy in Docker for Mac to connect to the
# internal IP addresses used by containers, because they're 
# exposed in a tiny VM rather than on the host. Ideally specific
# ports should be published with docker run -p which sets u
# p a tunnel from the Mac to the VM. However if that doesn't 
# work or is impractical for your use-case, then perhaps you could 
# try this experimental build which contains a SOCKS server:

docker run -d --rm \
    --name postgres-mole \
    -v ~/secrets:/run/secrets/ \
    -p 5432:5432 \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -e POSTGRES_USER=moleman \
    -e POSTGRES_PASSWORD_FILE=/run/secrets/passwordfile \
    -v pgdata:/var/lib/postgresql/data \
    postgres
