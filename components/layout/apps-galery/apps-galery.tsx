"use client"

import { Button } from "@/components/ui/button";
import { GalleryHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ElementType } from "react";
import { AppsGaleryItem } from "./apps-galery-icon";

interface AppItem {
  icon: ElementType;
  label: string;
  onClick?: () => void;
}

interface AppsGaleryRootPros {
    apps: AppItem[];
} 

export function AppsGaleryRoot({ apps } : AppsGaleryRootPros) {
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="scale-95">
                    <GalleryHorizontal />
                    <span className='sr-only'>Apps galery</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-1">
                {apps.map((app, i) => (
                    <AppsGaleryItem
                        key={i}
                        icon={app.icon}
                        onClick={app.onClick}
                        title={app.label}
                    />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}