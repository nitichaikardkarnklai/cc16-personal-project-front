import Router from "./route";
import { ToastContainer, Slide } from "react-toastify";
import useAuth from "./hooks/use-auth";
import Spinner from "./components/Spinner";

function App() {

  const { initialLoading } = useAuth();
  if (initialLoading) return <Spinner />

  return (
    <>
      <Router />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="colored"
        transition={Slide} />
    </>
  )
}

export default App