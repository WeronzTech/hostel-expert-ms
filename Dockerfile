# Stage 1: Builder - Installs dependencies and builds the specific service
FROM node:20-alpine AS builder

# Argument to specify which service to build (e.g., 'user', 'api-gateway')
ARG SERVICE_NAME
WORKDIR /usr/src/app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the specified service
RUN npm run build ${SERVICE_NAME}

# Stage 2: Runner - Creates a lean production image
FROM node:20-alpine

ARG SERVICE_NAME
ENV SERVICE_NAME=${SERVICE_NAME}
WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install

# Copy the built application from the 'builder' stage
COPY --from=builder /usr/src/app/dist/apps/${SERVICE_NAME} ./dist/apps/${SERVICE_NAME}

# Command to run the service
CMD npm run start:dev:${SERVICE_NAME}