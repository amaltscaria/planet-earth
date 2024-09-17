import { useState } from "react";
import emailIcon from "../assets/emailIcon.svg";
import emailIconDark from "../assets/emailIconDark.svg";
import facebookIcon from "../assets/facebookIcon.svg";
import facebookIconDark from "../assets/facebookIconDark.svg";
import twitterIcon from "../assets/twitterIcon.svg";
import twitterIconDark from "../assets/twitterIconDark.svg";
import linkedinIcon from "../assets/linkedinIcon.svg";
import linkedinIconDark from "../assets/linkedinIconDark.svg";
import whatsappIcon from "../assets/whatsappIcon.svg";
import whatsappIconDark from "../assets/whatsappIconDark.svg";
import instagramIcon from "../assets/instagramIcon.svg";
import instagramIconDark from "../assets/instagramIconDark.svg";
import copyIcon from "../assets/copyIcon.svg";
import copyIconDark from "../assets/copyIconDark.svg";
import downloadLight from "../assets/downloadLight.svg";
import downloadDark from "../assets/downloadDark.svg";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { downloadAsPDF } from "../utils/downloadFunctions";

const ShareAndDownload = () => {
  const [shareUrl, setShareUrl] = useState("https://join.planetearthsummit.eu/uploads/5353454364534.jpg");
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [isPdfHovered, setIsPdfHovered] = useState(false);
  const [isJpgHovered, setIsJpgHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        toast.success("URL copied to clipboard!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      (err) => {
        toast.error("Failed to copy URL!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.error("Failed to copy text: ", err);
      }
    );
  };
  const openInstagramChat = () => {
    // Open Instagram DM page, where users can manually paste the URL.
    navigator.clipboard.writeText(shareUrl);
    window.open("https://www.instagram.com/direct/inbox/", "_blank");
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-white text-4xl md:text-6xl lg:text-7xl outfit-extrabold sm:leading-custom-tight  whitespace-pre-line outfit-">
        Download{"\n"}Planet Earth{"\n"}Certificate
      </h1>
      <div className="mb-6 sm:mt-8 mt-4 flex flex-row justify-center space-x-2 sm:space-x-4 space-y-0">
        <button
          // style={{ width: "163px", height: "60px" }}
          className="font-outfit text-xxs sm:text-base text-white border-2 border-custom-blue py-2  sm:px-3 px-2 rounded-4xl flex justify-between items-center hover:text-black hover:border-0 hover:bg-white w-20 sm:w-36 sm:h-12"
            onClick={downloadAsPDF}
          onMouseEnter={() => setIsPdfHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsPdfHovered(false)} // Set hover state to false
        >
          PDF
          <img
            src={isPdfHovered ? downloadDark : downloadLight}
            alt="Download"
            className="ml-2 sm:h-4 sm:w-5 h-2 w-3"
          />
        </button>
        <button
          className="font-outfit text-xxs sm:text-base text-white border-2 border-custom-blue py-2 sm:px-3 px-2 rounded-4xl flex justify-between items-center hover:border-0 hover:text-black hover:bg-white w-20 sm:w-36 sm:h-12"
          //   onClick={handleDownloadJPG}
          onMouseEnter={() => setIsJpgHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsJpgHovered(false)} // Set hover state to false
        >
          JPG
          <img
            src={isJpgHovered ? downloadDark : downloadLight}
            alt="Download"
            className="ml-2 sm:h-4 sm:w-5 h-2 w-3"
          />
        </button>
        <a href="https://www.planetearthsummit.eu">
          <button className="font-outfit text-xxs sm:text-lg text-white border-2 border-custom-blue py-2 sm:ps-4 ps-2 rounded-4xl flex justify-between items-center hover:border-0 hover:bg-white hover:text-black w-32 sm:w-64 sm:h-12">
            www.planetearthsummit.eu
          </button>
        </a>
      </div>
      <div className="mb-6">
        <h1 className="font-outfit text-white text-sm sm:text-3xl font-bold mb-2">
          Instant Share
        </h1>
        <div className="flex">
          <p className="font-outfit text-xs sm:text-xl text-white border-2 border-custom-blue py-2 px-2 rounded-4xl flex justify-between items-center w-52 sm:w-72 sm:h-12 overflow-hidden whitespace-nowrap text-ellipsis">
            {shareUrl}
            {/* <a href="" className="rounded-full text-white border-2 border-custom-blue w-20 h-14">cdfs</a> */}
          </p>
          <button
            className="hover:bg-white hover:text-black text-white border-2 border-custom-blue hover:border-transparent rounded-full sm:px-3 px-2 ml-2"
            onMouseEnter={() => setIsCopyHovered(true)} // Set hover state to true
            onMouseLeave={() => setIsCopyHovered(false)} // Set hover state to false
            onClick={copyToClipboard}
          >
            <img
              src={isCopyHovered ? copyIconDark : copyIcon}
              alt=""
              className="sm:w-5 w-4"
            />
          </button>

          {/* ToastContainer to render the toasts */}
          <ToastContainer />
        </div>
        <p className="text-white text-xs sm:text-sm font-outfit">
          Please note that this link will expire in 10 days!
        </p>
      </div>
      <h1 className="text-white font-outfit text-sm sm:text-3xl font-bold mb-2">
        Social Share
      </h1>
      <div className="flex space-x-2 mb-4 sm:mb-0">
        <FacebookShareButton
          url={shareUrl}
          onMouseEnter={() => setIsFacebookHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsFacebookHovered(false)} // Set hover state to false
        >
          <img
            src={isFacebookHovered ? facebookIconDark : facebookIcon}
            alt="Facebook"
            className="sm:h-16 sm:w-14 h-8 w-8"
          />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          onMouseEnter={() => setIsTwitterHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsTwitterHovered(false)} // Set hover state to false
        >
          <img
            src={isTwitterHovered ? twitterIconDark : twitterIcon}
            alt="X"
            className="sm:h-16 sm:w-14 h-8 w-8"
          />
        </TwitterShareButton>

        <LinkedinShareButton
          url={shareUrl}
          onMouseEnter={() => setIsLinkedinHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsLinkedinHovered(false)} // Set hover state to false
        >
          <img
            src={isLinkedinHovered ? linkedinIconDark : linkedinIcon}
            alt="LinkedIn"
            className="sm:h-16 sm:w-14 h-8 w-8"
          />
        </LinkedinShareButton>

        <WhatsappShareButton
          url={shareUrl}
          onMouseEnter={() => setIsWhatsappHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsWhatsappHovered(false)} // Set hover state to false
        >
          <img
            src={isWhatsappHovered ? whatsappIconDark : whatsappIcon}
            alt="WhatsApp"
            className="sm:h-16 sm:w-14 h-8 w-8"
          />
        </WhatsappShareButton>
        <button
          onClick={openInstagramChat}
          onMouseEnter={() => setIsInstagramHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsInstagramHovered(false)} // Set hover state to false
        >
          <img
            src={isInstagramHovered ? instagramIconDark : instagramIcon}
            alt="Instagram"
            className="sm:h-16 sm:w-14 h-8 w-8"
          />
        </button>
        <EmailShareButton
          url={shareUrl}
          onMouseEnter={() => setIsEmailHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsEmailHovered(false)} // Set hover state to false
        >
          <img
            src={isEmailHovered ? emailIconDark : emailIcon}
            alt="email"
            className="sm:h-16 sm:w-14 h-8 w-8"
          />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareAndDownload;
