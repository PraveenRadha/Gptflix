import OpenAI from 'openai';
import { OPENAI_KEY } from './constants';

// Instantiate OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_KEY, 
  dangerouslyAllowBrowser: true, // Be cautious with this option
});


export default openai;
