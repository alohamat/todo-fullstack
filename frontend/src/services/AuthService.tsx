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
  console.log("register called");
  try {
    const req = await api.post("/register", {
      username,
      email,
      password,
    });
    if (req.status === 200) {
      return { success : true, data: req.data};
    }
    else {
      return { success : false, err: "unexpected error"};
    }
  } catch (err) {
    return { success : false, err};
  }
}
async function LoginService({ email, password }: LoginUser) {
  try {
    const req = await api.post("/login", {
      email,
      password,
    });
    return { success : true, data: req.data};
  } catch (err) {
    return { success : false, err};
  }
}

export default { RegisterService, LoginService };
