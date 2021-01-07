# Strapi Github Actions

Strapi and Github actions proxy using Vercel's function

## Why?

Github actions require specific request body to trigger pipeline, and Strapi is not allow us to custom webhook body request. So this proxy kicked in.

## Usage

### 1. Setup Github Actions

- Set up workflow, more on [Github Actions](https://docs.github.com/en/free-pro-team@latest/actions/quickstart)
- Config [Repository dispatch](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#repository_dispatch). Note the `event_types` since it will be used later

Example workflow.yaml

```yaml
on:
  push:
    branches: [main]
  repository_dispatch:
    types:
      - webhook-build

jobs:
  # ...
```

### 2. Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/Th1nkK1D/strapi-github-actions)

on clone the project and deploy manually

### 2. Config Vercel environment variable

Follow [Vercel environment variable doc](https://vercel.com/docs/environment-variables)

- `GITHUB_TOKEN`: Github access token generated. See ["Creating a personal access token for the command line"](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line)
- `GITHUB_REPOSITORY`: Repository name
- `GITHUB_USER`: User/organization that owned the repository
- `ACTIONS_EVENT_TYPE`: Repository dispatch's `events_type` on the first step
- `AUTHORIZATION_TOKEN`: Used to validate Strapi request later. Can be anything but recommended to generate by passwork manager or [random keygen](https://randomkeygen.com/)

### 3. Config Strapi webhook

Follow [Strapi Webhook doc](https://strapi.io/documentation/developer-docs/latest/concepts/webhooks.html)

- Set url to `<vercel-deployed-url>/api/`
- For Headers, add `Authorization` key with value of `Bearer <AUTHORIZATION_TOKEN in step 2>`
