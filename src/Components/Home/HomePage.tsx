import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../../utils/localStorage";
import type { Job, EditJobData } from "../../types/index";
import placeholder from "../../assets/placeholder.png";
import bin from "../../assets/bin.png";
import edit from "../../assets/edit.png";
import more from "../../assets/see-more.png";
import plus from "../../assets/plus.png";
import cancel from "../../assets/cancel.png";
import toast, { Toaster } from "react-hot-toast";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("activeUser");
    navigate("/LoginPage");
  };

  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [modalJob, setModalJob] = React.useState<Job | null>(null);

  const handleViewDetails = (job: Job): void => {
    setModalJob(job);
    setShowModal(true);
  };

  const handleCloseModal = (): void => {
    setShowModal(false);
    setModalJob(null);
  };

  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [editData, setEditData] = React.useState<EditJobData>({
    company: "",
    status: "",
    address: "",
    contact: "",
    duties: "",
    requirements: "",
    notes: "",
  });

  const handleEditClick = (job: Job): void => {
    setEditingId(job.id);
    setEditData({
      company: job.company || "",
      status: job.status || "",
      address: job.address || "",
      contact: job.contact || "",
      duties: job.duties || "",
      requirements: job.requirements || "",
      notes: job.notes || "",
    });
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateJob = (id: number): void => {
    const jobsList: Job[] = getJobs().map((job: Job) =>
      job.id === id
        ? {
            ...job,
            company: editData.company,
            status: editData.status,
            address: editData.address,
            contact: editData.contact,
            duties: editData.duties,
            requirements: editData.requirements,
            notes: editData.notes,
          }
        : job,
    );
    localStorage.setItem("jobs", JSON.stringify(jobsList));
    setJobs(jobsList);
    setEditingId(null);
  };

  const handleDeleteJob = (id: number): void => {
    toast(
      (t) => (
        <span>
          Are you sure you want to delete this job?
          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <button
              style={{
                background: "#ef6960",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "6px 18px",
                fontWeight: "bold",
              }}
              onClick={() => {
                const jobsList = getJobs().filter((job: Job) => job.id !== id);
                localStorage.setItem("jobs", JSON.stringify(jobsList));
                setJobs(jobsList);
                toast.dismiss(t.id);
                toast.success("Job deleted!", {
                  style: {
                    border: "1px solid #333",
                    padding: "22px",
                    color: "#fff",
                    background: "#ef6960",
                  },
                });
              }}
            >
              Yes
            </button>
            <button
              style={{
                background: "#fff",
                color: "#ef6960",
                border: "1px solid #ef6960",
                borderRadius: 6,
                padding: "6px 18px",
                fontWeight: "bold",
              }}
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </span>
      ),
      {
        style: {
          border: "1px solid #333",
          padding: "22px",
          color: "#fff",
          background: "#ef6960",
        },
        duration: 6000,
      },
    );
  };

  const [jobs, setJobs] = React.useState<Job[]>(getJobs());
  const [showAddForm, setShowAddForm] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const [formData, setFormData] = React.useState<EditJobData>({
    company: "",
    status: "",
    address: "",
    contact: "",
    duties: "",
    requirements: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddJob = (): void => {
    setError("");
    if (!formData.company || !formData.status) {
      setError("Please fill in all required fields");
      return;
    }
    const newJob: Job = {
      id: Date.now(),
      company: formData.company,
      status: formData.status,
      address: formData.address,
      contact: formData.contact,
      duties: formData.duties,
      requirements: formData.requirements,
      notes: formData.notes,
    };
    const updatedJobs: Job[] = [...jobs, newJob];
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
    setFormData({
      company: "",
      status: "",
      address: "",
      contact: "",
      duties: "",
      requirements: "",
      notes: "",
    });
    setShowAddForm(false);
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            border: "1px solid #333",
            padding: "22px",
            color: "#fff",
            background: "#ef6960",
          },
        }}
      />

      {/* Main container */}
      <div
        className="body"
        style={{
          minHeight: "80vh",
          alignItems: "flex-start",
          paddingTop: "40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
          {/* Logout Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 16,
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 20px",
                borderRadius: "6px",
                border: "none",
                background: "#ef6960",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </div>

          {/* Title */}
          <h1
            style={{ textAlign: "center", marginBottom: "32px", color: "222" }}
          >
            Jobs You've Applied For
          </h1>

          {/* No jobs placeholder */}
          {jobs.length === 0 && !showAddForm && (
            <div style={{ textAlign: "center", margin: "40px 0" }}>
              <img
                src={placeholder}
                alt="No applications"
                style={{ width: 120, opacity: 0.5 }}
              />
              <p style={{ color: "#888", marginTop: 16 }}>
                No job applications yet.
                <br />
                Click the + button to add your first application!
              </p>
            </div>
          )}

          {/* Add button or form */}
          <div style={{ marginBottom: "32px" }}>
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
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
                <img src={plus} width={20} height={20} alt="Add" />
              </button>
            ) : (
              // Add Job Form
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
                  onClick={() => setShowAddForm(false)}
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
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <label htmlFor="status">Status:</label>
                  <input
                    id="status"
                    name="status"
                    type="text"
                    placeholder="Add the status of the application..."
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <label htmlFor="address">Address:</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Put in the address of the company..."
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <label htmlFor="contact">Contact Details:</label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    placeholder="Put in company contact details..."
                    value={formData.contact}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <label htmlFor="duties">Duties:</label>
                  <textarea
                    id="duties"
                    name="duties"
                    placeholder="Add the role you applied for..."
                    value={formData.duties}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <label htmlFor="requirements">Requirements:</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    placeholder="requirements of the position..."
                    value={formData.requirements}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                  <label htmlFor="notes">Additional Notes:</label>
                  <textarea
                    id="notes"
                    name="notes"
                    placeholder="Notes: e.g. Prepare portfolio for interview."
                    value={formData.notes}
                    onChange={handleInputChange}
                    style={{ marginBottom: "10px", width: "100%" }}
                  />
                </div>
                {/* Save Button */}
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                >
                  <button
                    onClick={handleAddJob}
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
            )}
          </div>

          {/* Job list */}
          <div style={{ maxHeight: "60vh", overflowY: "auto", marginTop: 24 }}>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {jobs.map((job: Job) => (
                <li
                  key={job.id}
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
                  {editingId === job.id ? (
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
                        onChange={handleEditInputChange}
                        style={{ marginBottom: "8px", width: "100%" }}
                      />
                      <label htmlFor="edit-status">Status:</label>
                      <input
                        id="edit-status"
                        name="status"
                        type="text"
                        placeholder="Add status of your application..."
                        value={editData.status}
                        onChange={handleEditInputChange}
                        style={{ marginBottom: "8px", width: "100%" }}
                      />
                      <label htmlFor="edit-address">Address:</label>
                      <input
                        id="edit-address"
                        name="address"
                        type="text"
                        placeholder="Add the address of the company..."
                        value={editData.address}
                        onChange={handleEditInputChange}
                        style={{ marginBottom: "8px", width: "100%" }}
                      />
                      <label htmlFor="edit-contact">Contact Details:</label>
                      <input
                        id="edit-contact"
                        name="contact"
                        type="text"
                        placeholder="Add an email or contact details..."
                        value={editData.contact}
                        onChange={handleEditInputChange}
                        style={{ marginBottom: "8px", width: "100%" }}
                      />
                      <label htmlFor="edit-duties">Duties:</label>
                      <textarea
                        id="edit-duties"
                        name="duties"
                        placeholder="Add the role you applied for..."
                        value={editData.duties}
                        onChange={handleEditInputChange}
                        style={{ marginBottom: "8px", width: "100%" }}
                      />
                      <label htmlFor="edit-requirements">Requirements:</label>
                      <textarea
                        id="edit-requirements"
                        name="requirements"
                        placeholder="Add the skills required..."
                        value={editData.requirements}
                        onChange={handleEditInputChange}
                        style={{ marginBottom: "8px", width: "100%" }}
                      />
                      <label htmlFor="edit-notes">Additional Notes:</label>
                      <textarea
                        id="edit-notes"
                        name="notes"
                        placeholder="Add a note: e.g. Prepare portfolio for interview."
                        value={editData.notes}
                        onChange={handleEditInputChange}
                        style={{ marginBottom: "8px", width: "100%" }}
                      />
                      {/* Save & Cancel buttons */}
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          onClick={() => handleUpdateJob(job.id)}
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
                          onClick={() => setEditingId(null)}
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
                          onClick={() => handleViewDetails(job)}
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
                          <img
                            src={more}
                            width={20}
                            height={40}
                            alt="See More"
                          />
                        </button>

                        {/* Job details modal */}
                        {showModal && modalJob && (
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
                              <h2 style={{ marginBottom: "18px" }}>
                                Job Details
                              </h2>
                              <p>
                                <strong>Company:</strong> {modalJob.company}
                              </p>
                              <p>
                                <strong>Status:</strong> {modalJob.status}
                              </p>
                              <p>
                                <strong>Address:</strong>{" "}
                                {modalJob.address || "N/A"}
                              </p>
                              <p>
                                <strong>Contact:</strong>{" "}
                                {modalJob.contact || "N/A"}
                              </p>
                              <p>
                                <strong>Duties:</strong>{" "}
                                {modalJob.duties || "N/A"}
                              </p>
                              <p>
                                <strong>Requirements:</strong>{" "}
                                {modalJob.requirements || "N/A"}
                              </p>
                              <p>
                                <strong>Notes:</strong>{" "}
                                {modalJob.notes || "N/A"}
                              </p>
                              <button
                                onClick={handleCloseModal}
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
                        )}

                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditClick(job)}
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
                          onClick={() => handleDeleteJob(job.id)}
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
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
