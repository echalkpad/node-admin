DOCKER_COMPOSE  ?= docker-compose

bash:
	$(DOCKER_COMPOSE) run -p 3000:3000 -p 4444:4444 api bash

up:
	$(DOCKER_COMPOSE) up

build:
	$(DOCKER_COMPOSE) build

clean:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -fv







