import React, { useState } from "react";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle form submission (API call or email)
    alert("Registration submitted! Thank you.");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          SMC Registration
        </h1>
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
            className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-md transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SmcRegistrationPage;
