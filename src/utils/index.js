import { showSnackBar } from "../components/Snackbar"

export const handleError = (error) => {
  console.log(error);
  showSnackBar(error.response.data.message)
}