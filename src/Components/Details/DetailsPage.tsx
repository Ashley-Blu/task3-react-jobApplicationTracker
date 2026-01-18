import React, { useState } from "react";
import "./Details.css";
import { useParams } from "react-router-dom";
import type { Job } from "../../types/index";

const jobs: Job[] = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    company: "Tech Solutions Inc.",
    address: "123 Main St, Cityville",
    contact: "hr@techsolutions.com",
    duties:
      "Develop and maintain web applications, collaborate with designers and backend engineers.",
    requirements: "React, TypeScript, CSS, 2+ years experience.",
    notes: "Prepare portfolio for interview.",
  },
  {
    id: 2,
    jobTitle: "Backend Engineer",
    company: "Innovatech",
    address: "456 Tech Ave, Innovacity",
    contact: "jobs@innovatech.com",
    duties:
      "Build and optimize backend services, work with cloud infrastructure.",
    requirements: "Node.js, Express, MongoDB, 3+ years experience.",
    notes: "Brush up on cloud deployment.",
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    company: "Creative Minds",
    address: "789 Design Blvd, Creatown",
    contact: "design@creativeminds.com",
    duties: "Design user interfaces, conduct user research, create wireframes.",
    requirements: "Figma, Adobe XD, UX research, 2+ years experience.",
    notes: "Prepare design portfolio.",
  },
];

interface DetailsPageParams {
  id?: string;
}

const DetailsPage = () => {
  const { id } = useParams<DetailsPageParams>();
  const job = jobs.find((j: Job) => j.id === Number(id));
  const [details, setDetails] = useState<Job>(job || jobs[0]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  if (!job) {
    return (
      <div
        className="body"
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#ffeaea",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 2px 12px rgba(211,47,47,0.09)",
            minWidth: "400px",
            textAlign: "center",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <h1 style={{ color: "#d32f2f", marginBottom: "18px" }}>
            Job Not Found
          </h1>
          <p>No job found for this ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="body"
      style={{
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <div
        style={{
          background: "#f7f7f7",
          padding: "36px",
          borderRadius: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.09)",
          minWidth: "400px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#007bff",
            marginBottom: "24px",
          }}
        >
          Job Details
        </h1>
        <form style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <label style={{ fontWeight: "bold" }}>
            Job Title:
            <input
              name="jobTitle"
              value={details.jobTitle}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label style={{ fontWeight: "bold" }}>
            Company:
            <input
              name="company"
              value={details.company}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label style={{ fontWeight: "bold" }}>
            Address:
            <input
              name="address"
              value={details.address}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label style={{ fontWeight: "bold" }}>
            Contact:
            <input
              name="contact"
              value={details.contact}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </label>
          <label style={{ fontWeight: "bold" }}>
            Duties:
            <textarea
              name="duties"
              value={details.duties}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minHeight: "60px",
              }}
            />
          </label>
          <label style={{ fontWeight: "bold" }}>
            Requirements:
            <textarea
              name="requirements"
              value={details.requirements}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minHeight: "60px",
              }}
            />
          </label>
          <label style={{ fontWeight: "bold" }}>
            Additional Notes:
            <textarea
              name="notes"
              value={details.notes}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "6px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                minHeight: "40px",
              }}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default DetailsPage;
