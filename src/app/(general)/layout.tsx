import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function GeneralLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid grid-rows-[auto,1fr,auto] grid-cols-1">
            <div>
                <Navbar />
            </div>
            <main className="mt-20">{children}</main>
            <div>
                <Footer />
            </div>
        </div>
    );
}
