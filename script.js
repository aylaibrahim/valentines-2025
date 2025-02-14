document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById("start-btn");
    let startScreen = document.getElementById("start-screen");
    let introScreen = document.getElementById("intro-screen");
    let introTextElement = document.getElementById("intro-text");
    let continueBtn = document.getElementById("continue-btn");

    let introGif = document.querySelector(".intro-gif");

    let quest1Screen = document.getElementById("quest-1");
    let quest2Screen = document.getElementById("quest-2");
    let quest3Screen = document.getElementById("quest-3");
    let finalScreen = document.getElementById("final-screen");
    let bouquetWinScreen = document.getElementById("bouquet-win-screen");

    let continueQuest1Btn = document.getElementById("continue-quest1-btn");
    let continueQuest2Btn = document.getElementById("continue-quest2-btn");
    let continueQuest3Btn = document.getElementById("continue-quest3-btn");
    let continueFinalBtn = document.getElementById("continue-final-btn");
    let continueBouquetWinBtn = document.getElementById("continue-bouquet-win-btn");

    const backgroundMusic = new Audio("music.mp3");
    backgroundMusic.loop = true;

    startBtn.addEventListener("click", function () {
        backgroundMusic.play();

        startScreen.classList.remove("active-screen");
        startScreen.classList.add("hidden");

        introScreen.classList.remove("hidden");
        introScreen.classList.add("active-screen");

        setTimeout(typeText, 500);
    });

    let introText = "hello! to be my valentine in 2025, you have to complete 3 quests kekeke... \n1. collect a bouquet \n2. solve a math riddle! \n3. pick our outfits <3";
    let index = 0;

    function typeText() {
        if (index < introText.length) {
            introTextElement.innerHTML += introText[index];
            index++;
            setTimeout(typeText, 50);
        } else {
            introGif.src = "./images/intro.png";
            continueBtn.classList.remove('hidden');
        }
    }

    continueBtn.addEventListener("click", function () {
        introScreen.style.opacity = "0";
        introScreen.style.transition = "opacity 1s ease-in-out";

        setTimeout(() => {
            introScreen.classList.remove("active-screen");
            introScreen.classList.add("hidden");

            quest1Screen.style.opacity = "0";
            quest1Screen.classList.remove("hidden");
            quest1Screen.classList.add("active-screen");

            setTimeout(() => {
                quest1Screen.style.opacity = "1";
                quest1Screen.style.transition = "opacity 1s ease-in-out";
            }, 10); 

            startQuest1();
        }, 1000);
    });

    let flowerCount = 0;
    let flowerCollected = document.getElementById("flower-count");
    let gameArea = document.getElementById("game-area");
    let basket = document.getElementById("basket");

    let keys = {
        ArrowLeft: false,
        ArrowRight: false,
        a: false,
        d: false
    };

    document.addEventListener("keydown", function (e) {
        if (e.key in keys) {
            keys[e.key] = true;
        }
    });

    document.addEventListener("keyup", function (e) {
        if (e.key in keys) {
            keys[e.key] = false;
        }
    });

    function moveBasket() {
        if (keys.ArrowLeft || keys.a) {
            basket.style.left = Math.max(0, basket.offsetLeft - 10) + "px";
        }
        if (keys.ArrowRight || keys.d) {
            basket.style.left = Math.min(window.innerWidth - basket.offsetWidth, basket.offsetLeft + 10) + "px";
        }
    }

    setInterval(moveBasket, 20);

    let createFlowerInterval;

    function startQuest1() {
        createFlowerInterval = setInterval(createFlower, 1000);
    }

    function createFlower() {
        let flower = document.createElement("img");
        flower.src = "./images/flower.png";
        flower.classList.add("flower");
        flower.style.left = Math.random() * (window.innerWidth - 80) + "px";
        flower.style.top = "0px";
        gameArea.appendChild(flower);

        let fallSpeed = 2;
        let fallInterval = setInterval(() => {
            flower.style.top = parseInt(flower.style.top) + fallSpeed + "px";

            if (
                flower.offsetTop + flower.offsetHeight >= basket.offsetTop &&
                flower.offsetLeft + flower.offsetWidth >= basket.offsetLeft &&
                flower.offsetLeft <= basket.offsetLeft + basket.offsetWidth
            ) {
                flowerCount++;
                flowerCollected.innerText = `flowers collected: ${flowerCount}/10`;

                gameArea.removeChild(flower);
                clearInterval(fallInterval); 

                if (flowerCount >= 10) {
                    clearInterval(createFlowerInterval);

                    quest1Screen.style.opacity = "0";
                    quest1Screen.style.transition = "opacity 1s ease-in-out"; 
                

                    setTimeout(() => {

                        quest1Screen.classList.remove("active-screen");
                        quest1Screen.classList.add("hidden");

                        bouquetWinScreen.style.opacity = "0";
                        bouquetWinScreen.classList.remove("hidden");
                        bouquetWinScreen.classList.add("active-screen");

                        setTimeout(() => {
                            bouquetWinScreen.style.opacity = "1";
                            bouquetWinScreen.style.transition = "opacity 1s ease-in-out";
                        }, 10);

                        typeBouquetWinText();
                    }, 1000);
                }
            }

            if (parseInt(flower.style.top) > gameArea.offsetHeight) {
                gameArea.removeChild(flower);
                clearInterval(fallInterval);
            }
        }, 20);
    }

    let bouquetWinText = "you got the bouquet! good job, now prepare for the super hard math riddle... hopefully your brain isnt rotted yet... hehehehe";
    let bouquetWinIndex = 0;

    function typeBouquetWinText() {
        if (bouquetWinIndex < bouquetWinText.length) {
            document.getElementById("bouquet-win-text").innerHTML += bouquetWinText[bouquetWinIndex];
            bouquetWinIndex++;
            setTimeout(typeBouquetWinText, 100);
        } else {
            continueBouquetWinBtn.classList.remove("hidden");
        }
    }

    continueBouquetWinBtn.addEventListener("click", function () {
        bouquetWinScreen.style.opacity = "0";
        bouquetWinScreen.style.transition = "opacity 1s ease-in-out";

        setTimeout(() => {
            bouquetWinScreen.classList.remove("active-screen");
            bouquetWinScreen.classList.add("hidden");

            quest2Screen.style.opacity = "0";
            quest2Screen.classList.remove("hidden");
            quest2Screen.classList.add("active-screen");

            setTimeout(() => {
                quest2Screen.style.opacity = "1";
                quest2Screen.style.transition = "opacity 1s ease-in-out";
            }, 10);
        }, 1000);
    });

    let riddleResultText = document.getElementById("riddle-result-text");
    let answerOptions = document.querySelector(".answer-options");
    const correctAnswer = "answer1"; 

    document.querySelectorAll(".answer-btn").forEach(button => {
        button.addEventListener("click", function () {
            if (button.id === correctAnswer) {
                document.querySelectorAll(".answer-btn").forEach(btn => {
                    if (btn.id !== correctAnswer) {
                        btn.style.display = "none";
                    }
                });

                button.style.position = "absolute";
                button.style.left = "50%";
                button.style.transform = "translateX(-50%)";
                button.style.transition = "all 0.5s ease-in-out";

                typeRiddleResultText();
            } else {
                alert("wrong answer! try again.");
            }
        });
    });

    let riddleResultMessage = "yeppp it's i<3u !!! so smart :0 you're onto the last part now!";
    let riddleResultIndex = 0;

    function typeRiddleResultText() {
        if (riddleResultIndex < riddleResultMessage.length) {
            riddleResultText.innerHTML += riddleResultMessage[riddleResultIndex];
            riddleResultIndex++;
            setTimeout(typeRiddleResultText, 50);
        } else {
            continueQuest2Btn.classList.remove("hidden");
        }
    }

    continueQuest2Btn.addEventListener("click", function () {
        quest2Screen.style.opacity = "0";
        quest2Screen.style.transition = "opacity 1s ease-in-out";

        setTimeout(() => {
            quest2Screen.classList.remove("active-screen");
            quest2Screen.classList.add("hidden");

            quest3Screen.style.opacity = "0"; 
            quest3Screen.classList.remove("hidden");
            quest3Screen.classList.add("active-screen");

            setTimeout(() => {
                quest3Screen.style.opacity = "1";
                quest3Screen.style.transition = "opacity 1s ease-in-out";
            }, 10);
        }, 1000);
    });

    let aylaOutfit1 = document.getElementById("ayla-outfit1");
    let aylaOutfit2 = document.getElementById("ayla-outfit2");
    let namOutfit1 = document.getElementById("nam-outfit1");
    let namOutfit2 = document.getElementById("nam-outfit2");

    let selectedAylaOutfit = null;
    let selectedNamOutfit = null;

    function selectOutfit(outfit, section) {
        if (section === "ayla") {
            aylaOutfit1.classList.remove("selected");
            aylaOutfit2.classList.remove("selected");
            selectedAylaOutfit = outfit;
        } else if (section === "nam") {
            namOutfit1.classList.remove("selected");
            namOutfit2.classList.remove("selected");
            selectedNamOutfit = outfit;
        }

        outfit.classList.add("selected");

        if (selectedAylaOutfit && selectedNamOutfit) {
            continueQuest3Btn.classList.remove("hidden");
        }
    }

    aylaOutfit1.addEventListener("click", function () {
        selectOutfit(aylaOutfit1, "ayla");
    });
    aylaOutfit2.addEventListener("click", function () {
        selectOutfit(aylaOutfit2, "ayla");
    });

    namOutfit1.addEventListener("click", function () {
        selectOutfit(namOutfit1, "nam");
    });
    namOutfit2.addEventListener("click", function () {
        selectOutfit(namOutfit2, "nam");
    });

