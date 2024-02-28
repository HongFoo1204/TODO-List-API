# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/
# Using multi stage build

# Prepare the image when build
# also use to minimize the docker image
FROM node:21-alpine as builder

WORKDIR /src
COPY package*.json ./
COPY tsconfig.build.json ./
RUN npm ci
COPY . .
RUN npm run build


# Build the image as production
# So we can minimize the size
FROM node:21-alpine

WORKDIR /src
COPY package*.json ./
COPY tsconfig.json ./
ENV PORT=3000
RUN npm ci
COPY --from=builder /src/dist ./dist
EXPOSE ${PORT}

CMD ["npm", "run", "start"]