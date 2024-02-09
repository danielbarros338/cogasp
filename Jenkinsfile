pipeline {
  agent any

  stages {
    stage ('Build image') {
      steps {
        script {
          dockerapp = docker.build("cogasp-backend:${env.BUILD_ID}", "-f ./Dockerfile ./")
        }
      }
    }
  }
}