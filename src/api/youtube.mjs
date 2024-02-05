import axios from "axios";

const options = {
  method: 'POST',
  url: 'https://youtube86.p.rapidapi.com/api/youtube/links',
  headers: {
    'content-type': 'application/json',
    'X-Forwarded-For': '70.41.3.18',
    'X-RapidAPI-Key': '4ac98e8b45msh166d4b152d93e6bp1bfd58jsna67d2afa1304',
    'X-RapidAPI-Host': 'youtube86.p.rapidapi.com'
  },
  data: {
    url: 'https://www.youtube.com/watch?v=i81KnwTQ638'
  }
};

export const getVideoData = async (videoUrl) => {
  options.data.url = videoUrl;

  try {
    const youtubeLinkResponse = await axios.request(options);
    console.log(youtubeLinkResponse)
    return youtubeLinkResponse;
  } catch (error) {
    console.log(error);
  }
}






  export default getVideoData;