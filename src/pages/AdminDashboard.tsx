import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import AdminSectionEditor from "@/components/admin/AdminSectionEditor";
import AdminSectionManager from "@/components/admin/AdminSectionManager";
import AdminImageManager from "@/components/admin/AdminImageManager";

const sectionConfigs = [
  {
    sectionKey: "hero",
    title: "Hero Section",
    fields: [
      { key: "title", label: "Title (use \\n for line breaks)", type: "textarea" as const },
      { key: "subtitle", label: "Subtitle", type: "textarea" as const },
      { key: "cta_primary_text", label: "Primary Button Text", type: "text" as const },
      { key: "cta_primary_link", label: "Primary Button Link", type: "text" as const },
      { key: "cta_secondary_text", label: "Secondary Button Text", type: "text" as const },
      { key: "cta_secondary_link", label: "Secondary Button Link", type: "text" as const },
    ],
  },
  {
    sectionKey: "about",
    title: "About Section",
    fields: [
      { key: "title", label: "Title", type: "text" as const },
      { key: "subtitle", label: "Subtitle", type: "text" as const },
      { key: "paragraph_1", label: "Paragraph 1", type: "textarea" as const },
      { key: "paragraph_2", label: "Paragraph 2", type: "textarea" as const },
    ],
  },
  {
    sectionKey: "promo",
    title: "Promo Video Section",
    fields: [
      { key: "title", label: "Title", type: "text" as const },
      { key: "subline", label: "Subline", type: "textarea" as const },
      { key: "video_url", label: "Video URL (YouTube embed URL)", type: "text" as const },
      { key: "thumbnail_url", label: "Thumbnail Image URL (optional)", type: "text" as const },
    ],
  },
  {
    sectionKey: "principles",
    title: "Principles Section",
    fields: [
      { key: "key_message", label: "Key Message (highlighted box)", type: "textarea" as const },
      { key: "benefits_header", label: "Benefits Header", type: "textarea" as const },
      { key: "benefit_1", label: "Benefit 1", type: "text" as const },
      { key: "benefit_2", label: "Benefit 2", type: "text" as const },
      { key: "benefit_3", label: "Benefit 3", type: "text" as const },
      { key: "benefit_4", label: "Benefit 4", type: "text" as const },
      { key: "closing_1", label: "Closing Paragraph 1", type: "textarea" as const },
      { key: "closing_2", label: "Closing Paragraph 2", type: "textarea" as const },
    ],
  },
  {
    sectionKey: "approach",
    title: "Approach Section",
    fields: [
      { key: "title", label: "Title", type: "text" as const },
      { key: "description", label: "Main Description", type: "textarea" as const },
    ],
  },
  {
    sectionKey: "how_it_works",
    title: "How It Works Section",
    fields: [
      { key: "title", label: "Title", type: "text" as const },
      { key: "step_1_title", label: "Step 1 Title", type: "text" as const },
      { key: "step_1_description", label: "Step 1 Description", type: "textarea" as const },
      { key: "step_2_title", label: "Step 2 Title", type: "text" as const },
      { key: "step_2_description", label: "Step 2 Description", type: "textarea" as const },
      { key: "step_3_title", label: "Step 3 Title", type: "text" as const },
      { key: "step_3_description", label: "Step 3 Description", type: "textarea" as const },
    ],
  },
  {
    sectionKey: "team",
    title: "Team Section",
    fields: [
      { key: "title", label: "Section Title", type: "text" as const },
      { key: "member_1_name", label: "Member 1 Name", type: "text" as const },
      { key: "member_1_role", label: "Member 1 Role", type: "text" as const },
      { key: "member_1_bio", label: "Member 1 Bio", type: "textarea" as const },
      { key: "member_1_land", label: "Member 1 Land Acknowledgment", type: "textarea" as const },
      { key: "member_1_website", label: "Member 1 Website", type: "text" as const },
      { key: "member_2_name", label: "Member 2 Name", type: "text" as const },
      { key: "member_2_role", label: "Member 2 Role", type: "text" as const },
      { key: "member_2_bio", label: "Member 2 Bio", type: "textarea" as const },
      { key: "member_2_land", label: "Member 2 Land Acknowledgment", type: "textarea" as const },
      { key: "member_2_website", label: "Member 2 Website", type: "text" as const },
      { key: "member_3_name", label: "Member 3 Name", type: "text" as const },
      { key: "member_3_role", label: "Member 3 Role", type: "text" as const },
      { key: "member_3_bio", label: "Member 3 Bio", type: "textarea" as const },
      { key: "member_3_land", label: "Member 3 Land Acknowledgment", type: "textarea" as const },
      { key: "member_3_website", label: "Member 3 Website", type: "text" as const },
    ],
  },
  {
    sectionKey: "services",
    title: "Services Section",
    fields: [
      { key: "title", label: "Section Title", type: "text" as const },
      { key: "subtitle", label: "Section Subtitle", type: "text" as const },
      { key: "service_1_title", label: "Service 1 Title", type: "text" as const },
      { key: "service_1_for_who", label: "Service 1 - Who It's For", type: "textarea" as const },
      { key: "service_1_helps_with", label: "Service 1 - What It Helps With", type: "textarea" as const },
      { key: "service_1_expect", label: "Service 1 - What to Expect", type: "textarea" as const },
      { key: "service_2_title", label: "Service 2 Title", type: "text" as const },
      { key: "service_2_for_who", label: "Service 2 - Who It's For", type: "textarea" as const },
      { key: "service_2_helps_with", label: "Service 2 - What It Helps With", type: "textarea" as const },
      { key: "service_2_expect", label: "Service 2 - What to Expect", type: "textarea" as const },
      { key: "service_3_title", label: "Service 3 Title", type: "text" as const },
      { key: "service_3_for_who", label: "Service 3 - Who It's For", type: "textarea" as const },
      { key: "service_3_helps_with", label: "Service 3 - What It Helps With", type: "textarea" as const },
      { key: "service_3_expect", label: "Service 3 - What to Expect", type: "textarea" as const },
      { key: "service_4_title", label: "Service 4 Title", type: "text" as const },
      { key: "service_4_for_who", label: "Service 4 - Who It's For", type: "textarea" as const },
      { key: "service_4_helps_with", label: "Service 4 - What It Helps With", type: "textarea" as const },
      { key: "service_4_expect", label: "Service 4 - What to Expect", type: "textarea" as const },
    ],
  },
  {
    sectionKey: "testimonials",
    title: "Testimonials Section",
    fields: [
      { key: "title", label: "Section Title", type: "text" as const },
      { key: "testimonial_1_name", label: "Testimonial 1 Name", type: "text" as const },
      { key: "testimonial_1_role", label: "Testimonial 1 Role (use \\n for line breaks)", type: "textarea" as const },
      { key: "testimonial_1_website", label: "Testimonial 1 Website", type: "text" as const },
      { key: "testimonial_1_short", label: "Testimonial 1 Short Quote", type: "textarea" as const },
      { key: "testimonial_1_expanded", label: "Testimonial 1 Expanded Quote (use \\n\\n for paragraphs)", type: "textarea" as const },
      { key: "testimonial_2_name", label: "Testimonial 2 Name", type: "text" as const },
      { key: "testimonial_2_role", label: "Testimonial 2 Role (use \\n for line breaks)", type: "textarea" as const },
      { key: "testimonial_2_website", label: "Testimonial 2 Website", type: "text" as const },
      { key: "testimonial_2_short", label: "Testimonial 2 Short Quote", type: "textarea" as const },
      { key: "testimonial_2_expanded", label: "Testimonial 2 Expanded Quote (leave empty if none)", type: "textarea" as const },
    ],
  },
  {
    sectionKey: "cta",
    title: "Call to Action Section",
    fields: [
      { key: "title", label: "Title", type: "text" as const },
      { key: "description", label: "Description", type: "textarea" as const },
      { key: "cta_primary_text", label: "Primary Button Text", type: "text" as const },
      { key: "cta_primary_link", label: "Primary Button Link", type: "text" as const },
      { key: "cta_secondary_text", label: "Secondary Button Text", type: "text" as const },
      { key: "cta_secondary_link", label: "Secondary Button Link", type: "text" as const },
    ],
  },
  {
    sectionKey: "contact",
    title: "Contact Section",
    fields: [
      { key: "title", label: "Title", type: "text" as const },
      { key: "subtitle", label: "Subtitle", type: "textarea" as const },
      { key: "form_title", label: "Form Title", type: "text" as const },
      { key: "email", label: "Contact Email", type: "text" as const },
      { key: "safe_title", label: "Safe Box Title", type: "text" as const },
      { key: "safe_description", label: "Safe Box Description", type: "textarea" as const },
    ],
  },
];

const imageSections = [
  { sectionKey: "hero", title: "Hero" },
  { sectionKey: "about", title: "About" },
  { sectionKey: "team", title: "Team" },
  { sectionKey: "testimonials", title: "Testimonials" },
];

const AdminDashboard = () => {
  const { user, isAdmin, isLoading, roleStatus, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">Your account does not have admin privileges.</p>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 bg-background z-50">
        <h1 className="text-xl font-bold text-foreground">Site Content Manager</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <p className="text-sm text-muted-foreground">
          Manage section ordering, edit content, and upload images below.
        </p>

        {/* Section ordering & visibility */}
        <AdminSectionManager />

        {/* Image managers */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Image Management</h2>
          <div className="space-y-4">
            {imageSections.map((s) => (
              <AdminImageManager key={s.sectionKey} sectionKey={s.sectionKey} title={s.title} />
            ))}
          </div>
        </div>

        {/* Content editors */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-3">Content Editors</h2>
          <div className="space-y-4">
            {sectionConfigs.map((config) => (
              <AdminSectionEditor
                key={config.sectionKey}
                sectionKey={config.sectionKey}
                title={config.title}
                fields={config.fields}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
