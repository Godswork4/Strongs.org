import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import smcflyer from "../../assets/smc.png";

const fellowshipOptions = [
  "CAC Youth Fellowship",
  "Redeemed Christian Fellowsip",
  "CACSOR",
  "CACSA",
  "BLHCF",
  "Other (please specify)",
];

const departmentOptions = [
  "Computer Science",
  "Information Technology",
  "Software Engineering",
  "Electrical Engineering",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Petroleum Engineering",
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Environmental Engineering",
  "Agricultural Engineering",
  "Industrial Engineering",
  "Materials Science and Engineering",
  "Metallurgical Engineering",
  "Mechatronics Engineering",
  "Robotics Engineering",
  "Systems Engineering",
  "Structural Engineering",
  "Geomatics Engineering",
  "Mining Engineering",
  "Nuclear Engineering",
  "Marine Engineering",
  "Automotive Engineering",
  "Telecommunications Engineering",
  "Computer Engineering",
  "Applied Physics",
  "Physics",
  "Applied Mathematics",
  "Mathematics",
  "Statistics",
  "Data Science",
  "Artificial Intelligence",
  "Cybersecurity",
  "Information Systems",
  "Bioinformatics",
  "Biotechnology",
  "Microbiology",
  "Biochemistry",
  "Chemistry",
  "Industrial Chemistry",
  "Analytical Chemistry",
  "Organic Chemistry",
  "Inorganic Chemistry",
  "Physical Chemistry",
  "Geology",
  "Geophysics",
  "Geography",
  "Environmental Science",
  "Environmental Management",
  "Meteorology",
  "Oceanography",
  "Marine Science",
  "Zoology",
  "Botany",
  "Genetics",
  "Molecular Biology",
  "Anatomy",
  "Physiology",
  "Pharmacology",
  "Medical Laboratory Science",
  "Nursing Science",
  "Public Health",
  "Radiography",
  "Dentistry",
  "Medicine and Surgery",
  "Veterinary Medicine",
  "Optometry",
  "Nutrition and Dietetics",
  "Food Science and Technology",
  "Agricultural Science",
  "Crop Science",
  "Soil Science",
  "Animal Science",
  "Forestry",
  "Fisheries",
  "Horticulture",
  "Industrial Design",
  "Architecture",
  "Urban and Regional Planning",
  "Quantity Surveying",
  "Estate Management",
  "Building Technology",
  "Surveying and Geoinformatics",
  "Library and Information Science",
  "Science Laboratory Technology",
  "Physics Education",
  "Chemistry Education",
  "Biology Education",
  "Mathematics Education",
  "Computer Science Education",
  "Technical Education",
  "Industrial Technology",
  "Textile Science and Technology",
  "Polymer and Textile Engineering",
  "Petroleum and Gas Engineering",
  "Renewable Energy Engineering",
  "Aerospace Science",
  "Nanotechnology",
  "Other",
];

const levelOptions = ["100", "200", "300", "400", "500", "Graduate", "Other"];

const callingOptions = [
  "Pastoral",
  "Teaching",
  "Evangelism",
  "Prophetic",
  "Apostolic",
  "Helps",
  "None/Not Sure",
];

const counsellingOptions = [
  "No",
  "Yes - Academic",
  "Yes - Spiritual",
  "Yes - Emotional",
  "Yes - Family",
  "Yes - Other",
];

const SmcRegistrationPage = () => {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    fellowship: "",
    department: "",
    level: "",
    calling: "",
    counselling: "",
    otherFellowship: "",
    otherDepartment: "",
    otherLevel: "",
    otherCounselling: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // show SMC image; don't use placeholder animation
  const [imageError, setImageError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const insertWithSupabaseClient = async (payload: any) => {
    const { data, error } = await supabase.from('registrations').insert(payload);
    if (error) throw error;
    return data;
  };

  const postToServerEndpoint = async (payload: any) => {
    const resp = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const body = await resp.json().catch(() => ({}));
      const message = body?.error || `Server returned ${resp.status}`;
      const error: any = new Error(message);
      error.status = resp.status;
      throw error;
    }
    return resp.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name: form.name,
      whatsapp: form.whatsapp,
      email: form.email,
      fellowship: form.fellowship,
      department: form.department,
      level: form.level,
      calling: form.calling,
      counselling: form.counselling,
      other_fellowship: form.otherFellowship || null,
      other_department: form.otherDepartment || null,
      other_level: form.otherLevel || null,
      other_counselling: form.otherCounselling || null,
    };

    try {
      // Try server endpoint first (more secure if configured)
      await postToServerEndpoint(payload);
      setSuccess(true);
      setForm({
        name: "",
        whatsapp: "",
        email: "",
        fellowship: "",
        department: "",
        level: "",
        calling: "",
        counselling: "",
        otherFellowship: "",
        otherDepartment: "",
        otherLevel: "",
        otherCounselling: "",
      });
      setLoading(false);
      return;
    } catch (err: any) {
      // If server endpoint not found (404) or fails, fallback to client supabase insert
      if (err?.status === 404 || err?.message?.includes('Failed to fetch')) {
        try {
          await insertWithSupabaseClient(payload);
          setSuccess(true);
          setForm({
            name: "",
            whatsapp: "",
            email: "",
            fellowship: "",
            department: "",
            level: "",
            calling: "",
            counselling: "",
            otherFellowship: "",
            otherDepartment: "",
            otherLevel: "",
            otherCounselling: "",
          });
          setLoading(false);
          return;
        } catch (clientErr: any) {
          console.error('Client supabase insert error', clientErr);
          setError(clientErr.message || 'Failed to submit registration');
          setLoading(false);
          return;
        }
      }

      console.error('Server endpoint error', err);
      setError(err?.message || 'Failed to submit registration');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
        {/* SMC Logo / Flyer */}
        <div className="flex justify-center mb-6">
          {!imageError ? (
            <img
              src={smcflyer}
              alt="SMC Flyer"
              className="h-28 w-auto object-contain rounded-md shadow-md"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-28 w-full rounded-md bg-slate-100 dark:bg-slate-800">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">SMC</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Student Mission Conference</div>
              </div>
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          SMC Registration
        </h1>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded">
            Thanks — your registration was received. We will contact you shortly.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6"
        >
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              WhatsApp Number
            </label>
            <input
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="e.g. +234 801 234 5678"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Fellowship
            </label>
            <select
              name="fellowship"
              value={form.fellowship}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="">Select Fellowship</option>
              {fellowshipOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {form.fellowship === "Other (please specify)" && (
              <input
                type="text"
                name="otherFellowship"
                value={form.otherFellowship}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Please specify"
              />
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Department
            </label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {form.department === "Other" && (
              <input
                type="text"
                name="otherDepartment"
                value={form.otherDepartment}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Please specify"
              />
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Level
            </label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="">Select Level</option>
              {levelOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {form.level === "Other" && (
              <input
                type="text"
                name="otherLevel"
                value={form.otherLevel}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Please specify"
              />
            )}
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Calling
            </label>
            <select
              name="calling"
              value={form.calling}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="">Select Calling</option>
              {callingOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Need Counselling?
            </label>
            <select
              name="counselling"
              value={form.counselling}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="">Select Option</option>
              {counsellingOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {form.counselling === "Yes - Other" && (
              <input
                type="text"
                name="otherCounselling"
                value={form.otherCounselling}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Please specify"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'opacity-60 cursor-not-allowed' : ''} bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-md transition-colors`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SmcRegistrationPage;
