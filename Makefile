DOCKER_COMPOSE  ?= docker-compose

bash:
	$(DOCKER_COMPOSE) run -p 3000:3000 api bash

up:
	$(DOCKER_COMPOSE) up -d

build:
	$(DOCKER_COMPOSE) build

down:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -fv

clean:
	docker rm $$(docker ps -a -q); \
	docker rmi $$(docker images -q -f dangling=true)







