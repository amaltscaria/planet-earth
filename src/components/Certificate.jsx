import certificateBackgroundImage from "../assets/certificate-bg.jpg";
import logo from "../assets/Logo.png";
import qr from "../assets/planetearthsummit - QR Code.png";
import { formatDate } from "../utils/formatDate";
import { generateCertificateNumber } from "../utils/uniqueCertificateNumber";

const uniqueCertificateNumber = generateCertificateNumber();
const date = formatDate(new Date());

const Certificate = ({name}) => {
    
  return (
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
          {name}
        </h3>
        <p className="sm:text-xs text-extra-extra-small text-justify outfit-medium leading-tight">
          The participant has taken the Planet Earth Summit Pledge,
          demonstrating a commitment to environmental stewardship and
          sustainable practices. By pledging to support innovative solutions and
          foster global collaboration for a sustainable future, the participant
          has shown dedication to making a positive impact on our planet.
        </p>

        <div className="sm:mt-4 mt-2 sm:text-md text-justify font-sans">
          <h1 className="uppercase outfit-extrabold text-xxs sm:text-lg">
            key commitments
          </h1>
          <ul className="list-disc list-inside ml-2 outfit-medium sm:text-xs text-extra-extra-small">
            <li className="text-justify">
              Educating others and participating in environmental initiatives.
            </li>
            <li>
              Promoting biodiversity conservation and sustainable agriculture.
            </li>
            <li>
              Advocating for renewable energy and reducing carbon footprint.
            </li>
            <li>
              Supporting sustainable practices in daily life and professional
              endeavors.
            </li>
            <li className="text-justify">
              Engaging in community action and policy advocacy for environmental
              protection.
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
          <img src={qr} alt="QR Code" className="sm:w-20 w-8 rounded sm:mb-2" />
        </div>
        <a
          href="https://www.planetearthsummit.eu"
          className="sm:mt-4 text-xxxs sm:text-base outfit-medium"
        >
          www.planetearthsummit.eu
        </a>
      </div>
    </div>
  );
};

export default Certificate;
