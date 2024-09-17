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
import { validateForm } from "../utils/validation.js";
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

const uniqueCertificateNumber = generateCertificateNumber();
const date = formatDate( new Date());

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    address: "",
  });
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
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(formData);
    if (isValid) {
      setSubmitted(true);
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    if(submitted){
    
    const fetchAndUploadJPG = async () => {
      try {
       console.log(formData.name)
        const response = await axios.post('http://localhost:3000/share', {name:formData.name, date, uniqueCertificateNumber});
        // const response = await axios.post('https://join.planetearthsummit.eu/share', {name:formData.name, date, uniqueCertificateNumber});
        
        if (response.status === 200) {
          console.log(response)
          setShareUrl(response.data.filePath); // Save the file path from the response
          console.log('JPG saved and file path received:', response.data.filePath);
        } else {
          console.error('Failed to save JPG:', response.data.message);
        }
      } catch (error) {
        console.error('Error generating or uploading JPG:', error);
      }
    };

    // fetchAndUploadJPG();
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

  const handleDownloadPDF = async () => {
    try {
        const response = await axios.post('http://localhost:3000/download-pdf',{name: formData.name, date, uniqueCertificateNumber}, {
        // const response = await axios.post('https://join.planetearthsummit.eu/download-pdf',{name: formData.name, date, uniqueCertificateNumber}, {
            responseType: 'blob', // Important for handling binary data
        });

        // Create a URL for the blob and initiate the download
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'certificate.pdf'); // Set the downloaded file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
        window.URL.revokeObjectURL(url); // Release memory

    } catch (error) {
        console.error('Error downloading the PDF:', error);
    }
};

const handleDownloadJPG = async () => {
  try {
      const response = await axios.post('http://localhost:3000/download/jpg',{name: formData.name, date, uniqueCertificateNumber}, {
      // const response = await axios.post('https://join.planetearthsummit.eu/download/jpg',{name: formData.name, date, uniqueCertificateNumber}, {
          responseType: 'blob', // Important for handling binary data
      });

      // Create a URL for the blob and initiate the download
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'certificate.jpg'); // Set the downloaded file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
      window.URL.revokeObjectURL(url); // Release memory

  } catch (error) {
      console.error('Error downloading the JPG:', error);
  }
};

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col sm:flex-col md:flex-col lg:flex-row"
    >
      <div className="flex-1 flex flex-col items-center justify-center pt-8 sm:p-8">
        {submitted ? (
          <div className="flex flex-col">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl outfit-extrabold sm:leading-custom-tight  whitespace-pre-line outfit-">
              Download{"\n"}Planet Earth{"\n"}Certificate
            </h1>
            <div className="mb-6 sm:mt-8 mt-4 flex flex-row justify-center space-x-2 sm:space-x-4 space-y-0">
              <button
                // style={{ width: "163px", height: "60px" }}
                className="font-outfit text-xxs sm:text-base text-white border-2 border-custom-blue py-2  sm:px-3 px-2 rounded-4xl flex justify-between items-center hover:text-black hover:border-0 hover:bg-white w-20 sm:w-36 sm:h-12"
                onClick={downloadPDF}
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
                onClick={handleDownloadJPG}
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
                  <img src={isCopyHovered ? copyIconDark : copyIcon} alt="" className="sm:w-5 w-4"/>
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
        ) : (
          <h1 className="me-24 sm:me-0 text-white outfit-extrabold xs:leading-custom-tight text-2xl sm:text-4xl md:text-5xl lg:text-7xl whitespace-pre-line">
            Planet Earth{"\n"}Pledge{"\n"}Certificate
          </h1>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center sm:p-8">
        {!submitted && (
          <form
            onSubmit={submitHandler}
            className="bg-black p-10 rounded-4xl shadow-lg border-custom-blue sm:w-full w-[299px] max-w-md  border-2"
          >
            <h2 className="mb-4 text-white sm:text-base text-sm font-outfit">
              We proudly acknowledge your commitment to the well-being of Planet
              Earth.
            </h2>
            <div className="mb-4">
              <input
                type="text"
                id="name"
                className="w-full p-1 sm:p-2 border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white "
                placeholder="Name*"
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
              <p className="text-red-600 font-outfitn md:text-base text-xs">
              {errors.name && (
                  <p className="text-red-600 font-outfit md:text-base text-xs">
                    {errors.name}
                  </p>
                )}
              </p>
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white "
                placeholder="Email*"
                value={formData.email}
                onChange={handleChange}
              />
              <p className="text-red-600 font-outfit md:text-base text-xs">
              {errors.email && (
                  <p className="text-red-600 font-outfit md:text-base text-xs">
                    {errors.email}
                  </p>
                )}
              </p>
            </div>
            <div className="mb-4">
              <input
                type="number"
                name="number"
                id="mobile"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white "
                placeholder="Mobile Number*"
                value={formData.number}
                onChange={handleChange}
              />
              <p className="text-red-600 font-outfit md:text-base text-xs">
                {errors.number && (
                  <p className="text-red-600 font-outfit md:text-base text-xs">
                    {errors.number}
                  </p>
                )}
              </p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="country"
                id="country"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white "
                placeholder="Country*"
                value={formData.country}
                onChange={handleChange}
              />
              <p className="text-red-600 font-outfit md:text-base text-xs">
              {errors.country && (
                  <p className="text-red-600 font-outfit md:text-base text-xs">
                    {errors.country}
                  </p>
                )}
              </p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="address"
                name="address"
                className="w-full p-1 sm:p-2  border-2 font-outfit text-white border-white rounded-4xl bg-black placeholder-white "
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
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
              className="sm:mb-0 mb-8 bg-black bg-opacity-60 text-white sm:p-16 p-8 w-[289px]  sm:w-[597px] max-w-3xl sm:h-[835px] h-[405px] mx-5 rounded-4xl sm:border-2 border-1.5 border-custom-blue "
              style={{
                backgroundImage: `url(${certificateBackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src={logo}
                alt=""
                className="sm:w-28 sm:h-auto w-8 sm:mb-4 mb-2 mt-4"
              />

              <h2 className="sm:text-base text-xxxs sm:mt-4 mt-2 mb-0 outfit-semibold uppercase">
                Certificate of Commitment to
              </h2>
              <h1 className="text-1xl sm:text-5xl mt-0 uppercase outfit-extrabold sm:mb-4 mb-2">
                Planet Earth
              </h1>
              <p className="outfit-medium sm:text-sm text-xxxs">
                This certificate is awarded in recognition of
              </p>
              <h3 className="text-xs sm:text-3xl outfit-extrabold font-bold uppercase">
                {formData.name}
              </h3>
              <p className="sm:text-xs text-extra-extra-small text-justify outfit-medium leading-tight">
                The participant has taken the Planet Earth Summit Pledge,
                demonstrating a commitment to environmental stewardship and
                sustainable practices. By pledging to support innovative
                solutions and foster global collaboration for a sustainable
                future, the participant has shown dedication to making a
                positive impact on our planet.
              </p>

              <div className="sm:mt-4 mt-2 sm:text-md text-justify font-sans">
                <h1 className="uppercase outfit-extrabold text-xxs sm:text-lg">
                  key commitments
                </h1>
                <ul className="list-disc list-inside ml-2 outfit-medium sm:text-xs text-extra-extra-small">
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
              <div className="sm:mt-4 mt-2 outfit-medium">
                <p className="sm:text-base text-sm font-bold outfit-extrabold">
                  {/* {formatDate(new Date())} */}
                  {date}
                </p>
                <p className="sm:text-sm text-xxs outfit-medium">
                  {uniqueCertificateNumber}
                </p>
              </div>
              <div className="sm:mt-4 mt-2">
                <img
                  src={qr}
                  alt="QR Code"
                  className="sm:w-20 w-8 rounded sm:mb-2"
                />
              </div>
              <a
                href="https://www.planetearthsummit.eu"
                className="sm:mt-4 text-xxxs sm:text-base outfit-medium"
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
