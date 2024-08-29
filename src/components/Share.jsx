// import React from "react";
// import {
//   FacebookShareButton,
//   WhatsappShareButton,
//   EmailShareButton,
// } from "react-share";
// import { FacebookIcon, WhatsappIcon, EmailIcon } from "react-share";
// import html2canvas from "html2canvas";
// import axios from "axios";
// import share from "../assets/shareButton.svg";

// const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/amaltscaria/image/upload";
// const CLOUDINARY_UPLOAD_PRESET = "planet-earth";

// const ShareComponent = ({ elementId }) => {
//   const [imageUrl, setImageUrl] = React.useState("");
//   const [loading, setLoading] = React.useState(false);

//   const handleUpload = async () => {
//     setLoading(true);

//     const certificateElement = document.getElementById(elementId);
//     if (!certificateElement) return;

//     try {
//       const scale = 4;
//       const canvas = await html2canvas(certificateElement, { scale });
//       const imgData = canvas.toDataURL("image/jpeg", 1.0);

//       const blob = await (await fetch(imgData)).blob();
//       const formData = new FormData();
//       formData.append("file", blob);
//       formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
//       formData.append("folder", "certificates");

//       const response = await axios.post(CLOUDINARY_URL, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const uploadedImageUrl = response.data.secure_url;
//       setImageUrl(uploadedImageUrl);
//     } catch (error) {
//       console.error("Error uploading the image:", error);
//       alert("Unable to upload the image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleShare = async () => {
//     if (!imageUrl) return;

//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: "Check out my certificate!",
//           text: "Check out my certificate!",
//           url: imageUrl,
//         });
//       } else {
//         alert("Sharing not supported on this device. Please use the share buttons below.");
//       }
//     } catch (error) {
//       console.error("Error sharing the image:", error);
//       alert("Unable to share the image. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <button
//         className="text-xxs sm:text-base text-white border-2 border-custom-blue py-2 px-4 rounded-4xl flex justify-between items-center hover:border-blue-500 w-28 sm:w-40 sm:h-14"
//         onClick={handleUpload}
//       >
//         UPLOAD
//         <img src={share} alt="Upload" className="ml-2 sm:h-4 sm:w-5 h-2 w-3" />
//       </button>

//       {loading && <p className="text-white">Please wait, uploading...</p>}

//       {!loading && imageUrl && (
//         <div>
//           <button
//             style={{ width: "163px", height: "60px", marginTop: "10px" }}
//             className="text-white border-2 border-custom-blue py-2 px-3 rounded-4xl flex justify-between items-center hover:border-blue-500"
//             onClick={handleShare}
//           >
//             Share via Web API
//           </button>

//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               marginTop: "10px",
//               marginLeft: "22px",
//             }}
//           >
//             <FacebookShareButton url={imageUrl} quote="Check out my certificate!">
//               <FacebookIcon size={32} round />
//             </FacebookShareButton>
//             <WhatsappShareButton url={imageUrl} title="Check out my certificate!">
//               <WhatsappIcon size={32} round />
//             </WhatsappShareButton>
//             <EmailShareButton
//               url={imageUrl}
//               subject="My Certificate"
//               body="Check out my certificate!"
//             >
//               <EmailIcon size={32} round />
//             </EmailShareButton>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShareComponent;
