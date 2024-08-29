import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = async (elementId) => {
    const certificateElement = document.getElementById(elementId);
    if (!certificateElement) return;

    // Clone the element and set its style to be invisible and off-screen
    const clonedElement = certificateElement.cloneNode(true);
    clonedElement.style.position = "absolute";
    clonedElement.style.top = "-9999px";
    clonedElement.style.left = "-9999px";
    clonedElement.style.borderRadius = "0";

    document.body.appendChild(clonedElement);

    // Increase scale for better resolution
    const canvas = await html2canvas(clonedElement, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

    // Remove the cloned element after capturing
    document.body.removeChild(clonedElement);

    // Create a new jsPDF instance with A4 size
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
    });

    // A4 size in mm
    const pdfWidth = 210;
    const pdfHeight = 297;

    // Calculate image dimensions
    const imgWidth = canvas.width / 3; // Because of scale: 3
    const imgHeight = canvas.height / 3;

     // Determine scaling multiplier based on screen size
     const screenWidth = window.innerWidth;
     const scalingMultiplier = screenWidth < 768 ? 1.01 : 1.086;

    // Calculate scaling factor based on both dimensions
    const widthScale = pdfWidth / imgWidth;
    const heightScale = pdfHeight / imgHeight;
    const scale = Math.min(widthScale, heightScale);

    const scaledImgWidth = imgWidth * scale;
    const scaledImgHeight = imgHeight * scale * scalingMultiplier;

    // Center the image in the PDF
    const xOffset = (pdfWidth - scaledImgWidth) / 2;
    const yOffset = (pdfHeight - scaledImgHeight) / 2;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledImgWidth, scaledImgHeight);
    pdf.save("certificate.pdf");
};

export const downloadJPG = async (elementId) => {
    const certificateElement = document.getElementById(elementId);
    if (!certificateElement) return;

    // Clone the element and set its style to be invisible and off-screen
    const clonedElement = certificateElement.cloneNode(true);
    clonedElement.style.position = "absolute";
    clonedElement.style.top = "-9999px";
    clonedElement.style.left = "-9999px";
    clonedElement.style.borderRadius = "0";

    document.body.appendChild(clonedElement);

    // Get the dimensions of the certificate element
    const elementWidth = clonedElement.offsetWidth;
    const elementHeight = clonedElement.offsetHeight;

    // Increase scale for better resolution
    const canvas = await html2canvas(clonedElement, {
        width: elementWidth,
        height: elementHeight,
        scale: 3
    });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Remove the cloned element after capturing
    document.body.removeChild(clonedElement);

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Create a new canvas to adjust the size
    const adjustedCanvas = document.createElement("canvas");
    const ctx = adjustedCanvas.getContext("2d");

    // Set the dimensions of the adjusted canvas to match the image size
    adjustedCanvas.width = imgWidth;
    adjustedCanvas.height = imgHeight;

    // Draw the image on the new canvas without any scaling or padding
    ctx.drawImage(canvas, 0, 0, imgWidth, imgHeight);

    // Create a download link for the adjusted canvas
    const adjustedImgData = adjustedCanvas.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.href = adjustedImgData;
    link.download = "certificate.jpg";
    link.click();
};
