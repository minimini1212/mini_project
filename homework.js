const searchBtn = document.querySelector(".searchBtn");
const input = document.querySelector(".input");
const card = document.querySelector("#card");
const under = document.querySelector("#under");

let movieinfo = [];
let title = []; 

// fetch 옵션
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGY3ZWNlZmNlOGE5OTkzMjcxNjgzYTNmOWU4YWRlNyIsInN1YiI6IjY1MmYzNDA4YTgwMjM2MDBmZDJkNDlmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1rrCh0VRmKqEgle1KUg65DcMvhupvRf-ZPyDLm_5-DA'
  }
};




//포스터 붙이기
async function movieList() {
  const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  const jsonData = await response.json();
  let result = jsonData['results'];

  result.forEach((num) => {
   
    movieinfo.push(num);
    title.push(num['title']);

  let imageAll = ` <div class="col" id="${num['id']}">
                       <div type ="button" style ="margin: auto 10px; auto 5px; border-radius: 20px; border-color: blue" class="card h-100">
                          <img type ="button" style ="border-radius: 20px;" src="https://image.tmdb.org/t/p/w500${num['poster_path']}" 
                          class="ascard-img-top" alt="...">
                           <div class="cardBody">
                            <h5 class="cardTitle">${num['title']}</h5>
                            <p class="cardText">${num['overview']}</p>
                            <p class="cardText">${num['vote_average']}</p>
                           </div>
                       </div>
                     </div>`;

      card.innerHTML += `${imageAll}`;
  })

  // 첫 화면에서 영화 목록 클린 하면 ID값 출력
  const col = document.querySelectorAll(".col");
  col.forEach(function (col) {
    col.addEventListener("click", function() {
      alert("id: "+this.id);
    });
  })

}
movieList()



.then(()=> {
  //검색하기
  searchBtn.addEventListener("click", () => {
  movieSearch(input.value);
  list(input.value);
  })


  //검색 인풋으로 관련 영화 출력하기
  function movieSearch(userinput) { 
    card.innerHTML = ``;
    
   
    movieinfo.forEach(function (info) {

      if(info['title'].toLowerCase().includes(userinput.toLowerCase())){

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
    })

    // 검색 후 ID값 출력
  const col = document.querySelectorAll(".col");
  col.forEach(function (col) {
    col.addEventListener("click", function() {
      alert("id: "+this.id);
    });
  })
  }

  
})
.catch((err) => console.error(err));





// 검색 리스트 출력
function list(userinput) {
  under.innerHTML = ``;
  
  let p = document.createElement('p');
  under.appendChild(p);

     let c= title.filter((word) => {
            return word.toLowerCase().includes(userinput.toLowerCase());
            })
  p.append(`영화리스트 : ${c}`);
}

  
  
