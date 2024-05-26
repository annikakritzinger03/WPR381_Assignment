/*
  WPR381 Assignment 1 Group V12:
    - Annika Kritzinger (577322)
    - Nathan Evans (577806)
    - Thabang Mahlangu (576277)
*/

//The importing of the built-in module in Node.js called "readline"//This enables reading of input from the terminal
const readLine = require('readline');

//Creating an instance interface whereby input can be read and output can be written
const rl = readLine.createInterface({ 
    input: process.stdin,     //Enables input to be received via the stream and to be read from the terminal, entered by the user
    output: process.stdout    //It does the opposite of 'process.stdin' and  deals with the output to the terminal
});

/*
    Storing credentials in .env files is much more secure than placing them as variables or constants in the code.
    In this case, the client ID and client secret is stored in the .env file
*/

//Include the dotenv module
require('dotenv').config();
//Include the SpotifyWebApi module
const spotifyWebApi = require('spotify-web-api-node');

//Create an instance of spotifyWebApi
const spotify = new spotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,            //Retrieve client ID from the .env file
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET     //Retrieve client secret from the .env file
});

console.clear();
DisplayMenu();

//Menu displays the option to go to, Spotify and to exit the program
function DisplayMenu(){
    console.log("----------Menu----------\n",           //Menu text to display in terminal
      "\t1. Perform a Spoitfy look-up for a song\n",    //Prompt text to run Spotify
      "\t2. Exit Program",                              //Prompt text to exit the program
    );
    
    //Processing user feedback and calling the relevant function
    rl.question("Please enter 1 or 2: ", async option => {
        switch(Number(option)){
            case 1:
                console.clear();
                await SearchSongInSpotify();
                ReturnToMenu();
                break;
            case 2:
                Exit(); //Function to exit
                return; 
            default:
                console.clear();
                //Invalid option will run to display the error message and enable the user to try again.
                console.log(`\"${option}\" is not valid option...\nPlease enter a number that is either 1 or 2.`);
                DisplayMenu();  //Displays the menu again
                return;
        }
    });
}

//Option to return to menu or to exit the program 
function ReturnToMenu(){ 
    setTimeout(() => {  //Wait before executing encapsulated code
        rl.question("Do you want to return to the main menu? (y/n): ", menu => { //Read user input entered after prompt 
          //Only one choice, text/input validation, transforms input to upper case
          if(menu.toUpperCase() === "Y"){ 
              console.clear();
              DisplayMenu();
          }
          else if(menu.toUpperCase() === "N"){
              Exit();
          }
          else{
              console.clear();
              //Prompt user to try again, text/input validation
              console.log(`\"${menu}\" is not valid option...\nPlease enter either y or n.`); 
              ReturnToMenu();
          }
        })
        //Wait for 2 seconds before executing code 
    }, 2000); 
}

//Main function to perform Spotify search capabilities
async function SearchSongInSpotify() {
  try {
      //Wait for PromptUser to finish executing before continuing
      let userCriteria = await PromptUser();
      //Split the song and artist from the results
      let song = userCriteria[0];
      let artist = userCriteria[1];

      //Retrieve an access token with the credentials
      let data = await spotify.clientCredentialsGrant();
      //Store the access token so it may be used at a later stage
      spotify.setAccessToken(data.body['access_token']);

      //Creating and using a query to search for the song on Spotify
      const QUERY = `track:${song} artist:${artist}`;
      let results = await spotify.searchTracks(QUERY);

      //Ensures that only exact matches of the song and artist is displayed to the user
      let exactMatch = results.body.tracks.items.filter(track => 
          track.name.toUpperCase() === song.toUpperCase() &&
          track.artists.some(a => a.name.toUpperCase() === String(artist).toUpperCase())
      );
    
      //Formats the data in an easily readable manner, displaying only the needed fields
      let formattedResults = exactMatch.map(track => ({
          Song: track.name,
          Artist: track.artists.map(artist => artist.name).join(', '),
          Album: track.album.name,
          Preview: track.preview_url
      }));

      //If the song was found, return a message and the results to the user
      if(formattedResults.length > 0){
          console.log(`\nMatches for the song was located in ${formattedResults.length} albums:`);
          console.log(formattedResults);
      }
      //If the song was NOT found, return a message to the user
      else{
          console.log("\nThe song could not be found on Spotify. Please ensure that it is entered correctly.")
      }
  } 
  catch (error) {
      console.error('Error:', error.message);
      ReturnToMenu();
  }
}

//Prompt the user for the song and artist(s) names
function PromptUser(){
  return new Promise((resolve, reject) => {
      let searchCriteria = []; 

      //Prompt the user for the song name and add it to the array
      rl.question("Please enter the song's name: ", song => {
          searchCriteria.push(song);

          //Prompt the user for the artist(s) name(s) and add it to the array
          rl.question("Please enter the artist(s)'s name(s): ", artists => {
              searchCriteria.push(artists);

              //If both array elements are not blank, return the array
              if (searchCriteria[0] !== "" && searchCriteria[1] !== "") {
                  resolve(searchCriteria);
              } 
              //Otherwise, throw an error
              else {
                  reject(new Error("Please ensure that both the song and artist(s) are not blank."));
              }
          });
      });
  })
}

//Exiting the program and displaying a message to the user
function Exit(){
    console.clear();
    console.log("Thank you for checking out our program! :)");
    process.exit();
}