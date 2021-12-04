const projct_info = {
    project_name: "Cycoin",
    project_description: "Web application for technological recycling waste container",
    project_version: "V_DEV",
    project_contributers: [
        "Mohamad Saif Bakour (Swordax) - Web Application Developer",
        "Khalifa Khalid Alsahmsi (Khxloof) - Digital Model Developer",
        "Zayed Jumaa Alali (Zackie) - Digital Model Developer",
        "Salem Shehab Alqasimi (Wizper) - Physical Model Developer",
        "Mohamad Khalil Musharbek (Argent) - Physical Model Developer"
    ],
    project_technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "EJS", "JWT", "Heroku Hosting", "Font Awesome", "Google Fonts"],
    development_duration: "58:20:00 (yet)",
    development_start: "22 Oct, 2021",
    development_end: null
};

const project_updates = {
    "22 Oct, 2021": [
        "Started development",
        "Created project folder",
        "Created the basic files such as: (app.js & info.js & .env)",
        "Created the basic in-project folders such as: (modles & views & public)",
        "Created the nested folders inside the basic project folders",
        "Wrote the basic initial starting block code in app.js",
        "Wrote the project_info and the project_updates inisde the info.js",
        "Installed the needed node packages through NPM",
        "Initialized the package.json file",
        "Created the home.ejs in the views folder and the head.ejs in the partials folder inside the views folder",
        "Connected to the fontawesome library and google fonts",
        "Filled the head.ejs with the head code and connected the front-end files to it",
        "Completed designing the home page",
        "Completed desinging the login and the signup forms",
        "Completed the animation when transitioning between the home page sections",
        // After mid-night
        "Connected to a temporary testing database",
        "Fixed syntax issues in the dotenv file",
        "Wrote the script for sending the signup request to the server with the user-entered data",
        "Handled the received data from the front-end in the server in app.js file",
        "Created the user.js file in the models folder and wrote the user schema",
        "Wrote the hashing function using bcrypt in the user.js file",
        "Created middlewares folder and in it created the signupValidation.js file",
        "Wrote the signup form validation code"
    ],
    "23 Oct, 2021": [
        "Worked on the signup form validation system",
        "Applied some changes on the user schema to match the needed code requirements",
        "Fixed an error in the database connection string",
        "Wrote the back-end code for the user signup and successfully completed the system",
        "Worked on filtering the errors in the code and displaying them to the user",
        "Completed the signup process, its validation, and the client-side validation errors processing and displaying"
    ],
    "24 Oct, 2021": [
        "Decreased the padding underthe submit button in the home forms",
        "Added signup success indicator animation when successfully signing up",
        "Started working on the login process"
    ],
    "25 Oct, 2021": [
        "Fixed a bug when sending the login request from the front-end",
        "Finished the login function username and password validation",
        "Finished the process of sending back the login request response",
        "Completed the login process error handling in the back-end and displaying in the front-end",
        "Added a success indicator for the login button",
        "Created a new email account for the project and stored the account access keys in the .env file",
        "Added a randomly generated numeric-characters length 24 string as a secret for the project and stored it in the .env file",
        "Replaced the test database with a static project-owned database on a new MongoDB account",
        "Updated the DB_URI in the .env file to match the new database",
        "Added a form input & error fields clearing mechanism triggered when clicking the back button in home page forms",
        "Added more validation to login errors",
        "Finished the process of creating jwt tokens when users login or signup and the storing them in the cookies",
        "Completed the user authentication system through the pages of the website"
    ],
    // Computer died for around 2 weeks :/
    "14 Nov, 2021": [
        "Fixed a bug when logging in causing the ejs local variable 'user' not being passed properly",
        "Worked on the user-interface of the app main page"
    ],
    "15 Nov, 2021": [
        "Finished working on the left side of the main user-dashboard",
        "Created the navagation section",
        "Created dashboard right side buttons",
        "Modified the layout of the app main dashboard to be compatable with other devices",
        "Added a browser tab icon",
        "Added user-dashboard onload animations"
    ],
    "16 Nov, 2021": [
        "Finished the basic initial layout and design of the leaderboard table",
        "Finished the machanism of navagating and transitioning between app sections",
        "Finished the basic initial layout of the settings section",
        "Finished the settings navagation div",
        "Finished the appearance sector in the settings, in terms of desiging and functionality",
    ],
    "17 Nov, 2021": [
        "Created multiple transition versions with different purposes",
        "Added background transition to the body element to transition the theme changing process",
        "Improved and fully completed the theme settings functionality",
        "Worked on the account settings page",
        "Created the settings sector transitioning mechanism",
        "Fixed the colors of the website to be compatable with both light and dark themes",
        "Created a front-end js themeController.js file located in the js directory",
        "Moved the theme controlling code to the themeController.js file to be used in multiple documents",
        "Added the login/signup by enter key feature",
        "Completed the layout and design of the account settings section",
        "Added the logout option button in the settings menu",
        "Replaced all the settings menu image icons to font icons from fontawesome",
        "Completed the logout functionality",
        "Replaced the crown, items, and coin images with icons from fontawesome"
    ],
    "18 Nov, 2021": [
        "Created the edit user popups (edit username, edit password, delete account) and made it's appearance functional",
        "Replaced the logo with a better quality version",
        "Created new js files in the public js directory called 'appScript.js' and 'homeScript.js'",
        "Transfered all the scripts in the app.ejs and the home.ejs files into js/appScript.js and js/homeScript.js",
        "Linked the public js files to the html (ejs) files",
        "Fixed the bug of not redirecting when signing up",
        "Organized the js files",
        "Modified the user model items property and added item inserting date"
    ],
    "19 Nov, 2021": [
        "Added error fields in the account edit divs",
        "Set a static width of 270px to the account edit divs to be compatible with the error fields",
        "Finished the front-end functionality of the edit username, edit password, and delete account",
        "Finished the back-end functionality of the edit username, edit password, and delete account",
        "Completed all the account settings functionality",
        "Added password authentication when changing account username",
        "Modified the style of the account settings buttons to be compatible with different situations",
        "Made the account editing success message cooler"
    ],
    "20 Nov, 2021": [
        "Added duplicate username validation when changing the username",
        "Sent status codes of success and failure when sending back the response for an account editing request",
        "Made the back-btn appear smoothly when opening the login or signup sections",
        "Added user avatar into the leaderboard table elements",
        "Created the add-item popup",
        "Modified the user schema to be compatible with the add-item functionality",
        "Completed the add-item front-end and back-end functionality",
        "Worked on the layout of the edit-popups error to look better"
        // Today I hit 24 hours working on this project :O
    ],
    "21 Nov, 2021": [
        "Modified the mechanism of displaying account edit/item adding errors",
        "Worked on the my-items section and table",
        "Completed the new template of the table design and layout",
        "Did small modification to the after adding item front-end process",
        "Worked on applying the new design of the table on the leaderboard table"
    ],
    "22 Nov, 2021": [
        "Created a new front-end js file 'numberFormatter.js' and kept it inside the js public directory",
        "Wrote code for number/date formatter inside the new js file",
        "Called the numberFormatter.js in the head tag, numberFormatter() function is available in all pages now",
        "Finalized the layout of the 'my-items' table",
        "Made the my-items table dynamic with formatted numbers and dates, and a limited amount of items to be loaded and inserted"
        // Hit 30 hours working on the project :O
    ],
    "23 Nov, 2021": [
        "Completed the insertItem() function that dynamically inserts items in 'my-items' table when adding new items",
        "Indicated in the item adding weight input's placeholder, that the weight should be in grams",
        "Fixed a bug that caused the dates of the retrieved items in the table to be reversed",
        "Fixed a bug in the numberFormatter causing an error when passing a small number less than 1000",
        "Indicated the recently inserted items with a special background color",
        "Developed the number formatting mechanism to make it more reusable and easy to format",
        "Worked on the algorithm for getting the arranged users depending on their coins, in addition to getting the current user rank"
    ],
    "24 Nov, 2021": [
        "Developed the numberFormatter(x, number) function code and made it more precise and wide with new features",
        "Created no-items-msg element and displayed it when no items are present, set it to disappear when inserting an item",
        "Made the items number in the main dashboard statistics box an intege-r and not a float",
        "Wrote the code for dynamically incrementing the items number in the main dashboard when adding a new item",
        "Created a new back-end middleware js file called generateRanking.js located in the middlewares directory",
        "Added a new field to the user schema, the userRank field, which will contain an integer number representing the rank of the player",
        "Wrote the code for ranking users depending on a given parameter (currently and temporarly using the number of items)",
        "Made the rank field in the main dashboard dynamic"
    ],
    "25 Nov, 2021": [
        "Fixed a bug that caused the first new account show rank as 0, by setting a default rank of the users collection length plus one"
    ],
    "26 Nov, 2021": [
        "Worked on the coins / balance algorithims",
        "Created the generators.js file inside the middlewares directory",
        "Created the internalDatabase directory that will contain .txt files",
        "Created .txt files that will work as internal database to save various data such as random, requests number, date of recording and more",
        "All data stored inside the .txt files in the internalDatabase directory folder will be used in the algo used in generating coins and balance",
        "Worked on the algorithm for generating coins, balance, and balance value",
        "Worked on the code for manipulating the .txt files and generating their values, also using their values in generating coins, balances etc.."
    ],
    "27 Nov, 2021": [
        "Worked on the algorithm for generating the coin value, and for generating the user balance",
        "Changed the structure of the internalDatabase, removed all files in it and added a new file called changers.txt",
        // Later that day
        "Modified the number formatter and fixed a bug that caused numbers such as around 200 (but with deimals) to be displayed as 0.2k",
        "Joined some of the generating functions inside the generateCycoin() function in generators.js because they run together",
        "Rewrote and simplified the generateCycoin() function and completed the functionality of the coins and balance calculating",
        "Made the reforming of the changers done when the admin calls the function only",
        "Completed the back-end side of sending userCoins and userBalance",
        "Completed the front-end side of receiving the userCoins and userBalance, formatting the numbers, and displaying them in the dashboard",
        "Made the dashboard update the coins and balance each time the user adds a new item",
        "The main dashboard in the app is now fully dynamic",
        "Discovered that my algorithm of calculating the userCoins is bad and mafunctional, where in some cases, adding items might decrease your coins",
        // Hit 40 hours working on the application
        "Discovered a bug causing a fatal error, caused by the broken algorithm, this bug causes the users with 0 items to crash the server",
        "Modified the algorithm and applied a temporary solution (maybe permenant idk) to fix the bugs caused",
        "Changed the ranking algo to rank according to coins and not to number of items",
        "Set the changers to be generated every 24 hours",
        "Set the ranking to be generated every 5 minutes and not on every get request to '/'"
    ],
    "28 Nov, 2021": [
        "Filled a hole in the authentication syste, where if the user was deleted from the database and he tried to refresh the page, he would cause fatal errors",
        "Added hoveropacity decrease for the app back button",
        "Created a new generating function, generateLeaderboard() in generators.js, the new function generates the leaderboard to be displayed for the users",
        "Wrote the ejs template for displaying the leaderboard list in app.ejs",
        "Completed the leaderboard generating and displaying system",
        "Made hovering on the dashboard elements display titles containing the unformatted numbers, providing the precise numbers to the users",
        "Added the username to the browser tab in case user was logged in"
    ],
    "29 Nov, 2021": [
        "Completed the front-end design of the leaderboard opening button in the home page home.ejs",
        "Worked on the front-end part of the home leaderboard",
        "Planned for new updates and features in the application",
        "Replaced all the traiditional errors used in the application with other cool ones",
        `
            Fixed a bug in the generateLeaderboard() function, where if one of the top 100 users shown in the leaderboard deletes his account, 
            if another user logs in, the generateLeaderboard() function is going to run, and is still going to look for the deleted user according 
            to his rank (before the generateRanking() function runs to fix this hole in ranks), but mongodb is going to return null, since the user 
            with that rank is deleted, causing an error when executing the ejs code in the app.ejs file
        `
    ],
    "30 Nov, 2021": [
        "Fixed the issue where in the settings menu, the appearnce and the account settings icons were switched",
        "Made the highlighting style in the tables a public style to enable using it in different tables other than the 'my-items' table",
        "Made it that the current user is highlighted in the leaderboard",
        "Created leaderboard.ejs inside the views directory",
        "Wrote the back-end management to the /leaderboard page",
        "Made the navagation option 'leaderboard' take the user to a separate page 'leaderboard.ejs'",
        "Moved the leaderboard section form the app.ejs to the leaderboard.ejs",
        "Started working on the new leaderboard page styling and functioality",
        "Added some new colors to the themeController.js themes"
    ],
    "1 Dec, 2021": [
        "Fixed an issue where the element title of the user-balance div was appearing through the whole page width",
        "Fixed an ejs bug when highlighting the current user in the leaderboard table",
        "Removed the home-leaderboard section and its CSS styling blocks",
        "Reordered and reorganized the back-btns styling to make it a bit more flex",
        "Changed the way of the leaderboard page layout & placed the logo and back-btn of the leaderboard page inside a header styled by the app-header",
        "Placed the number formatting caller from the appScript to the numberFormatter.js",
        "Deleted the script.js file as its useless so far",
        "Now, the leaderboard can be accessed from inside and outside the application",
        // Later that day
        "Worked on the layout of the website to make it ready for responsivness"
    ],
    "2 Dec, 2021": [
        "Made some more changes on the settings section layout, as well the leaderboard styling",
        "Fixed the table layout that was affected by the recent website layout changes",
        "Added a title for my-items section, and did some changes on the layout of the table to make it compatable with the new title",
        "Created user verification system, includes adding a new field in the user schema in user.js, which is userVerified",
        "Added verification sign/indicator beside the user name in multiple positions in the website",
        "Recreated the script.js file and placed it in the js directory in public",
        "Created console warnings for directed for admins and users",
        "Created admin_command() function which is used to allow admins to do actions on users and on the application through the devtools console, protected by a password",
        // Hit 50 hours working on the application so far
        // Later that day
        "Created checkUser() function that checks if the user we are trying to apply changes to exists or not, if not, the edit/addItem function wont complete to avoid fatal errors",
        "Added two new admin_command() commands, get-user command which gets all user information, get-changers command which gets the changers values",
        "Added table consoling, when the admin_command() returns an object, its displayed in the console as a table"
    ],
    "3 Dec, 2021": [
        "Removed all the repeated validations in the edit-account code, and used the signupValidation() function to validate most of the editing",
        "Added character validation in signupValidation() when validating a username, now, only letters, numbers, and underscores will be allowed in usernames",
        "Prevented signup validation error from logging in the server console",
        // Later that day
        "Placed the adding-item code inside a try catch block to prevent fatal errors",
        "Added 'No users to display' message in the leaderboard table in case there are no users displayed in the leaderboard",
        "Created adminCommands.js file in the middlewares directory",
        "Moved the admin commands code from the app.js into the adminCommands.js and set the app route in app.js to run the function in adminCommands.js"
        // Hit 55 hours C:
    ],
    "4 Dec, 2021": [
        "Wrote the info section content",
        "Created the info section in the app.ejs file",
        "Worked on styling the info section",
        "Created the confirmation alert, completed styling it and making it functional",
        "Applied confirmation alert when logging out",
        "Did some modifications to the editAccount() function mechanism to meet the reuirements of the confirmation alert mechanism"
    ]
};




/* TODO */
/*

{
    1- Load more users in the leaderboard
    2- Load more items in my-items list
    3- Create the info section
    4- Make the application responsive
}

*/