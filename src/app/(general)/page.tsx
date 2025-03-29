import FeaturesSection from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorks";
import InstallPrompt from "@/components/InstallPrompt";
import SupportSection from "@/components/Support";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const user = await getUser({});
    if (user) {
        redirect("/dashboard");
    }
    return (
        <>
            <HeroSection />
            <HowItWorksSection />
            <FeaturesSection />
            <SupportSection />
        </>
    );
}
