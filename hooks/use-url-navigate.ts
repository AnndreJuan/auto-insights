'use client'

import { useRouter, useSearchParams } from "next/navigation"
import type { NavigateFn, SearchRecord } from "./use-table-url-state"

export function useUrlNavigate(): {
  search: SearchRecord
  navigate: NavigateFn
} {
  const rawSearchParams = useSearchParams()
  const router = useRouter()

  const search: SearchRecord = {}
  for (const [key, value] of rawSearchParams.entries()) {
    const numValue = Number(value)
    search[key] = !isNaN(numValue) && value.trim() !== '' ? numValue : value
  }

  const navigate: NavigateFn = ({ search: input, replace }) => {
    let next: SearchRecord

    if (typeof input === "function") {
      next = input(search)
    } else if (input === true) {
      next = search
    } else {
      next = { ...search, ...input }
    }

    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(next)) {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          params.set(key, JSON.stringify(value))
        } else {
          params.set(key, String(value))
        }
      }
    }

    const url = `?${params.toString()}`

    if (replace) router.replace(url)
    else router.push(url)
  }

  return { search, navigate }
}