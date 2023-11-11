import UserInfo from "@/components/UserInfo";

export async function generateMetadata({ params }) {
  return {
    title: "Dashboard",
  };
}

export default function Dashboard() {
  return <UserInfo />;
}
