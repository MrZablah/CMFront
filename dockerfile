## NodeJS

# Specify a base image
FROM node:10-alpine

# Create a folder to save copy files and cd to it
WORKDIR /usr/src/app

# Copy requiered file for dependencies to container
COPY ./package.json .

# Install depenendencies
RUN npm install

# Copy the rest of the proyect
COPY . .

# Set Prodoction URL
ENV BASE_URL=http://52.43.240.253:5000

# run build
RUN npm run build

# Start nuxt
CMD [ "npm", "start" ]