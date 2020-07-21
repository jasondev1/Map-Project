# Neighborhood Map React Single Page App
By Jason Espinoza

## About
This single page app uses the Google maps API and the location-based service Foursquare API to list some beaches in the Fort Lauderdale Florida area. The page features 5 map markers of locations in Fort Lauderdale and lists details of each beach using the Foursquare API. It also includes a search functionality that filters out the markers by query.
It is made with responsiveness in mind.


## How to Use the App
1. The app will load a map of Fort Lauderdale, with markers for each beach and a list of the differnt beaches in the sidebar.
2. Click on a map marker or name of the beach in the list to get details about the specific location.

## Local Installation 
Note: Make sure you have the latest Node.js installed.

To run the project in the **development mode**, follow the instructions below: 

1. Navigate to the directory that contains the project.
2. Open up Git Bash in this location.
3. Run npm install axios --save
4. Run npm install react-burger-menu --save
5. Run npm install escape-string-regexp --save
6. Run 'npm install'.
7. Run 'npm start'.
8. Open http://localhost:3000

To run the project in the **build mode**, follow the instructions below.<br>

Run: npm run build
```
This command builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

* Using a **static server**

npm install -g serve
serve -s build
```
The last command above will serve the project on the port 5000 so just open **[http://localhost:5000](http://localhost:5000)** to run the **production build** of the project.


## Important

Please note that the **Service Worker** providing offline capabilities works only in the **production build**. 


## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.


## Important
This application uses API's from Google maps and Foursquare, and developer free plans are only limited to a certain number of requests per day so you may experience not being able to load content. Note: The service worker is only functional in production mode (try it on the hosted site).

## Technology
* Reactjs
* HTML
* CSS
* Foursquare API
* Google Maps API
* Axios
* React-burger-menu
* Escape RegExp
