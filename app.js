"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  if (foundPerson.length == 1){
    var wantedPerson = foundPerson[0];
    return wantedPerson;
    //case where we find one individual matching criteria
  }
  else {
    alert("Could not find that individual.  Please try your search again, or search by something other than name.");
    return app(people);
  }
  //case where we have multiple or no individuals matching criteria
  //Display error message, kick us back to main menu
}

function searchMultipleCriteria(people){
  let displayOption = prompt("Please select your search criteria.  Valid search options include 'gender', 'dob', 'height', 'weight', 'eyecolor', or 'occupation'. Type the option you want, or 'finish' if you are finished searching.  Otherwise, type 'restart' or 'quit'").toLowerCase();

  switch(displayOption){
    case "gender":
    // TODO: search by gender
    break;
    case "dob":
    // TODO: get person's family
    break;
    case "height":
    // TODO: get person's descendants
    break;
    case "weight":
       //Filter list by weight
    break;
    case "eyecolor":
      //param should be eyeColor
         //Filter list by eyelor
    break;
    case "occupation":
          //Filter list by occupation
    break;
    case "finish":
          // TODO: return and display filtered array
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
}
//First switch case to select criteria
//depending on criteria, can assign user input to that search criteria
//verification of user input
//filter by that quality and assign to result
//give option to further filter, or to "finish" or "start over"
//continue filtering until they finish
//return filtered list(displayPeople)

function searchByCriteria(people){
  let filteredPeople = people.filterPeopleByCriteria(function(person, criteria){
    if(person.criteria === criteria){
      return true;
    }
    else{
      return false;
    }
  })
  return filteredPeople;
  //returns a list of all filtered people from bd
}


  //take in critera from switch case
  //will filter our current db of people by that and assign to variable (new array)
  //will return that array to the main menu
}

// alerts a list of people
//Will use this for multi-search criteria to return list.
//Can then display list (numbered) and allow folks to select 1 specific person
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
