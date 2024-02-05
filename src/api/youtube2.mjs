import ytdl from "ytdl-core";
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg';

export const  getVideInfo = async (url) => {
   try {

      const videoInfo = await ytdl.getBasicInfo(url);
      const { title, lengthSeconds } = videoInfo.videoDetails;
      const { iframeUrl } = videoInfo.videoDetails.embed;
      const duration = formatDuration(lengthSeconds);
      return { iframeUrl, title, duration };
   } catch (error) {
         console.error('Error al obtener la información del video:', error);
   }
}


export const getVideo = async (url, format) =>  {
   try {
      let info = await ytdl.getInfo(url);
      const videoFormat = await ytdl.chooseFormat(info.formats, { filter: 'videoandaudio' });
      const videoReadableStream = ytdl.downloadFromInfo(info, { format });
      if (!videoFormat) {
         throw new Error('No se encontró un formato con audio y video.');
      }
      if(format === 'mp4') {

        // Crear un archivo de salida y escribir el video con audio en él
        const outputFileStream = fs.createWriteStream('video.mp4');
        videoReadableStream.pipe(outputFileStream);

      } else {

         // Crear un archivo de salida y escribir el audio en formato MP3
         await ytdl(url, { quality:'highestaudio' }).pipe(fs.createWriteStream("audiprueba.mp3"));
      }
   } catch (error) {

   }


}

const formatDuration = (lengthSeconds) => {
   const hours = Math.floor(lengthSeconds / 3600);
   const minutes = Math.floor((lengthSeconds % 3600) / 60);
   const seconds = lengthSeconds % 60;

   let formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   if (hours > 0) {
         formattedDuration = `${hours}:${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
   }
   return formattedDuration;
}