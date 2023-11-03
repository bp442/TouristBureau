"use strict";

let categories = ["Adventures", "Arts & Crafts", "Museums", "Wine Tastings", "Other"];

let activities = [
    {
        category: "Adventures",
        id: "A101",
        name: "Valley Hot Air Balloons",
        description: "Enjoy a lovely hot air balloon ride over the valley at sunrise.  Call 800-555-1212 to reserve a date/time after you complete your e-ticket purchase.",
        location: "121 S. Main Street",
        price: 265.00
    },
    {
        category: "Adventures",
        id: "A102",
        name: "River Runners: Float Trip",
        description: "A mellow float trip with lovely scenery, great fishing, just a few riffles, and it finishes back at our base. It is a perfect trip for those wishing to take their time, or those on a limited schedule.",
        location: "145 FM 103",
        price: 65.00
    },
    {
        category: "Adventures",
        id: "A103",
        name: "River Runners: Ride the Rapids",
        description: "Experience 3-4 hours of Class II and III whitewater rafting with breathtaking scenery. It is a fun, thrilling, and memorable adventure that everyone from ages 8 and up can enjoy – no experience necessary!",
        location: "145 FM 103",
        price: 145.00
    },
    {
        category: "Arts & Crafts",
        id: "AC101",
        name: "Painting with a Twist : Oils",
        description: "Enjoy 2 hours of creating an oil painting by following along with an experienced artist.  Drinks and snacks are included.",
        location: "1991 Paint Drive",
        price: 40.00
    },
    {
        category: "Arts & Crafts",
        id: "AC102",
        name: "Painting with a Twist : Watercolor",
        description: "Enjoy 2 hours of creating a watercolor painting by following along with an experienced artist.  Drinks and snacks are included.",
        location: "1991 Paint Drive",
        price: 40.00
    },
    {
        category: "Museums",
        id: "M101",
        name: "Bravings Airship Museum",
        description: "Enjoy climbing on and in our collection of small airplanes.  You will find bi-planes, experimental planes and small jets.",
        location: "101 Airfield Drive",
        price: 10.00
    },
    {
        category: "Museums",
        id: "M102",
        name: "Forks and Spoons Museum",
        description: "Enjoy touring our qwerky Forks and Spoons Museum.  It houses the worlds largest collection of, you guessed it, forks and spoons!",
        location: "1056 Lost Knives Court",
        price: 3.00
    },
    {
        category: "Museums",
        id: "M103",
        name: "Steenges Computing Museum",
        description: "Enjoy our the Stengees Computing Museum that illustrates how computing has changed over the last 60 years.",
        location: "103 Technology Way",
        price: 0.00
    },
    {
        category: "Wine Tastings",
        id: "WT-101",
        name: "Hastings Winery Tours and Tastings",
        description: "Hastings Winery is a small, family owned winery in the heart of San Jose, CA. We pride ourselves on producing single vineyard, small-batch, handcrafted premium wines sourced from the finest grapes in our valley.",
        location: "10987 FM 1187",
        price: 12.00
    },
    {
        category: "Wine Tastings",
        id: "WT-102",
        name: "Lone Oak Winery",
        description: "We are a family and friend centered winery that thrives to make each of our guests feel right at home. With a growing wine list of the finest local wines, we offer tours and an incredible experience. We are open for to-go, curbside, and delivery.",
        location: "121 Burleson Court",
        price: 0.00
    },
    {
        category: "Other",
        id: "OTH101",
        name: "Fire Department: Ride Along",
        description: "Spend the day hanging out at one of our local fire stations, visiting with the staff and learning about their jobs.  If they receive a call, you can ride along with them!",
        location: "10 Redline Drive",
        price: 25.00
    },
    {
        category: "Other",
        id: "OTH102",
        name: "Homes For Our Neighbors",
        description: "Yes, you are a visitor!  But what better way to learn about a community than volunteer with the locals to build affordable housing.  Whether it be for an hour or a week, we would love to have you with us!",
        location: "Call (555) 555-5555",
        price: 0.00
    }
];

//global array to keep track of the current working category of activities
let currentActivities = [];

