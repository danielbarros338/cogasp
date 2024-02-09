pipeline {
  agent any

  stages {
    stage ('Build image') {
      steps {
        script { // Create a docker image with a name 'cogasp-backend' and tag is a BUID_ID
          dockerapp = docker.build("cogasp-backend:${env.BUILD_ID}", "-f ./Dockerfile ./")
        }
      }
    }

    stage ('Push image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            dockerapp.push('latest')
            dockerapp.push('${env.BUILD_ID}')
          }
        }
      }
    }
  }
}