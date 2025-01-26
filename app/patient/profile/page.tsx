'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Camera,
  Pencil,
  Save,
  X,
  ImageIcon,
  Calendar,
  Clock,
  Heart,
  Activity,
  Thermometer,
  Weight,
  Ruler,
  Pill,
  FileText,
  AlertCircle,
  ChevronRight,
  Plus,
  Download,
  Printer,
  Share2,
  Mail,
  Lock,
  BellRing,
  Palette,
  Globe,
  Database,
  HardDrive,
  Key,
  Shield,
  UserCheck,
  Users,
  User,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Beaker,
  MoreVertical,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  emergencyContact: string
  emergencyPhone: string
  bloodType: string
  allergies: string
  medications: string
}

interface LabResult {
  date: string
  type: string
  results: {
    name: string
    value: string
    unit: string
    range: string
  }[]
  orderedBy: string
}

interface LabImage {
  id: string
  url: string
  date: string
  title: string
}

// Mock patient data
const patientData = {
  id: "P-2024-001",
  name: "John Smith",
  dob: "1985-06-15",
  gender: "Male",
  bloodType: "O+",
  allergies: ["Penicillin", "Peanuts"],
  emergencyContact: {
    name: "Mary Smith",
    relation: "Spouse",
    phone: "+1 (555) 123-4567"
  }
}

const vitalSigns = [
  {
    date: "2024-03-20",
    bloodPressure: "120/80",
    heartRate: "72",
    temperature: "98.6",
    respiratoryRate: "16",
    weight: "75",
    height: "175",
    bmi: "24.5"
  }
]

// Add mock data for medications and medical history
const medications = [
  {
    id: "med1",
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    prescribedBy: "Dr. Sarah Wilson",
    status: "Active",
    instructions: "Take in the morning with food",
    purpose: "Blood pressure management"
  },
  {
    id: "med2",
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    prescribedBy: "Dr. Michael Chen",
    status: "Active",
    instructions: "Take with meals",
    purpose: "Diabetes management"
  },
  {
    id: "med3",
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    prescribedBy: "Dr. Sarah Wilson",
    status: "Active",
    instructions: "Take in the evening",
    purpose: "Cholesterol management"
  }
]

const medicalHistory = [
  {
    id: "visit1",
    date: "2024-03-15",
    type: "Regular Checkup",
    provider: "Dr. Sarah Wilson",
    diagnosis: "Hypertension - Well controlled",
    notes: "Blood pressure has improved with current medication regimen. Continue current treatment plan.",
    followUp: "3 months",
    attachments: 2
  },
  {
    id: "visit2",
    date: "2024-02-01",
    type: "Specialist Consultation",
    provider: "Dr. Michael Chen",
    diagnosis: "Type 2 Diabetes",
    notes: "HbA1c levels slightly elevated. Adjusted medication dosage and recommended dietary changes.",
    followUp: "2 months",
    attachments: 3
  },
  {
    id: "visit3",
    date: "2024-01-15",
    type: "Emergency Visit",
    provider: "Dr. Emily Brown",
    diagnosis: "Acute Bronchitis",
    notes: "Prescribed antibiotics and recommended rest. Symptoms improved after treatment.",
    followUp: "As needed",
    attachments: 1
  },
  {
    id: "visit4",
    date: "2023-12-01",
    type: "Annual Physical",
    provider: "Dr. Sarah Wilson",
    diagnosis: "General Wellness Exam",
    notes: "All vital signs normal. Recommended routine screenings completed.",
    followUp: "12 months",
    attachments: 4
  }
]

const labResults: LabResult[] = [
  {
    date: "2024-03-15",
    type: "Complete Blood Count",
    results: [
      { name: "WBC", value: "7.5", unit: "K/µL", range: "4.5-11.0" },
      { name: "RBC", value: "5.0", unit: "M/µL", range: "4.5-5.9" },
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5" },
      { name: "Hematocrit", value: "42", unit: "%", range: "41-50" }
    ],
    orderedBy: "Dr. Sarah Wilson"
  },
  {
    date: "2024-03-15",
    type: "Lipid Panel",
    results: [
      { name: "Total Cholesterol", value: "185", unit: "mg/dL", range: "<200" },
      { name: "HDL", value: "45", unit: "mg/dL", range: ">40" },
      { name: "LDL", value: "110", unit: "mg/dL", range: "<130" },
      { name: "Triglycerides", value: "150", unit: "mg/dL", range: "<150" }
    ],
    orderedBy: "Dr. Sarah Wilson"
  }
]

