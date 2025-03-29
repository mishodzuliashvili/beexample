"use client";
import React, { useState, useEffect } from "react";
import { UserCircle, Upload, Save, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { getUpdateProfileRateLimitInfo, updateProfile } from "./actions";
import {
    getUploadProfileImageRateLimitInfo,
    uploadProfileImage,
} from "@/actions/uploadProfileImage";
import { RateLimitInfo } from "@/lib/rateLimiter";
import { CountdownTimer } from "@/components/CountdownTimer"; // Import the new component

export default function EditProfilePage() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        image: "",
    });
    const [newImage, setNewImage] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
        null
    );
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [imageRateLimitInfo, setImageRateLimitInfo] =
        useState<RateLimitInfo | null>(null);
    const [userUpdateRateLimitInfo, setUpdateUserRateLimitInfo] =
        useState<RateLimitInfo | null>(null);

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name,
                image: user.image,
            });
            getUpdateProfileRateLimitInfo().then((info) => {
                setUpdateUserRateLimitInfo(info.limitInfo || null);
                if (info.limitInfo?.resetInMs) {
                    setTimeout(() => {
                        setUpdateUserRateLimitInfo(null);
                    }, info.limitInfo.resetInMs);
                }
            });
            getUploadProfileImageRateLimitInfo().then((info) => {
                setImageRateLimitInfo(info.limitInfo || null);
                if (info.limitInfo?.resetInMs) {
                    setTimeout(() => {
                        setImageRateLimitInfo(null);
                    }, info.limitInfo.resetInMs);
                }
            });
        }
    }, [user]);

    // Derived variables from rate limit info
    const isImageUploadLimited = imageRateLimitInfo?.isLimited || false;
    const isProfileUpdateLimited = userUpdateRateLimitInfo?.isLimited || false;
    const remainingImageUploads = imageRateLimitInfo?.remaining || 0;

    // Only block the form submission if profile update is limited
    const isFormSubmitDisabled =
        isLoading || isProfileUpdateLimited || isUploading;

    const handleImageChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("Image must be less than 5MB");
                return;
            }

            setNewImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            setError("");

            // Upload the image immediately after selection
            try {
                await uploadImageFile(file);
            } catch (error) {
                console.error("Failed to upload image:", error);
                // Error will be set by the uploadImageFile function
            }
        }
    };

    // Function to upload image to a storage service
    const uploadImageFile = async (file: File): Promise<void> => {
        if (isImageUploadLimited) {
            setError(
                "Image upload rate limit reached. You can still update your name."
            );
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await uploadProfileImage(formData, {
                folderName: "profile-images",
            });

            setImageRateLimitInfo(res.limitInfo || null);

            if (res.limitInfo?.resetInMs) {
                setTimeout(() => {
                    setImageRateLimitInfo(null);
                }, res.limitInfo.resetInMs);
            }
            if (res.status === 429) {
                throw new Error(
                    "You've reached the upload limit. You can still update your name."
                );
            }

            if (!res.success) {
                throw new Error(res.error || "Failed to upload image");
            }

            // Store the uploaded image URL
            setUploadedImageUrl(res.imageUrl || null);
        } catch (error) {
            console.error("Error uploading image:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to upload image"
            );
            // Clear preview since upload failed
            setPreviewUrl(null);
            setNewImage(null);
        } finally {
            setIsUploading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) {
            setError("You must be logged in to update your profile");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            // Prepare the data for update
            const updateData: { name?: string; image?: string } = {};

            // Only include name if it has changed
            if (userData.name !== user.name) {
                updateData.name = userData.name;
            }

            // TODO: still updateds name somehow dunno why man

            // Only include the image URL if it was successfully uploaded
            if (uploadedImageUrl) {
                updateData.image = uploadedImageUrl;
            }

            // Only proceed with the update if there are changes
            if (Object.keys(updateData).length > 0) {
                const result = await updateProfile(updateData);

                setUpdateUserRateLimitInfo(result.limitInfo || null);
                if (result.limitInfo?.resetInMs) {
                    setTimeout(() => {
                        setUpdateUserRateLimitInfo(null);
                    }, result.limitInfo.resetInMs);
                }

                if (result.success) {
                    setSuccess("Profile updated successfully!");
                    router.refresh();
                    // router not refreshed correctly actually i also can update from the provider TODO let me thinkg
                    // Clear the uploaded image state after successful update
                    setUploadedImageUrl(null);
                    setNewImage(null);
                } else {
                    setUpdateUserRateLimitInfo(result.limitInfo || null);
                    setError(result.error || "Failed to update profile");
                }
            } else {
                setSuccess("No changes to save");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handler for when countdown completes
    const handleImageLimitCountdownComplete = () => {
        setImageRateLimitInfo(null);
    };

    const handleProfileUpdateLimitCountdownComplete = () => {
        setUpdateUserRateLimitInfo(null);
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="relative mx-auto max-w-3xl pt-20 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-[24rem] w-[24rem] -translate-x-1/2 bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="text-left mb-12">
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-600 mb-6">
                    <UserCircle className="h-4 w-4" />
                    Edit Your Profile
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
                    Customize your{" "}
                    <span className="text-blue-600">BeExample</span> profile
                </h1>

                <p className="text-lg leading-7 text-gray-600">
                    {`Update your profile information so your circle knows who's
                    sending those BeExamples.`}
                </p>
            </div>

            {/* Rate limit notifications */}
            {isImageUploadLimited && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 text-amber-700 font-medium flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>
                        Image upload rate limit reached. Please try again in{" "}
                        {imageRateLimitInfo?.resetInMs ? (
                            <CountdownTimer
                                initialTimeMs={imageRateLimitInfo.resetInMs}
                                onComplete={handleImageLimitCountdownComplete}
                                className="font-bold"
                            />
                        ) : (
                            "a moment"
                        )}
                        . You can still update your name.
                    </span>
                </div>
            )}

            {isProfileUpdateLimited && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 text-amber-700 font-medium flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>
                        Profile update rate limit reached. Please try again in{" "}
                        {userUpdateRateLimitInfo?.resetInMs ? (
                            <CountdownTimer
                                initialTimeMs={
                                    userUpdateRateLimitInfo.resetInMs
                                }
                                onComplete={
                                    handleProfileUpdateLimitCountdownComplete
                                }
                                className="font-bold"
                            />
                        ) : (
                            "a moment"
                        )}
                        .
                    </span>
                </div>
            )}

            {!isImageUploadLimited &&
                remainingImageUploads < 3 &&
                remainingImageUploads > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-blue-50 text-blue-600 font-medium">
                        You have {remainingImageUploads} image upload
                        {remainingImageUploads !== 1 ? "s" : ""} remaining for
                        this minute.
                    </div>
                )}

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 font-medium flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-600 font-medium">
                    {success}
                </div>
            )}

            {uploadedImageUrl && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-600 font-medium flex items-center gap-2">
                    <span>
                        Image uploaded successfully! Click Save Changes to
                        update your profile.
                    </span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Image */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-8">
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-2 border-blue-100">
                            {previewUrl ? (
                                <img
                                    src={previewUrl}
                                    alt="Profile preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : user.image ? (
                                <img
                                    src={user.image}
                                    alt={`${user.name}'s profile`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="h-full w-full flex items-center justify-center bg-gray-100">
                                    <UserCircle className="h-16 w-16 text-gray-400" />
                                </div>
                            )}

                            {isUploading && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                </div>
                            )}
                        </div>
                        <label
                            htmlFor="image-upload"
                            className={`absolute bottom-0 right-0 p-2 rounded-full ${
                                isImageUploadLimited ||
                                isUploading ||
                                isProfileUpdateLimited
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 cursor-pointer hover:bg-blue-500"
                            } text-white shadow-md transition-all duration-200`}
                        >
                            <Upload className="h-4 w-4" />
                            <span className="sr-only">Upload new image</span>
                        </label>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            disabled={
                                isImageUploadLimited ||
                                isUploading ||
                                isProfileUpdateLimited
                            }
                        />
                    </div>

                    <div className="flex-1">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={userData.name}
                                onChange={(e) =>
                                    setUserData({
                                        ...userData,
                                        name: e.target.value,
                                    })
                                }
                                className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <div className="block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-500">
                                {user.email}
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Email cannot be changed
                            </p>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-xl bg-white px-5 py-2.5 text-base font-semibold text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isFormSubmitDisabled}
                        className="rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-500 transition-all duration-200 hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-blue-600"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Saving...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Save className="h-4 w-4" />
                                Save Changes
                            </span>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
