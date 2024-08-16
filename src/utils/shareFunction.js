import html2canvas from 'html2canvas';
import axios from 'axios';

// Replace with your Cloudinary details
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/amaltscaria/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'planet-earth'; // Replace with your actual upload preset name

export const handleShare = async (elementId) => {
    const certificateElement = document.getElementById(elementId);
    if (!certificateElement) return;

    try {
        const canvas = await html2canvas(certificateElement, { scale: 4 });
        const imgData = canvas.toDataURL("image/jpeg", 1.0);

        // Convert the data URL to a Blob
        const blob = await (await fetch(imgData)).blob();
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        // Optional: Specify a folder
        formData.append('folder', 'certificates'); // This will store images in the 'certificates' folder

        // Upload the image to Cloudinary
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        const imageUrl = response.data.secure_url;

        await navigator.clipboard.writeText(imageUrl);
        alert("Link to image copied to clipboard! You can paste this link to share the image.");
    } catch (error) {
        console.error("Error uploading or sharing the image:", error);
        alert("Unable to share or copy the image link. Please try again.");
    }
};
