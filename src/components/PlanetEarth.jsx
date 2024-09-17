import { useState, useEffect } from "react";
import axios from "axios";
import backgroundImage from "../assets/Planet Earth - Certificate bg.jpg";
import { validateForm } from "../utils/validation.js";
import "./styles.css";
import Certificate from "./Certificate";
import ShareAndDownload from "./ShareAndDownload";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);
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

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col sm:flex-col md:flex-col lg:flex-row"
    >
      <div className="flex-1 flex flex-col items-center justify-center pt-8 sm:p-8">
        {submitted ? (
          <ShareAndDownload />
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
        {submitted && <Certificate name={formData.name} />}
      </div>
    </div>
  );
};

export default Signup;
