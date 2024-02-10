pipeline {
  agent any

  stages {
    stage ('Build image') {
      steps {
        script { // References a repo docker hub and tag is a BUID_ID
          dockerapp = docker.build("danielbarros0611/cogasp-backend:${env.BUILD_ID}", "-f ./Dockerfile ./")
        }
      }
    }

    stage ('Push image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', "dockerhub") {
            dockerapp.push('latest')
            dockerapp.push("${env.BUILD_ID}")
          }
        }
      }
    }

    stage ('Create container') {
      steps {
        script {
          sh 'docker compose -up -d --build --force-recreate'
        }
      }
    }
  }
}