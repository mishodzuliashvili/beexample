export default function UserTableSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="p-4 border-b">
                <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left">
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-left">
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-right">
                                <div className="h-4 bg-gray-200 rounded w-16 ml-auto"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                                        <div className="ml-4">
                                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                                            <div className="h-3 bg-gray-200 rounded w-48 mt-2"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-4 py-3 border-t">
                <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                    <div className="h-8 bg-gray-200 rounded w-64"></div>
                </div>
            </div>
        </div>
    );
}
