import { getCurrentUser } from "../../utils/auth.js";

import "../assets/styles/styles.scss";
import "./utilisateur.scss";

import getLink from "../components/navigation";

getLink("profile");

const user = getCurrentUser();
if (!user) {
  window.location.assign("/index.html");
}
