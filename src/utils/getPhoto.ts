import axios from "axios";

export async function getPhoto(gender: string): Promise<string> {
  let url: string;
  if (gender === "M") {
    url = "https://randomuser.me/api/?gender=male";
  } else if (gender === "F") {
    url = "https://randomuser.me/api/?gender=female";
  } else {
    throw new Error("Invalid gender");
  }

  try {
    const response = await axios.get(url);
    const photo = response.data.results[0].picture.large;
    return photo;
  } catch (error) {
    throw new Error("Failed to fetch employee photo");
  }
}
