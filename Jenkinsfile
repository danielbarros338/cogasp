pipeline {
  agent any

  environment {
    DB_DATABASE = credentials('DB_COGASP_DATABASE')
    DB_USER = credentials('DB_USER')
    DB_PASSWORD = credentials('DB_PASSWORD')
    DB_HOST = credentials('DB_HOST')
    DB_PORT = credentials('DB_PORT')
    DB_DIALECT = credentials('DB_DIALECT')

    SALT = credentials('COGASP_SALT')
    ALG = credentials('COGASP_ALG')
    PORT = credentials('COGASP_PORT')
  }

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
        sh 'docker compose up -d --build'
        sh 'docker system prune --all --force'
      }    
    }
  }
}