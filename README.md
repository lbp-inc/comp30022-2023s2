# Getting Started
Clone this project (obviously)

## Backend
```sh
cd backend
npm install
npm start
```

> Go to mongoDB website and add your current IP address
> 
> `nodemon server` or `node server`, please restart your server if you use `node server`.

## Frontend
```sh
cd frontend
npm install
npm start
```


# Patch notes

## Patch note in **23/9/2023**

1. Deploy successful in front and back end
2. Edit function now can be easily use and access to the database
3. Over all layout and portal for other group has been finalised
4. Minor bug to be fix in website
   - including layout in different page, nav bar now would stack with the text
   - edit function's Layout preview need to be fix



<!--
This deployment app should not be used as "The Heroku deployment in the readme file is only for our content segment, which is not meant for the whole class; the whole class deployment was incharged by the membership team, which I think they are deploying today? I did asked them this morning, they said they are waiting for every groups to merge into the main branch and start deploying."

deploy url：
------------------------

Front end: [LongBeach Place Inc (longbeachfrontend0adcfe405469.herokuapp.com)](https://longbeachfrontend-0adcfe405469.herokuapp.com/)
------------------------

## Back end: [Error (longbeachbackend-2c4b09f98b44.herokuapp.com)](https://longbeachbackend-2c4b09f98b44.herokuapp.com/) // dw about the error

------------
```
For deployment in Frontend
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass can be use when access not granted

1. **cd frontend** // for front end use only
2. git remote add longbeach-frontend https://git.heroku.com/longbeachfrontend.git //get access from Wenda Zhang
3. git remote -v // To check whether if remote access has been granted
4. git remote rm heroku
5. **heroku login**
6. heroku logs --app longbeachfrontend --tail
7. **npm run build** to deploy // make sure to run build in COMP30022-Content/frontend path
8. Remember to commit to the 'main' branch after each build complete
9. **git subtree push --prefix=frontend longbeach-frontend main** // cd .. back to the toplevel of the working tree
10. heroku open --app longbeachfrontend // to check if deploy has been successful


For deployment in Backend

1. **cd Backend** // for backend use only
2. git remote add longbeach-backend https://git.heroku.com/longbeachbackend.git //get access from Wenda Zhang
3. git remote -v // To check whether if remote access has been granted
4. git remote rm heroku
5. **heroku login**
6. heroku logs --app longbeachbackend --tail
7. Remember to commit to the 'main' branch after changes
8. **git subtree push --prefix=backend longbeach-backend main** // cd .. back to the toplevel of the working tree
10. heroku open --app longbeachbackend // to check if deploy has been successful
```
-->

<!--
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass 

Deploy command

### Backend deploy - run at root folder test

git subtree push --prefix=backend longbeach-backend main

### Frontend deploy - run at root folder

git subtree push --prefix=frontend longbeach-frontend main
-->
