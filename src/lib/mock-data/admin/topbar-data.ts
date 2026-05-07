/* Topbar configuration for admin dashboard (admin.html lines 13177–13326) */
/* Verbatim canonical data */

export const TOPBAR = {
  role: {
    label: 'Operations Admin',
    dataRole: 'ops' as const,
  },
  search: {
    placeholder: 'Search users, transactions, disputes, audit logs…',
    kbd: '⌘K',
  },
  notifications: {
    badge: 7,
  },
  avatar: {
    initials: 'AO',
    fullName: 'Aïsha Okafor',
    email: 'aisha@atlas.example',
    role: 'Operations Admin',
  },
  dropdownItems: [
    { id: 'profile', label: 'My profile', href: '#profile' },
    { id: 'permissions', label: 'My permissions', href: '#permissions' },
    { id: 'settings', label: 'Account settings', href: '#account-settings' },
    { id: 'help', label: 'Help & documentation', href: '#help' },
    { id: 'shortcuts', label: 'Keyboard shortcuts', href: '#shortcuts' },
    { id: 'signout', label: 'Sign out', href: '#signout', isDanger: true },
  ],
} as const;
