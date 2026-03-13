"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Lead = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  eventType: "חתונה" | "בר/בת מצווה" | "אירוע עסקי" | "יום הולדת" | "אירוסין";
  interestedProviders: string[];
  status: "חדש" | "בטיפול" | "סגור";
  date: string;
};

const mockLeads: Lead[] = [
  {
    id: 1,
    fullName: "נועה כהן",
    phone: "052-3847291",
    email: "noa.cohen@gmail.com",
    eventType: "חתונה",
    interestedProviders: ["צלם/ת", "דיג'יי", "קייטרינג"],
    status: "חדש",
    date: "12/03/2026",
  },
  {
    id: 2,
    fullName: "יוסי לוי",
    phone: "054-9182736",
    email: "yossi.levi@yahoo.com",
    eventType: "בר/בת מצווה",
    interestedProviders: ["אולם אירועים", "תזמורת/להקה", "וידאוגרף"],
    status: "בטיפול",
    date: "11/03/2026",
  },
  {
    id: 3,
    fullName: "מיכל אברהם",
    phone: "050-6473829",
    email: "michal.avraham@walla.co.il",
    eventType: "אירוע עסקי",
    interestedProviders: ["קייטרינג", "צלם/ת"],
    status: "סגור",
    date: "10/03/2026",
  },
  {
    id: 4,
    fullName: "אמיר שפירו",
    phone: "058-2938471",
    email: "amir.shapiro@gmail.com",
    eventType: "יום הולדת",
    interestedProviders: ["דיג'יי", "עיצוב פרחוני", "מאפרת"],
    status: "חדש",
    date: "10/03/2026",
  },
  {
    id: 5,
    fullName: "שירה גולדברג",
    phone: "053-7461829",
    email: "shira.goldberg@hotmail.com",
    eventType: "חתונה",
    interestedProviders: ["אולם אירועים", "עיצוב פרחוני", "וידאוגרף", "מאפרת"],
    status: "בטיפול",
    date: "09/03/2026",
  },
  {
    id: 6,
    fullName: "דניאל פרץ",
    phone: "055-8293647",
    email: "daniel.perets@gmail.com",
    eventType: "אירוסין",
    interestedProviders: ["צלם/ת", "עיצוב פרחוני"],
    status: "חדש",
    date: "08/03/2026",
  },
  {
    id: 7,
    fullName: "רונית שלום",
    phone: "052-1647382",
    email: "ronit.shalom@walla.co.il",
    eventType: "בר/בת מצווה",
    interestedProviders: ["קייטרינג", "דיג'יי", "צלם/ת"],
    status: "סגור",
    date: "07/03/2026",
  },
  {
    id: 8,
    fullName: "ערן ביטון",
    phone: "054-3726481",
    email: "eran.biton@gmail.com",
    eventType: "אירוע עסקי",
    interestedProviders: ["אולם אירועים", "קייטרינג"],
    status: "בטיפול",
    date: "06/03/2026",
  },
  {
    id: 9,
    fullName: "תמר כץ",
    phone: "050-9384726",
    email: "tamar.katz@yahoo.com",
    eventType: "חתונה",
    interestedProviders: ["תזמורת/להקה", "וידאוגרף", "מאפרת", "עיצוב פרחוני"],
    status: "חדש",
    date: "05/03/2026",
  },
  {
    id: 10,
    fullName: "אור מזרחי",
    phone: "058-6172938",
    email: "or.mizrachi@gmail.com",
    eventType: "יום הולדת",
    interestedProviders: ["דיג'יי", "קייטרינג"],
    status: "בטיפול",
    date: "04/03/2026",
  },
  {
    id: 11,
    fullName: "ליאת חדד",
    phone: "053-4829163",
    email: "liat.hadad@walla.co.il",
    eventType: "אירוסין",
    interestedProviders: ["צלם/ת", "עיצוב פרחוני", "וידאוגרף"],
    status: "סגור",
    date: "03/03/2026",
  },
  {
    id: 12,
    fullName: "גל רוזנברג",
    phone: "052-7381649",
    email: "gal.rosenberg@gmail.com",
    eventType: "בר/בת מצווה",
    interestedProviders: ["אולם אירועים", "תזמורת/להקה", "קייטרינג", "צלם/ת"],
    status: "חדש",
    date: "02/03/2026",
  },
];

