import React from "react";
import type { Job, EditJobData } from "../../types/index";
import bin from "../../assets/bin.png";
import edit from "../../assets/edit.png";
import more from "../../assets/see-more.png";

interface JobCardProps {
  job: Job;
  isEditing: boolean;
  editData: EditJobData;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
  onViewDetails: (job: Job) => void;
  onEditInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onUpdateJob: (id: number) => void;
  onCancelEdit: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isEditing,
  editData,
  onEdit,
  onDelete,
  onViewDetails,
  onEditInputChange,
  onUpdateJob,
  onCancelEdit,
}) => {
  return (
    <li
      style={{
        marginBottom: "30px",
        background: "#f4e9e9",
        padding: "24px",
        borderRadius: "14px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "100%",
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {isEditing ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* Edit Fields */}
          <label htmlFor="edit-company">Company Name:</label>
          <input
            id="edit-company"
            name="company"
            type="text"
            placeholder="Enter the company name..."
            value={editData.company}
            onChange={onEditInputChange}
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <label htmlFor="edit-status">Status:</label>
          <input
            id="edit-status"
            name="status"
            type="text"
            placeholder="Add status of your application..."
            value={editData.status}
            onChange={onEditInputChange}
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <label htmlFor="edit-address">Address:</label>
          <input
            id="edit-address"
            name="address"
            type="text"
            placeholder="Add the address of the company..."
            value={editData.address}
            onChange={onEditInputChange}
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <label htmlFor="edit-contact">Contact Details:</label>
          <input
            id="edit-contact"
            name="contact"
            type="text"
            placeholder="Add an email or contact details..."
            value={editData.contact}
            onChange={onEditInputChange}
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <label htmlFor="edit-duties">Duties:</label>
          <textarea
            id="edit-duties"
            name="duties"
            placeholder="Add the role you applied for..."
            value={editData.duties}
            onChange={onEditInputChange}
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <label htmlFor="edit-requirements">Requirements:</label>
          <textarea
            id="edit-requirements"
            name="requirements"
            placeholder="Add the skills required..."
            value={editData.requirements}
            onChange={onEditInputChange}
            style={{ marginBottom: "8px", width: "100%" }}
          />
          <label htmlFor="edit-notes">Additional Notes:</label>
          <textarea
            id="edit-notes"
            name="notes"
            placeholder="Add a note: e.g. Prepare portfolio for interview."
            value={editData.notes}
            onChange={onEditInputChange}
            style={{ marginBottom: "8px", width: "100%" }}
          />
          {/* Save & Cancel buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => onUpdateJob(job.id)}
              style={{
                marginRight: "8px",
                padding: 10,
                background: "#ef6960",
                border: "none",
                borderRadius: 6,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
            <button
              onClick={onCancelEdit}
              style={{
                padding: 10,
                background: "#ef6960",
                border: "none",
                borderRadius: 6,
                color: "white",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View mode
        <>
          <p style={{ margin: 0 }}>
            <strong>Company:</strong> {job.company}
          </p>
          <p style={{ margin: 0 }}>
            <strong>Status:</strong> {job.status}
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "10px",
              justifyContent: "flex-end",
            }}
          >
            {/* Details Button */}
            <button
              onClick={() => onViewDetails(job)}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                color: "white",
                background: "none",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <img src={more} width={20} height={40} alt="See More" />
            </button>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(job)}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                color: "black",
                background: "none",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <img src={edit} width={20} height={20} alt="Edit" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(job.id)}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                background: "none",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={bin}
                width={20}
                height={20}
                style={{ marginTop: 10 }}
                alt="Delete"
              />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default JobCard;
