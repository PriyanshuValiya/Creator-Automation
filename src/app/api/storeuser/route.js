import connectDB from "@/utils/connectDB"; 
// import Question from "@/lib/models/questionModel";

export async function POST(request) {
  await connectDB(); 

  const { userData } = await request.json();


  try {
    
  } catch (error) {
    console.error("Error saving data:", error);
    return new Response(JSON.stringify({ error: "Failed to save data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
