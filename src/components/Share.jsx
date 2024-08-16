import React from "react";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";
import html2canvas from "html2canvas";
import axios from "axios";
import share from "../assets/shareButton.svg";

// Replace with your Cloudinary details
const CLOUDINARY_URL =
  "https://api.cloudinary.com/v1_1/amaltscaria/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "planet-earth"; // Replace with your actual upload preset name

const ShareComponent = ({ elementId }) => {
  const [imageUrl, setImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false); // Add loading state

  const handleShare = async () => {
    setLoading(true); // Set loading to true when starting the upload

    const certificateElement = document.getElementById(elementId);
    if (!certificateElement) return;

    try {
      const canvas = await html2canvas(certificateElement, { scale: 4 });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Convert the data URL to a Blob
      const blob = await (await fetch(imgData)).blob();
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      // Optional: Specify a folder
      formData.append("folder", "certificates"); // This will store images in the 'certificates' folder

      // Upload the image to Cloudinary
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImageUrl = response.data.secure_url;
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading or sharing the image:", error);
      alert("Unable to share or copy the image link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        style={{ width: "163px", height: "60px" }}
        className="text-white border-2 border-custom-blue py-2 px-4 rounded-4xl flex justify-between items-center hover:border-blue-500"
        onClick={handleShare}
      >
        Share
        <img src={share} alt="Download" className="ml-2 h-4 w-5" />
      </button>
      {loading && <p className="text-white">Please wait, uploading...</p>}{" "}
      {/* Display loading message */}
      {imageUrl && !loading && (
        <div style={{ display: "flex", gap: "10px", marginTop: "10px", marginLeft: "22px" }}>
          <FacebookShareButton url={imageUrl} quote="Check out my certificate!">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={imageUrl} title="Check out my certificate!">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <EmailShareButton
            url={imageUrl}
            subject="My Certificate"
            body="Check out my certificate!"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareComponent;
