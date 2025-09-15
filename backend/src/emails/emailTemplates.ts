export function createWelcomeEmailTemplate(name: string, clientURL: string) {
    return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Messenger</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f0f0f0;">
  
  <!-- HEADER -->
  <div style="background: linear-gradient(135deg, #232526, #414345); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
   <img src="https://cdn-icons-png.freepik.com/512/1384/1384090.png" 
     alt="Messenger Logo" 
     style="width: 80px; height: 80px; margin-bottom: 20px; border-radius: 50%; background-color: white; padding: 10px;">


    <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 500;">Welcome to Messenger!</h1>
  </div>
  
  <!-- BODY -->
  <div style="background-color: #ffffff; padding: 35px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
    <p style="font-size: 18px; color: #414345;"><strong>Hello ${name},</strong></p>
    <p>We're excited to have you join our messaging platform! Messenger connects you with friends, family, and colleagues in real-time, no matter where they are.</p>
    
    <!-- STEPS BOX -->
    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e0e0e0; box-shadow: 0 3px 8px rgba(0,0,0,0.05);">
      <p style="font-size: 16px; margin: 0 0 20px 0; color: #232526; font-weight: 600;">Get started in just a few steps:</p>
      
      <div style="display: flex; align-items: flex-start; margin-bottom: 18px;">
        <div style="min-width: 32px; height: 32px; background: linear-gradient(135deg, #232526, #414345); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px;">1</div>
        <div style="font-size: 15px; color: #333;">Set up your profile picture</div>
      </div>
      
      <div style="display: flex; align-items: flex-start; margin-bottom: 18px;">
        <div style="min-width: 32px; height: 32px; background: linear-gradient(135deg, #232526, #414345); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px;">2</div>
        <div style="font-size: 15px; color: #333;">Find and add your contacts</div>
      </div>
      
      <div style="display: flex; align-items: flex-start; margin-bottom: 18px;">
        <div style="min-width: 32px; height: 32px; background: linear-gradient(135deg, #232526, #414345); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px;">3</div>
        <div style="font-size: 15px; color: #333;">Start a conversation</div>
      </div>
      
      <div style="display: flex; align-items: flex-start;">
        <div style="min-width: 32px; height: 32px; background: linear-gradient(135deg, #232526, #414345); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; margin-right: 12px;">4</div>
        <div style="font-size: 15px; color: #333;">Share photos, videos, and more</div>
      </div>
    </div>
    
    <!-- BUTTON -->
    <div style="text-align: center; margin: 30px 0;">
      <a href=${clientURL} 
         style="background: linear-gradient(135deg, #232526, #414345); 
                color: white; 
                text-decoration: none; 
                padding: 12px 30px; 
                border-radius: 50px; 
                font-weight: 500; 
                display: inline-block; 
                box-shadow: 0 3px 8px rgba(0,0,0,0.3);">
        Open Messenger
      </a>
    </div>
    
    <p style="margin-bottom: 5px;">If you need any help or have questions, we're always here to assist you.</p>
    <p style="margin-top: 0;">Happy messaging!</p>
    
    <p style="margin-top: 25px; margin-bottom: 0;">Best regards,<br>The Messenger Team</p>
  </div>
  
  <!-- FOOTER -->
  <div style="text-align: center; padding: 20px; color: #777; font-size: 12px;">
    <p>© 2025 Messenger. All rights reserved.</p>
    <p>
      <a href="#" style="color: #414345; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
      <a href="#" style="color: #414345; text-decoration: none; margin: 0 10px;">Terms of Service</a>
      <a href="#" style="color: #414345; text-decoration: none; margin: 0 10px;">Contact Us</a>
    </p>
  </div>
  
</body>
</html>
    
    `

}