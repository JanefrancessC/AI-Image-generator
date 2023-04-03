import { surpriseMePrompts } from "../constants";


export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompt[randomIndex];
// check if you get a random prompt 2||3 times in a row
  if (randomPrompt === prompt) return getRandomPrompt(prompt); 
  return randomPrompt
}