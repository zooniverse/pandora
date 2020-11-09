#!groovy

node {
  checkout scm

  def dockerRepoName = 'zooniverse/translations'
  def dockerImageName = "${dockerRepoName}:${env.GIT_COMMIT}"
  def newImage = null

  stage('Build Docker image') {
    newImage = docker.build(dockerImageName)

    if (BRANCH_NAME == 'master') {
      stage('Update latest tag') {
        newImage.push('latest')
      }
    }
  }

  // always stage branches (including master) to pandora.zooniverse.org
  stage('Deploy current branch') {
    newImage.inside {
      sh """
        cd /src
        npm run --silent stage
      """
    }
  }

  // deploy master branch changes to translations.zooniverse.org
  stage('Deploy production') {
    if (BRANCH_NAME == 'master') {
      newImage.inside {
        sh """
          cd /src
          npm run --silent deploy
        """
      }
    }
  }
}