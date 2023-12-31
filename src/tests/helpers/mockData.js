export const mockDataEasy = {
  response_code:0,
  results:[
    {
      category:"Entertainment: Video Games",
      type:"multiple",
      difficulty:"easy",
      question:"What is the first weapon you acquire in Half-Life?",
      correct_answer:"A crowbar",
      incorrect_answers:[
          "A pistol",
          "The H.E.V suit",
          "Your fists"
      ]
    }
  ]
}

export const mockDataHard = {
  response_code:0,
  results:[
    {
      category:"Geography",
      type:"multiple",
      difficulty:"hard",
      question:"What is the largest city and commercial capital of Sri Lanka?",
      correct_answer:"Colombo",
      incorrect_answers:[
          "Moratuwa",
          "Negombo",
          "Kandy"
      ]
    }
  ]
}

export const mockDataMedium = {
  response_code:0,
  results:[
    {
      category:"Entertainment: Music",
      type:"multiple",
      difficulty:"medium",
      question:"What M83 was featured in Grand Theft Auto V&#039;s radio?",
      correct_answer:"Midnight City",
      incorrect_answers:[
          "Outro",
          "Reunion",
          "Wait"
      ]
    }
  ]
}

export const mockDataError = {
  response_code: 3,
  results: []
}

export const mockData = {
  response_code: 0,
  results:[
    {
      category:"Geography",
      type:"multiple",
      difficulty:"medium",
      question:"On a London Underground map, what colour is the Circle Line?",
      correct_answer:"Yellow",
      incorrect_answers:["Red","Blue","Green"]
    },
    {
      category:"Science: Mathematics",
      type:"multiple",
      difficulty:"hard",
      question:"How many zeptometres are inside one femtometre?",
      correct_answer:"1,000,000",
      incorrect_answers:["10","1,000,000,000","1000"]
    },
    {
      category:"Entertainment: Board Games",
      type:"boolean", 
      difficulty:"easy",
      question:"The Angry Video Game Nerd&#039;s alter ego is &quot;Board James&quot;.",
      correct_answer:"True",
      incorrect_answers:["False"]
    },
    {
      category:"Entertainment: Video Games",
      type:"multiple",
      difficulty:"medium",
      question:"Which of these is NOT the name of a team leader in Pok&eacute;mon GO?",
      correct_answer:"Leif",
      incorrect_answers:["Blanche","Spark","Candela"]
    },
    {
      category:"Politics",
      type:"multiple",
      difficulty:"hard",
      question:"In June 2017, Saudi Arabia and Egypt broke off ties with which country over its supposed support for terrorism?",
      correct_answer:"Qatar",
      incorrect_answers:["Bahrain","United States of America","Russia"]
    }
  ]
}