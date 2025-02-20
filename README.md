### SQL TypeORM sample

### Installation


`npm install`

### Running

This example requires docker or a local MySQL installation.  If using a local MySQL database, see `app.module.ts` for credentials, and make sure there are matching credentials in the database and the source code.

#### Docker

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up`

After running the sample, you can stop the Docker container with

`docker-compose down`

### Run the sample

Then, run Nest as usual:

`npm run start`

test.yml workflow triggers on pull request to main branch
deploy.yml workflow triggers on push to main branch

### terraform apply

`terraform init &&
terraform apply
`
### Connect kubectl:

`gcloud container clusters get-credentials gke-cluster --region europe-west10 --project devops-project-451319`

