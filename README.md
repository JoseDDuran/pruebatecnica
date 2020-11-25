
# Proyecto de prueba técnica
Este proyecto se realizó para aprobar la prueba técnica de parte de Jose Duran Zarate, el cual consiste en consumir Stars Wars Api, junto con lambdas y una conexión a DynamoDB.
La aplicación permite listar tanto películas como personajes, y en otro lambda, poder crear intentos de combinaciónes de tantos personajes un usuario quiera registrar por película.

## Estructura
Este servicio ha sido separado en directorios.
Por ejm `functions/movies.js`, donde en este fichero se guarda la configuración y lógica del lambda con respecto al recurso `movies`
En `entry/validator`, almacenamos las validaciones de los request o parámetros que lleguen como petición a nuestra aplicación.

## Casos de prueba

- 
- API for a Mobile Application

## Setup

```bash
npm install
```

## Deploy

Para el despliegue solo ejecutar 
```bash
serverless deploy
```

El resultado esperado debe ser similar a:

```bash
Serverless: Configuration warning at 'provider.apiGateway': unrecognized property 'sshouldStartNameWithService'
Serverless:  
Serverless: Learn more about configuration validation here: http://slss.io/configuration-validation
Serverless:  
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Service files not changed. Skipping deployment...
Service Information
service: prueba-tecnica
stage: dev
region: us-east-1
stack: prueba-tecnica-dev
resources: 31
api keys:
  None
endpoints:
  GET - https://1phz0qsv04.execute-api.us-east-1.amazonaws.com/dev/movies
  GET - https://1phz0qsv04.execute-api.us-east-1.amazonaws.com/dev/people
  POST - https://1phz0qsv04.execute-api.us-east-1.amazonaws.com/dev/combination
functions:
  getMovies: prueba-tecnica-dev-getMovies
  getPeople: prueba-tecnica-dev-getPeople
  saveCombination: prueba-tecnica-dev-saveCombination
layers:
  None
```

## Escalabilidad

### AWS Lambda
La configuración de los functions es en base a recursos y esta expuesta en el archivo  `serverless.yml`
```yaml
  functions:
      getMovies:
        handler: functions/movies.getMovies
        events:
          - http:
              path: movies
              method: get
              cors: true
      getPeople:
        handler: functions/people.getPeople
        events:
          - http:
              path: people
              method: get
              cors: true
      saveCombination:
        handler: functions/combination.saveCombination
        events:
          - http:
              path: combination
              method: post
              cors: true
```


### DynamoDB
Con la configuración creada en el `serverless.yml`, creamos con las credencianles connfiguradas de aws, una tabla en DynamoDB, de esta manera al desplegar el proyecto, se crea el recurso en la nube de aws.

```yaml
  resources:
      Resources:
        DynamoDB:
          Type: 'AWS::DynamoDB::Table'
          Properties:
            AttributeDefinitions:
              - AttributeName: ID
                AttributeType: S
            KeySchema:
              - AttributeName: ID
                KeyType: HASH
            BillingMode: PAY_PER_REQUEST
            TableName: ${self:provider.environment.TABLE_NAME}
```
