import api from "./ApiService";

type RegisterUser = {
  username: string;
  email: string;
  password: string;
};

type LoginUser = {
  email: string;
  password: string;
};

async function RegisterService({ username, email, password }: RegisterUser) {
  try {
    const req = await api.post("/register", {
      username,
      email,
      password,
    });
    return { sucess : true, data: req.data};
  } catch (err) {
    return { sucess : false, err};
  }
}
async function LoginService({ email, password }: LoginUser) {
  try {
    const req = await api.post("/login", {
      email,
      password,
    });
    return { sucess : true, data: req.data};
  } catch (err) {
    return { sucess : false, err};
  }
}

export default { RegisterService, LoginService };
