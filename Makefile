mocha = ./node_modules/.bin/mocha

clean:
	@rm -rf node_modules

node_modules: package.json
	@npm install

test: node_modules
	@$(mocha) \
	test/index.js \
	--reporter spec

.PHONY: clean test
