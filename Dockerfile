FROM keymetrics/pm2:latest-alpine

RUN echo "Node version: $(node -v)"

# Bundle APP files
COPY src src/
COPY package*.json ./
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN ls -al -R

# Expose the ports for web server
EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json" ]