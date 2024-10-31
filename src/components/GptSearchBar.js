import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';
import openai from '../utils/openai';
class RateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = "RateLimitError";
  }
}
const GptSearchBar = () => {
  
  const langKey = useSelector((store) => store.config.lang);
  const seachText = useRef(null);
  
  
  
  // Usage in handleGptSearchClick
  const handleGptSearchClick = async () => {
    try {
      console.log(seachText.current.value);
      const Gptquery = "Act as movie recommendation system and suggest some movies for the query: " +
        seachText.current.value +
        " only give me 5 movies, comma separated.";
      
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: Gptquery }],
        model: "gpt-3.5-turbo",
      });
      
      console.log(gptResults.choices);
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.error("You've hit the API rate limit. Try again later.");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };
  
//   const handleGptSearchClick =  async() =>{
//     console.log(seachText.current.value);
//     // make an api call to gpt api and get movie result
//   const Gptquery = "Act as movie recommendation system and suggest some movies for the query: "+
//   seachText.current.value +
//   "only give me 5 movies,comma seprated like example result given ahead.Example result: enthiran,viduthalai,madras,pariyerum perumal,sarpatta parambarai";
//   const gptResults = await openai.chat.completions.create({
//     messages: [{ role: "user", content: Gptquery }],
//     model: "gpt-3.5-turbo",
//   });
//   console.log(gptResults.choices);
// };

  return (
    <div className='pt-[5%] flex justify-center'>
        <form className='grid w-1/2 h-20 grid-cols-12 bg-black rounded-xl'
        onSubmit={(e) => e.preventDefault()}> 
            <input className='col-span-9 p-4 m-4 rounded-xl'
            ref={seachText}
             type="text" 
             placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button 
            className='col-span-3 px-2 py-2 m-4 text-white bg-red-700 rounded-lg'
            onClick={handleGptSearchClick}>
            {lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar;