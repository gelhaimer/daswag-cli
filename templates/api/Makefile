SHELL:=/bin/bash
PY_VERSION := 3.7

BASE := $(shell /bin/pwd)
VENV_DIR := $(BASE)/.venv

PYTHON := $(shell /usr/bin/which python$(PY_VERSION))
VIRTUALENV := $(PYTHON) -m venv

export PYTHONUNBUFFERED := 1
export PATH := var:$(PATH):$(VENV_DIR)/bin
export DEBUG_LOG := 'true'

.DEFAULT_GOAL := lint
.PHONY: lint test upload clean bootstrap

PROJECT_NAME ?= <%= baseNameApiKebabCase %>
STAGE_NAME ?= dev

SAM_BUCKET = ${PROJECT_NAME}-${STAGE_NAME}-resources

export TABLE_NAME ?= ${PROJECT_NAME}-${STAGE_NAME}-table

INIT_CFN_PARAMS := ProjectName=$(PROJECT_NAME) \
		StageName=$(STAGE_NAME)

CFN_PARAMS := ProjectName=$(PROJECT_NAME) \
		StageName=$(STAGE_NAME) \
		S3BucketName=$(SAM_BUCKET) \
		TableName=$(TABLE_NAME)

INIT_TAGS_PARAMS := "daswag:project"="${PROJECT_NAME}-init" \
		"prd:owner"="daswag" \
		"prd:environment"=$(STAGE_NAME)

TAGS_PARAMS := "daswag:project"="${PROJECT_NAME}" \
		"prd:owner"="daswag" \
		"prd:environment"=$(STAGE_NAME)

lint:
	sh -c '. .venv/bin/activate; flake8 --tee --output-file=pylint.out --exclude=src/python-libs src'

test:
	@make start-db
	sh -c '. .venv/bin/activate; py.test -x tests'
	@make stop-db

test-with-cov:
	@make start-db
	sh -c '. .venv/bin/activate; py.test tests -x --cov --cov-report xml --cov-report=term-missing'
	@make stop-db

start-db:
	docker container run --rm -p 8000:8000 --name dynamodb-local -d amazon/dynamodb-local:latest

stop-db:
	docker container stop dynamodb-local

build:
	sam build

package:
	sam package \
		--s3-bucket ${SAM_BUCKET} \
		--output-template-file packaged.yaml
	aws s3 cp specs/specs.yaml s3://${SAM_BUCKET}/specs.yaml

deploy-init:
	aws cloudformation deploy \
		--template-file template-init.yaml \
		--stack-name $(PROJECT_NAME)-${STAGE_NAME}-init \
		--parameter-overrides $(INIT_CFN_PARAMS) \
		--capabilities CAPABILITY_NAMED_IAM \
		--tags $(INIT_TAGS_PARAMS)

deploy:
	sam deploy \
		--template-file packaged.yaml \
		--stack-name ${PROJECT_NAME}-${STAGE_NAME} \
		--parameter-overrides $(CFN_PARAMS) \
		--capabilities CAPABILITY_NAMED_IAM \
		--tags $(TAGS_PARAMS)

delete-init:
	aws cloudformation delete-stack \
	--stack-name $(PROJECT_NAME)-${STAGE_NAME}-init

delete:
	aws cloudformation delete-stack \
	--stack-name $(PROJECT_NAME)-${STAGE_NAME}

release:
	@make build
	@make package
	@make deploy


generate-doc:
	docker run -v $$PWD:/var/task -it ruby:latest /bin/bash -c 'gem install asciidoctor && asciidoctor -b html5 -B docs -D target/ docs/index.adoc'

output:
	aws cloudformation describe-stacks \
		--stack-name ${PROJECT_NAME}-${STAGE_NAME} \
		--query 'Stacks[].Outputs'

clean:
	rm -rf build dist

bootstrap: .venv
	.venv/bin/pip install -e .
ifneq ($(wildcard test-requirements.txt),)
	.venv/bin/pip install -r test-requirements.txt
endif
	make clean

.venv:
	$(VIRTUALENV) .venv
	.venv/bin/pip install --upgrade pip
	.venv/bin/pip install --upgrade setuptools
	.venv/bin/pip install --upgrade wheel
