# Use the official Node.js 14 image as the base image
FROM node:20.12.2

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port on which the Next.js application will run
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "dev"]
