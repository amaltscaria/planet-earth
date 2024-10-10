import certificateBackgroundImage from "../assets/certificate-bg.jpg";
import logoImage from "../assets/logo.png";
import qr from "../assets/planetearthsummit - QR Code.png";
import { date, uniqueCertificateNumber as id } from "../components/Certificate";

export const shareJPEG = async (name) => {
  // Wait for fonts to load
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas dimensions (A4 size in pixels at 300 DPI)
  const width = 2480; // A4 width in pixels at 300 DPI
  const height = 3508; // A4 height in pixels at 300 DPI
  canvas.width = width;
  canvas.height = height;

  // Draw background
  const background = new Image();
  background.src = certificateBackgroundImage; // Background image path

  return new Promise((resolve) => {
    background.onload = () => {
      ctx.drawImage(background, 0, 0, width, height);

      // Draw logo
      const logo = new Image();
      logo.src = logoImage; // Logo image path
      logo.onload = () => {
        ctx.drawImage(logo, 300, 300, 500, 600); // Adjust position and size

        // Title Text
        ctx.font = "normal 60px Outfit"; // Adjust font size and family
        ctx.fillStyle = "white";
        ctx.fillText("CERTIFICATE OF COMMITMENT TO", 300, 1050); // Adjust position

        // Main Heading
        ctx.font = "bold 180px Outfit";
        ctx.fillText("PLANET EARTH", 300, 1220); // Adjust position

        // Subheading Text
        ctx.font = "normal 50px Outfit";
        ctx.fillText(
          "This certificate is awarded in recognition of",
          300,
          1380
        ); // Adjust position

        // Name of Participant
        ctx.font = "bold 130px Outfit";
        ctx.fillText(name.toUpperCase(), 300, 1520); // Adjust position

        // Certificate Body
        ctx.font = "normal 50px Outfit";
        const bodyText = [
          "The participant has taken the Planet Earth Summit Pledge, demonstrating a",
          "commitment to environmental stewardship and sustainable practices. By pledging",
          "to support innovative solutions and foster global collaboration for a sustainable",
          "future, the participant has shown dedication to making a positive impact on our",
          "planet.",
        ];
        bodyText.forEach((line, index) => {
          ctx.fillText(line, 300, 1600 + index * 60); // Adjust position
        });

        // Key Commitments Section
        ctx.font = "bold 50px Outfit";
        ctx.fillText("KEY COMMITMENTS", 300, 2010); // Adjust position

        ctx.font = "400 50px Outfit";
        const commitments = [
          "• Educating others and participating in environmental initiatives.",
          "• Promoting biodiversity conservation and sustainable agriculture.",
          "• Advocating for renewable energy and reducing carbon footprint.",
          "• Supporting sustainable practices in daily life and professional endeavors.",
          "• Engaging in community action and policy advocacy for environmental protection.",
        ];
        commitments.forEach((commitment, index) => {
          ctx.fillText(commitment, 300, 2090 + index * 60); // Adjust position
        });

        // Add Date and Certificate Number
        ctx.font = "normal 70px Outfit";
        ctx.fillText(date.toUpperCase(), 300, 2540); // Adjust position
        ctx.font = "normal 70px Outfit";
        ctx.fillText(id, 300, 2640); // Adjust position

        // Add QR Code
        const qrCode = new Image();
        qrCode.src = qr; // QR Code image path
        qrCode.onload = () => {
          ctx.drawImage(qrCode, 300, 2820, 300, 300); // Adjust QR position and size

          // Add the website URL as text
          ctx.font = "normal 50px Outfit"; // Set the font style for the link
          ctx.fillStyle = "white"; // Set text color
          ctx.fillText("www.planetearthsummit.eu", 300, 3200); // Adjust position as needed

          // Resolve with image data
          const imgData = canvas.toDataURL("image/jpeg");
          resolve(imgData);
        };
      };
    };
  });
};
