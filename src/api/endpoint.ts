import axios from "axios";

export default axios.create({
  baseURL: "https://covid19.mathdro.id/api",
  headers: {
    "Content-Type": "*/*+json"
  }
});
