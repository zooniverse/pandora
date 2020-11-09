#!groovy

def newImage = null

pipeline {
  agent none

  options {
    quietPeriod(120) // builds happen at least 120 seconds apart
    disableConcurrentBuilds()
  }

  stages {

    stage('Build Docker image and stage site') {
      agent any

      steps {
        script {
          def dockerRepoName = 'zooniverse/translations'
          def dockerImageName = "${dockerRepoName}:${GIT_COMMIT}"
          newImage = docker.build(dockerImageName)
          newImage.inside {
            sh """
              cd /src
              npm run --silent stage
            """
          }
        }
      }
    }

    stage('update latest tag') {
      when { branch 'master' }
      agent any

      steps {
        script {
          newImage.push('latest')
          newImage.inside {
            sh """
              cd /src
              npm run --silent deploy
            """
          }
        }
      }
    }
  }
}