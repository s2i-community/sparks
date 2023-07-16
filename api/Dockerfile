# Use a lighter version of Node as a parent image
FROM node:lts-alpine
# Set the working directory to /api
WORKDIR /api
# copy package.json into the container at /api
COPY package*.json /api/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /api
COPY . /api/
# Make port 9000 available to the world outside this container
EXPOSE 9000
# Set entrypoint
CMD [ "/bin/sh", "-c \"while sleep 1000; do :; done\"" ]