const EVENT_TYPES = ["חתונה", "בר/בת מצווה", "אירוע עסקי", "יום הולדת", "אירוסין"];
const PROVIDER_TYPES = ["צלם/ת", "דיג'יי", "קייטרינג", "אולם אירועים", "מאפרת", "עיצוב פרחוני", "תזמורת/להקה", "וידאוגרף"];

const providerColors: Record<string, string> = {
  "צלם/ת": "bg-blue-100 text-blue-700",
  "דיג'יי": "bg-purple-100 text-purple-700",
  "קייטרינג": "bg-orange-100 text-orange-700",
  "אולם אירועים": "bg-rose-100 text-rose-700",
  "מאפרת": "bg-pink-100 text-pink-700",
  "עיצוב פרחוני": "bg-green-100 text-green-700",
  "תזמורת/להקה": "bg-indigo-100 text-indigo-700",
  "וידאוגרף": "bg-teal-100 text-teal-700",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  חדש: { label: "חדש", className: "bg-blue-100 text-blue-700 border-blue-200" },
  בטיפול: { label: "בטיפול", className: "bg-amber-100 text-amber-700 border-amber-200" },
  סגור: { label: "סגור", className: "bg-green-100 text-green-700 border-green-200" },
};

export default function LeadsTable({ title }: { title: string }) {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return mockLeads.filter((lead) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        lead.fullName.includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q);
      const matchEvent = eventFilter === "all" || lead.eventType === eventFilter;
      const matchProvider =
        providerFilter === "all" || lead.interestedProviders.includes(providerFilter);
      const matchStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchSearch && matchEvent && matchProvider && matchStatus;
    });
  }, [search, eventFilter, providerFilter, statusFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-xl">{title}</CardTitle>
            </div>
            <span className="text-sm text-muted-foreground">
              {filtered.length} לידים
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="חיפוש לפי שם, אימייל או טלפון..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-9"
              />
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
            </div>

            <Select value={eventFilter} onValueChange={setEventFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="סוג אירוע" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל האירועים</SelectItem>
                {EVENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="סוג ספק" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הספקים</SelectItem>
                {PROVIDER_TYPES.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="סטטוס" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">כל הסטטוסים</SelectItem>
                <SelectItem value="חדש">חדש</SelectItem>
                <SelectItem value="בטיפול">בטיפול</SelectItem>
                <SelectItem value="סגור">סגור</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right font-semibold">שם מלא</TableHead>
                  <TableHead className="text-right font-semibold">מס&apos; טלפון</TableHead>
                  <TableHead className="text-right font-semibold">אימייל</TableHead>
                  <TableHead className="text-right font-semibold">סוג אירוע</TableHead>
                  <TableHead className="text-right font-semibold">ספקים מבוקשים</TableHead>
                  <TableHead className="text-right font-semibold">סטטוס</TableHead>
                  <TableHead className="text-right font-semibold">תאריך</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence mode="popLayout">
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        לא נמצאו לידים התואמים את החיפוש
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((lead, i) => (
                      <motion.tr
                        key={lead.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                      >
                        <TableCell className="font-medium">{lead.fullName}</TableCell>
                        <TableCell className="text-muted-foreground font-mono text-sm" dir="ltr">
                          {lead.phone}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm" dir="ltr">
                          {lead.email}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {lead.eventType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {lead.interestedProviders.map((p) => (
                              <span
                                key={p}
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${providerColors[p]}`}
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig[lead.status].className}`}
                          >
                            {statusConfig[lead.status].label}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {lead.date}
                        </TableCell>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
