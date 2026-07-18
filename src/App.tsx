import React, { useState, useMemo } from 'react';
import { Users, Download, Search, Filter, CheckCircle, Circle, User, Mail, Phone, Building, Calendar, Globe, MapPin, FileText } from 'lucide-react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  title: string;
  company: string;
  department: string;
  emails: { type: string; value: string }[];
  phones: { type: string; value: string }[];
  addresses: {
    type: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }[];
  websites: { type: string; value: string }[];
  birthday?: string;
  notes: string;
  avatar: string;
  status: 'active' | 'away' | 'offline';
  timezone: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    displayName: 'Sarah Johnson',
    title: 'Senior Product Manager',
    company: 'TechCorp Inc.',
    department: 'Product',
    emails: [
      { type: 'work', value: 'sarah.johnson@techcorp.com' },
      { type: 'personal', value: 'sarah.j@gmail.com' }
    ],
    phones: [
      { type: 'work', value: '+1-555-0123' },
      { type: 'mobile', value: '+1-555-0124' }
    ],
    addresses: [
      {
        type: 'work',
        street: '123 Business Ave',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      }
    ],
    websites: [
      { type: 'work', value: 'https://techcorp.com/sarah' },
      { type: 'linkedin', value: 'https://linkedin.com/in/sarahj' }
    ],
    birthday: '1990-03-15',
    notes: 'Product manager with expertise in user experience and data analytics.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    timezone: 'America/Los_Angeles'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    displayName: 'Michael Chen',
    title: 'Lead Developer',
    company: 'TechCorp Inc.',
    department: 'Engineering',
    emails: [
      { type: 'work', value: 'michael.chen@techcorp.com' }
    ],
    phones: [
      { type: 'work', value: '+1-555-0125' },
      { type: 'mobile', value: '+1-555-0126' }
    ],
    addresses: [
      {
        type: 'work',
        street: '123 Business Ave',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      }
    ],
    websites: [
      { type: 'github', value: 'https://github.com/mchen' }
    ],
    birthday: '1988-07-22',
    notes: 'Full-stack developer specializing in React and Node.js.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    timezone: 'America/Los_Angeles'
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    displayName: 'Emily Rodriguez',
    title: 'UX Designer',
    company: 'TechCorp Inc.',
    department: 'Design',
    emails: [
      { type: 'work', value: 'emily.rodriguez@techcorp.com' },
      { type: 'personal', value: 'emily.design@gmail.com' }
    ],
    phones: [
      { type: 'work', value: '+1-555-0127' }
    ],
    addresses: [
      {
        type: 'work',
        street: '123 Business Ave',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      }
    ],
    websites: [
      { type: 'portfolio', value: 'https://emilydesigns.com' },
      { type: 'behance', value: 'https://behance.net/emilyrod' }
    ],
    birthday: '1992-11-08',
    notes: 'Creative UX designer with focus on accessibility and user research.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face',
    status: 'away',
    timezone: 'America/Los_Angeles'
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Park',
    displayName: 'David Park',
    title: 'Marketing Director',
    company: 'TechCorp Inc.',
    department: 'Marketing',
    emails: [
      { type: 'work', value: 'david.park@techcorp.com' }
    ],
    phones: [
      { type: 'work', value: '+1-555-0128' },
      { type: 'mobile', value: '+1-555-0129' }
    ],
    addresses: [
      {
        type: 'work',
        street: '123 Business Ave',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      }
    ],
    websites: [
      { type: 'work', value: 'https://techcorp.com/team/david' }
    ],
    birthday: '1985-05-12',
    notes: 'Strategic marketing leader with expertise in digital campaigns.',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?w=150&h=150&fit=crop&crop=face',
    status: 'offline',
    timezone: 'America/Los_Angeles'
  },
  {
    id: '5',
    firstName: 'Lisa',
    lastName: 'Thompson',
    displayName: 'Lisa Thompson',
    title: 'HR Manager',
    company: 'TechCorp Inc.',
    department: 'Human Resources',
    emails: [
      { type: 'work', value: 'lisa.thompson@techcorp.com' }
    ],
    phones: [
      { type: 'work', value: '+1-555-0130' }
    ],
    addresses: [
      {
        type: 'work',
        street: '123 Business Ave',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94105',
        country: 'USA'
      }
    ],
    websites: [],
    birthday: '1987-09-30',
    notes: 'Experienced HR professional focused on employee development and culture.',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=150&h=150&fit=crop&crop=face',
    status: 'active',
    timezone: 'America/Los_Angeles'
  }
];

