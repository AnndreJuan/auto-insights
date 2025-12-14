"use client"

import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes, ElementType } from "react";

interface AppsGaleryIconProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    icon: ElementType
}

export function AppsGaleryItem({ icon: Icon, ...rest}: AppsGaleryIconProps) {
    return (
        <Button
        {...rest}
        className="bg-transparent"
        variant="ghost"
        >
            <div className="">
                <Icon className="w-6 h-6 rounded flex items-center justify-center text-primary"/>

            </div>
        </Button>
    )
}
