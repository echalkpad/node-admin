

DOCKER_COMPOSE  ?= docker-compose
DOCKER          ?= docker

dev:
	$(DOCKER_COMPOSE) run -p 3000:3000 node bash

up:
	$(DOCKER_COMPOSE) up

build:
	$(DOCKER_COMPOSE) build

clean:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -fv