continueQuest3Btn.addEventListener("click", function () {
    quest3Screen.style.opacity = "0";
    quest3Screen.style.transition = "opacity 1s ease-in-out";

    setTimeout(() => {
        quest3Screen.classList.remove("active-screen");
        quest3Screen.classList.add("hidden");

        finalScreen.style.opacity = "0";
        finalScreen.classList.remove("hidden");
        finalScreen.classList.add("active-screen");

        setTimeout(() => {
            finalScreen.style.opacity = "1";
            finalScreen.style.transition = "opacity 1s ease-in-out";
        }, 10);

        let finalImage = document.getElementById("final-image");
        if (selectedAylaOutfit === aylaOutfit1 && selectedNamOutfit === namOutfit1) {
            finalImage.src = "./images/kiss2.png";
        } else if (selectedAylaOutfit === aylaOutfit1 && selectedNamOutfit === namOutfit2) {
            finalImage.src = "./images/kiss4.png";
        } else if (selectedAylaOutfit === aylaOutfit2 && selectedNamOutfit === namOutfit1) {
            finalImage.src = "./images/kiss3.png";
        } else if (selectedAylaOutfit === aylaOutfit2 && selectedNamOutfit === namOutfit2) {
            finalImage.src = "./images/kiss1.png";
        }
    }, 1000); 
});

    continueFinalBtn.addEventListener("click", function () {
        finalScreen.classList.remove("active-screen");
        finalScreen.classList.add("hidden");

    });
});