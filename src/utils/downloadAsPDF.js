import jsPDF from "jspdf";
import certificateBackgroundImage from "../assets/certificate-bg.jpg";
import logo from "../assets/logo.png";
import qr from "../assets/planetearthsummit - QR Code.png";
import { registerFonts } from "./fonts/Outfit-Medium-normal";
import { registerFonts2 } from "./fonts/Outfit-ExtraBold-bold";
import { date, uniqueCertificateNumber as id } from "../components/Certificate";
registerFonts();
registerFonts2();

// Generate and Download the PDF certificate
export const downloadAsPDF = (name) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // A4 dimensions in mm
  const pageWidth = 210;
  const pageHeight = 297;

  // Add background image (full page)
  pdf.addImage(certificateBackgroundImage, "JPEG", 0, 0, pageWidth, pageHeight);

  // Set font for the document
  pdf.setTextColor("white").setFont("Outfit-Medium");

  // Add the Logo
  pdf.addImage(logo, "PNG", 27, 35, 40, 45); // Adjust logo position (x, y) and size (width, height)

  // Title Text
  pdf.setFontSize(13);
  pdf.setFont("Outfit-Medium", "normal");
  pdf.text("certificate of commitment to".toUpperCase(), 27, 90);

  // Main Heading
  pdf.setFontSize(40);
  pdf.setFont("Outfit-ExtraBold", "bold");
  pdf.text("PLANET EARTH", 27, 103);

  // Subheading Text
  pdf.setFontSize(12);
  pdf.setFont("Outfit-Medium", "normal");
  pdf.text("This certificate is awarded in recognition of", 27, 117);

  // Name of Participant
  pdf.setFontSize(30);
  pdf.setFont("Outfit-ExtraBold", "bold");
  pdf.text(name.toString().toUpperCase(), 27, 128);

  // Certificate Body (break it into smaller parts)
  const bodyText = [
    "The participant has taken  the Planet Earth Summit Pledge, demonstrating a",
    "commitment to environmental stewardship and sustainable practices. By pledging",
    "to support innovative solutions and foster global collaboration for a sustainable",
    "future, the participant has shown dedication to making a positive impact on our planet.",
  ];

  pdf.setFontSize(12);
  pdf.setFont("Outfit-Medium", "normal");
  bodyText.forEach((line, index) => {
    pdf.text(line, 27, 135 + index * 5, { maxWidth: 155, align: "justify" });
  });

  // Key Commitments Section
  pdf.setFont("Outfit-ExtraBold", "bold");
  pdf.setFontSize(12);
  pdf.text("Key Commitments".toUpperCase(), 27, 168);

  const commitments = [
    "Educating others and participating in environmental initiatives.",
    "Promoting biodiversity conservation and sustainable agriculture.",
    "Advocating for renewable energy and reducing carbon footprint.",
    "Supporting sustainable practices in daily life and professional endeavors.",
    "Engaging in community action and policy advocacy for environmental protection.",
  ];

  pdf.setFont("Outfit-Medium", "normal");
  pdf.setFontSize(12);

  // Add each commitment as a bullet point
  commitments.forEach((commitment, index) => {
    pdf.text(`• ${commitment}`, 27, 174 + index * 5);
  });

  // Add Date and Certificate Number
  pdf.setFont("Outfit-ExtraBold", "bold");
  pdf.setFontSize(14);
  pdf.text(date.toUpperCase(), 27, 210);
  pdf.setFont("Outfit-Medium", "normal");
  pdf.setFontSize(12);
  pdf.text(id, 27, 218);

  // Add the QR Code
  pdf.addImage(qr, "PNG", 27, 230, 30, 30); // Adjust QR position (x, y) and size (width, height)
  // Add the website URL as clickable text
  pdf.setFontSize(12); // Set font size for the link
  pdf.textWithLink("www.planetearthsummit.eu", 27, 268, {
    url: "https://www.planetearthsummit.eu",
  });

  // Save the PDF
  pdf.save("certificate.pdf");
};
