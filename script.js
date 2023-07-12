const generateButton = document.getElementById('generate-btn');
const body = document.body;

const randomRecipeURL = "https://www.themealdb.com/api/json/v1/1/random.php"

document.addEventListener("DOMContentLoaded", function() {
    startConfetti();
    setTimeout(stopConfetti, 5000);
});

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
            recipeImageElement.setAttribute('width', '300px');
            recipeImageElement.setAttribute('height', '300px');

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

            // rename the button to "Click me again!"
            generateButton.innerHTML = "Click me again!";
        })
        .catch(error => {
            console.log(error);
        })

});

// Confetti effect: https://www.cssscript.com/confetti-falling-animation/

var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();