// Add mock lab images data
const labImages: LabImage[] = [
  {
    id: "1",
    url: "/lab-xray-1.jpg",
    date: "2024-03-15",
    title: "Chest X-Ray"
  },
  {
    id: "2",
    url: "/lab-scan-1.jpg",
    date: "2024-03-10",
    title: "MRI Scan"
  }
]

export default function PatientProfile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'medications' | 'labs' | 'history'>('overview')
  const [selectedImage, setSelectedImage] = useState<LabImage | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [labPhotos, setLabPhotos] = useState<LabImage[]>(labImages)
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    allergies: '',
    medications: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const email = sessionStorage.getItem('userEmail')
      const storedProfile = sessionStorage.getItem('userProfile')
      
      if (!email) {
        router.push('/auth/login')
        return
      }

      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile)
        setProfileData(parsedProfile)
      } else {
        // Set default profile data
        const defaultProfile = {
          firstName: email.split('@')[0], // Use email username as default first name
          lastName: 'Doe',
          email: email,
          phone: '(555) 123-4567',
          dateOfBirth: '1990-01-01',
          address: '123 Healthcare St, Medical City, MC 12345',
          emergencyContact: 'Jane Doe',
          emergencyPhone: '(555) 987-6543',
          bloodType: 'O+',
          allergies: 'Penicillin',
          medications: 'None'
        }
        setProfileData(defaultProfile)
        sessionStorage.setItem('userProfile', JSON.stringify(defaultProfile))
      }
    }
  }, [router])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // Here you would typically upload the image to your backend/storage
        console.log('Photo uploaded:', file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = () => {
    // Here you would typically save the profile data to your backend
    setIsEditing(false)
  }

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage: LabImage = {
          id: Date.now().toString(),
          url: reader.result as string,
          date: new Date().toISOString().split('T')[0],
          title: file.name.split('.')[0]
        }
        setLabPhotos(prev => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-4 lg:p-6 bg-background min-h-screen space-y-6">
      {/* Patient Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Electronic Medical Record</h1>
          <p className="text-muted-foreground">Patient ID: {patientData.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default" className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            <span>Print Record</span>
          </Button>
          <Button variant="outline" size="default" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </Button>
          <Button variant="outline" size="default" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </Button>
        </div>
      </div>

      {/* Patient Info Card */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/60">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <Users className="w-12 h-12 text-muted-foreground" />
                </div>
                <Label htmlFor="photo-upload" className="absolute -bottom-2 -right-2">
                  <div className="p-1.5 rounded-full bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                  <Input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </Label>
              </div>
              <div>
                <h2 className="text-xl font-semibold">{patientData.name}</h2>
                <p className="text-muted-foreground text-sm">ID: {patientData.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium mt-1">{patientData.dob}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium mt-1">{patientData.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blood Type</p>
                <p className="font-medium mt-1">{patientData.bloodType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Allergies</p>
                <p className="font-medium mt-1">{patientData.allergies.join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium mt-1">{patientData.emergencyContact.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Relation</p>
                  <p className="font-medium mt-1">{patientData.emergencyContact.relation}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium mt-1">{patientData.emergencyContact.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border/60">
        {["overview", "vitals", "medications", "labs", "history"].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`px-4 py-2 font-medium text-sm transition-colors relative ${
              activeTab === tab
                ? "text-primary border-b-2 border-primary -mb-[2px]"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Vital Signs */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/60">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Vital Signs</h3>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("vitals")}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {vitalSigns.map((vital, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                    <p className="font-medium mt-1">{vital.bloodPressure} mmHg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Heart Rate</p>
                    <p className="font-medium mt-1">{vital.heartRate} bpm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="font-medium mt-1">{vital.temperature}°F</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium mt-1">{vital.weight} kg</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Lab Results */}
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-2 border-border/60">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Lab Results</h3>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("labs")}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {labResults.map((result, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{result.type}</p>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {result.results.slice(0, 2).map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.name}</span>
                        <span className="font-medium">{item.value} {item.unit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "vitals" && (
        <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Vital Signs History</h3>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add New Record</span>
            </Button>
          </div>
          <div className="space-y-6">
            {vitalSigns.map((vital, index) => (
              <div key={index} className="p-4 rounded-lg border border-border/60">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">{vital.date}</p>
                    <p className="text-sm text-muted-foreground">Recorded at 10:30 AM</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Blood Pressure</p>
                    <p className="font-medium mt-1">{vital.bloodPressure} mmHg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Heart Rate</p>
                    <p className="font-medium mt-1">{vital.heartRate} bpm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temperature</p>
                    <p className="font-medium mt-1">{vital.temperature}°F</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Respiratory Rate</p>
                    <p className="font-medium mt-1">{vital.respiratoryRate} breaths/min</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Weight</p>
                    <p className="font-medium mt-1">{vital.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Height</p>
                    <p className="font-medium mt-1">{vital.height} cm</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">BMI</p>
                    <p className="font-medium mt-1">{vital.bmi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "labs" && (
        <div className="space-y-6">
          <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Laboratory Results</h3>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Add Lab Result</span>
              </Button>
            </div>
            <div className="space-y-6">
              {labResults.map((result, index) => (
                <div key={index} className="p-4 rounded-lg border border-border/60">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">{result.type}</p>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="mt-4">
                    <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground mb-2">
                      <span>Test</span>
                      <span>Result</span>
                      <span>Unit</span>
                      <span>Reference Range</span>
                    </div>
                    <div className="space-y-2">
                      {result.results.map((item, i) => (
                        <div key={i} className="grid grid-cols-4 gap-4 text-sm">
                          <span>{item.name}</span>
                          <span className="font-medium text-foreground">{item.value}</span>
                          <span>{item.unit}</span>
                          <span>{item.range}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/60">
                    <p className="text-sm text-muted-foreground">Ordered by: {result.orderedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Lab Images</h3>
              <Label htmlFor="image-upload" className="mb-0">
                <Button variant="default" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Upload Image</span>
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {labPhotos.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square rounded-lg border border-border/60 overflow-hidden cursor-pointer hover:border-primary/60 transition-colors"
                  onClick={() => {
                    setSelectedImage(image)
                    setIsModalOpen(true)
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "medications" && (
        <div className="space-y-6">
          <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Current Medications</h3>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Add Medication</span>
              </Button>
            </div>
            <div className="space-y-4">
              {medications.map((medication) => (
                <div key={medication.id} className="p-4 rounded-lg border border-border/60">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{medication.name}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          medication.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-500' 
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {medication.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {medication.dosage} • {medication.frequency}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium mt-0.5">{medication.startDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium mt-0.5">{medication.endDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Prescribed By</p>
                      <p className="font-medium mt-0.5">{medication.prescribedBy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Purpose</p>
                      <p className="font-medium mt-0.5">{medication.purpose}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/60">
                    <p className="text-sm text-muted-foreground">Instructions:</p>
                    <p className="text-sm mt-1">{medication.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "history" && (
        <div className="space-y-6">
          <div className="rounded-xl bg-card/50 backdrop-blur-sm border border-border/60 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Medical History</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Record</span>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {medicalHistory.map((visit) => (
                <div key={visit.id} className="p-4 rounded-lg border border-border/60">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{visit.type}</h4>
                        <span className="text-xs text-muted-foreground">
                          {visit.date}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-primary mt-1">
                        {visit.provider}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {visit.attachments > 0 && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{visit.attachments} files</span>
                        </div>
                      )}
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Diagnosis</p>
                      <p className="text-sm font-medium mt-0.5">{visit.diagnosis}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Notes</p>
                      <p className="text-sm mt-0.5">{visit.notes}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/60">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Follow-up in {visit.followUp}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 px-3 text-xs">
                        Schedule Follow-up
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-background rounded-lg p-2"
            onClick={e => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 h-9 w-9 p-0 rounded-full bg-background/10 text-white hover:bg-background/20"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">{selectedImage.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 