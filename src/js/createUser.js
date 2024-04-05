const createUser = async (event) => {
  event.preventDefault();

  try {
    const name = document.getElementById("userNameInput").value;
    const email = document.getElementById("emailInput").value;
    const pass = document.getElementById("passwordInput").value;
    const rePass = document.getElementById("rePasswordInput").value;
    const error = document.getElementById("error");
    const getResponse = await api.get("/users");
    const users = getResponse.data.data;

    const user = {
      name: name,
      email: email,
      pass: pass,
    };

    const userAlreadyExists = users.find((user) => user.email === email);
    if (userAlreadyExists) {
      return (error.innerHTML = `Esse email já está cadastrado`);
    }

    if (pass !== rePass) {
      return (error.innerHTML = `Os campos de senha precisam ser preenchidos igualmente`);
    }

    if (name === "" || email === "" || pass === "") {
      return (error.innerHTML = `Os campos não podem ficar em branco`);
    }

    const postResponse = await api.post("/createUser/crypto", user);
    alert(`${postResponse.data.msg}`);
    setTimeout(() => {
      location.href = "./login.html";
    }, "2000");
  } catch (error) {
    error.innerHTML = `Erro ao fazer a requisição ${error.msg}`;
  }
};
