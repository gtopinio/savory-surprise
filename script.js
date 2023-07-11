const generateButton = document.getElementById('generate-btn');
const body = document.body;

const randomRecipeURL = "https://www.themealdb.com/api/json/v1/1/random.php"

generateButton.addEventListener('click', () => {    
    // fetch the random recipe URL
    fetch(randomRecipeURL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // get the strMeal from the data object
            const recipeName = data.meals[0].strMeal;

            // Now we can use the recipeName to update the HTML
            const recipeNameElement = document.getElementById('recipe-name');
            recipeNameElement.innerHTML = recipeName;

            // get the strMealThumb from the data object
            const recipeImage = data.meals[0].strMealThumb;
            // get the recipe-image element
            const recipeImageElement = document.getElementById('food-img');
            // set the src attribute of the recipe-image element to the recipeImage
            recipeImageElement.setAttribute('src', recipeImage);
            // set the width and height of the recipe-image element
            recipeImageElement.setAttribute('width', '250px');
            recipeImageElement.setAttribute('height', '250px');

            // get the ingredients from the data object. It has a max of 20 ingredients
            // so we need to loop through them
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                // if the ingredient is not null, add it to
                // the ingredients array
                if (data.meals[0][`strIngredient${i}`]) {
                    ingredients.push(data.meals[0][`strIngredient${i}`]);
                }
            }

            const recipeCard = document.getElementsByClassName('recipe-ingredients-card');
            // set the padding-bottom to 5px
            recipeCard[0].style.paddingBottom = "5px";

            const ingredientsTitle = document.getElementById('ingredients-title');
            ingredientsTitle.innerHTML = "Ingredients";
            // Now we can use the ingredients to update the HTML
            // we need to show them as a list
            // in the HTML we have a <ul> with the id "ingredients-list"
            // we need to get that element
            const ingredientsList = document.getElementById('ingredients-list');
            // we need to loop through the ingredients array
            // and add each ingredient to the list
            ingredients.forEach(ingredient => {
                // create a new <li> element
                const li = document.createElement('li');
                // set the text of the <li> element to the ingredient
                li.innerHTML = ingredient;
                // add the <li> element to the <ul> element
                ingredientsList.appendChild(li);
            })

            const instructionsTitle = document.getElementById('instructions-title');
            instructionsTitle.innerHTML = "Instructions";

            // get the instructions from the data object
            const instructions = data.meals[0].strInstructions;

            // Now we need to format the instructions, we need to add a newline after every 4 sentences
            // we can use the split() method to split the instructions into an array of sentences
            const instructionsArray = instructions.split('.');
            // we need to loop through the instructionsArray and add a newline after every 4 sentences
            // we can use the map() method to loop through the array
            const instructionsArrayWithNewlines = instructionsArray.map((sentence, index) => {
                // if the index is divisible by 4, add a newline
                if (index % 4 === 0) {
                    return `${sentence}.<br><br>`;
                }
                // otherwise, just return the sentence
                return `${sentence}`;
            })
            // we need to join the array back into a string
            const instructionsWithNewlines = instructionsArrayWithNewlines.join('');
            // we need to replace the \r\n with a newline
            const formattedInstructions = instructionsWithNewlines.replace(/\r\n/g, '<br>');

            const instructionsCard = document.getElementsByClassName('recipe-instructions-card');
            // set the padding-bottom to 5px
            instructionsCard[0].style.paddingBottom = "5px";

            // Now we can use the instructions to update the HTML
            const instructionsElement = document.getElementById('instructions');
            instructionsElement.innerHTML = formattedInstructions;

            // get the img-card element
            const imgCard = document.getElementById('img-card');
            // remove the "hidden" from the img-card element
            imgCard.removeAttribute("hidden");

            // get the video link from the data object
            const videoLink = data.meals[0].strYoutube;
            console.log(videoLink);

            // change the video link format
            // e.g. https://www.youtube.com/watch?v=KfJp-QfrCz4
            // turn into https://www.youtube-nocookie.com/embed/KfJp-QfrCz4

            // split the videoLink into an array
            const videoLinkArray = videoLink.split('=');
            // get the last element of the array
            const videoLinkId = videoLinkArray[1];
            // add the videoLink to the end of the new video link
            const formattedVideoLink = `https://www.youtube-nocookie.com/embed/${videoLinkId}`;


            // get the iframe element
            const videoElement = document.getElementById('video');
            // set the src attribute of the iframe element to the videoLink
            videoElement.setAttribute('src', formattedVideoLink);
        })
        .catch(error => {
            console.log(error);
        })

});