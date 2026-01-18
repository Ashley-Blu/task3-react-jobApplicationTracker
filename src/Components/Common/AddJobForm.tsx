import React from "react";
import type { EditJobData } from "../../types/index";
import cancel from "../../assets/cancel.png";

interface AddJobFormProps {
  formData: EditJobData;
  error: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const AddJobForm: React.FC<AddJobFormProps> = ({
  formData,
  error,
  onInputChange,
  onSave,
  onCancel,
}) => {
  return (
    <div
      style={{
        marginTop: "18px",
        background: "#f4e9e9",
        padding: "24px",
        borderRadius: "12px",
        maxWidth: "600px",
      }}
    >
      {/* Cancel Button */}
      <button
        onClick={onCancel}
        style={{
          padding: "7px 7px",
          borderRadius: "6px",
          border: "none",
          background: "#ef6960",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          display: "flex",
          justifyContent: "right",
        }}
      >
        <img src={cancel} width={20} height={20} alt="Cancel" />
      </button>
      <h2 style={{ paddingBottom: 5, textAlign: "center" }}>
        Add Job Application
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* Form Fields */}
        <label htmlFor="company">Company Name:</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Enter the name of the company..."
          value={formData.company}
          onChange={onInputChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <label htmlFor="status">Status:</label>
        <input
          id="status"
          name="status"
          type="text"
          placeholder="Add the status of the application..."
          value={formData.status}
          onChange={onInputChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Put in the address of the company..."
          value={formData.address}
          onChange={onInputChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <label htmlFor="contact">Contact Details:</label>
        <input
          id="contact"
          name="contact"
          type="text"
          placeholder="Put in company contact details..."
          value={formData.contact}
          onChange={onInputChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <label htmlFor="duties">Duties:</label>
        <textarea
          id="duties"
          name="duties"
          placeholder="Add the role you applied for..."
          value={formData.duties}
          onChange={onInputChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <label htmlFor="requirements">Requirements:</label>
        <textarea
          id="requirements"
          name="requirements"
          placeholder="requirements of the position..."
          value={formData.requirements}
          onChange={onInputChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
        <label htmlFor="notes">Additional Notes:</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Notes: e.g. Prepare portfolio for interview."
          value={formData.notes}
          onChange={onInputChange}
          style={{ marginBottom: "10px", width: "100%" }}
        />
      </div>
      {/* Save Button */}
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button
          onClick={onSave}
          style={{
            padding: "10px 24px",
            borderRadius: "6px",
            border: "none",
            background: "#ef6960",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddJobForm;
