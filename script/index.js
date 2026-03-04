// console.log('File Connected')

const createElements = (arr) =>{
    const htmlElements = arr.map((el) =>`<span class="btn">${el}</span>`)
    return(htmlElements.join(" "))
}

const manageSpinner = (status) =>{
    if(status== true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
        
    }
}

 const loadLesson = () =>{
    const url = "https://openapi.programming-hero.com/api/levels/all";

    fetch(url)
    .then((res) => res.json())
    .then(json => displayLesson(json.data));
 }

 const activeLesson = () =>{
    const lessonBtn = document.querySelectorAll(".lesson-btn");
    // console.log(lessonBtn)
    lessonBtn.forEach((btn) => btn.classList.remove("active"));
 };
 const loadLevelWord = (id) =>{
    // console.log(id);
    manageSpinner(true);
      const url = `https://openapi.programming-hero.com/api/level/${id}`;

    //   console.log(url);

      fetch(url)
      .then((res) => res.json())
      .then(json => {
            activeLesson();
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn);
            clickBtn.classList.add("active")
            displayWord(json.data)
      });
 };
 const loadWordDetail = async(id) =>{
    const url = `https:openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails(details.data);
 };
//  {word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার', level: 1, sentence: 'The kids were eager to open their gifts.', …}

 const displayWordDetails = (word) =>{
    console.log(word);
    const detailsModal = document.getElementById("details-container");
    detailsModal.innerHTML=`<div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone"></i>:
            ${word.pronunciation})</h2>
        </div>
        <div class="space-y-2">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning?word.meaning:"অর্থ পাওয়া জায় নি"}</p>
        </div>
        <div class="space-y-2">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div class="space-y-2">
            <h2 class="font-bangla font-bold">সমার্থক শব্দ গুলো</h2>
            <div class"">
                ${createElements(word.synonyms)}
            </div>
        </div>`;
    document.getElementById("word_modal").showModal();
 }
 
 const displayWord = (words) =>{
    // console.log(words);
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = "";
    if(words.length === 0){
        wordContainer.innerHTML = `<div class="col-span-full text-center py-10 space-y-4">
            <img src="./assets/alert-error.png" alt="" class="mx-auto">
            <p class="font-bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bangla text-4xl font font-bold">নেক্সট Lesson এ যান</h2>
        
        </div>`;
        manageSpinner(false);
        return;
    }
    words.forEach(word=>{
        // console.log(word);
        const card = document.createElement("div")
        card.innerHTML= `
        <div class="card bg-white shadow-sm text-center rounded-xl py-10 px-5 space-y-6">
            <h2 class="text-2xl font-bold">${word.word?word.word:"শব্দ পাওয়া জায় নি"}</h2>
            <p class="text-xl font-medium">Meaning / Pronounciation</p>
            <div class="font-bangla text-2xl font-semibold">"${word.meaning? word.meaning:"অর্থ পাওয়া জায় নি"} / ${word.pronunciation? word.pronunciation:"Pronounciation পাওয়া জায় নি"}"</div>
            <div class="flex justify-between items-center">
            <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        </div>`

        wordContainer.appendChild(card);
    });
    manageSpinner(false);
 };

 const displayLesson = (lessons) =>{
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";
    
    lessons.forEach(lesson =>{
    
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Learn - ${lesson.level_no}
                 </button>
        `
        levelContainer.appendChild(btnDiv);
    });
};

 loadLesson();