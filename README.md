<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">bootcamp-gostack-desafio-02</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Few lines describing your project.
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

Em seguida, você precisa usar o Docker para inicializar um container com postgres, da seguinte maneira:

```
docker run --name fastfeetDatabase -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```

Se você já fez esse container antes, você pode startar ele com `docker start fasfeetDatabase`

OBS: Eu recomendo usar o postbird para visualizar o postgres, só precisa colocar o usuário como postgres e a senha que foi definida como docker no comando acima. Depois de conectado, crie uma database com o nome `fastfeet`

O postbird não precisa ser usado para criar tabelas. Isso é lidado pela própria aplicação usando o sequelize.

O arquivo .sequelizerc tem os caminhos de todos os diretórios importantes para o sequelize.

Depois que você criar as tabelas com `yarn sequelize migration:create --name=create-recipient` você pode acrescentar elas to container com `yarn sequelize db:migrate`.
Também é possível rermover migrations com `yarn db:migrate:undo:all`

## 🔧 Debugging <a name = "debugging"></a>

Existe arquivo de debug na pasta .vscode
Para utulizar opção de debug, execute o comando:

```
yarn dev:debug
```

## 🎈 Usage <a name="usage"></a>

Add notes about how to use the system.

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
