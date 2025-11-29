import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./Service.css";
import { StepContext } from "./context/StepContext";

function Service() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const context = useContext(StepContext);
  //   ? initialCards.filter((card) => card.category === selectedCategory)
  //   : initialCards;

  // const handleFilter = (selectedCategory) => {
  //   setSelectedCategory(selectedCategory);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);

    context.setStep1(false);
    context.setStep2(false);
    context.setStep3(false);
    context.setStep4(false);
    
    fetch(`http://127.0.0.1:5000/api/forms?service_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setData(res);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [context, id]);

  useEffect(() => {
    if (data.length > 0) {
      setServiceName(data[0].service_name);
    }
  }, [data]);

  const handleClick= () => {
    context.setStep1(true);
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="h-full w-full object-cover opacity-20"
        >
          <source
            src="https://res.cloudinary.com/dyxnmjtrg/video/upload/v1694668584/Purple_Blue_Modern_Tech_Business_Conference_Video_d5vf0l.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-12">
            <ul className="steps w-full bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
              <li
                className={`step ${context.step1 ? "step-success" : ""} text-white font-semibold text-sm sm:text-base`}
              >
                Select Document
              </li>
              <li
                className={`step ${context.step2 ? "step-success" : ""} text-white font-semibold text-sm sm:text-base`}
              >
                Fill Information
              </li>
              <li
                className={`step ${context.step3 ? "step-success" : ""} text-white font-semibold text-sm sm:text-base`}
              >
                Edit Document
              </li>
              <li
                className={`step ${context.step4 ? "step-success" : ""} text-white font-semibold text-sm sm:text-base`}
              >
                Download
              </li>
            </ul>
          </div>

          {/* Service Title */}
          {serviceName.length > 0 && (
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                {serviceName}
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto"></div>
            </div>
          )}

          {/* Document Cards */}
          <div className="space-y-4">
            {data.length > 0 ? (
              data.map((form) => (
                <Link
                  to={"/form/" + form.form_id}
                  key={form.form_id}
                  onClick={handleClick}
                  className="block group"
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="w-7 h-7 text-white"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            {form.form_name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Click to start generating your document
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center space-x-2 text-indigo-600 font-semibold">
                        <span>View Document</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto text-white/70"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <p className="text-2xl sm:text-3xl text-white font-bold mb-2">
                  No templates available
                </p>
                <p className="text-white/80 text-lg">
                  Please contact a lawyer for assistance
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Service;
