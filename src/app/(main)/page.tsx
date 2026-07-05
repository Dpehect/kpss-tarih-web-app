import { LandingPage } from "@/features/landing/components/LandingPage";

/**
 * Ana landing page.
 * Server component olarak kalır; WebGL ve GSAP gibi browser API kullanan parçalar içeride client island şeklinde yüklenir.
 */
export default function HomePage() {
  return <LandingPage />;
}
