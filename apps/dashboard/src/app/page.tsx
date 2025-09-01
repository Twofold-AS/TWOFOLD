import { Button, Card, CardHeader, CardContent } from "@twofold/ui";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Welcome to Twofold Console</h2>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Manage your projects and deployments.</p>
          <Button variant="primary">Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
