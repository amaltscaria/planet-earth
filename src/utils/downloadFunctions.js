import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF("portrait", "pt", "a4");

    // Set up fonts, colors, and styles
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(30);
    pdf.setTextColor(40, 40, 40);

    // Title of the certificate
    pdf.text("Certificate of Achievement", pdf.internal.pageSize.getWidth() / 2, 100, { align: "center" });

    // Subtitle or recipient's name
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(20);
    pdf.text("This is to certify that", pdf.internal.pageSize.getWidth() / 2, 160, { align: "center" });

    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(26);
    pdf.text("[Recipient's Name]", pdf.internal.pageSize.getWidth() / 2, 200, { align: "center" });

    // Additional text
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(16);
    pdf.text(
        "Has successfully completed the requirements of the course",
        pdf.internal.pageSize.getWidth() / 2,
        240,
        { align: "center" }
    );

    pdf.text("on [Date]", pdf.internal.pageSize.getWidth() / 2, 280, { align: "center" });

    // Add a logo or other images (if any)
    const img = "[Your Image URL or Data URI]";
    pdf.addImage(img, "PNG", 40, 40, 100, 100); // Adjust positioning and size as needed

    // Signature line
    pdf.setFontSize(14);
    pdf.text("_______________________", 100, pdf.internal.pageSize.getHeight() - 100);
    pdf.text("Authorized Signature", 100, pdf.internal.pageSize.getHeight() - 80);

    // Save the PDF
    pdf.save("certificate.pdf");
};


export const downloadJPG = async (elementId) => {
    const certificateElement = document.getElementById(elementId);
    if (!certificateElement) return;

    // Clone the element and set its style
    const clonedElement = certificateElement.cloneNode(true);
    clonedElement.style.position = "absolute";
    clonedElement.style.top = "-9999px";
    clonedElement.style.left = "-9999px";
    clonedElement.style.borderRadius = "0";
    clonedElement.style.borderWidth = "0";

    document.body.appendChild(clonedElement);

    // Capture the canvas
    const canvas = await html2canvas(clonedElement, {
        scale: 2,
        useCORS: true,
        scrollX: -window.scrollX,
        scrollY: -window.scrollY,
        width: clonedElement.offsetWidth,
        height: clonedElement.offsetHeight,
    });

    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    // Remove the cloned element
    document.body.removeChild(clonedElement);

    // Create a link for downloading the image
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "certificate.jpg";
    link.click();
};