function generateVCF(contact: Contact): string {
  const vcf = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${contact.displayName}`,
    `N:${contact.lastName};${contact.firstName};;;`,
    `TITLE:${contact.title}`,
    `ORG:${contact.company};${contact.department}`,
  ];

  // Add emails
  contact.emails.forEach(email => {
    vcf.push(`EMAIL;TYPE=${email.type.toUpperCase()}:${email.value}`);
  });

  // Add phones
  contact.phones.forEach(phone => {
    vcf.push(`TEL;TYPE=${phone.type.toUpperCase()}:${phone.value}`);
  });

  // Add addresses
  contact.addresses.forEach(address => {
    vcf.push(`ADR;TYPE=${address.type.toUpperCase()}:;;${address.street};${address.city};${address.state};${address.postalCode};${address.country}`);
  });

  // Add websites
  contact.websites.forEach(website => {
    vcf.push(`URL;TYPE=${website.type.toUpperCase()}:${website.value}`);
  });

  // Add birthday
  if (contact.birthday) {
    vcf.push(`BDAY:${contact.birthday.replace(/-/g, '')}`);
  }

  // Add notes
  if (contact.notes) {
    vcf.push(`NOTE:${contact.notes}`);
  }

  // Add timezone
  vcf.push(`TZ:${contact.timezone}`);

  vcf.push('END:VCARD');
  return vcf.join('\n');
}

function downloadVCF(filename: string, vcfContent: string) {
  const blob = new Blob([vcfContent], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const departments = ['all', ...Array.from(new Set(mockContacts.map(c => c.department)))];
  const statuses = ['all', 'active', 'away', 'offline'];

  const filteredContacts = useMemo(() => {
    return mockContacts.filter(contact => {
      const matchesSearch = contact.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           contact.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDepartment = departmentFilter === 'all' || contact.department === departmentFilter;
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [searchQuery, departmentFilter, statusFilter]);

  const handleSelectContact = (contactId: string) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedContacts.size === filteredContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(filteredContacts.map(c => c.id)));
    }
  };

  const handleExportSelected = () => {
    const selectedContactsData = mockContacts.filter(c => selectedContacts.has(c.id));
    const allVCF = selectedContactsData.map(generateVCF).join('\n\n');
    downloadVCF(`slack_contacts_${selectedContactsData.length}_contacts.vcf`, allVCF);
  };

  const handleExportSingle = (contact: Contact) => {
    const vcfContent = generateVCF(contact);
    downloadVCF(`${contact.firstName}_${contact.lastName}.vcf`, vcfContent);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-600 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Slack Contact Exporter</h1>
                <p className="text-sm text-gray-500">Export team contacts as VCF files</p>
              </div>
            </div>
            
            {selectedContacts.size > 0 && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  {selectedContacts.size} selected
                </span>
                <button
                  onClick={handleExportSelected}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Selected</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleSelectAll}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {selectedContacts.size === filteredContacts.length && filteredContacts.length > 0 ? (
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-400" />
                )}
                <span className="text-sm">Select All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={contact.avatar}
                        alt={contact.displayName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(contact.status)}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{contact.displayName}</h3>
                      <p className="text-sm text-gray-600">{contact.title}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleSelectContact(contact.id)}
                    className="flex-shrink-0"
                  >
                    {selectedContacts.has(contact.id) ? (
                      <CheckCircle className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 hover:text-purple-600 transition-colors" />
                    )}
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Building className="w-4 h-4" />
                    <span>{contact.company} • {contact.department}</span>
                  </div>
                  
                  {contact.emails.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{contact.emails[0].value}</span>
                    </div>
                  )}
                  
                  {contact.phones.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{contact.phones[0].value}</span>
                    </div>
                  )}
                  
                  {contact.addresses.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{contact.addresses[0].city}, {contact.addresses[0].state}</span>
                    </div>
                  )}
                  
                  {contact.birthday && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Birthday: {new Date(contact.birthday).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {contact.websites.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>{contact.websites.length} website{contact.websites.length > 1 ? 's' : ''}</span>
                    </div>
                  )}
                  
                  {contact.notes && (
                    <div className="flex items-start space-x-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4 mt-0.5" />
                      <span className="line-clamp-2">{contact.notes}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleExportSingle(contact)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export VCF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;