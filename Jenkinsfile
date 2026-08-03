pipeline {
    agent { label 'docker' }

    environment {
        IMAGE_NAME = "prince0001/finetrack"
        CONTAINER_NAME = "finetrack"
    }

    stages {

        stage('Checkout Source') {
            steps {
                checkout scm
            }
        }

        stage('Copy Environment File') {
            steps {
                withCredentials([file(credentialsId: 'finetrack-env', variable: 'ENV_FILE')]) {
                    sh '''
                    cp $ENV_FILE .env
                    ls -la
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME:latest .
                '''
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                docker push $IMAGE_NAME:latest
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true

                docker run -d \
                  --name $CONTAINER_NAME \
                  -p 80:80 \
                  --restart unless-stopped \
                  $IMAGE_NAME:latest
                '''
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f'
        }

        success {
            echo 'Finetrack deployed successfully!'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}
