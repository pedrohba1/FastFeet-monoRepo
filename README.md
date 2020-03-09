<p align="center">
  <a href="" rel="noopener">
 <img src="https://github.com/pedrohba1/bootcamp-gostack-desafio-02/blob/master/readme%20stuff/logo.png" alt="Project logo"></a>
</p>

<h3 align="center">Backend da aplicação do fastfeet</h3>

<div align="center">


[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Essa aplicação é o trabalho final do curso goStack, ofertado pela RocketSeat.
    <br>
</p>

## 📝 Table of Contents

-   [About](#about)
-   [Getting Started](#getting_started)
-   [Deployment](#deployment)
-   [Usage](#usage)
-   [Built Using](#built_using)
-   [TODO](../TODO.md)
-   [Contributing](../CONTRIBUTING.md)
-   [Authors](#authors)
-   [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

Write about 1-2 paragraphs describing the purpose of your project.

## 🏁 Getting Started <a name = "getting_started"></a>

Apenas `yarn install`para instalar todas as dependências do projeto assim que cloná-lo.

Em seguida, você precisa usar o Docker para inicializar um container com postgres e um com mongo, da seguinte maneira:

```
#postgres
docker run --name fastFeetDatabase -e  POSTGRES_USER=fastFeet -e POSTGRES_PASSWORD=docker -p 5433:5432 -d postgres
#mongo
docker run --name fastFeetMongo -p 27017:27017 -d -t mongo
#redis
docker run --name redisFastFeet -p 6379:6379 -d -t redis:alpine
```

Veja que no windows eu tive que mudar a porta de listening para 5433.

Se você já fez esse container antes, você pode startar ele com `docker start fastFeetDatabase`

OBS: Eu recomendo usar o postbird para visualizar o postgres, só precisa colocar o usuário como postgres e a senha que foi definida como docker no comando acima. Depois de conectado, crie uma database com o nome `fastfeet`

O postbird não precisa ser usado para criar tabelas. Isso é lidado pela própria aplicação usando o sequelize.

O arquivo .sequelizerc tem os caminhos de todos os diretórios importantes para o sequelize.

Depois que você criar as tabelas com `yarn sequelize migration:create --name=create-recipient` você pode acrescentar elas to container com `yarn sequelize db:migrate`.
Também é possível rermover migrations com `yarn db:migrate:undo:all`

Depois de feitas as migrations, é preciso adicionar as seeds, com `yarn sequelize db:seed:all`

## 🔧 Debugging <a name = "debugging"></a>

Existe arquivo de debug na pasta .vscode
Para utulizar opção de debug, execute o comando:

```
yarn dev:debug
```

## 🎈 Usage <a name="usage"></a>

O Redis é utilizado para o enviar emails de deleção pelo mailtrap.io.

## 🚀 Deployment <a name = "deployment"></a>

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using"></a>

-   [Sucrase](qqwe) - Builder de desenvolvimento
-   [Postgres](https://www.postgresql.org) - Banco de dados
-   [Express](https://expressjs.com/) - framework de servidor
-   [NodeJs](https://nodejs.org/en/) - Ambiente de servidor
-   [Nodemon](qeqwe) - Ambiente de servidor só que para desenvolvimento
-   [Docker](a) - Cria containers para o backend.
-   [Sequelize](b) - ORM para Nodejs.
-   [Eslint](c) - define o padrão para código.
-   [Prettier](d) - deixa o código mais bonitão.

## ✍️ Authors <a name = "authors"></a>

-   [@kylelobo](https://github.com/kylelobo) - Idea & Initial work

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

## 🎉 Acknowledgements <a name = "acknowledgement"></a>

-   Hat tip to anyone whose code was used
-   Inspiration
-   References
