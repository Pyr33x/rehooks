import axios from "axios";

const BASE_URL = "https://api.github.com";

type Opts = {
  owner: string;
  repo: string;
};

export async function getStars({ owner, repo }: Opts) {
  const url = `${BASE_URL}/repos/${owner}/${repo}`;
  const { data } = await axios.get(url);
  return data.stargazers_count;
}
