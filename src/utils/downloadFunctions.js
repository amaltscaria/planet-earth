import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = async (elementId) => {
    const certificateElement = document.getElementById(elementId);
    if (!certificateElement) return;

    // Increase scale for better resolution
    const canvas = await html2canvas(certificateElement, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

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
    const imgWidth = canvas.width * (pdfWidth / canvas.width);
    const imgHeight = canvas.height * (pdfWidth / canvas.width);

    // Adjust dimensions to fit the PDF page
    const scale = Math.max(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledImgWidth = imgWidth * scale;
    const scaledImgHeight = imgHeight * scale;

    // Center the image in the PDF
    const xOffset = (pdfWidth - scaledImgWidth) / 2;
    const yOffset = (pdfHeight - scaledImgHeight) / 2;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", xOffset, yOffset, scaledImgWidth, scaledImgHeight);
    pdf.save("certificate.pdf");
};
