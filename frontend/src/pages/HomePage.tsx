import Navbar from "@components/Navbar";
import useAuthSWR from "@hooks/useAuthSWR";
import { Button, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ProtectedRoute from "../hoc/ProtectedRoute";

import * as yup from "yup";
import useYupForm from "@hooks/useYupForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    name: yup.string().label("Todo name").min(2).max(20).required(),
    password: yup.string().label("Password").min(8).max(20).required(),
  })
  .required();

const HomePage: React.FC = () => {
  const { register, handleSubmit } = useYupForm(schema);
  // const { register, handleSubmit } = useForm({
  //   mode: "onChange",
  //   resolver: yupResolver(schema),
  // });

  console.log(register("name"));

  return (
    <>
      <TextField {...register("name")} />
      <TextField {...register("password")} />
      <Button onClick={handleSubmit(console.log)}>SUBMIT</Button>
    </>

    // <>
    //   <Navbar />
    //   <Stack height="100vh" justifyContent="center" alignItems="center">
    //     <Typography variant="h2" sx={{ pb: 10 }}>
    //       HOME
    //     </Typography>
    //     <Button
    //       variant="text"
    //       size="large"
    //       sx={{ fontSize: 25 }}
    //       disableRipple
    //       href="login"
    //     >
    //       LOGIN
    //     </Button>
    //     <Button
    //       variant="text"
    //       size="large"
    //       sx={{ fontSize: 25 }}
    //       disableRipple
    //       href="signup"
    //     >
    //       SIGN UP
    //     </Button>
    //     <Button
    //       variant="text"
    //       size="large"
    //       sx={{ fontSize: 25 }}
    //       disableRipple
    //       href="projects"
    //     >
    //       PROJECTS
    //     </Button>
    //   </Stack>
    // </>
  );
};

export default HomePage;
