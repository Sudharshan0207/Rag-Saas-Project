import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL;

export const uploadFile =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    return axios.post(
      `${BASE_URL}/upload`,
      formData
    );
};

export const askQuestion =
  async (

    question,
    history,
    activeDoc

  ) => {

    return axios.post(

      `${BASE_URL}/query`,

      {
        question,
        history,
        activeDoc
      }

    );
};