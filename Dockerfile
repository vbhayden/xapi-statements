FROM node:8@sha256:4ae8c21e1fa0b9dc3d76a698b2b2557b3658e2c4942901428c4c2cce18bfb53c
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
