// URL for the API request

const apiUrl = 'https://random-word-api.herokuapp.com/word?number=20';
// Function to fetch words from the API and return a paragraph
function fetchRandomWords() {
    return fetch(apiUrl)
        .then(response => {
            // Checking if the response is okay (status code in the range 200-299)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parsing the response as JSON
            return response.json();
        })
        .then(words => {
            // Constructing a paragraph from the words array
            const paragraph = words.join(' ') + '.';
            return paragraph;
        })
        .catch(error => {
            // Handling errors that occur during fetch or response processing
            console.error('Error fetching random words:', error);
            return 'Error fetching random words.';
        });
}

// Variable to store the paragraph of random words
var text = '';
var display = document.querySelector('#display');

// Fetch the random words and display them
fetchRandomWords().then(paragraph => {
    text = paragraph;
    console.log('Random Words Paragraph:', text);
    text.split('').forEach(function (elem) {
        var newSpan = document.createElement('span');
        newSpan.innerHTML = elem;
        newSpan.style.fontSize = '2em';
        newSpan.classList.add("normal")
        display.appendChild(newSpan);
    });

    let timeDiv = document.querySelector('#timer')
    let allSpans = document.querySelectorAll('span');
    let index = 0;

    //timer Function
    let runner = true
    let seconds = 30
    timeDiv.innerHTML=seconds
    let timerId = ""
    let timer = function () {
        if (seconds > 0) {
            seconds--
            timeDiv.innerHTML = seconds

        }
        else {
            runner = false
            console.log(correct,incorrect)
            clearInterval(timerId)
            result()

        }

    }
    let statsDiv=document.querySelectorAll('.bottom')
    let tops=document.querySelectorAll('.top')
    let result=function(){
        console.log(correct,incorrect);
        let wpm=((correct)/5)/0.5
        let accuracy=((correct)/(correct+totalIncorrect))*100
        statsDiv[0].innerHTML=wpm.toFixed()
        statsDiv[1].innerHTML=accuracy.toFixed(2)+"%"
        tops[0].innerHTML='wpm'
        tops[1].innerHTML='acc'

    }
    window.addEventListener('keydown', (e) => {
        if (!timerId) {
            seconds++
            timeDiv.innerHTML = seconds
            timer()
        }
        if (!timerId) {
            timerId = setInterval(timer, 1000)
        }

    })
    //  let resetBtn = document.querySelector('#reset')
    //  resetBtn.addEventListener('click',(e)=>{
    //     fetchRandomWords()

    //  })
    let correct=0
    let incorrect=0
    let totalIncorrect=0

    // Add event listener for keydown events
    window.addEventListener('keydown', (e) => {
        if (e.key != "CapsLock" && e.key != "Shift") {
            if (e.key != 'Backspace' && runner) {
                if (text[index] == e.key) {
                    // console.log(true);
                    console.log(e.key);
                    allSpans[index].classList.remove("normal")
                    allSpans[index].classList.add("correct")
                    if(text[index]!=' '){
                        correct++
                    }
                    // allSpans[index].style.backgroundColor = 'black';
                } else {
                    
                    console.log(e.key);
                    allSpans[index].classList.remove("normal")
                    allSpans[index].classList.add("incorrect")
                    incorrect++
                    totalIncorrect++
                    // allSpans[index].style.backgroundColor = 'black';
                }
                index++;
            } else if (e.key == 'Backspace' && index > 0 && runner) {
                console.log(index,allSpans[index])
                index--;
                console.log(e.key, index);
                if(allSpans[index].classList[0]=="correct"){
                    allSpans[index].classList.remove('correct')
                    correct--
                }
                else{
                    allSpans[index].classList.remove('incorrect')

                    incorrect--
                }
                allSpans[index].classList.add("normal")
                
                // allSpans[index].style.background = 'white'
            }
        }
        else {
            alert("CAPS IS ON")

        }
    });
});





