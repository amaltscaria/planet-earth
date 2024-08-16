import { useState } from "react";
import backgroundImage from "../assets/Planet Earth - Certificate bg.jpg";
import certificateBackgroundImage from "../assets/certificate-bg.jpg";
import downloadLight from "../assets/downloadLight.svg";
import downloadDark from "../assets/downloadDark.svg";
import logo from "../assets/Logo.png";
import { formatDate } from "../utils/formatDate";
import { generateCertificateNumber } from "../utils/uniqueCertificateNumber";
import qr from "../assets/planetearthsummit - QR Code.png";
import { downloadJPG, downloadPDF } from "../utils/downloadFunctions";
import { handleShare } from "../utils/shareFunction";
import Share from "./Share.jsx";
import "./styles.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name, email, number, country, address);
    setSubmitted(true); // Update the state to show certificate preview and download options
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col sm:flex-row"
    >
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {submitted ? (
          <div className="flex flex-col">
            <h1 className="text-white font-outfit text-5xl sm:text-9xl leading-custom-tight whitespace-pre-line">
              Download{"\n"}Planet Earth{"\n"}Certificate
            </h1>
            <div className="mb-6 mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                style={{ width: "163px", height: "60px" }}
                className="bg-white border-2 text-black py-2 px-4 rounded-4xl flex justify-between items-center hover:border-blue-500"
                onClick={() => downloadPDF("certificate")}
              >
                PDF
                <img
                  src={downloadDark}
                  alt="Download"
                  className="ml-2 h-4 w-5"
                />
              </button>
              <button
                style={{ width: "163px", height: "60px" }}
                className="text-white border-2 border-custom-blue py-2 px-4 rounded-4xl flex justify-between items-center hover:border-blue-500"
                onClick={() => downloadJPG("certificate")}
              >
                JPG
                <img
                  src={downloadLight}
                  alt="Download"
                  className="ml-2 h-4 w-5"
                />
              </button>
              <Share elementId={'certificate'}></Share>
            </div>
          </div>
        ) : (
          <h1 className="text-white font-outfit text-5xl sm:text-9xl leading-custom-tight whitespace-pre-line">
            Planet Earth{"\n"}Pledge{"\n"}Certificate
          </h1>
        )}
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        {!submitted && (
          <form
            onSubmit={submitHandler}
            className="bg-black p-10 rounded-4xl shadow-lg w-full max-w-md border-2 border-transparent hover:border-blue-500"
          >
            <h2 className="mb-4 text-white">
              We proudly acknowledge your commitment to the well-being of Planet
              Earth.
            </h2>
            <div className="mb-4">
              <input
                required
                type="text"
                id="name"
                className="w-full p-2 border-2 text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
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
                className="w-full p-2 border-2 text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
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
                className="w-full p-2 border-2 text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Mobile Number*"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="country"
                className="w-full p-2 border-2 text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="address"
                className="w-full p-2 border-2 text-white border-white rounded-4xl bg-black placeholder-white hover:border-blue-500"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full border-2 border-custom-blue text-white py-2 rounded-4xl"
            >
              Get Certificate Now!
            </button>
          </form>
        )}
        {submitted && (
          <div className="flex justify-center items-center">
            <div
              id="certificate"
              className="bg-black bg-opacity-60 text-white p-16 w-full max-w-3xl h-[1000px] mx-5 rounded-4xl"
              style={{
                backgroundImage: `url(${certificateBackgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img src={logo} alt="" className="w-32 h-auto mb-4" />

              <h2 className="text-lg mt-4 mb-1 outfit-medium font-semibold uppercase">
                Certificate of Commitment to
              </h2>
              <h1 className="text-4xl sm:text-5xl uppercase font-bold mb-4">
                Planet Earth
              </h1>
              <p className="outfit-medium text-sm font-semibold">
                This certificate is awarded in recognition of
              </p>
              <h3 className="text-3xl sm:text-4xl outfit-medium font-bold mt-2 uppercase">
                {name}
              </h3>
              <p className="mt-2 text-md text-justify outfit-medium font-semibold leading-tight">
                The participant has taken the Planet Earth Summit Pledge,
                demonstrating a commitment to environmental stewardship and
                sustainable practices. By pledging to support innovative
                solutions and foster global collaboration for a sustainable
                future, the participant has shown dedication to making a
                positive impact on our planet.
              </p>

              <div className="mt-10 text-md text-justify font-sans">
                <h1 className="uppercase font-extrabold text-lg">
                  key commitments
                </h1>
                <ul className="list-disc list-inside ml-2 font-semibold outfit-medium">
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
              <div className="mt-6 outfit-medium">
                <p className="text-2xl font-bold outfit-medium">
                  {formatDate(new Date())}
                </p>
                <p>{generateCertificateNumber()}</p>
              </div>
              <div className="mt-6">
                <img src={qr} alt="QR Code" className="w-24 rounded mb-2" />
              </div>
              <a
                href="https://www.planetearthsummit.eu"
                className="mt-6 text-md font-bold outfit-medium"
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
