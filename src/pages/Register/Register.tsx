import { useForm } from "react-hook-form";
import { createUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRegisterSchema, registerSchema } from "../../schemas/user/register";

export const Register = () => {
  const { register, handleSubmit } = useForm<IRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      wordsPerDay: 5,
    },
  });

  const navigate = useNavigate();

  const handleClickButton = async ({
    email,
    password,
    wordsPerDay,
  }: IRegisterSchema) => {
    await createUser({ email, password, words_per_day: wordsPerDay });
    localStorage.setItem("loggedIn", "true");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(handleClickButton)}>
      <div>
        <label>Email</label>
        <input type="email" {...register("email")} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
      </div>
      <div>
        <label>Words Per Day (1-100)</label>
        <input
          type="number"
          min={1}
          max={100}
          {...register("wordsPerDay", { valueAsNumber: true })}
        />
      </div>
      <div>
        <Link to={"/login"}>Already have an account? Login</Link>
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
};