window.onload = function init() {
    let activityList = document.getElementById("activityList");
    const categoryList = document.getElementById("categoryList");
    let activityForm = document.getElementById("activityForm");
    const resetBtn = document.getElementById("resetBtn");

    categoryList.onchange = onCategoryChange;
    activityList.onchange = onActivityChange;
    resetBtn.onclick = activityForm.reset();

}

//enumerates currentActivities[] with the activities with the selected category
function onCategoryChange() {
    //change activityDiv to visible status, and fill the options with the activities from that category
    const categoryList = document.getElementById("categoryList");
    let activityDiv = document.getElementById("activityDiv");
    let activityList = document.getElementById("activityList");
    let activityForm = document.getElementById("activityForm");
    const currentIndex = categoryList.selectedIndex;
    const activityLength = activities.length;

    //If a user selects a different category, the form should be hidden again
    activityForm.style = "visibility:hidden";

    //if you select the top, clear all options and hide activityDiv (DEFAULT)
    if (categoryList.value == "unselectedCategory") {
        activityDiv.style = "visibility:hidden";
        resetActivities(); //reset the activity list
    }
    else { //a valid category was selected; make activityDiv visible and enumerate the options for that category
        activityDiv.style = "visibility: visible";
        resetActivities(); //reset the activity list
        
        //reset the working activities array because it's a new category
        currentActivities.length = 0;

        //find the current category
        let currentCategory = categoryList.options[currentIndex].text;

        //iterate through activities
        for (let y = 0; y < activityLength; y++) {
            //if category matches, add it to the options
            if (activities[y].category == currentCategory) {
                let newOption = new Option(activities[y].name, activities[y].id)
                activityList.appendChild(newOption);
                currentActivities.push(activities[y])
            }
        }
    }
}

function onActivityChange() {
    const activityList = document.getElementById("activityList");
    let activityForm = document.getElementById("activityForm")
    //we keep in mind that the actual index is -1 of currActivityIndex because of the unselectedActivity option
    let currActivityIndex = activityList.selectedIndex;

    if(currentActivities[currActivityIndex-1].price > 0){
        //if the activity has a price, the form becomes visible
        activityForm.style= "visibility:visible";
    }
    else{
        //if the activity has no price, the activityForm can be hidden again since it has no use
        activityForm.style= "visibility:hidden";
    }

    if (activityList.options[currActivityIndex].value == "unselectedActivity") {
        //reset all the fields below the activities dropdown
        activityForm.reset();
        document.getElementById("detailRow1").style = "visibility:hidden";
        document.getElementById("detailRow2").style = "visibility:hidden";
        document.getElementById("detailRow3").style = "visibility:hidden";
    }
    else {
        //make the details visible for selected activity
        document.getElementById("detailRow1").style = "visibility:visible";
        document.getElementById("detailRow2").style = "visibility:visible";
        document.getElementById("detailRow3").style = "visibility:visible";

        assignActivityInfo(currActivityIndex);
        

    }
}

function assignActivityInfo(currActivityIndex) {
    //get p for all of the text that I need to replace with current activity details and assign proper text
    //current index -1 because we need to account for the empty option at the top (unselectedActivity)
    document.getElementById("activityID").innerText = currentActivities[currActivityIndex-1].id;
    document.getElementById("activityName").innerText = currentActivities[currActivityIndex-1].name;
    document.getElementById("activityLocation").innerText = currentActivities[currActivityIndex-1].location;
    document.getElementById("activityDescription").innerText = currentActivities[currActivityIndex-1].description;
    document.getElementById("activityPrice").innerText = "$" + currentActivities[currActivityIndex-1].price.toFixed(2); //needs $

}
//resets the activity list and adds an unselected activity option
function resetActivities() {
    let activityList = document.getElementById("activityList");
    let activityForm = document.getElementById("activityForm");

    activityList.options.length = 0;
    activityList.appendChild(new Option("Select an activity", "unselectedActivity"));

    //resets the form if any input was made, as well as hides the details
    activityForm.reset();
    activityForm.style = "visibility:hidden";
    document.getElementById("detailRow1").style = "visibility:hidden";
    document.getElementById("detailRow2").style = "visibility:hidden";
    document.getElementById("detailRow3").style = "visibility:hidden";
}


//NEEDS FORM VALIDATION NOW