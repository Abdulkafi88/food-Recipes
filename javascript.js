// // "https://www.themealdb.com/api/json/v1/1/random.php"
// const mealsEl = document.getElementById("meals")
// const favoriteContainer = document.getElementById("fav-meals")
// const mealPopup = document.getElementById("meal-popup")
// const mealInfoEl = document.getElementById("meal-info")
// const popupCloseBtn = document.getElementById("close-popup")

// const searchTerm = document.getElementById("search-term")
// const searchBtn = document.getElementById("search")
// searchTerm.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     fetch(
//       `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm.value}`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const getTheMeal = data.meals

//         getTheMeal.forEach((mealsCards) => {
//           const mealsCard = document.createElement("div")
//           mealsCard.classList.add("meals")
//           mealsCard.innerHTML = `  <div class="meal">
// 		<div class="meal-header">
			
// 			<img src="${mealsCards.strMealThumb}" alt="">

// 		</div>
// 		<div class="meal-body">
// 			<h4>${mealsCards.strMeal}</h4>
// 			<button class="fav-btn">
// 				<i class="fas fa-heart"></i>
// 			</button>
// 		</div>
// 	</div>`

//           mealsEl.appendChild(mealsCard)
//         })

//         console.log(data)
//       })
//   }
// })
// searchBtn.addEventListener("click", (e) => {
//   fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
//     .then((res) => res.json())
//     .then((data) => {
//       const getingData = data.meals[0]
//       const newElDiv = document.createElement("div")
//       newElDiv.classList.add("meal")
//       newElDiv.innerHTML = `
        
//          <div class="meal">
// 		<div class="meal-header">
// 			<span class="random">Random Recipe</span>
// 			<img src="${data.meals[0].strMealThumb}" alt="">

// 		</div>
// 		<div class="meal-body">
// 			<h4>${data.meals[0].strMeal}</h4>
// 			<button class="fav-btn">
// 				<i class="fas fa-heart"></i>
// 			</button>
// 		</div>
// 	</div>
    
        
//         `
//       const btn = newElDiv.querySelector(".meal-body .fav-btn")
//       btn.addEventListener("click", (e) => {
//         btn.classList.add("active")

//         favoriteContainer.appendChild(newElDiv)
//       })
//       newElDiv.addEventListener("click", (e) => [showMealInfo()])
//       popupCloseBtn.addEventListener("click", (e) => {
//         mealPopup.classList.add("hidden")
//         mealInfoEl.innerHTML = ""
//       })
//       function showMealInfo() {
//         const mealPopUp = document.createElement("div")
//         mealPopUp.innerHTML = `<h1>${data.meals[0].strMeal}</h1>
//         <img
//             src="${data.meals[0].strMealThumb}"
//             alt=""
//             <p>${data.meals[0].strInstructions}</p>
        
//         `
//         mealInfoEl.appendChild(mealPopUp)
//         mealPopup.classList.remove("hidden")
//       }

//       mealsEl.appendChild(newElDiv)
//       console.log(getingData)
//     })
// })

const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

searchTerm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm.value}`)
      .then((res) => res.json())
      .then((data) => {
        const getTheMeal = data.meals;

        getTheMeal.forEach((mealsCards) => {
          const mealsCard = document.createElement("div");
          mealsCard.classList.add("meal");
          mealsCard.innerHTML = `
            <div class="meal-header">
              <img src="${mealsCards.strMealThumb}" alt="">
            </div>
            <div class="meal-body">
              <h4>${mealsCards.strMeal}</h4>
              <button class="fav-btn">
                <i class="fas fa-heart"></i>
              </button>
            </div>
          `;
          mealsCard.addEventListener("click", () => {
            showMealInfo(mealsCards);
          });

          mealsEl.appendChild(mealsCard);
        });
      });
  }
});

searchBtn.addEventListener("click", () => {
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const getingData = data.meals[0];
      const newElDiv = document.createElement("div");
      newElDiv.classList.add("meal");
      newElDiv.innerHTML = `
        <div class="meal-header">
          <span class="random">Random Recipe</span>
          <img src="${data.meals[0].strMealThumb}" alt="">
        </div>
        <div class="meal-body">
          <h4>${data.meals[0].strMeal}</h4>
          <button class="fav-btn">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      `;

      const btn = newElDiv.querySelector(".meal-body .fav-btn");
      btn.addEventListener("click", () => {
        btn.classList.add("active");
        favoriteContainer.appendChild(newElDiv);
      });

      newElDiv.addEventListener("click", () => {
        showMealInfo(data.meals[0]);
      });

      popupCloseBtn.addEventListener("click", () => {
        mealPopup.classList.add("hidden");
        mealInfoEl.innerHTML = "";
      });

      mealsEl.appendChild(newElDiv);
    });
});

function showMealInfo(mealData) {
  const mealPopUp = document.createElement("div");
  mealPopUp.innerHTML = `
    <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="">
    <p>${mealData.strInstructions}</p>
  `;
  mealInfoEl.innerHTML = "";
  mealInfoEl.appendChild(mealPopUp);
  mealPopup.classList.remove("hidden");
}
