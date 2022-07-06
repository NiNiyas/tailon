BUILD ?= prod

dev:
	go build -tags dev
	$(MAKE) frontend BUILD=dev

test:
	go test -v
	#cd tests && pytest -v

frontend:
	cd frontend && $(MAKE) clean ; $(MAKE) BUILD=$(BUILD)

frontend-watch:
	cd frontend && $(MAKE) watch BUILD=$(BUILD)

docker-build:
	docker buildx build --push --tag ghcr.io/niniyas/tailon:beta --platform linux/arm64,linux/amd64,linux/armv7 .

#README.md:
	#sudo chmod +x build_readme.sh
	#./build_readme.sh

.PHONY: test frontend frontend-watch docker-build README.md
