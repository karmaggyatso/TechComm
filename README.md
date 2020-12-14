# TechComm
Technology for Community

Corey Zoubkov, Jeewan Thapa Magar, Karma Gyatso

## Built on top of CUNY Tech Prep Project Starter
https://github.com/CUNYTechPrep/project-starter

## Stack
*Additional dependencies*
 - Node v.12+ https://nodejs.org/en/
 - PostgreSQL v.11+
    - Installing PostgreSQL:
      - https://github.com/CUNYTechPrep/project-starter
      - https://github.com/CUNYTechPrep/ctp2019/blob/master/guides/installing-postgresql.md
      - https://www.postgresql.org

    - Help for Windows users:
      - https://drive.google.com/file/d/1GvvrRbrnBj-sX-1pyfhmYfLVCLgp1f5R/view?usp=sharing (31:56)
      - Source: CUNY Tech Prep Recordings - Fall 2020, Week 7
        - https://docs.google.com/document/d/1WYavNqq5DVC4fTy5EM8AYJRl8MqQ1qg44QDzjgl-VeE/edit

*API*

- express.js
- sequelize.js

*React client*

- Built using `create-react-app` and configured to work with the api.
- Bootstrap 4.x added to `/client/public/index.html`
- React Router

*Project Structure*

<pre>
.
├── README.md
├── <strong>api</strong>
│   ├── app.js
│   ├── <strong>config</strong>
│   │   └── config.json
│   ├── <strong>controllers</strong>
│   │   ├── appConfig.js
│   │   ├── auth.js
│   │   ├── index.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── <strong>middlewares</strong>
│   │   └── authentication.js
│   └── <strong>models</strong>
│       ├── index.js
│       └── post.js
├── <strong>client</strong>
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── <strong>public</strong>
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── <strong>src</strong>
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── <strong>components</strong>
│       │   ├── AuthButton.js
│       │   ├── Loading.js
│       │   ├── Post.js
│       │   └── PrivateRoute.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── <strong>pages</strong>
│       │   ├── AboutUsPage.js
│       │   ├── JobPostFormPage.js
│       │   ├── JobPostsListPage.js
│       │   ├── LoginPage.js
│       │   ├── PostFormPage.js
│       │   ├── PostListsPage.js
│       │   ├── ProfilePage.js
│       │   ├── RentPostFormPage.js
│       │   ├── RentPostsListPage.js
│       │   ├── ShowPostPage.js
│       │   ├── SignUpPage.js
│       │   └── UserPostsListPage.js
│       ├── <strong>services</strong>
│       │   └── auth.js
│       └── serviceWorker.js
├── package-lock.json
└── package.json
</pre>


## Dev Setup

Do this on your local machine.

### Create a postgres db

Create a user in postgres named `ctp_user` with the password `ctp_pass`:

> This only needs to be done one time on your machine
> You can create additional users if you want to.

```
createuser -P -s -e ctp_user
```

Create a separate db for this project:

```
createdb -h localhost -U ctp_user app2019_development
```

*For more details see this [installing postgres guide](https://github.com/CUNYTechPrep/ctp2019/blob/master/guides/installing-postgresql.md)*

### Running the app

For local development you will need two terminals open, one for the api-backend and another for the react-client.

*Clone* this app, then:

```bash
# api-backend terminal 1
cp .env.example .env
npm install
npm run dev
```

```bash
# react-client terminal 2
cd client
npm install
npm start
```

- api-backend will launch at: http://localhost:8080
- react-client will launch at: http://localhost:3000

> In production you will only deploy a single app. The react client will build into static files that will be served from the backend.
