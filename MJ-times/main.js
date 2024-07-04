const API_KEY = `e0f8f26ac21a4440bfeba93583d4b833`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach((menu) =>
  menu.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
);
let totalResults = 0;
// 임의로 정해줄 수 있는 값임
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize); // => &pageSize=pageSize

    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      // ↓↓ render() 함수는 뉴스리스트가 확정되어야 호출할 수 있음
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );

  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );

  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  console.log("keyword", keyword);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${keyword}&apiKey=${API_KEY}`
  );

  getNews();
};

const render = () => {
  // const는 재할당이 안됨.
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
    <img class="news-img-size" src=${news.urlToImage} alt="">
  </div>
  <div class="col-lg-8">
    <h2>${news.title}</h2>
    <p>
      ${news.description}
    </p>
    <div>
      ${news.source.name} * ${news.publishedAt}
    </div>
  </div>
</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  // 우리가 정할 수 있는 값
  // totalResult,
  // page
  // pageSize
  // groupSize
  // totalPages
  const totalPages = Math.ceil(totalResults / pageSize);

  // 계산해야 하는 값
  // pageGroup
  // ceil = 올림
  const pageGroup = Math.ceil(page / groupSize);
  // lastPage
  let lastPage = pageGroup * groupSize;
  // 만약 마지막 페이지그룹이 그룹사이즈보다 작다? lastpage = totoalpage
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  // firstPage
  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item" onClick="moveToPage(1)"><a class="page-link">&lt;&lt;</a></li><li class="page-item" onClick="moveToPage(${
    page - 1
  })"><a class="page-link">&lt;</a></li>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === page ? "active" : ""
    }" onClick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  paginationHTML += `<li class="page-item" onClick="moveToPage(${
    page + 1
  })"><a class="page-link">&gt;</a></li><li class="page-item" onClick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`;

  document.querySelector(".pagination").innerHTML = paginationHTML;

  // <nav aria-label="Page navigation example">
  //     <ul class="pagination">
  //       <li class="page-item"><a class="page-link" href="#">Previous</a></li>
  //       <li class="page-item"><a class="page-link" href="#">1</a></li>
  //       <li class="page-item"><a class="page-link" href="#">2</a></li>
  //       <li class="page-item"><a class="page-link" href="#">3</a></li>
  //       <li class="page-item"><a class="page-link" href="#">Next</a></li>
  //     </ul>
  //   </nav>
};


const moveToPage = (pageNum) => {
  console.log("moveToPage", pageNum);
  page = pageNum;
  getNews();
  
};

getLatestNews();

// 1. 버튼들에 클릭이벤트 주기
// 2. 카테고리별 뉴스 가져오기
// 3. 그 뉴스를 보여주기 = render
