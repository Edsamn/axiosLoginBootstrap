const tbody = document.querySelector(".tbody");
const userId = document.querySelector("#idInput").value;
const title = document.querySelector("#titleInput").value;
const description = document.querySelector("#descriptionInput").value;
const urlParams = new URLSearchParams(window.location.search);
let limit = parseInt(urlParams.get("limit")) || 5;
let offset = parseInt(urlParams.get("offset")) || 1;
const btnNext = document.getElementById("btnNext");
const btnPrevious = document.getElementById("btnPrevious");

async function createPosts(event) {
  event.preventDefault();

  try {
    const post = {
      title: title,
      description: description,
    };
    const response = await api.post(`createPost/${userId}`, post);
    alert(`${response.data.msg}`);
  } catch (error) {
    console.log(error);
  }
}

async function getPosts() {
  try {
    const pagination = {
      limit,
      offset,
    };

    const response = await api.get(`posts`, {params: pagination});
    const posts = response.data.data;

    posts.forEach((post) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row">${post.id}</th>
        <td>${post.title}</td>
        <td>${post.description}</td>
      `;
      tbody.appendChild(row);
    });

    btnPrevious.disabled = offset === 1;
    btnNext.disabled = response.data.totalPages === offset;
  } catch (error) {
    console.log(error);
  }
}
getPosts();

const nextPage = () => {
  if (offset) {
    offset += 1;
  }
  tbody.innerHTML = "";
  getPosts();
};

const previousPage = () => {
  if (offset > 1) {
    offset -= 1;
  }
  tbody.innerHTML = "";
  getPosts();
};
