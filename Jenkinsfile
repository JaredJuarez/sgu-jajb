pipeline {
    agent any

    stages {
        // Etapa para detener los servicios o en todo caso hacer caso omiso si no existen
        stage('Parando los servicios') {
            steps {
                sh '''
                    docker-compose -p sgu-jajb-10b down || true
                '''
            }
        }

        // Eliminar las imagenes creadas por este proyecto
        stage('Eliminando imagenes anteriores') {
            steps {
                sh '''
                    IMAGES=$(docker images --filter "label=com.docker.compose.project=sgu-jajb-10b" -q)
                    if [ -n "$IMAGES" ]; then
                        docker rmi -f $IMAGES || true
                    else
                        echo "No hay imagenes para eliminar"
                    fi
                '''
            }
        }

        // Del recurso SCM configurado en el job, jala el repositorio
        stage('Clonando el repositorio') {
            steps {
                checkout scm
            }
        }

        // Construir y levantar los servicios
        stage('Construyendo y levantando los servicios') {
            steps {
                sh '''
                    docker-compose up --build -d
                '''
            }
        }
    }
    
    post {
        success {
            echo 'El pipeline se ejecutó correctamente.'
        }

        failure {
            echo 'El pipeline falló.'
        }

        always {
            echo 'El pipeline ha finalizado.'
        }
    }
}