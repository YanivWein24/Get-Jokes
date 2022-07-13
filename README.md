# GET-JOKES!
This is a full stack web application, built using the <a href="https://www.geeksforgeeks.org/mern-stack/" className="about-links">"MERN"</a> Stack.

The client side: is handled with <a href="https://reactjs.org/">React</a> and <a href="https://getbootstrap.com/">Bootstrap</a>.  
We handle client side http requests with <a href="https://www.npmjs.com/package/axios">Axios</a>.  
Each and every parameter in the Menu section has its own <a href="https://reactjs.org/docs/hooks-state.html">UseState Hook</a>,  
and we manipulate the request to JokeAPI according to those hooks states.  
We use <a href="https://www.w3schools.com/jsref/prop_win_localstorage.asp">localStorage</a> and the <a href="https://reactjs.org/docs/hooks-effect.html">UseEffect hook</a> to memorize the<br />last theme that was used on a user's device.  
Routing and screens rending is implemented using <a href="https://reactrouter.com/" className="about-links">React router v6</a>.</p>

The server side: is handled with <a href="https://expressjs.com/">Express</a> and running on a <a href="https://nodejs.org/">Node.js</a> server.  
User authentication and sessions are handled with <a href="https://www.passportjs.org/">Passport.js</a>, and <a href="https://www.passportjs.org/packages/passport-google-oauth20/">Oauth</a>.  
Passwords are being hashed and salted using <a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a>.  
All the user data is being stored in A <a href="https://mongodb.com">MongoDB</a> Database.


The jokes are coming from <a href="https://sv443.net/jokeapi/v2/">Jokes-API</a>.

## Features:  
#### Joke Generator:
* Access a variety of over 1000 jokes!
* Supports 6 languages: English, Czech, German, French, Spanish and Portuguese.
* 6 categories to choose from, including: Programming, Dark, Punctuation, Spooky, Christmas and Miscellaneous.
* Black Flags - To filter out any jokes that might be offensive to the user.
* Input a string and search for specific jokes that contains that string.
* There are 2 Types of jokes to choose from - 'Single' and 'Two Part'.  

#### User Authentication:
* Complete support for user registration / login and sessions handling.
* Support for Google & Facebook Oauth.
* Registered users can "like" jokes and add them to their private jokes collection (working with both 'Single' and 'Two Part' jokes).
* After logging in, Users get access to the 'User' tab where they can see their private jokes collection. 

#### Dark Mode:
* A fully customized dark mode.
* Toggle on and off using 'react-switch' on the navigation bar.
* The theme preference is being saved in the user's local storage, for the next time they visit!
* Using the Context-API to change the theme on all child components. 

## Where can i check this out?
Right Here:  https://get-jokes-gen.herokuapp.com/
<br />

## Screenshots:
### HomeScreen:  
<p align="center">
<table>
<tr>
<td>Light Mode:</td>
<td>Dark Mode:</td>
</tr>
<tr> 
<td><img src="https://user-images.githubusercontent.com/97472180/175826891-93e84b82-8e03-41a6-ab40-94ed4fe289a3.png" height="400" width="500" alt="HomeScreen-light"/></td>
<td><img src="https://user-images.githubusercontent.com/97472180/175826892-095d9e3b-cbbd-4aed-8bc5-e2de4aa760f0.png" height="400" width="500" alt="HomeScreen-dark" alt="API-Response"/>  </td>
</tr>
</table>
</p>  

### User-Screen:  
<p align="center">
<table>
<tr>
<td>User's collection</td>
<td>Empty Collection</td>
</tr>
<tr>
<td><img src="https://user-images.githubusercontent.com/97472180/175826897-4ea39f9e-31d2-4990-9dc6-7723521e9516.png" height="300" width="500" alt="UserScreen">  </td>
<td><img src="https://user-images.githubusercontent.com/97472180/175826890-0eda5441-a820-439c-b761-71b049f2db71.png" height="200" width="500" alt="EmptyUserScreen" >  </td>
</tr>
</table>
</p>

### User-registration and Oauth:  
<img src="https://user-images.githubusercontent.com/97472180/175826896-d69a65ee-1bee-4e6f-a093-4310d1452c55.png" height="400" width="500" alt="UserScreen">

### On Mobile:  
<p align="center">
<table>
  <tr>
    <td>Dark Mode</td>
     <td>Light Mode</td>
     <td>User Screen</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/97472180/175826893-dbad850a-44d3-448c-83bc-52c2289a2427.jpg" width=250 height=1000></td>
    <td><img src="https://user-images.githubusercontent.com/97472180/175826894-b022e64c-ce15-4911-8024-d07d6f995a25.jpg" width=250 height=1000></td>
    <td><img src="https://user-images.githubusercontent.com/97472180/175826895-834135b8-698c-48ec-b2be-7a4c4164c195.jpg" width=250 height=1000></td>
  </tr>
 </table>
</p>


