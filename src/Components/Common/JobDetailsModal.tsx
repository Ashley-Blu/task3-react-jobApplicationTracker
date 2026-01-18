import React from "react";
import type { Job } from "../../types/index";

interface JobDetailsModalProps {
  isOpen: boolean;
  job: Job | null;
  onClose: () => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  isOpen,
  job,
  onClose,
}) => {
  if (!isOpen || !job) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "32px",
          borderRadius: "16px",
          minWidth: "400px",
          maxWidth: "600px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
        }}
      >
        <h2 style={{ marginBottom: "18px" }}>Job Details</h2>
        <p>
          <strong>Company:</strong> {job.company}
        </p>
        <p>
          <strong>Status:</strong> {job.status}
        </p>
        <p>
          <strong>Address:</strong> {job.address || "N/A"}
        </p>
        <p>
          <strong>Contact:</strong> {job.contact || "N/A"}
        </p>
        <p>
          <strong>Duties:</strong> {job.duties || "N/A"}
        </p>
        <p>
          <strong>Requirements:</strong> {job.requirements || "N/A"}
        </p>
        <p>
          <strong>Notes:</strong> {job.notes || "N/A"}
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: "18px",
            padding: "10px 24px",
            borderRadius: "6px",
            border: "none",
            background: "#ef6960",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default JobDetailsModal;
