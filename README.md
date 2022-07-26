# GET-JOKES!
This is a full stack web application, built using the <a href="https://www.geeksforgeeks.org/mern-stack/" className="about-links">"MERN"</a> Stack.

The client side: is handled with <a href="https://reactjs.org/">React</a> and <a href="https://getbootstrap.com/">Bootstrap</a>.  
State management is completely handled with <a href="https://redux.js.org/">Redux</a>.  
We send HTTP requests with <a href="https://www.npmjs.com/package/axios">Axios</a>,
and we manipulate the request <br />to the API according to the User's queries (which depend on the states from the form).<br />
We use <a href="https://www.w3schools.com/jsref/prop_win_localstorage.asp">localStorage</a> and the <a href="https://reactjs.org/docs/hooks-effect.html">UseEffect hook</a> to memorize the<br />last theme that was applied on the User's device.  
Routing and screens rending is implemented using <a href="https://reactrouter.com/" className="about-links">React router v6</a>.</p>

The server side: is handled with <a href="https://expressjs.com/">Express</a> and runs on a <a href="https://nodejs.org/">Node.js</a> server.  
User authentication and sessions are handled with <a href="https://www.passportjs.org/">Passport.js</a>, and <a href="https://www.passportjs.org/packages/passport-google-oauth20/">Oauth</a>.  
Passwords are being hashed and salted using <a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a>.  
All the user data is stored in A <a href="https://mongodb.com">MongoDB</a> Database.


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
<td><img src="https://user-images.githubusercontent.com/97472180/180994846-79087300-248a-4439-8160-4f6668497bc4.png" height="400" width="500" alt="HomeScreen-light"/></td>
<td><img src="https://user-images.githubusercontent.com/97472180/180999321-32bacbb0-648e-4fe4-ae08-712b13398d3d.png" height="400" width="500" alt="HomeScreen-dark" alt="API-Response"/>  </td>
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
<td><img src="https://user-images.githubusercontent.com/97472180/180996023-0c54c320-86e9-4a9d-982f-ed4f5dba0bd9.png" height="300" width="500" alt="UserScreen">  </td>
<td><img src="https://user-images.githubusercontent.com/97472180/180995460-a6cceca5-7914-42fe-8d00-aa143e442343.png" height="200" width="500" alt="EmptyUserScreen" >  </td>
</tr>
</table>
</p>

### User-registration and Oauth:  
<img src="https://user-images.githubusercontent.com/97472180/180996431-f5c8e724-6d30-43fe-a139-42b518f45913.png" height="400" width="500" alt="UserScreen">

### On Mobile:  
<p align="center">
<table>
  <tr>
    <td>Dark Mode</td>
     <td>Light Mode</td>
     <td>User Screen</td>
  </tr>
  <tr>
    <td><img src="https://user-images.githubusercontent.com/97472180/180998224-50ec335c-758e-4ea4-b257-5f738ae4c2a4.jpg" width=250 height=1000></td>
    <td><img src="https://user-images.githubusercontent.com/97472180/180997682-a391fe5e-e7f8-4336-a331-b7666835f265.jpg" width=250 height=1000></td>
    <td><img src="https://user-images.githubusercontent.com/97472180/180997674-1b09dcbd-aaeb-47ca-8d7d-8c3d3ba97077.jpg" width=250 height=1000></td>
  </tr>
 </table>
</p>


