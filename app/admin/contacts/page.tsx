import React from "react";
import { getContacts } from "@/actions/contact";
import { ContactsTable } from "@/components/admin/contacts-table";

export default async function ContactsPage() {
  const contacts = await getContacts();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Contact Submissions</h1>
        <p className="text-[var(--text-muted)] mt-1">{contacts.length} total submissions</p>
      </div>
      <ContactsTable contacts={contacts} />
    </div>
  );
}
