FROM node:12-alpine AS BUILDER

# Create a directory to hold the application code inside the image
WORKDIR /home/node

# Copy the env and package/yarn files prior to pulling dependencies
COPY --chown=node:node .env* ./
COPY --chown=node:node yarn.lock ./yarn.lock
COPY --chown=node:node package.json ./package.json

# Install app dependencies with yarn
RUN yarn

# Bundle the app's source code inside the Docker image
COPY --chown=node:node . .

# Clean build folder so the yarn serve command builds fresh
RUN yarn build:native

# Start a fresh instance to remove pre-build dependencies
FROM node:12-alpine

WORKDIR /home/node

# Set default port
ENV PORT 8080 
ENV CONFIG_LOCATION .env

# Copy the env and package/yarn files prior to pulling dependencies
COPY --chown=node:node yarn.lock ./yarn.lock
COPY --chown=node:node package.json ./package.json
COPY --chown=node:node ${CONFIG_LOCATION} ./${CONFIG_LOCATION}

COPY --from=BUILDER --chown=node:node /home/node/build ./build
COPY --from=BUILDER --chown=node:node /home/node/node_modules ./node_modules

# Your app binds to port 8080 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE ${PORT}

# set user to 'node'
USER node

# run serve command
CMD ["yarn", "serve"]