# Nutritional Ingredient Scanner / Search Engine (NISSE)
NISSE aims to aid anyone who may be trying to verify food product ingredients (perhaps trying a new diet, avoiding certain ingredients due to food allergies and / or intolerances, etc.) quickly, accurately, and conveniently.  

## Motivation
NISSE is the chosen proposal from a selection of ideas for use as a means of applying the concepts learned in the East Carolina University (ECU) CSCI 6030 *Information Retrieval* course, and was developed by the members of *Group 2* (listed below in the *Credits*).  

## Project Usefulness
NISSE helps users with food items whose ingredient labels may be too small to read, identifies potential allergens in products, and allows users to record reactions and their severity to a food item all in one location.  

Food item searches can be accomplished by:
* typing in a food's terms (example, *Peter Pan Peanut Butter*)
* typing in a food item's UPC Code
* scanning the food item's UPC Code using a smartphone camera or desktop / laptop webcam  

## Getting Started
* Start by cloning the repository to a local folder using the terminal command: `git clone https://github.com/rscottjohnson/CSCI6030Team2.git`
* Navigate to the newly cloned directory and open the `home.html` file

## Technology used
NISSE was developed using HTML, CSS, and JavaScript, but leverages some other tools to bring functionality to its users:
* [Edamam](https://www.edamam.com) (and specifically the Food Database API) is utilized as the larger collection for NISSE's searches
* [Firebase](https://firebase.google.com) (and specifically the Cloud Firestore database) is used to:
    * house our user searches when a user elects to save a search
    * provide the user authentication tools to support user account creation and user login / logout.
* [QuaggaJS](https://serratus.github.io/quaggaJS/) is used to provide NISSE's scanner functionality
  
## Credits
Team 2 Project was created by [Kelle Clark](https://github.com/KelleClark), [Caroline Gembs](https://github.com/cgembs), [Scott Johnson](https://github.com/rscottjohnson), Sara Khanjari Nezhad Jooneghani, [Phoebe Maa](https://github.com/phmaa), and [Jared Mello](https://github.com/Jared-Mello).
