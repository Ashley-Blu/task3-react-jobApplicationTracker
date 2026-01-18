import type { User, Job } from "../types/index";

// USERS
export function saveUser(user: User): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

export function getUsers(): User[] {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

export function getUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((u: User) => u.email === email);
}

export function setActiveUser(user: User): void {
  localStorage.setItem("activeUser", JSON.stringify(user));
}

export function getActiveUser(): User | null {
  const data = localStorage.getItem("activeUser");
  return data ? JSON.parse(data) : null;
}

export function logoutUser(): void {
  localStorage.removeItem("activeUser");
}

// JOBS
export function saveJob(job: Job): void {
  const jobs = getJobs();
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));
}

export function getJobs(): Job[] {
  const data = localStorage.getItem("jobs");
  return data ? JSON.parse(data) : [];
}

export function getJobById(id: number): Job | undefined {
  const jobs = getJobs();
  return jobs.find((j: Job) => j.id === id);
}
