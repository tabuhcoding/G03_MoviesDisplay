# Use Node.js LTS as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Run the app
CMD ["npm", "run", "start:prod"]