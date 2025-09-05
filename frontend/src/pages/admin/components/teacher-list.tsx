import { useState } from "react";
import { UserCheck, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockTeachers } from "@/data/mockTeachers";
import { BADGE_VARIANT } from "@/constants/constants";
import type { Teacher } from "@/types/types";

export function TeacherList() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = mockTeachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="w-5 h-5" />
          Teacher List
        </CardTitle>
        <CardDescription>Manage and view all registered teachers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teachers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="space-y-3">
          {filteredTeachers.map((teacher: Teacher) => (
            <div key={teacher.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <p className="font-medium">{teacher.name}</p>
                <p className="text-sm text-muted-foreground">{teacher.email}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {teacher.classes.map((className) => (
                  <Badge
                    key={className}
                    variant={BADGE_VARIANT}
                    className="bg-primary text-primary-foreground border-primary"
                  >
                    {className}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
