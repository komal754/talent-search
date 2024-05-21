import { useState } from "react";

const SendEmail = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSendEmail = () => {
    // Implement your logic to send the email
    // For simplicity, we'll log the email details for now
    console.log("Subject:", subject);
    console.log("Body:", body);
    // Add logic to send the email to the user
    // For example, you might use an API call or other method to send the email
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Email Composer
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Subject:
        </label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Enter subject"
          value={subject}
          onChange={handleSubjectChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Email Body:
        </label>
        <textarea
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          rows="8"
          placeholder="Enter email body"
          value={body}
          onChange={handleBodyChange}
        ></textarea>
      </div>
      <div className="text-center">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSendEmail}
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default SendEmail;
