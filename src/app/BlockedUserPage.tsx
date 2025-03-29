import SignOutButton from "@/components/SignOutButton";
import { UserX, AlertCircle } from "lucide-react";

export default function BlockedUserPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[50%] top-0 h-[48rem] w-[48rem] -translate-x-1/2 bg-gradient-to-b from-red-50 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 bg-red-50 border-b border-red-100 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
                        <UserX className="h-12 w-12 text-red-500" />
                    </div>
                </div>

                <div className="p-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Account Blocked
                    </h1>

                    <div className="flex items-center justify-center mb-6">
                        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-red-100 text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            Access Restricted
                        </div>
                    </div>

                    <p className="text-lg text-gray-600 mb-6">
                        Your account has been blocked due to a violation of our
                        community guidelines or terms of service.
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">
                            What this means:
                        </h2>
                        <ul className="text-left text-gray-600 space-y-2">
                            <li className="flex items-start">
                                <span className="inline-flex mr-2 mt-1">•</span>
                                You cannot access any content or features on the
                                platform
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex mr-2 mt-1">•</span>
                                Your posts and interactions are no longer
                                visible to others
                            </li>
                            <li className="flex items-start">
                                <span className="inline-flex mr-2 mt-1">•</span>
                                You cannot create new content or interact with
                                others
                            </li>
                        </ul>
                    </div>

                    <p className="text-gray-600 mb-8">
                        If you believe this is a mistake, please contact our
                        support team at{" "}
                        <a
                            href="mailto:support@beexample.com"
                            className="text-blue-600 hover:underline"
                        >
                            support@beexample.com
                        </a>
                    </p>

                    <SignOutButton className="w-full rounded-xl bg-red-600 px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-red-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                        Sign Out
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
