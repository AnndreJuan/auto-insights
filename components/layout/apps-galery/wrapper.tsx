'use client'

import { AppsGalery } from "@/components/layout/apps-galery"
import { Mail, Calendar, Settings } from "lucide-react"

const apps = [
  { icon: Mail, label: "Email", onClick: () => console.log("Email") },
  { icon: Calendar, label: "Agenda", onClick: () => console.log("Agenda") },
  { icon: Settings, label: "Configurações", onClick: () => console.log("Config") },
]

export function AppsGaleryWrapper() {
  return <AppsGalery.Root apps={apps} />
}