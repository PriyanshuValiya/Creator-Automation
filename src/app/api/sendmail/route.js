import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, image } = await req.json();

    if (!email || !image) {
      return new Response(
        JSON.stringify({ error: "Missing email or image data" }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "valiyapriyansukumar@gmail.com",
      to: email,
      subject: "📸 Your AI-Generated Instagram Post is Ready!",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #4A90E2;">✨ Your AI-Generated Instagram Post is Ready! ✨</h2>
            <p style="font-size: 16px; color: #555;">Check out your AI-generated post below. You can download it and share it on Instagram!</p>
            
            <div style="margin: 20px 0;">
              <img src="cid:image" alt="AI-Generated Post" style="max-width: 100%; border-radius: 10px;"/>
            </div>
    
            <a href="#" download="AI_Post.png" 
              style="display: inline-block; background: #4A90E2; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; font-weight: bold; margin-top: 10px;">
              📥 Download Image
            </a>
    
            <p style="font-size: 14px; color: #888; margin-top: 20px;">Thank you for using our AI-powered service! 🚀</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "AI_Post.png",
          content: image.split(",")[1],
          encoding: "base64",
          cid: "image",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
}
