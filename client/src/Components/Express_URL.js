//const Express_URL = "https://www.megasails.com/api";
const Express_URL =
  process.env.REACT_APP_EXPRESS_API ?? "http://localhost:5001/api";

export default Express_URL;
