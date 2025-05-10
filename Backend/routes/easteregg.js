// === routes/easterEgg.js ===
// EASTER EGG: This is a special hidden feature for developers and curious users
// To access: GET /api/secret?key=codemaster
const express = require('express');
const router = express.Router();

// Collection of coding wisdom quotes
const codingWisdom = [
  "Remember that code is read more often than it's written. Optimize for readability.",
  "Don't repeat yourself (DRY), but don't overengineer simple things.",
  "Premature optimization is the root of all evil.",
  "The best bug report is a failing test.",
  "Always code as if the person who will maintain your code is a violent psychopath who knows where you live.",
  "If you can't explain your code to a 6-year-old, it's probably too complex.",
  "Debugging is twice as hard as writing the code in the first place.",
  "When in doubt, commit and push.",
  "Perfect is the enemy of good enough.",
  "Code without tests is broken by design."
];

// Collection of dev jokes
const devJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "!false... it's funny because it's true!",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  "Why don't programmers like nature? It has too many bugs and no debugging tool."
];

// Collection of programming memes (text descriptions)
const memeCaptions = [
  "When the code works but you don't know why: *Nervous hackerman typing*",
  "Documentation? You mean my Stack Overflow bookmarks?",
  "Me debugging my code: 'What does this error even mean?!'",
  "When your 5-line fix causes 20 new bugs: *surprised Pikachu face*",
  "That feeling when your code compiles on the first try: *suspicious fry squinting*"
];

// Educational resources treasure
const educationalTreasure = [
  {
    name: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "The Web Developer's Bible"
  },
  {
    name: "freeCodeCamp",
    url: "https://www.freecodecamp.org",
    description: "Learn to code for free with interactive challenges"
  },
  {
    name: "Exercism",
    url: "https://exercism.io",
    description: "Improve your coding skills with programming exercises"
  },
  {
    name: "The Odin Project",
    url: "https://www.theodinproject.com",
    description: "Full stack curriculum completely free and open source"
  },
  {
    name: "CS50",
    url: "https://cs50.harvard.edu",
    description: "Harvard's famous intro to computer science"
  }
];

// ASCII Art for the Easter Egg
const asciiCodePathfinder = `
   _____          _      _____      _   _     __ _           _           
  / ____|        | |    |  __ \\    | | | |   / _(_)         | |          
 | |     ___   __| | ___| |__) |_ _| |_| |__| |_ _ _ __   __| | ___ _ __ 
 | |    / _ \\ / _\` |/ _ \\  ___/ _\` | __| '_ \\  _| | '_ \\ / _\` |/ _ \\ '__|
 | |___| (_) | (_| |  __/ |  | (_| | |_| | | | | | | | | | (_| |  __/ |   
  \\_____\\___/ \\__,_|\\___|_|   \\__,_|\\__|_| |_|_| |_|_| |_|\\__,_|\\___|_|   
                                                                        
                     🚀 SECRET DEVELOPER MODE 🚀                       
`;

// The Easter Egg Route
router.get('/secret', (req, res) => {
  const secretKey = req.query.key;
  
  if (!secretKey) {
    return res.status(200).json({
      message: "You found a secret endpoint! Try adding ?key=codemaster to unlock developer mode."
    });
  }
  
  if (secretKey === 'codemaster') {
    const randomWisdom = codingWisdom[Math.floor(Math.random() * codingWisdom.length)];
    const randomJoke = devJokes[Math.floor(Math.random() * devJokes.length)];
    const randomMeme = memeCaptions[Math.floor(Math.random() * memeCaptions.length)];
    
    return res.status(200).json({
      message: "🎉 Developer Mode Unlocked! 🎉",
      ascii: asciiCodePathfinder,
      wisdom: randomWisdom,
      joke: randomJoke,
      meme: randomMeme,
      treasure: educationalTreasure,
      hint: "Try POST /api/secret/customize with a JSON body containing your name"
    });
  }
  
  res.status(200).json({
    message: "Almost there! That's not quite the right key. Try 'codemaster'."
  });
});

// Customization route
router.post('/secret/customize', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Please provide your name to generate a custom message."
    });
  }
  
  const domains = ["JavaScript", "Python", "Java", "C#", "Ruby", "Go", "Rust", "PHP"];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const randomLevel = levels[Math.floor(Math.random() * levels.length)];
  
  const customAscii = `
     ____  _____    _  ________  ___
    |  _ \\|  __ \\  | |/ /  ____|/ _ \\
    | |_) | |__) | | ' /| |__  | | | |
    |  _ <|  _  /  |  < |  __| | | | |
    | |_) | | \\ \\  | . \\| |____| |_| |
    |____/|_|  \\_\\ |_|\\_\\______\\___/
    
    The CodePathfinder team welcomes ${name}!
    Your secret domain: ${randomDomain}
    Your hidden level: ${randomLevel}
  `;
  
  res.status(200).json({
    success: true,
    message: `Hello ${name}! You've unlocked the super-secret customization feature!`,
    customBadge: customAscii,
    funFact: "This Easter egg was hidden by the development team to surprise fellow coders.",
    challenge: "Why not add your own Easter egg to the codebase?",
    hint: "There's one more endpoint: GET /api/secret/challenge"
  });
});

// Coding challenge route
router.get('/secret/challenge', (req, res) => {
  const challenges = [
    {
      title: "FizzBuzz Pro",
      description: "Write a function that prints numbers from 1 to 100, but for multiples of 3 print 'Fizz', for multiples of 5 print 'Buzz', and for multiples of both print 'FizzBuzz'. Then extend it to support any set of number-word pairs.",
      difficulty: "Easy"
    },
    {
      title: "Palindrome Checker",
      description: "Create a function that checks if a string is a palindrome (reads the same backward as forward), ignoring spaces, punctuation, and capitalization.",
      difficulty: "Easy"
    },
    {
      title: "Balanced Brackets",
      description: "Write a function that determines if a string of brackets is balanced. Support for (), [], and {}.",
      difficulty: "Medium"
    },
    {
      title: "Conway's Game of Life",
      description: "Implement Conway's Game of Life, a cellular automaton where cells live or die based on simple rules.",
      difficulty: "Hard"
    }
  ];
  
  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
  
  res.status(200).json({
    success: true,
    message: "🧩 You've found the secret coding challenge! 🧩",
    challenge: randomChallenge,
    reward: "Completing this challenge might not give you a physical reward, but the knowledge gained is priceless!",
    easterEggCreator: "Made with ❤️ by the CodePathfinder Team"
  });
});