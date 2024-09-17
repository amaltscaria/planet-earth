import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export const downloadAsPDF = () => {
  const certificateElement = document.getElementById("certificate");

  // Ensure that the element width is fully captured
  const scale = 2; // Increase scale for better resolution
  const elementWidth = certificateElement.offsetWidth * scale;
  const elementHeight = certificateElement.offsetHeight * scale;

  // Use html-to-image to convert the certificate element to a PNG image
  toPng(certificateElement, {
    pixelRatio: scale, // Scale the output for better quality and size
    width: elementWidth,  // Set width manually
    height: elementHeight, // Set height manually
    style: {
      transform: `scale(${scale})`,  // Scale the element to ensure no clipping
      transformOrigin: 'top left',
      width: `${certificateElement.offsetWidth}px`, // Ensure the element maintains its size
      height: `${certificateElement.offsetHeight}px`,
      margin: 0,  // Remove any margin
      padding: 0, // Remove any padding
    },
  })
    .then((dataUrl) => {
      // Create a new jsPDF instance with A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt", // Points
        format: "a4", // A4 size
      });

      // A4 dimensions in points
      const a4Width = 595.28;
      const a4Height = 841.89;

      // Calculate the new dimensions based on scaling
      const scaledWidth = a4Width;  // Set the width to match A4 size
      const scaledHeight = (elementHeight / elementWidth) * a4Width; // Maintain aspect ratio for height

      // Add the image to the PDF at coordinates (0, 0) to remove white space
      pdf.addImage(
        dataUrl,
        "PNG",
        0, // Set left margin to 0
        0, // Set top margin to 0
        scaledWidth,
        scaledHeight
      );

      // Save the PDF
      pdf.save("certificate.pdf");
    })
    .catch((error) => {
      console.error("Error generating PDF: ", error);
    });
};
