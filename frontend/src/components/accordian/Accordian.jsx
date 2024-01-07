import React from "react";
import "./Accordian.css";
import { Link } from "react-router-dom";

function Accordian({ data, isEnrolled, side, courseId }) {
    // console.log(courseId);
    const gradientStyle = {
        background: `
          radial-gradient(closest-side, #D1F5F4 79%, transparent 80% 100%),
          conic-gradient(rgb(0, 0, 10) 5%, rgb(255, 255, 255) 0)
        `,
    };
    return (
        <div className={side ? "accordion small" : "accordion"}>
            {data
                .sort((a, b) => {
                    return a.sequence < b.sequence ? -1 : 1;
                })
                .map((unit, idx) => {
                    let extra =
                        idx == 0
                            ? "first"
                            : idx == data.length - 1
                            ? "last"
                            : "";
                    return (
                        <div className="accordion_module" key={idx}>
                            <input
                                type="checkbox"
                                name="module_accordion"
                                id={unit._id}
                                className="accordion_input"
                                defaultChecked={idx == 0}
                            />
                            <label
                                htmlFor={!unit.locked ? unit._id : "666"}
                                className={"accordion_label " + extra}
                            >
                                <label
                                    htmlFor={!unit.locked ? unit._id : "666"}
                                    className="accordion_label_content"
                                >
                                    {unit.sequence}. {unit.title}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="28"
                                        height="17"
                                        viewBox="0 0 28 17"
                                        fill="none"
                                    >
                                        <path
                                            d="M2.09417e-07 14.6045L2.28421 17L14 4.71364L25.7158 17L28 14.6045L14 -1.22392e-06L2.09417e-07 14.6045Z"
                                            fill="white"
                                        />
                                    </svg>
                                </label>
                                {isEnrolled && !unit.locked ? (
                                    <div
                                        className="progress-bar"
                                        // style={gradientStyle}
                                    ></div>
                                ) : (
                                    <p>
                                        {unit.locked && (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="21"
                                                    viewBox="0 0 16 21"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M2 21C1.45 21 0.979333 20.8043 0.588 20.413C0.196666 20.0217 0.000666667 19.5507 0 19V9C0 8.45 0.196 7.97933 0.588 7.588C0.98 7.19667 1.45067 7.00067 2 7H3V5C3 3.61667 3.48767 2.43767 4.463 1.463C5.43833 0.488333 6.61733 0.000666667 8 0C9.38333 0 10.5627 0.487667 11.538 1.463C12.5133 2.43833 13.0007 3.61733 13 5V7H14C14.55 7 15.021 7.196 15.413 7.588C15.805 7.98 16.0007 8.45067 16 9V19C16 19.55 15.8043 20.021 15.413 20.413C15.0217 20.805 14.5507 21.0007 14 21H2ZM8 16C8.55 16 9.021 15.8043 9.413 15.413C9.805 15.0217 10.0007 14.5507 10 14C10 13.45 9.80433 12.9793 9.413 12.588C9.02167 12.1967 8.55067 12.0007 8 12C7.45 12 6.97933 12.196 6.588 12.588C6.19667 12.98 6.00067 13.4507 6 14C6 14.55 6.196 15.021 6.588 15.413C6.98 15.805 7.45067 16.0007 8 16ZM5 7H11V5C11 4.16667 10.7083 3.45833 10.125 2.875C9.54167 2.29167 8.83333 2 8 2C7.16667 2 6.45833 2.29167 5.875 2.875C5.29167 3.45833 5 4.16667 5 5V7Z"
                                                        fill="black"
                                                    />
                                                </svg>
                                            </>
                                        )}
                                        <small>
                                            {unit.numOfVideo} videos.{" "}
                                            {unit.duration} hours
                                        </small>
                                    </p>
                                )}
                            </label>

                            <div className="section_content">
                                {unit.videos.map((v) =>
                                    isEnrolled ? (
                                        <Link
                                            to={`${
                                                side
                                                    ? `/courseDetail/${courseId}/`
                                                    : ""
                                            }video/${v._id}`}
                                            className={`section1_content1 ${
                                                v.locked ? "locked" : ""
                                            }`}
                                            style={{ cursor: "pointer" }}
                                            key={v._id}
                                        >
                                            <div className="section1_icon_topic">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M18 4H6C3.79086 4 2 5.79086 2 8V16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16V8C22 5.79086 20.2091 4 18 4Z"
                                                        stroke="black"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M15 12L10 9V15L15 12Z"
                                                        stroke="black"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <p className="section1_topic">
                                                    {v.title}
                                                </p>
                                            </div>
                                            <div className="section1_duration">
                                                {v.duration.hours
                                                    ? v.duration.hours +
                                                      " hours"
                                                    : ""}
                                                {v.duration.minutes
                                                    ? v.duration.minutes +
                                                      " min"
                                                    : ""}
                                            </div>
                                        </Link>
                                    ) : (
                                        <div
                                            className="section1_content1"
                                            key={v._id}
                                        >
                                            <div className="section1_icon_topic">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M18 4H6C3.79086 4 2 5.79086 2 8V16C2 18.2091 3.79086 20 6 20H18C20.2091 20 22 18.2091 22 16V8C22 5.79086 20.2091 4 18 4Z"
                                                        stroke="black"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path
                                                        d="M15 12L10 9V15L15 12Z"
                                                        stroke="black"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="section1_topic">
                                                    {v.title}
                                                </div>
                                            </div>
                                            <div className="section1_duration">
                                                {v.duration.hours
                                                    ? v.duration.hours +
                                                      " hours"
                                                    : ""}
                                                {v.duration.minutes
                                                    ? v.duration.minutes +
                                                      " min"
                                                    : ""}
                                            </div>
                                        </div>
                                    )
                                )}

                                {isEnrolled ? (
                                    <Link
                                        to={`${
                                            side
                                                ? `/courseDetail/${courseId}/`
                                                : ""
                                        }test/${unit.testId}`}
                                        style={{ cursor: "pointer" }}
                                        className={`section1_content1 ${
                                            unit.testLocked ? "locked" : ""
                                        }`}
                                    >
                                        <div className="section1_icon_topic">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M12 13C12.2833 13 12.5293 12.8957 12.738 12.687C12.9467 12.4783 13.0507 12.2327 13.05 11.95C13.05 11.6667 12.9457 11.421 12.737 11.213C12.5283 11.005 12.2827 10.9007 12 10.9C11.7167 10.9 11.4707 11.0043 11.262 11.213C11.0533 11.4217 10.9493 11.6673 10.95 11.95C10.95 12.2333 11.0543 12.4793 11.263 12.688C11.4717 12.8967 11.7173 13.0007 12 13ZM11.25 9.8H12.75C12.75 9.31667 12.8 8.96234 12.9 8.737C13 8.51167 13.2333 8.216 13.6 7.85C14.1 7.35 14.4333 6.946 14.6 6.638C14.7667 6.33 14.85 5.96734 14.85 5.55C14.85 4.8 14.5873 4.18767 14.062 3.713C13.5367 3.23833 12.8493 3.00067 12 3C11.3167 3 10.7207 3.19167 10.212 3.575C9.70333 3.95833 9.34933 4.46667 9.15 5.1L10.5 5.65C10.65 5.23334 10.8543 4.92067 11.113 4.712C11.3717 4.50333 11.6673 4.39934 12 4.4C12.4 4.4 12.725 4.51267 12.975 4.738C13.225 4.96334 13.35 5.26734 13.35 5.65C13.35 5.88334 13.2833 6.10433 13.15 6.313C13.0167 6.52167 12.7833 6.784 12.45 7.1C11.9 7.58334 11.5627 7.96234 11.438 8.237C11.3133 8.51167 11.2507 9.03267 11.25 9.8ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H18C18.55 1.69779e-06 19.021 0.196002 19.413 0.588002C19.805 0.980002 20.0007 1.45067 20 2V14C20 14.55 19.804 15.021 19.412 15.413C19.02 15.805 18.5493 16.0007 18 16H6ZM6 14H18V2H6V14ZM2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V4H2V18H16V20H2Z"
                                                    fill="black"
                                                />
                                            </svg>
                                            <p className="section1_topic">
                                                Quick quiz
                                            </p>
                                        </div>
                                        <div className="section1_duration">
                                            {unit.numOfMCQ} questions
                                        </div>
                                    </Link>
                                ) : (
                                    <div
                                        className={`section1_content1 ${
                                            unit.testLocked ? "locked" : ""
                                        }`}
                                    >
                                        <div className="section1_icon_topic">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                            >
                                                <path
                                                    d="M12 13C12.2833 13 12.5293 12.8957 12.738 12.687C12.9467 12.4783 13.0507 12.2327 13.05 11.95C13.05 11.6667 12.9457 11.421 12.737 11.213C12.5283 11.005 12.2827 10.9007 12 10.9C11.7167 10.9 11.4707 11.0043 11.262 11.213C11.0533 11.4217 10.9493 11.6673 10.95 11.95C10.95 12.2333 11.0543 12.4793 11.263 12.688C11.4717 12.8967 11.7173 13.0007 12 13ZM11.25 9.8H12.75C12.75 9.31667 12.8 8.96234 12.9 8.737C13 8.51167 13.2333 8.216 13.6 7.85C14.1 7.35 14.4333 6.946 14.6 6.638C14.7667 6.33 14.85 5.96734 14.85 5.55C14.85 4.8 14.5873 4.18767 14.062 3.713C13.5367 3.23833 12.8493 3.00067 12 3C11.3167 3 10.7207 3.19167 10.212 3.575C9.70333 3.95833 9.34933 4.46667 9.15 5.1L10.5 5.65C10.65 5.23334 10.8543 4.92067 11.113 4.712C11.3717 4.50333 11.6673 4.39934 12 4.4C12.4 4.4 12.725 4.51267 12.975 4.738C13.225 4.96334 13.35 5.26734 13.35 5.65C13.35 5.88334 13.2833 6.10433 13.15 6.313C13.0167 6.52167 12.7833 6.784 12.45 7.1C11.9 7.58334 11.5627 7.96234 11.438 8.237C11.3133 8.51167 11.2507 9.03267 11.25 9.8ZM6 16C5.45 16 4.979 15.804 4.587 15.412C4.195 15.02 3.99934 14.5493 4 14V2C4 1.45 4.196 0.979002 4.588 0.587002C4.98 0.195002 5.45067 -0.000664969 6 1.69779e-06H18C18.55 1.69779e-06 19.021 0.196002 19.413 0.588002C19.805 0.980002 20.0007 1.45067 20 2V14C20 14.55 19.804 15.021 19.412 15.413C19.02 15.805 18.5493 16.0007 18 16H6ZM6 14H18V2H6V14ZM2 20C1.45 20 0.979002 19.804 0.587002 19.412C0.195002 19.02 -0.000664969 18.5493 1.69779e-06 18V4H2V18H16V20H2Z"
                                                    fill="black"
                                                />
                                            </svg>
                                            <p className="section1_topic">
                                                Quick quiz
                                            </p>
                                        </div>
                                        <div className="section1_duration">
                                            {unit.numOfMCQ} questions
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

export default Accordian;
