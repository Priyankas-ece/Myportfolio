import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, TrendingUp, Users, MessageSquare } from "lucide-react";

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  projectType: string | null;
  message: string;
  createdAt: string;
}

interface PageViewStat {
  page: string;
  count: number;
}

export default function Admin() {
  const { data: submissions, isLoading: submissionsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ['/api/contact'],
    queryFn: async () => {
      const response = await fetch('/api/contact');
      if (!response.ok) throw new Error('Failed to fetch submissions');
      return response.json();
    }
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery<PageViewStat[]>({
    queryKey: ['/api/analytics/stats'],
    queryFn: async () => {
      const response = await fetch('/api/analytics/stats');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    }
  });

  const totalViews = analytics?.reduce((sum, stat) => sum + stat.count, 0) || 0;

  const getProjectTypeColor = (type: string | null) => {
    switch (type) {
      case 'digital-design': return 'bg-blue-100 text-blue-800';
      case 'iot-project': return 'bg-green-100 text-green-800';
      case 'software-development': return 'bg-purple-100 text-purple-800';
      case 'research-collaboration': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatProjectType = (type: string | null) => {
    switch (type) {
      case 'digital-design': return 'Digital Design & Verification';
      case 'iot-project': return 'IoT Development';
      case 'software-development': return 'Software Development';
      case 'research-collaboration': return 'Research Collaboration';
      default: return 'General Inquiry';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Admin Dashboard</h1>
          <p className="text-gray-600">Monitor contact submissions and website analytics</p>
        </div>

        {/* Analytics Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews}</div>
              <p className="text-xs text-muted-foreground">Across all pages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submissions?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Total inquiries received</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Popular Page</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics?.sort((a, b) => b.count - a.count)[0]?.page || 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics?.sort((a, b) => b.count - a.count)[0]?.count || 0} views
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Page Analytics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Page View Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {analyticsLoading ? (
              <p>Loading analytics...</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {analytics?.map((stat) => (
                  <div key={stat.page} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium capitalize">{stat.page.replace('/', '') || 'Home'}</span>
                    <Badge variant="secondary">{stat.count} views</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Submissions */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Form Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {submissionsLoading ? (
              <p>Loading submissions...</p>
            ) : submissions?.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No contact submissions yet.</p>
            ) : (
              <div className="space-y-4">
                {submissions?.map((submission) => (
                  <div key={submission.id} className="border rounded-lg p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {submission.firstName} {submission.lastName}
                        </h3>
                        <div className="flex items-center text-gray-600 mt-1">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{submission.email}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getProjectTypeColor(submission.projectType)}>
                          {formatProjectType(submission.projectType)}
                        </Badge>
                        <div className="flex items-center text-gray-500 text-sm mt-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(submission.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{submission.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}