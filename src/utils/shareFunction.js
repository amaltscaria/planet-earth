// import html2canvas from 'html2canvas';
// import axios from 'axios';

// export const handleShare = async (elementId) => {
//     const certificateElement = document.getElementById(elementId);
//     if (!certificateElement) return;

//     // Generate the image as before
//     const canvas = await html2canvas(certificateElement, { scale: 3 });
//     const imgData = canvas.toDataURL("image/jpeg", 1.0);

//     // Convert base64 data URL to Blob
//     const blob = await (await fetch(imgData)).blob();

//     // Create form data to send to the server
//     const formData = new FormData();
//     formData.append('certificate', blob, 'certificate.jpg');

//     try {
//         const response = await axios.post('http://localhost:3000/upload', formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         });

//         if (response.status === 200) {
//             console.log('File uploaded:', response.data.filePath);
//         } else {
//             console.error('Upload failed:', response.data.message);
//         }
//     } catch (error) {
//         console.error('Error uploading file:', error);
//     }
// };
