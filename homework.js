const searchBtn = document.querySelector(".searchBtn");
const input = document.querySelector(".input");
const card = document.querySelector("#card");
const under = document.querySelector("#under");

let movieInfo = [];
let title = []; 

// fetch 옵션
const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGY3ZWNlZmNlOGE5OTkzMjcxNjgzYTNmOWU4YWRlNyIsInN1YiI6IjY1MmYzNDA4YTgwMjM2MDBmZDJkNDlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rrCh0VRmKqEgle1KUg65DcMvhupvRf-ZPyDLm_5-DA'
    }
};

// 포스터 붙이기
async function movieList() {
  const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  const jsonData = await response.json();
  let result = jsonData['results'];

  result.forEach((num) => {
   
  movieInfo.push(num);
  title.push(num['title']);
  

  // 영화 목록 출력 함수 실행 --> 79번째 줄
  attach(num);
  })

  // ID값 출력 함수 실행 --> 95번째 줄
  ID();
}
movieList();


// 엔터키로 검색하기
function onClick () {
  // movieSearch 함수와 list를 실행시키는 함수를 실행 --> 105번째 줄
  add();
}

// 마우스로 클릭하여 검색하기
searchBtn.addEventListener("click", () => {
  // movieSearch 함수와 list를 실행시키는 함수를 실행 --> 105번째 줄
  add();
})


// 검색 인풋으로 관련 영화 출력하기
function movieSearch(userInput) { 
  card.innerHTML = ``;
  movieInfo.forEach(function (info) {
      if(info['title'].toLowerCase().includes(userInput.toLowerCase())){
        // 영화 목록 출력 함수 실행 --> 79번째 줄
        attach(info);
      }
  })
  // ID값 출력 함수 실행 --> 95번째 줄
  ID();
}

// 검색 리스트 출력
function list(userInput) {
  under.innerHTML = ``;
  
  let p = document.createElement('p');
  under.appendChild(p);

  let extract= title.filter((word) => {
      return word.toLowerCase().includes(userInput.toLowerCase());
      })
  p.append(`영화리스트 : ${extract}`);
}

// 영화 목록 출력
function attach(info) {
  let image = ` <div class="col" id="${info['id']}">
                    <div type ="button" style ="margin: auto 10px; auto 5px; border-radius: 20px; border-color: blue" class="card h-100">
                        <img style ="border-radius: 20px;" src="https://image.tmdb.org/t/p/w500${info['poster_path']}" 
                        class="ascard-img-top" alt="...">
                           <div class="cardBody">
                              <h5 class="cardTitle">${info['title']}</h5>
                              <p class="cardText">${info['overview']}</p>
                              <p class="cardText">${info['vote_average']}</p>
                           </div>
                    </div>
                </div>`;
  card.innerHTML += `${image}`;
}

// 검색 후 ID값 출력
function ID() {
  const col = document.querySelectorAll(".col");
  col.forEach(function (col) {
      col.addEventListener("click", function() {
      alert("id: "+this.id);
      });
  })
}

//  movieSearch 함수와 list를 실행시키는 함수
function add () {
movieSearch(input.value);
list(input.value);
}