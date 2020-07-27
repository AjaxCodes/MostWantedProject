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
      searchResults = searchMultipleCriteria(people);
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
      displayPerson(person);
      return mainMenu(person, people);
    case "family":
      searchForFamily(person, people);
      return mainMenu(person, people);
    case "descendants":
      descendantRoutine(person, people);
      return mainMenu(person, people);
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
    alert("Invalid input.  Please try your selection again.");
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name? (Be sure to capitalize!)", chars);
  let lastName = promptFor("What is the person's last name? (Be sure to capitalize!)", chars);

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
  let displayOption = prompt("Please select your search criteria.  Valid search options include 'gender', 'dob', 'height', 'weight', 'eyecolor', or 'occupation'. Type the option you want, or 'results' to see a list of people matching current criteria.  Otherwise, type 'restart' or 'quit'").toLowerCase();

  switch(displayOption){
    case "gender":
      let genderInput = promptFor("What is the person's gender?", chars).toLowerCase();
      var filteredPeople =searchByCriteria(people, "gender", genderInput)
      return assessSearchResults(people, filteredPeople)    
      case "dob":
      let dobInput = promptFor("What is the person's dob? (format of MM/DD/YYYY - don't include 0's!)", chars);
      var filteredPeople =searchByCriteria(people, "dob", dobInput)
      return assessSearchResults(people, filteredPeople)    
    case "height":
      let heightInput = parseInt(promptFor("What is the person's height? (rounded to nearest whole number)", chars));
      var filteredPeople =searchByCriteria(people, "height", heightInput)
      return assessSearchResults(people, filteredPeople)    
    case "weight":
      let weightInput = parseInt(promptFor("What is the person's weight? (rounded to nearest whole number)", chars));
      var filteredPeople =searchByCriteria(people, "weight", weightInput)
      return assessSearchResults(people, filteredPeople)    
    case "eyecolor":
      let eyeColorInput = promptFor("What is the person's eye color? (Black, brown, blue, green, or hazel)", chars).toLowerCase();
      var filteredPeople =searchByCriteria(people, "eyeColor", eyeColorInput)
      return assessSearchResults(people, filteredPeople)    
    case "occupation":
      let jobInput = promptFor("What is the person's occupation", chars);
      var filteredPeople = searchByCriteria(people, "occupation", jobInput)
      return assessSearchResults(people, filteredPeople)    
    case "results":
      displayPeople(people)
      return searchMultipleCriteria(people);
      //add functionality to select by name one of these people, or to start over?
    case "restart":
      return app(people); // restart
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByCriteria(people, criteria, userInput){
  let filteredPeople = people.filter(function(person){
    if(person[criteria] === userInput){
      return true;
    }
    else{
      return false;
    }
  })
  return filteredPeople;
  //returns a list of all filtered people from db
}

function assessSearchResults(people, searchResults){
  if (searchResults.length == 0){
    alert("no matches found.  Please try your search again.");
    return app(people)    
    //case where no one matches search results
  }
  else if (searchResults.length == 1){
    alert("Database match found.");
    var wantedPerson = searchResults[0];
    return wantedPerson;
    //case where we find one individual matching criteria
  }
  else {
    return searchMultipleCriteria(searchResults)
  }
}
//Check if the list is length 1 - if it is alert that we found a match, display mainmenu

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
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
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

function descendantRoutine(person, people){
  var result = filterForDescendants(person, people);
  if (result.length == 0)
  {
    alert("Could not find any known descendants.");
    return mainMenu(person, people);
  }
  else {
    for (var i = 0; i < result.length; i++){
      var grandkidArray = filterForDescendants(result[i], people)
      result = result.concat(grandkidArray);
    }
  }
  alert(displayDescendants(result));
}

function filterForDescendants(person, people){
  let idToSearch = person.id;
  var filteredResults  =  people.filter(function(person){
    if(person.parents.includes(idToSearch)){
      return true;
    }
    else{
      return false;
    }
  })
  return filteredResults;
}

function displayDescendants(resultArray){
  var descendantString = "";
  for(var i = 0; i < resultArray.length; i++){
    descendantString += "Descendant: " + resultArray[i].firstName + " " + resultArray[i].lastName + "\n";
  }
  return descendantString;
}

function searchForFamily(person, people){
  let familyInfo = filterForSpouse(person, people);
  familyInfo += filterForParents(person, people);
  familyInfo += filterForSiblings(person, people);
  alert(familyInfo);
}
 
//Creating master searchForFamily function - could also use .concat here!
function filterForSpouse(person, people){
    if(person.currentSpouse == null){
      return "No record of spouse in database \n"
    }
    else {
    let idToSearch = person.currentSpouse;
    var spouseInfo = people.filter(function(person){
      if(person.id == idToSearch){
        return true;
      }
      else{
        return false;
      }
    })
    let result = "Spouse : " + spouseInfo[0].firstName + " " + spouseInfo[0].lastName + "\n";
    return result;
  }
}
  
//
  function filterForParents(person, people){
    if(person.parents.length == 0){
      return "No record of parent in database. \n"
    }
    else { 
      var result = "";
      for (var i = 0; i < person.parents.length; i++){
      let idToSearch = person.parents[i];
      let parentInfo = people.filter(function(person){
      if(person.id == idToSearch){
        return true;
      }
      else{
        return false;
      }
    })
    result += "Parent: " + parentInfo[0].firstName + " " + parentInfo[0].lastName + "\n";
    }
    }
    return result;
  }


  function filterForSiblings(person, people){
    if(person.parents.length == 0){
      return "No record of Sibling in database. \n"
    }
    else {
      let idToSearch = person.parents[0];
      var siblingInfo = people.filter(function(person){
        if(person.parents[0] == idToSearch){
          return true;
        }
        else{
          return false;
        }
      })
    }
  
    if (siblingInfo.length == 0){
      return "No record of Sibling in database. \n"
    }
    else{
      var result = "";
      for (var i = 0; i < siblingInfo.length; i++){
      result += "Sibling: " + siblingInfo[i].firstName + " " + siblingInfo[i].lastName + "\n";

      }
    }
    //if this array is length 0, return no record
    //else will iterate over it andconcat results w/ first and last name
    return result;
  }
  