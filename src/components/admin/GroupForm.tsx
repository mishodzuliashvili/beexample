"use client";

import React, { useState } from "react";
import { createGroup } from "@/actions/group";
import { Users, Image as ImageIcon } from "lucide-react";

export default function GroupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await createGroup(formData);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess("Group created successfully!");
        // Reset form
        const form = document.getElementById("group-form") as HTMLFormElement;
        form.reset();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="group-form" action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 rounded-lg p-4">
          {success}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Group Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter group name"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
          Group Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="enter-slug-with-hyphens"
        />
        <p className="text-sm text-gray-500 mt-1">
          Used in URLs. Use lowercase letters, numbers, and hyphens only.
        </p>
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
          Group Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`inline-flex items-center justify-center py-2 px-6 rounded-xl font-medium ${
            isSubmitting
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200"
          }`}
        >
          <Users className="h-5 w-5 mr-2" />
          {isSubmitting ? "Creating..." : "Create Group"}
        </button>
      </div>
    </form>
  );
}