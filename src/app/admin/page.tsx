
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plane, ActivitySquare, TicketPercent, BarChart3, Users, Image as ImageIcon } from "lucide-react";

export default function AdminDashboardPage() {
  const managementSections = [
    {
      title: "Manage Flights",
      description: "Add, edit, or remove flight listings.",
      link: "/admin/flights", 
      icon: <Plane className="h-6 w-6 text-primary" />,
    },
    {
      title: "Manage Activities",
      description: "Update activity details, prices, and availability.",
      link: "/admin/activities",
      icon: <ActivitySquare className="h-6 w-6 text-primary" />,
    },
    {
      title: "Manage Promotions",
      description: "Create and manage promotional offers.",
      link: "/admin/promotions",
      icon: <TicketPercent className="h-6 w-6 text-primary" />,
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts.",
      link: "/admin/users",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
     {
      title: "Manage Site Content",
      description: "Update site banners and images.",
      link: "/admin/content",
      icon: <ImageIcon className="h-6 w-6 text-primary" />,
    },
    // Future sections
    // {
    //   title: "View Site Analytics",
    //   description: "Track bookings, user engagement, and site traffic.",
    //   link: "/admin/analytics",
    //   icon: <BarChart3 className="h-6 w-6 text-primary" />,
    // },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card shadow-md rounded-lg">
        <h1 className="text-4xl font-bold font-headline text-primary">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to the Kosheli Travel Admin Panel. Manage your site content and settings here.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map((section) => (
          <Card key={section.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-headline">{section.title}</CardTitle>
              {section.icon}
            </CardHeader>
            <CardContent>
              <CardDescription>{section.description}</CardDescription>
            </CardContent>
            <CardContent className="pt-0">
               <Button asChild variant="outline" className="w-full mt-2">
                <Link href={section.link}>Go to {section.title.split(' ')[1]}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
