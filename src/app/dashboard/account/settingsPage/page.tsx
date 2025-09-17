"use client";
import React, { useState } from "react";
import {
  User,
  Lock,
  Settings,
  Bell,
  Key,
  Users,
  CreditCard,
  Shield,
  Trash,
  Building2,
} from "lucide-react";

type Role = "developer" | "company" | "hr" | "teamlead" | "worker";


const roleTabs: Record<
  Role,
  { id: string; label: string; icon: React.ElementType }[]
> = {
  developer: [
    { id: "general", label: "General", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "api", label: "API & Integrations", icon: Key },
    { id: "danger", label: "Danger Zone", icon: Trash },
  ],
  company: [
    { id: "general", label: "Company Info", icon: Building2 },
    { id: "team", label: "Manage Teams", icon: Users },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
    { id: "danger", label: "Danger Zone", icon: Trash },
  ],
  hr: [
    { id: "general", label: "Profile", icon: User },
    { id: "team", label: "Employee Management", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ],
  teamlead: [
    { id: "general", label: "Profile", icon: User },
    { id: "team", label: "Team Settings", icon: Users },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "security", label: "Security", icon: Lock },
  ],
  worker: [
    { id: "general", label: "Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ],
};

export default function AccountSettings({ role }: { role: Role }) {
  const tabs = roleTabs[role] || [];
  const [activeTab, setActiveTab] = useState(tabs.length > 0 ? tabs[0].id : "");


  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        <div className="p-6 border-b dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {role ? role.charAt(0).toUpperCase() + role.slice(1) + " Settings" : "Account Settings"}
          </h1>
        </div>
        <nav className="p-4 space-y-2">
          {roleTabs[role]?.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${activeTab === id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </button>
          )) || (
              <p className="text-gray-500 dark:text-gray-400">
                No settings available for this role.
              </p>
            )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* General / Profile */}
        {activeTab === "general" && (
          <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 max-w-3xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {role === "company" ? "Company Information" : "Profile Information"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={role === "company" ? "Company Name" : "Full Name"}
                className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="text"
                placeholder={
                  role === "company" ? "Company Address" : "Username"
                }
                className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
              {role === "company" && (
                <input
                  type="text"
                  placeholder="Company Phone"
                  className="border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                />
              )}
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </section>
        )}

        {/* Security */}
        {activeTab === "security" && (
          <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Security Settings
            </h2>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Password
            </button>
          </section>
        )}

        {/* Team Management */}
        {activeTab === "team" && (
          <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 max-w-4xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              {role === "company" ? "Manage Teams" : "Team Settings"}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Invite new members, assign roles, and manage team access.
            </p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Invite Member
            </button>
          </section>
        )}

        {/* Billing (Company only) */}
        {activeTab === "billing" && role === "company" && (
          <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 max-w-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Billing & Subscription
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              View invoices, manage payment methods, and upgrade/downgrade your plan.
            </p>
            <button className="mt-3 px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600">
              Manage Subscription
            </button>
          </section>
        )}

        {/* Danger Zone */}
        {activeTab === "danger" && (
          <section className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 max-w-2xl border border-red-500/50">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Danger Zone
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This action is irreversible. Please proceed with caution.
            </p>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              {role === "company" ? "Delete Company" : "Delete Account"}
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
