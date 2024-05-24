/*
    WPR381 Assignment 1 Group V12:
        - Annika Kritzinger (577322)
        - Nathan Evans (577806)
        - Thabang Mahlangu (576277)
*/

//Nathan Evans Menu creation
//
//
//
const readline = require('readline'); //The importing of the built-in module in Node.js called "readline"//This enables reading of input from the terminal

const read = readline.createInterface({ // an instance of an interface is created whereby input can be read and output can be written
    input: process.stdin, //Enables input to be received via the stream and to be read from the terminal, entered by the user
    output: process.stdout //It does the opposite of 'process.stdin' and  deals with the output to the terminal
})

//menu display is created below where the (` `) is used for the creation of multi-line strings which is all assigned to a constant variable that will be displayed later on
//Menu displays the option to go to Twitter, Spotify and to exit the program
const menu = ` 
    1. Go to Twitter
    2. Go to Spotify
    3. Exit Program
`;
//the menu displayed when the (1) is clicked by the user
//this menu has the options of taking the user back to the main menu or to exit the program
const twitterMenu = `
    1. Go back to the welcoming menu
    2. Close the program
`;
//the menu displayed when the (2) is clicked by the user
const spotifyMenu = `
    1. Go back to the welcoming menu
    2. Close the program
`;

const showMenu = () =>{ //arrow function is assigned to the constant variable 'showMenu'
    console.log("\nWelcome!\nPlease select an option below by pressing (1), (2), or (3):"); //Text displayed before menu displayed
    console.log(menu); //menu is displayed
    read.question('Please enter your option here: ', (answer) => { //user is pormpted to enter their choice and only after the user entered their choice, the callback function will execute
        handleMenuSelection(answer);//function is called and is responsible for processing the response and outputting the desired resulting result
    });
};

const showTwitterMenu = () => { //menu inside Twitter selection to be displayed
    console.log("\n\nPlease select an option below by pressing (1) or (2):");
    console.log(twitterMenu);
    read.question('Please enter your option here: ', (answer) => {
      handleTwitterMenuSelection(answer);
    });
};
  
const showSpotifyMenu = () => { //menu selection iside the Spotify selection to be displayed
    console.log("\n\nPlease select an option below by pressing (1) or (2):");
    console.log(spotifyMenu);
    read.question('Please enter your option here: ', (answer) => {
        handleSpotifyMenuSelection(answer);
    });
};

//main menu selection switch/case in use below:
const handleMenuSelection = (choice) => { //arrow function that stores the answer of the user in "(choice)"
    switch (choice) { //switch statement with cases below
      case '1':
        console.log('You selected Option 1: Go to Twitter\n\n');
        goToTwitter(); //run twitter function
        break;
      case '2':
        console.log('You selected Option 2: Go to Spotify\n\n');
        goToSpotify(); //run spotify function
        break;
      case '3':
        console.log('Exiting the program...'); //to exit the program
        setTimeout(() => { //timeout function to simulate a delay to show a process of being closed
          read.close(); //closes the program
          console.log('Program successfully closed.\n');
        }, 3000); //will close after 3 seconds
        return;
      default: //default/error handling
        console.log('Invalid choice, please select again.'); //error message
        setTimeout(showMenu, 1000); //menu will be shown/displayed after 1 second to enable the user to try again
        break;
    }
};

//twitter menu below:
const handleTwitterMenuSelection = (choice) => {
    switch (choice) {
      case '1':
        console.log('Returning to the welcoming menu...\n\n');
        setTimeout(showMenu, 1000); //show main menu
        break;
      case '2':
        console.log('Exiting the program...');
        setTimeout(() => {
          read.close();
          console.log('Program successfully closed.\n\n');
        }, 3000);
        break;
      default:
        console.log('Invalid choice, please select again.\n\n'); //error handling
        setTimeout(showTwitterMenu, 1000);
        break;
    }
};

//spotify menu below:
const handleSpotifyMenuSelection = (choice) => {
    switch (choice) {
      case '1':
        console.log('Returning to the welcoming menu...\n');
        setTimeout(showMenu, 1000); //show main menu
        break;
      case '2':
        console.log('Exiting the program...');
        setTimeout(() => {
          read.close();
          console.log('Program successfully closed.');
        }, 3000);
        break;
      default:
        console.log('Invalid choice, please select again.'); //error handling
        setTimeout(showSpotifyMenu, 1000);
        break;
    }
};

//navigating to the function to be run after selection was made
const goToTwitter = () => {//takes the user to twitter option
    console.log('Navigating to Twitter...\n\n'); //show processing message to remind user of their choice
    setTimeout(() => {
        console.log('Successfully navigated to Twitter.\n\n'); //display twitter information after 2 seconds
        PrintLatestTweets(); //function called of tweets to be displayed
        showTwitterMenu(); //display the menu navigation inside twitter
    }, 2000); //will execute after 2 seconds
};
  
const goToSpotify = () => { //takes the user to spotify option
    console.log('Navigating to Spotify...\n\n');
    setTimeout(() => {
        console.log('Successfully navigated to Spotify.\n\n');
        SearchSpotySong(); //function called of spotify to be displayed
        showSpotifyMenu();
    }, 2000);
};

//function to display Tweets from Twitter
const PrintLatestTweets = () => {
    console.log('\n\nPrinting latest tweets...');
    // Add your code to print latest tweets here
};
  
//function to search Spotify songs
const SearchSpotySong = () => {
    console.log('\n\nSearching for Spotify songs...');
    // Add your code to search Spotify songs here
};

showMenu();//placed here for code to be interpreted easier and ensures that all actions and functions takes place inside the menu

