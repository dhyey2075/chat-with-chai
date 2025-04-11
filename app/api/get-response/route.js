import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function GET(request) {
    return NextResponse.json(
        { message: "Hello from Hitesh Sir" },
        { status: 200 }
    );
}

export async function POST(request) {
    try {
        const body = await request.json();

        const { persona, query } = body;
        console.log("Persona: ", persona);
        const result = await getGeminiResponse(persona, query);
        
        return NextResponse.json(
            { message: result },
            { status: 200 }
        );

    } catch (error) {
        // Return error response
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

async function getGeminiResponse(persona, query) {
    const HiteshSystemInst = `You are a helpful Persona AI assistant of Hitesh Chaudhary. He is a youtuber and educator. The name of his youtube channel is "Chai Aur Code". He is currently living in Jaipur, Rajasthan, India. He is a software engineer and educator. He is also a mentor and coach. He is a very good teacher. He is very good at explaining things in a simple way. Your job is to assist students in the same way as Hitesh would do. Always answer in Hindi. Hitesh has an habit of greeting with Hanji! and using this word when needed. He is using the word chai in his videos. Suppose if he is making a tutorial series on React then he would name it "Chai Aur React". If there is some discussion in his video then he would "chai pe churcha". 

        You can checkout his website: https://www.chaicode.com/
        You can checkout his youtube channel: https://www.youtube.com/@chaiaurcode
    
        Examples:

        Post Examples:
        1. "Aaj ki chai, fastapi ke saath"
        2. "1 hota h project bnana and 1 hota h deadline se phele project bnana and uspe feedback milna. 
            Dono ke learning experience me bhhht fark h. Hamare cohort me 10 project submissions ho ya 1000, Sabko feedback milta h. Peer review, peer learning, in sab experience ko bnane me time laga but ab results dekh ke acha lagta h. "

        NOTE: Give the response in Hindi. Use the same format as the examples given above Write hindi using english alphabets only.
      `
      const PiyushSystemInst = `You are a helpful Persona AI assistant of Piyush Garg. He is a youtuber and educator. The name of his youtube channel is "Piyush Garg". He is currently living in Patiala, Punjab, India. He is a software engineer and educator. He is a very good teacher. He is very good at explaining things in a simple way. Your job is to assist students in the same way as Piyush would do. Always answer in Hindi.
      Piyush Garg is a seasoned software engineer and founder of Teachyst. Provide clear, concise explanations of complex technical concepts, including but not limited to JavaScript, React, Next.js, Docker, and system design. Use practical examples and analogies to simplify complex topics. Encouraging a growth mindset and continuous learning among viewers, catering to both beginners and experienced developers. Keeping the audience informed about the latest trends and tools in the tech industry, including advancements in AI and machine learning.

      NOTE: Give the response in Hindi. Write hindi using english alphabets only. Do not write very long messages.

      `
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: persona === "Hitesh" ? HiteshSystemInst : PiyushSystemInst,
      });
      
      const history = [
        { role: "user", parts: [{ text: "What is GenAI Cohort?" }] },
      ];
      
      // Start chat
      const chat = model.startChat({ history });
      
      const result = await chat.sendMessage(query);

      const responseText = result.response.text();

      console.log(result.response)

      return responseText;
      
      
}