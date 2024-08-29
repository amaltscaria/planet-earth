import { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";
import backgroundImage from "../assets/Planet Earth - Certificate bg.jpg";
import certificateBackgroundImage from "../assets/certificate-bg.jpg";
import downloadLight from "../assets/downloadLight.svg";
import downloadDark from "../assets/downloadDark.svg";
import logo from "../assets/Logo.png";
import { formatDate } from "../utils/formatDate";
import { generateCertificateNumber } from "../utils/uniqueCertificateNumber";
import qr from "../assets/planetearthsummit - QR Code.png";
import { downloadJPG, downloadPDF } from "../utils/downloadFunctions";
// import { handleShare } from "../utils/shareFunction";
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
import copyIcon from "../assets/copyIcon.svg";
import copyIconDark from "../assets/copyIconDark.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instagramIcon from "../assets/instagramIcon.svg";
import instagramIconDark from "../assets/instagramIconDark.svg";
// import Share from "./Share.jsx";
// import shareIcon from "../assets/shareButton.svg";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";
import "./styles.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isFacebookHovered, setIsFacebookHovered] = useState(false);
  const [isTwitterHovered, setIsTwitterHovered] = useState(false);
  const [isLinkedinHovered, setIsLinkedinHovered] = useState(false);
  const [isWhatsappHovered, setIsWhatsappHovered] = useState(false);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isInstagramHovered, setIsInstagramHovered] = useState(false);
  const [isPdfHovered, setIsPdfHovered] = useState(false);
  const [isJpgHovered, setIsJpgHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, number, country, address);
    setSubmitted(true); // Update the state to show certificate preview and download options
  };

  useEffect(() => {
    if (submitted) {
      const handleShare = async () => {
        const certificateElement = document.getElementById("certificate");
        if (!certificateElement) return;

        // Clone the element and remove rounded corners for upload
        const clonedElement = certificateElement.cloneNode(true);
        clonedElement.style.position = "absolute";
        clonedElement.style.top = "-9999px";
        clonedElement.style.left = "-9999px";
        clonedElement.style.borderRadius = "0"; // Remove rounding for upload

        document.body.appendChild(clonedElement);

        try {
          const canvas = await html2canvas(clonedElement, { scale: 3 });
          const imgData = canvas.toDataURL("image/jpeg", 1.0);

          document.body.removeChild(clonedElement);

          const blob = await (await fetch(imgData)).blob();
          const formData = new FormData();
          formData.append("certificate", blob, "certificate.jpg");

          const response = await axios.post(
            "http://localhost:3000/upload",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (response.status === 200) {
            console.log("File uploaded:", response.data.filePath);
            setShareUrl("http://localhost:3000" + response.data.filePath);
          } else {
            console.error("Upload failed:", response.data.message);
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };

      handleShare();
    }
  }, [submitted]);
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
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-row"
    >
      <div className="flex-1 flex flex-col items-center justify-center pt-8 sm:p-8">
        {submitted ? (
          <div className="flex flex-col">
            <h1 className="text-white text-4xl md:text-6xl lg:text-8xl outfit-extrabold sm:leading-custom-tight  whitespace-pre-line outfit-">
              Download{"\n"}Planet Earth{"\n"}Certificate
            </h1>
            <div className="mb-6 sm:mt-8 mt-4 flex flex-row justify-center space-x-2 sm:space-x-4 space-y-0">
              <button
                // style={{ width: "163px", height: "60px" }}
                className="font-outfit text-xxs sm:text-base text-white border-2 border-custom-blue py-2  sm:px-3 px-2 rounded-4xl flex justify-between items-center hover:text-black hover:border-0 hover:bg-white hover:border-blue-500 w-77 sm:w-40 sm:h-14"
                onClick={() => downloadPDF("certificate")}
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
                className="font-outfit text-xxs sm:text-base text-white border-2 border-custom-blue py-2 sm:px-3 px-2 rounded-4xl flex justify-between items-center hover:border-blue-500 hover:border-0 hover:text-black hover:bg-white w-77 sm:w-40 sm:h-14"
                onClick={() => downloadJPG("certificate")}
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
              <a href="www.planetearthsummit.eu">
                <button
                  className="font-outfit text-xxs sm:text-xl text-white border-2 border-custom-blue py-2 sm:px-5 px-2 rounded-4xl flex justify-between items-center hover:border-0 hover:bg-white hover:text-black hover:border-blue-500 w-32 sm:w-72 sm:h-14"
                  onClick={() => handleShare("certificate")}
                >
                  www.planetearthsummit.eu
                  {/* <img
                  src={shareIcon}
                  alt="Upload"
                  className="ml-2 sm:h-4 sm:w-5 h-2 w-3"
                /> */}
                </button>
              </a>
            </div>
            <div className="mb-6">
              <h1 className="font-outfit text-white text-sm sm:text-3xl font-bold mb-2">
                Instant Share
              </h1>
              <div className="flex">
                <p className="font-outfit text-xs sm:text-xl text-white border-2 border-r-0 border-custom-blue py-2 sm:px-5 px-2 rounded-l-4xl flex justify-between items-center w-52 sm:w-72 sm:h-14 overflow-hidden whitespace-nowrap text-ellipsis">
                  {shareUrl}
                  {/* <a href="" className="rounded-full text-white border-2 border-custom-blue w-20 h-14">cdfs</a> */}
                </p>
                <button
                  className="-ml-6 bg-black hover:bg-white hover:text-black text-white border-2 border-custom-blue rounded-full sm:px-4 px-2"
                  onMouseEnter={() => setIsCopyHovered(true)} // Set hover state to true
                  onMouseLeave={() => setIsCopyHovered(false)} // Set hover state to false
                  onClick={copyToClipboard}
                >
                  <img src={isCopyHovered ? copyIconDark : copyIcon} alt="" />
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
                  className="sm:h-16 sm:w-16 h-8 w-8"
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
                  className="sm:h-16 sm:w-16 h-8 w-8"
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
                  className="sm:h-16 sm:w-16 h-8 w-8"
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
                  className="sm:h-16 sm:w-16 h-8 w-8"
                />
              </WhatsappShareButton>

              <EmailShareButton
                url={shareUrl}
                onMouseEnter={() => setIsEmailHovered(true)} // Set hover state to true
                onMouseLeave={() => setIsEmailHovered(false)} // Set hover state to false
              >
                <img
                  src={isEmailHovered ? emailIconDark : emailIcon}
                  alt="email"
                  className="sm:h-16 sm:w-16 h-8 w-8"
                />
              </EmailShareButton>
              <button
                onClick={openInstagramChat}
                onMouseEnter={() => setIsInstagramHovered(true)} // Set hover state to true
                onMouseLeave={() => setIsInstagramHovered(false)} // Set hover state to false
              >
                <img
                  src={isInstagramHovered ? instagramIconDark : instagramIcon}
                  alt="Instagram"
                  className="sm:h-16 sm:w-16 h-8 w-8"
                />
              </button>
            </div>
          </div>
        ) : (
          <h1 className="me-24 sm:me-0 text-white outfit-extrabold xs:leading-custom-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl whitespace-pre-line">
            Planet Earth{"\n"}Pledge{"\n"}Certificate
          </h1>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center sm:p-8">
        {!submitted && (
          <form
            onSubmit={submitHandler}
            className="bg-black p-10 rounded-4xl shadow-lg sm:w-full w-[299px] h-[455px] sm:h-[501px]  max-w-md  border-2 border-transparent hover:border-blue-500"
          >
            <h2 className="mb-4 text-white sm:text-base text-sm font-outfit">
              We proudly acknowledge your commitment to the well-being of Planet
              Earth.
            </h2>
            <div className="mb-4">
              <input
                required
                type="text"
                id="name"
                className="w-full p-1 sm:p-2 border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                required
                type="email"
                id="email"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                required
                type="number"
                id="mobile"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Mobile Number*"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="country"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="address"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full border-2 border-custom-blue font-outfit text-white py-2 rounded-4xl"
            >
              Get Certificate Now!
            </button>
          </form>
        )}
        {submitted && (
          <div className="flex justify-center items-center">
            <div
              id="certificate"
              className="sm:mb-0 mb-8 bg-black bg-opacity-60 text-white sm:p-20 p-8 w-[289px]  sm:w-full max-w-3xl sm:h-[1000px] h-[405px] mx-5 rounded-4xl sm:border-2 border-1.5 border-custom-blue hover:border-blue-500"
              style={{
                backgroundImage: `url(${certificateBackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src={logo}
                alt=""
                className="sm:w-32 sm:h-auto w-12 sm:mb-4 mb-2"
              />

              <h2 className="sm:text-lg text-xxxs sm:mt-4 mt-2 outfit-semibold uppercase">
                Certificate of Commitment to
              </h2>
              <h1 className="text-1xl sm:text-5xl uppercase outfit-extrabold sm:mb-4 mb-1">
                Planet Earth
              </h1>
              <p className="outfit-medium sm:text-sm text-xxxs">
                This certificate is awarded in recognition of
              </p>
              <h3 className="text-xs sm:text-4xl outfit-extrabold font-bold sm:mt-2  uppercase">
                {name}
              </h3>
              <p className="sm:mt-2 sm:text-base text-extra-extra-small text-justify outfit-medium leading-tight">
                The participant has taken the Planet Earth Summit Pledge,
                demonstrating a commitment to environmental stewardship and
                sustainable practices. By pledging to support innovative
                solutions and foster global collaboration for a sustainable
                future, the participant has shown dedication to making a
                positive impact on our planet.
              </p>

              <div className="sm:mt-10 mt-2 sm:text-md text-justify font-sans">
                <h1 className="uppercase outfit-extrabold text-xxs sm:text-lg">
                  key commitments
                </h1>
                <ul className="list-disc list-inside ml-2 sm:outfit-medium sm:text-sm text-extra-extra-small">
                  <li className="text-justify">
                    Educating others and participating in environmental
                    initiatives.
                  </li>
                  <li>
                    Promoting biodiversity conservation and sustainable
                    agriculture.
                  </li>
                  <li>
                    Advocating for renewable energy and reducing carbon
                    footprint.
                  </li>
                  <li>
                    Supporting sustainable practices in daily life and
                    professional endeavors.
                  </li>
                  <li className="text-justify">
                    Engaging in community action and policy advocacy for
                    environmental protection.
                  </li>
                </ul>
              </div>
              <div className="sm:mt-6 mt-2 outfit-medium">
                <p className="sm:text-2xl text-sm font-bold outfit-extrabold">
                  {formatDate(new Date())}
                </p>
                <p className="sm:text-base text-xxs outfit-medium">
                  {generateCertificateNumber()}
                </p>
              </div>
              <div className="sm:mt-6 mt-2">
                <img
                  src={qr}
                  alt="QR Code"
                  className="sm:w-24 w-12 rounded sm:mb-2"
                />
              </div>
              <a
                href="https://www.planetearthsummit.eu"
                className="sm:mt-6 mt-2 text-xxxs sm:text-base outfit-medium"
              >
                www.planetearthsummit.eu
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
