# Start from the node:18-slim image
FROM node:18-slim

# Create the app group and user
RUN addgroup app && adduser --disabled-password --gecos "" --ingroup app app

# Change to non-root user
USER app

# Set the working directory
WORKDIR /app

# Copy the project package*.json into the container
COPY --chown=app:app package*.json .

# Install the project dependencies
RUN npm install

# Copy the project files into the container
COPY --chown=app:app . .

# Build the frontend application
RUN npm run build

# Expose port 3000 for the app
EXPOSE 3000

CMD ["npm", "run", "dev"]
