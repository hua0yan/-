import axios from "axios";
const quest = axios.create({
  baseURL: "http://42.192.129.12:8000/",
});
export default quest;
