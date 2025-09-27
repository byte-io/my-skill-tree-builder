# Getting Started with Skill Tree Builder App



## Available Scripts

To run the application locally

In the project directory, you can run:
### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
Instruction to play with App

1. Skill Node Creation: 

   > Users can add new skill nodes via a form (e.g., name, description and level ). All form fields are mandotory.
   > Each node is displayed on a canvas layout.
  
3. Connections (Prerequisites):

   > Users can connect nodes to define prerequisites (e.g., drag an edge from Skill A to Skill B, meaning A must be completed before B).
   > Displaying connections as arrows between nodes.
  
 4. Navigation and Interaction:
 
  > Users can click nodes to "unlock" them if prerequisites are met (tracking completion
    state).
  > Showing locked/unlocked status visually (e.g., color-coded: gray for locked, green
    for unlocked).
    
 5. Basic Persistence:
 
  > Saving the skill tree to localStorage on changes.
  > Load from localStorage on app reload.
  
 6. Unit Tests:
 
  > Including unit tests using a React testing library/Jest. 

Required Extension
Implemented followings to demonstrate additional engineering skills.
  1. Preventing cycles (e.g., no circular dependencies) with basic validation and user feedback via toast message.
  2. Adding a search bar to filter nodes by name, highlighting matching nodes with bold border.
  3. For fresh restart, Added Clear All button to clear nodes and edges from canvas and localStorage.



---------------------------------------
To run unit test, you can run
### `npm test`


Launches the test runner in the interactive watch mode.\


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!






